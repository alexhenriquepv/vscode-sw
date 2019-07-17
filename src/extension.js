'use strict';

const vscode = require('vscode')
const MagikVSCodeSW4 = require('./sw4/magik-vscode');
const MagikVSCodeSW5 = require('./sw5/magik-vscode');
const MagikLinter = require('./magik-linter');

function activate(context) {
  const config = vscode.workspace.getConfiguration('magik-vscode')

  let magikVSCode

  if (config.version == 4) {
    magikVSCode = new MagikVSCodeSW4(context)
  }
  else {
    magikVSCode = new MagikVSCodeSW5(context)
  }

  vscode.window.setStatusBarMessage(`Smallworld version ${config.version}`)
  
  new MagikLinter(magikVSCode, context)
}

exports.activate = activate
