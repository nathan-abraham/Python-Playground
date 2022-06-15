import { useRef } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import * as monaco_core from "monaco-editor-core";

import {
  MonacoLanguageClient,
  CloseAction,
  ErrorAction,
  MonacoServices,
  MessageTransports,
} from "monaco-languageclient";
import {
  toSocket,
  WebSocketMessageReader,
  WebSocketMessageWriter,
} from "@codingame/monaco-jsonrpc";

import { useTheme } from "../contexts/ThemeContext";
import { useEditorUpdate } from "../contexts/EditorContext";
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


MonacoServices.install(monaco);

function createLanguageClient(
  transports: MessageTransports
): MonacoLanguageClient {
  return new MonacoLanguageClient({
    name: "Sample Language Client",
    clientOptions: {
      // use a language id as a document selector
      documentSelector: ["python"],
      // disable the default error handler
      errorHandler: {
        error: () => ({ action: ErrorAction.Continue }),
        closed: () => ({ action: CloseAction.DoNotRestart }),
      },
    },
    // create a language client connection from the JSON RPC connection on demand
    connectionProvider: {
      get: () => {
        return Promise.resolve(transports);
      },
    },
  });
}

const CodeEditor = ({ submit, afterSubmit, setEditorReady }: any) => {
  const defaultCode = "print(2+2)";
  const editorRef: any = useRef(null);
  const theme = useTheme();

  const setEditor = useEditorUpdate();

  if (submit === true) {
    const code = editorRef.current.getValue();
    afterSubmit(code);
  }

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
          monacoReact.editor.defineTheme("dracula", draculaThemeData);
          monacoReact.editor.defineTheme("night-owl", nightOwlThemeData);
          monacoReact.editor.defineTheme("monokai", monokaiThemeData);
          monacoReact.editor.defineTheme("nord", nordThemeData);
          monacoReact.editor.defineTheme("solarized-light", solarizedLightThemeData);
          monacoReact.editor.defineTheme("pastels-on-dark", pastelsOnDarkThemeData);
          monacoReact.editor.defineTheme("tomorrow-night-blue", tomorrowNightBlueThemeData);
          monacoReact.editor.defineTheme("tomorrow", tomorrowThemeData);

          monacoReact.languages.register({
            id: "python",
            extensions: [".py"],
            aliases: ["python"],
            mimetypes: ["application/text"],
          });

          // @ts-expect-error
          MonacoServices.install(monacoReact as typeof monaco_core);

          const url = "ws://localhost:80/monaco-lsp-server";
          const webSocket = new WebSocket(url);

          webSocket.onopen = () => {
            const socket = toSocket(webSocket);
            const reader = new WebSocketMessageReader(socket);
            const writer = new WebSocketMessageWriter(socket);
            const languageClient = createLanguageClient({
              reader,
              writer,
            });
            languageClient.start();
            reader.onClose(() => languageClient.stop());
          };
        }}
        theme={theme}
        options={{
          fontSize: 18,
          automaticLayout: true,
          wordWrap: "on",
        }}
      />
    </div>
  );
};

export default CodeEditor;
