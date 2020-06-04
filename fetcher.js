const args = process.argv.slice(2);
const url = args[0];
const localPath = args[1];

const request = require("request");
const fs = require("fs");

// const request = require("request");
// request(test, (error, response, body) => {
//   console.log; // Print the error if one occurred
//   // Print the response status code if a response was received
//   console.log("body:", body); // Print the HTML for the Google homepage.
// });

const fetcher = function (url, localPath) {
  request(url, (error, response, body) => {
    if (error) {
      return console.log("error:", error);
    } else if (response.statusCode !== 200) {
      return console.log("statusCode:", response && response.statusCode);
    } else {
      fs.writeFile(localPath, body, { flag: "wx" }, function (err) {
        if (err.code === "ENOENT") {
          return console.log("Invalid file path", err.path);
        } else if (err.code === "EEXIST") {
          return console.log("File already exists", err.path);
        }

        path = localPath;
        const stat = fs.statSync(path);
        const size = stat.size;

        console.log(`Downloaded and saved ${size} bytes to ${path}`);
      });
    }
  });
};

fetcher(url, localPath);

// What should happen if the local file path given already exists?
// Optional / Stretch: If the file already exists, let the user know and prompt them to type in Y(followed by the enter key) to overwrite the file, otherwise skip and exit the app. We suggest using the readline module, which we've previously used.
