import React, { useState } from "react";
import Split from "react-split";
import axios from "axios";

import Topbar from "./topbar/Topbar";
import CodeEditor from "./CodeEditor";
import EditorOutput from "./EditorOutput";
import { useTheme } from "../contexts/ThemeContext";
import { themeBackGroundColors } from "../themes";
import { useVim } from "../contexts/VimContext";

const EditorPage = () => {
  const [submit, setSubmit] = useState(false);
  const [stdout, setStdout] = useState([]);
  const [error, setError] = useState(false);
  const [editorReady, setEditorReady] = useState(false);

  const theme = useTheme();
  const vimMode = useVim();

  function onRun() {
    if (submit === false) {
      setSubmit(true);
    }
  }

  const afterSubmit = (code) => {
    // console.log("request sent!");
    axios.post("http://localhost:80/run", { code }).then(({ data }) => {
      console.log(data);
      setSubmit(false);
      setStdout(data.status === "success" ? data.results : data.error);
      if (data.status !== "success") {
        setError(true);
      } else {
        setError(false);
      }
    });
  };

  return (
    <div style={{ backgroundColor: themeBackGroundColors[theme]["color"], height: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="flex flex-col items-center">
        <Topbar onRun={onRun} editorReady={editorReady} />
      </div>
      <Split
        sizes={[50, 50]}
        className="flex"
        gutterSize={10}
        style={{ border: "10px solid var(--gutter-color)", flex: "1 1 auto" }}
      >
        <CodeEditor
          submit={submit}
          afterSubmit={afterSubmit}
          setEditorReady={setEditorReady}
        />
        <EditorOutput stdout={stdout} error={error} />
      </Split>
      <code
        id="vim-status"
        className="dark:text-white"
        style={{
          backgroundColor: "var(--gutter-color)",
          fontFamily: "Source Code Pro",
          // flex: "0 1 auto",
        }}
      ></code>
      <div style={{height: vimMode == null ? "24px" : "0px", backgroundColor: "var(--gutter-color)"}}></div>
    </div>
  );
};

export default EditorPage;
