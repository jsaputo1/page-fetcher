const args = process.argv.slice(2);
const url = args[0];
const localPath = args[1];
const request = require("request");
const fs = require("fs");
const readline = require("readline");

const fetcher = (url, localPath) => {
  request(url, (error, response, body) => {
    if (error) {
      return console.log("error:", error);
    } else if (response.statusCode !== 200) {
      return console.log("statusCode:", response && response.statusCode);
    } else {
      fs.writeFile(localPath, body, (err) => {
        if (err) {
          if (err.code === "ENOENT") {
            return console.log("Invalid file path");
          } else return err;
        }
        if (fs.existsSync(localPath)) {
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });
          rl.question(
            "File already exists. To overwrite type Y then enter \n",
            (answer) => {
              if (answer === "Y") {
                writeFile();
                rl.close();
              } else {
                console.log("You did not enter the right key");
                rl.close();
              }
            }
          );
          return;
        }
        writeFile();
        return;
      });
    }
  });
};

const writeFile = () => {
  path = localPath;
  const stat = fs.statSync(path);
  const size = stat.size;
  console.log(`Downloaded and saved ${size} bytes to ${path}`);
};

fetcher(url, localPath);
