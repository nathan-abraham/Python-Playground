import React from 'react'
import { initVimMode } from "monaco-vim";
import { useVim, useVimUpdate } from "../../contexts/VimContext";
import { useEditor } from "../../contexts/EditorContext";

const VimButton = () => {
  const editor = useEditor();
  const vimMode = useVim();
  const setVimMode = useVimUpdate();

  return (
    <button className="bg-red-400 text-black dark:text-white p-2 rounded-md hover:opacity-75" onClick={() => {
      if (vimMode != null) {
        vimMode.dispose();
        setVimMode(null);
      } else {
        setVimMode(initVimMode(editor, document.getElementById("vim-status")));
      }
    }}>Toggle Vim</button>
  )
}

export default VimButton