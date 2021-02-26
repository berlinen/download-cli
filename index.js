#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
const { prompt } = require("enquirer");
const {
  yellow,
  green,
  lightRed,
  cyan
} = require("kolorist");

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


async function init () {
  
}


