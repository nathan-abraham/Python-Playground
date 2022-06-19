const fs = require("fs");
const { exec, execSync } = require("child_process");
const PythonShell = require("python-shell").PythonShell;
const express = require('express');
const cors = require("cors");
const url = require("url");
const ws = require("ws");

const coreUtils = require("./utils");
const { launch } = require("./python-lsp/serverLauncher");
const path = require("path");

const app = express();
const port = 80;
const SOCKETPATH = "/monaco-lsp-server";

const BASE_PYTHON_FILE_NAME = "./python/user_code.py";
const PYTHON_RUN_FILE = "./python/run.py";

let base_img_id = "";

app.use(cors());
app.use(express.json());

const wss = new ws.Server({
  noServer: true,
  perMessageDeflate: false,
});

function createFile(code) {
  fs.writeFileSync(BASE_PYTHON_FILE_NAME, code);
}

const server = app.listen(port, () => {
  console.log(`Python Playground listening on port ${port}`)
  exec("docker build -t python_playground_sandbox .", (err, stdout, stderr) => {
    console.log("Base image built");
    exec("docker images -q python_playground_sandbox", (err, stdout, stderr) => {
      base_img_id = stdout.trim();
    })
  })
})

app.post('/run', (req, res) => {
  // console.log(req.body.code);
  try {
    createFile(req.body.code);
  } catch(err) {
    console.log("An error occurred when creating the file");
    console.log(err);
    res.json({});
    return;
  }

  exec(`docker run -v ${path.join(process.cwd(), "python")}:/sandbox/python/temp:ro --rm python_playground_sandbox`, (err, stdout, stderr) => {
    if (err) {
      res.json({ status: "failure", error: "Server runtime error"});
      console.error(err);
      return;
    }

    console.log("stderr: ", stderr);
    console.log("stdout: ", stdout);

    if (stderr != "") {
      res.json({ status: "failure", error: coreUtils.formatError(stderr)})
    } else {
      const lines = stdout.split("\n");
      if (lines[lines.length - 1].trim() === "Timeout") {
        res.json({ status: "failure", error: "Python script timeout"})
      } else {
        lines.splice(lines.length - 2, 1);
        res.json({ status: "success", results: lines});
      }
    }
  });

})

server.on("upgrade", (request, socket, head) => {
  console.log('server on upgrade');
  const pathname = request.url ? url.parse(request.url).pathname : undefined;
  console.log({ pathname });
  if (pathname === SOCKETPATH) {
    wss.handleUpgrade(request, socket, head, (webSocket) => {
      const socket2 = {
        send: (content) =>
          webSocket.send(content, (error) => {
            if (error) {
              throw error;
            }
          }),
        onMessage: (cb) => webSocket.on('message', cb),
        onError: (cb) => webSocket.on('error', cb),
        onClose: (cb) => webSocket.on('close', cb),
        dispose: () => webSocket.close(),
      };
      console.log({ state: webSocket.readyState, open: webSocket.OPEN });
      // launch the server when the web socket is opened
      if (webSocket.readyState === webSocket.OPEN) {
        launch(socket2);
      } else {
        webSocket.on('open', () => launch(socket));
      }
    });
  }
});

function serverCloseCallback() {
  if (base_img_id === "") {
    return;
  }

  execSync(`docker rmi ${base_img_id}`);
  server.close();
  wss.close();
}

process.on('SIGINT', serverCloseCallback);  // CTRL+C
process.on('SIGQUIT', serverCloseCallback); // Keyboard quit
process.on('SIGTERM', serverCloseCallback); // `kill command