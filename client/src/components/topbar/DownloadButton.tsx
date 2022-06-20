import { useEditor } from '../../contexts/EditorContext'

const DownloadButton = () => {
  const editor = useEditor();

  return (
    <button 
    className="p-2 bg-purple-400 text-white hover:opacity-75 rounded-md transition-opacity"
    onClick={() => {
      const data = editor?.getValue();

      if (data) {
        const blob = new Blob([data], { type: "text/plain" });
        const href = URL.createObjectURL(blob);

        const downloadBuffer = Object.assign(document.createElement("a"), {
          href,
          style: "display: none",
          download: "main.py",
        })
        document.body.appendChild(downloadBuffer);
        downloadBuffer.click();
        URL.revokeObjectURL(href);
        downloadBuffer.remove()
      }
    }}>Download Code</button>
  )
}

export default DownloadButton