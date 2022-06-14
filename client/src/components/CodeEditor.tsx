import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import {
  draculaThemeData,
  nightOwlThemeData,
  monokaiThemeData,
  nordThemeData,
  solarizedLightThemeData,
  pastelsOnDarkThemeData,
  tomorrowNightBlueThemeData,
  tomorrowThemeData,
} from "../themes";
import { useTheme } from "../contexts/ThemeContext";
import { useEditorUpdate } from "../contexts/EditorContext";

import { listen } from "@codingame/monaco-jsonrpc";
// import {
//   MonacoLanguageClient,
//   MonacoServices,
//   CloseAction,
//   ErrorAction,
//   createConnection,
// } from "monaco-languageclient";

import { MonacoLanguageClient, CloseAction, ErrorAction, MonacoServices, MessageTransports } from 'monaco-languageclient';
import { toSocket, WebSocketMessageReader, WebSocketMessageWriter } from '@codingame/monaco-jsonrpc';

import * as monaco from "monaco-editor";
import * as monaco_core from 'monaco-editor-core';

MonacoServices.install(monaco);

// function createLanguageClient(connection: any) {
//   return new MonacoLanguageClient({
//     name: "Monaco language client",
//     clientOptions: {
//       documentSelector: ["python"],
//       errorHandler: {
//         error: () => ErrorAction.Continue,
//         closed: () => CloseAction.DoNotRestart,
//       },
//     },
//     connectionProvider: {
//       get: (errorHandler: any, closeHandler: any) => {
//         return Promise.resolve(
//           createConnection(connection, errorHandler, closeHandler)
//         );
//       },
//     },
//   });
// }

function createLanguageClient(transports: MessageTransports): MonacoLanguageClient {
  return new MonacoLanguageClient({
    name: "Sample Language Client",
    clientOptions: {
      // use a language id as a document selector
      documentSelector: ['python'],
      // disable the default error handler
      errorHandler: {
        error: () => ({ action: ErrorAction.Continue }),
        closed: () => ({ action: CloseAction.DoNotRestart })
      }
    },
    // create a language client connection from the JSON RPC connection on demand
    connectionProvider: {
      get: () => {
        return Promise.resolve(transports)
      }
    }
  });
}

const CodeEditor = ({ submit, afterSubmit, setEditorReady }) => {
  const defaultCode = "print(2+2)";
  const editorRef: any = useRef(null);
  const theme = useTheme();

  const setEditor = useEditorUpdate();

  if (submit === true) {
    const code = editorRef.current.getValue();
    afterSubmit(code);
  }

  useEffect(() => {
    // monaco.languages.register({
    //   id: 'python',
    //   extensions: ['.py'],
    //   aliases: ['python'],
    //   mimetypes: ['application/text'],
    // });

    // monaco.editor.create(document.querySelector("body"), {
    //   model: monaco.editor.createModel(
    //     ['import numpy', 'def func1():', '\tpass', '', 'func1()'].join('\n'),
    //     'python',
    //     monaco.Uri.parse('inmemory://model.py')
    //   ),
    // });

    // MonacoServices.install(monaco as typeof monaco_core);
    // const url = "ws://localhost:80/monaco-lsp-server";
    // const webSocket = new WebSocket(url);

    // webSocket.onopen = () => {
    //   const socket = toSocket(webSocket);
    //   const reader = new WebSocketMessageReader(socket);
    //   const writer = new WebSocketMessageWriter(socket);
    //   const languageClient = createLanguageClient({
    //     reader,
    //     writer
    //   });
    //   languageClient.start();
    //   reader.onClose(() => languageClient.stop());
    // };

    // listen({
    //   webSocket,
    //   onConnection: (connection) => {
    //     if (connection != null) {
    //       const languageClient = createLanguageClient(connection);
    //       const disposable = languageClient.start();
    //       connection.onClose(() => disposable.dispose());
    //     } else {
    //       console.log("hi");
    //     }
    //   },
    // });
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Editor
        height="100%"
        width="100%"
        language="javascript"
        defaultValue={defaultCode}
        defaultLanguage="python"
        onMount={(editor, monacoReact) => {
          editorRef.current = editor;
          setEditor(editor);
          setEditorReady(true);

          // Define themes
          // monacoReact.editor.defineTheme("dracula", draculaThemeData);
          // monacoReact.editor.defineTheme("night-owl", nightOwlThemeData);
          // monacoReact.editor.defineTheme("monokai", monokaiThemeData);
          // monacoReact.editor.defineTheme("nord", nordThemeData);
          // monacoReact.editor.defineTheme("solarized-light", solarizedLightThemeData);
          // monacoReact.editor.defineTheme("pastels-on-dark", pastelsOnDarkThemeData);
          // monacoReact.editor.defineTheme("tomorrow-night-blue", tomorrowNightBlueThemeData);
          // monacoReact.editor.defineTheme("tomorrow", tomorrowThemeData);

          monacoReact.languages.register({
            id: 'python',
            extensions: ['.py'],
            aliases: ['python'],
            mimetypes: ['application/text'],
          })

          MonacoServices.install(monacoReact as typeof monaco_core);

          const url = "ws://localhost:80/monaco-lsp-server";
          const webSocket = new WebSocket(url);

          webSocket.onopen = () => {
            const socket = toSocket(webSocket);
            const reader = new WebSocketMessageReader(socket);
            const writer = new WebSocketMessageWriter(socket);
            const languageClient = createLanguageClient({
              reader,
              writer
            });
            languageClient.start();
            reader.onClose(() => languageClient.stop());
          };
          // listen({
          //   webSocket,
          //   onConnection: (connection) => {
          //     const languageClient = createLanguageClient(connection);
          //     languageClient.start();
          //     // const disposable = languageClient.start();
          //     // connection.onClose(() => disposable.dispose());
          //   },
          // });
        }}
        theme={theme}
        options={{
          fontSize: "18",
          automaticLayout: true,
          wordWrap: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
