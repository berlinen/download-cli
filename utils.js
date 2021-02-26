const fs = require('fs');
/**
 *
 * @param {string} dir 文件夹名称
 */
const emptyDir = (dir) => {
  if(!fs.existsSync(dir)) {
    return;
  }
  for(const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file);

    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }

  }
}

const copy = ()

module.exports = {
  emptyDir
}