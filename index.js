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
  cyan,
  stripColors
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

  // select template
  let template = argv.t || argv.template;
  let message = 'select a template';
  let isValidTemplate = false;

  // -- template expects a value
  if(typeof template === 'string') {
    /**
     * @type {{ t: string }}
     */
    const { t } = prompt({
      type: 'select',
      name: 't',
      message,
      choices: TEMPLATES
    });

    template = stripColors(t);
  }

  const templateDir = path.join(__dirname, `template-${template}`);

  console.log(`templateDir is ${templateDir}`);

  const write = (file, content) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file);
    if(content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };
  // 写入文件
  const files = fs.readdirSync(templateDir);
  for(const file of files.filter(f => f !== 'package.json')) {
    write(file);
  };
  //写入package.json
  const pkg = require(path.join(templateDir, 'package.json'));
  pkg.name = path.basename(root);
  write('package.json', JSON.stringify(pkg, null, 2));

  const pkgManager = /yarn/.test(process.env.npm_execpath)
          ? 'yarn'
          : 'npm';

  console.log(`\nDone. Now run: \n`);

  if(root !== cwd) {
    console.log(`   cd ${path.relative(cwd, root)}`);
  };

  console.log(`   ${pkgManager === 'yarn' ? `yarn` : `npm install`}`);
  console.log(`   ${pkgManager === 'yarn' ? `yarn dev` : `npm run dev`}`);
  console.log();
}

init().catch(e => {
  console.error(e);
});




























