const fs = require("fs");
const os = require("os");

module.exports = {
  input: (day) => (fs.readFileSync(`${day}.txt`).toString().split(os.EOL)),
};
