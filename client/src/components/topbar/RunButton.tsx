import React from 'react'
import { IconContext } from "react-icons";
import { FaPlay } from "react-icons/fa";
import { MetroSpinner } from "react-spinners-kit";

const RunButton = ( {onRun, editorReady, submit }: { onRun: React.MouseEventHandler<HTMLButtonElement>, editorReady: boolean, submit: boolean }) => {
  return (
      <button
        disabled={!editorReady || submit}
        onClick={onRun}
        className="flex gap-2 justify-center items-center p-4 bg-green-400 dark:bg-green-800 rounded-md hover:opacity-75 m-4 transition-opacity"
        style={{ minWidth: 87, minHeight: 56 }}
      >
      {
        submit ?
        <MetroSpinner size={24} color={document.querySelector("body")?.classList.contains("dark") ? "rgb(74, 222, 128)" : "rgb(22, 101, 52)"} />  
        :
        <>
          <IconContext.Provider
            value={{
              color: document.querySelector("body")?.classList.contains("dark") ? "rgb(74, 222, 128)" : "rgb(22, 101, 52)",
            }}
          >
            <FaPlay />
          </IconContext.Provider>
          <span className="font-bold text-green-800 dark:text-green-400">Run</span>
        </>
      }
      </button>
  )
}

export default RunButton;