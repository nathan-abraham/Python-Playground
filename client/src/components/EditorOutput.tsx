import React from "react";

const EditorOutput = ({ stdout, error }: { stdout: string[], error: boolean }) => {
  return (
    <div
      className="text-white flex flex-col pl-4 pt-1 leading-loose"
      style={{
        fontFamily: "source code pro",
        backgroundColor: "#1e1e1e",
      }}
    >
      <span className="font-bold">Standard Output</span>
      {stdout.map((line: string, index: number) => {
        return (
          <pre className={error ? "text-red-500" : ""} key={index}>
            {line}
          </pre>
        );
      })}
    </div>
  );
};

export default EditorOutput;
