import React, { Dispatch, useContext, useState } from "react";
import * as monaco from "monaco-editor";

const EditorContext = React.createContext<monaco.editor.IStandaloneCodeEditor | null>(null);
const EditorUpdateContext = React.createContext<Dispatch<any>>(() => console.log(""));

export function useEditor() {
  return useContext(EditorContext);
}

export function useEditorUpdate() {
  return useContext(EditorUpdateContext);
}

export function EditorProvider({ children } : any) {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  return (
    <EditorContext.Provider value={editor}>
      <EditorUpdateContext.Provider value={setEditor}>
        {children}
      </EditorUpdateContext.Provider>
    </EditorContext.Provider>
  )
}