function formatError(traceback, isStack) {
  if (isStack) {
    traceback = traceback.replace(/File ".+"/g, "File \"main.py\"");
    traceback = traceback.replace(/C:.+:/g, "File \"main.py\":");
    const lines = traceback.split("\n");
    let remIdx = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("SyntaxError") || lines[i].includes("NameError")) {
        remIdx = i + 1;
      }
    }
    lines.splice(remIdx, lines.length-1);
    return lines;
  }
  else {
    let replacedFile = traceback.replace(/File ".+"/g, "File \"main.py\"");
    return replacedFile.split("\n");
  }
}

module.exports = {
  formatError: formatError
}