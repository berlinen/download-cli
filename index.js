#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
const { prompt } = require("enquirer");
const { emptyDir } = require("./utils");


const {
  yellow,
  green,
  lightRed,
  cyan
} = require("kolorist");

console.log(argv)
console.log(argv._[0])

const cwd = process.cwd();

const TEMPLATES = [
  yellow("vue"),
  green("vue-ts"),
  lightRed("react"),
  cyan("react-ts")
];

const renameFiles = {
  _gitignore: '.gitignore'
};

// 初始化项目名称
async function init () {
  let targetDir = argv._[0];
  if(!targetDir) {
    /**
     * @type {{ name: string }}
     */
    const { name } = await prompt({
      type: "input",
      name: "name",
      message: "Project name:",
      initial: "download-cli-project"
    })

    targetDir = name;
  }
}

const root = path.join(cwd, targetDir);

console.log(`\n download project in ${root}....`);

// 是否存在文件夹
if(!fs.existsSync(root)) {
  /**
   * @type {{ recursive: boolean  }} // 回调回接收创建的第一个路径作为参数
   */
  fs.mkdirSync(root, { recursive: true });
} else {
  const existing = fs.readdirSync(root);
  if(existing.length) {
    /**
     * @type {{ yes: boolean }}
     */
    const { yes } = prompt({
      type: 'confirm',
      name: 'yes',
      initial: 'Y',
      message: `taeget directory ${targetDir} is not empty. \n` + `Remove existing files and continue?`
    });

    if(yes) {
      emptyDir(root);
    } else {
      return;
    }
  }
}


























