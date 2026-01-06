import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");
const logFile = path.join(logDir, "app.log");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const log = (level, message, meta = {}, addNewLine = false) => {
  const entry = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  });

  const finalLog = addNewLine ? `\n${entry}` : entry;

  fs.appendFileSync(logFile, finalLog + "\n");
};
