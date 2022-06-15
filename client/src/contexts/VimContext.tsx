import React, { Dispatch, useContext, useState } from "react";

const VimContext = React.createContext<any>(null);
const VimUpdateContext = React.createContext<Dispatch<any>>(() => console.log());

export function useVim() {
  return useContext(VimContext);
}

export function useVimUpdate() {
  return useContext(VimUpdateContext);
}

export function VimProvider({ children }: any) {
  const [vimMode, setVimMode] = useState(null);

  return (
    <VimContext.Provider value={vimMode}>
      <VimUpdateContext.Provider value={setVimMode}>
        {children}
      </VimUpdateContext.Provider>
    </VimContext.Provider>
  );
}