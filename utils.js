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
/**
 * @desc 将src拷贝到dest
 * @param {*} src 文件目录
 * @param {*} dest
 */
const copy = (src, dest) => {
  const stat = fs.statSync(src);
  if (stat.isDirectory) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
};
/**
 * @desc 将srcDir目录拷贝到destDir
 * @param {*} srcDir 文件目录
 * @param {*} destDir
 */
const copyDir = (srcDir, destDir) => {
  // 创建destDir文件目录
  fs.mkdirSync(destDir, { recusive: true }); // 回调回接收创建的第一个路径作为参数
  // 将srcDir文件复制到Dest sDir
  for(const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  };
}



module.exports = {
  emptyDir,
  copy
}