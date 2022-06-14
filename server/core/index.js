const fs = require("fs");
const PythonShell = require("python-shell").PythonShell;
const express = require('express');
const cors = require("cors");
const url = require("url");
const ws = require("ws");

const coreUtils = require("./utils");
const { launch } = require("./python-lsp/serverLauncher")

const app = express();
const port = 80;
const SOCKETPATH = "/monaco-lsp-server";

const BASE_PYTHON_FILE_NAME = "./python/user_code.py";
const PYTHON_RUN_FILE = "./python/run.py";

app.use(cors());
app.use(express.json());

const wss = new ws.Server({
  noServer: true,
  perMessageDeflate: false,
});

function createFile(code) {
  fs.writeFileSync(BASE_PYTHON_FILE_NAME, code);
}

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

  let options = {
    mode: "text",
    pythonOptions: ["-u"],
  };

  PythonShell.run(BASE_PYTHON_FILE_NAME, options, (err, results) => {
    if (err) {
      console.log("Error in user's python code");
      console.log(err);
      res.json({ status: "failure", error: coreUtils.formatError(err.traceback ? err.traceback : err.stack, err.traceback ? false : true)});
    } else {
      console.log("results:", results);
      res.json({ status: "success", results: results});
    }
  });
})

const server = app.listen(port, () => {
  console.log(`Python Playground listening on port ${port}`)
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