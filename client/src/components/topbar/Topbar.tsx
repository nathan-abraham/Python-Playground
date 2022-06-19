import React from "react";
import RunButton from "./RunButton";
import ThemeSelect from "./ThemeSelect";
import VimButton from "./VimButton";
import DownloadButton from "./DownloadButton"

const Topbar = ({ onRun, editorReady, submit }: { onRun: React.MouseEventHandler<HTMLButtonElement>, editorReady: boolean, submit: boolean } ) => {

  return (
    <div className="flex items-center space-x-4">
      <RunButton onRun={onRun} editorReady={editorReady} submit={submit} />
      <ThemeSelect />
      <VimButton />
      <DownloadButton />
    </div>
  );
};

export default Topbar;
