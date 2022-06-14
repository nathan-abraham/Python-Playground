import React from 'react'
import { IconContext } from "react-icons";
import { FaPlay } from "react-icons/fa";

const RunButton = ( {onRun, editorReady }) => {
  return (
      <button
        disabled={!editorReady}
        onClick={onRun}
        className="flex gap-2 items-center p-4 bg-green-400 dark:bg-green-800 rounded-md hover:opacity-75 m-4"
      >
        <IconContext.Provider
          value={{
            color: document.querySelector("body").classList.contains("dark") ? "rgb(74, 222, 128)" : "rgb(22, 101, 52)",
          }}
        >
          <FaPlay />
        </IconContext.Provider>
        <span className="font-bold text-green-800 dark:text-green-400">Run</span>
      </button>
  )
}

export default RunButton;