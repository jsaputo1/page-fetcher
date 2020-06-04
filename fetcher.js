const args = process.argv.slice(2);
const url = args[0];
const localPath = args[1];

const request = require("request");
const fs = require("fs");

const fetcher = function (url, localPath) {
  request(url, (_, __, body) => {
    fs.writeFile(localPath, body, function (err) {
      const fs = require("fs"),
        path = localPath;
      const stat = fs.statSync(path);
      const size = stat.size;
      if (err) throw err;
      console.log(`Downloaded and saved ${size} bytes to ${path}`);
    });
  });
};

fetcher(url, localPath);
