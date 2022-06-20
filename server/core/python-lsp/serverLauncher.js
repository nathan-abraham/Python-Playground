rpc = require("@codingame/monaco-jsonrpc");
server = require("@codingame/monaco-jsonrpc/lib/server");
lsp = require('vscode-languageserver');
require("dotenv").config()
const Message = require("vscode-languageserver").Message;

function launch(socket) {
  const reader = new rpc.WebSocketMessageReader(socket);
  const writer = new rpc.WebSocketMessageWriter(socket);
  console.log('connection established');
  const socketConnection = server.createConnection(reader, writer, () =>
    socket.dispose()
  );
  const serverConnection = server.createServerProcess(
    'JSON',
    process.env.PYTHON_LSP_SERVER_PATH // path to python-lsp-server called with pylsp command
  );
  server.forward(socketConnection, serverConnection, (message) => {
    // console.log('server forward');
    if (Message.isRequest(message)) {
      if (message.method === lsp.InitializeRequest.type.method) {
        const initializeParams = message.params;
        initializeParams.processId = process.pid;
      }
    }
    return message;
  });
}

module.exports = {
  launch,
};