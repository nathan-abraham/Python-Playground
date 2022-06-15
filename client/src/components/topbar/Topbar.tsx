import React from "react";
import RunButton from "./RunButton";
import ThemeSelect from "./ThemeSelect";
import VimButton from "./VimButton";
import DownloadButton from "./DownloadButton"

const Topbar = ({ onRun, editorReady }: { onRun: React.MouseEventHandler<HTMLButtonElement>, editorReady: boolean } ) => {

  return (
    <div className="flex items-center space-x-4">
      <RunButton onRun={onRun} editorReady={editorReady} />
      <ThemeSelect />
      <VimButton />
      <DownloadButton />
    </div>
  );
};

export default Topbar;
