import React, { useContext, useState } from "react";

const EditorContext = React.createContext({});
const EditorUpdateContext = React.createContext("");

export function useEditor() {
  return useContext(EditorContext);
}

export function useEditorUpdate() {
  return useContext(EditorUpdateContext);
}

export function EditorProvider({ children }) {
  const [editor, setEditor] = useState<any>({});

  return (
    <EditorContext.Provider value={editor}>
      <EditorUpdateContext.Provider value={setEditor}>
        {children}
      </EditorUpdateContext.Provider>
    </EditorContext.Provider>
  )
}