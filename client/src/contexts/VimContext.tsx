import React, { useContext, useState } from "react";

const VimContext = React.createContext(null);
const VimUpdateContext = React.createContext();

export function useVim() {
  return useContext(VimContext);
}

export function useVimUpdate() {
  return useContext(VimUpdateContext);
}

export function VimProvider({ children }) {
  const [vimMode, setVimMode] = useState(null);

  return (
    <VimContext.Provider value={vimMode}>
      <VimUpdateContext.Provider value={setVimMode}>
        {children}
      </VimUpdateContext.Provider>
    </VimContext.Provider>
  );
}