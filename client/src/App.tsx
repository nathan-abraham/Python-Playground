import { ThemeProvider } from "./contexts/ThemeContext";
import { VimProvider } from "./contexts/VimContext";
import { EditorProvider } from "./contexts/EditorContext"
import EditorPage from "./components/EditorPage";

function App() {
  return (
    <ThemeProvider>
      <VimProvider>
        <EditorProvider>
          <EditorPage />
        </EditorProvider>
       </VimProvider> 
    </ThemeProvider>
  );
}

export default App;
