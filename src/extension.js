const vscode = require('vscode')
const { exec } = require('child_process')
const processWindows = require("node-process-windows")
const swName = 'sw_magik_win32'

function findProcess (callback) {
	processWindows.getProcesses((err, processes) => {
		if (err) {
			console.log(err)
		}
		else {
			let swProcesses = processes.filter(p => p.processName.indexOf(swName) >= 0)
			if (typeof callback == 'function') callback(swProcesses)
		}
	})
}

function activate() {

	const config = vscode.workspace.getConfiguration('vscodesw')

	const alias_exe = `${config.productPath}/bin/x86/runalias.exe`
	const sw_env = `${config.productPath}/config/environment.bat`
	const gis_aliases = `${config.productPath}/config/gis_aliases`
	
	vscode.commands.registerCommand('vscodesw.sessao', () => {
		findProcess((swProcesses) => {
			if (swProcesses.length == 0) {
				let runalias = `START ${alias_exe} -e "${sw_env}" -a "${gis_aliases}" swaf`
				exec(runalias, (err, stdout) => {
					if (err) {
						console.log(err)
						vscode.window.showErrorMessage('Fail to start SW prompt')
					}
					else {
						console.log(stdout)
					}
				})
			}
		})
	})

	vscode.commands.registerCommand('vscodesw.compila', () => {
		findProcess((swProcesses) => {
			if (swProcesses.length > 0) {
				processWindows.focusWindow(swProcesses[0])

				let current_file = vscode.window.activeTextEditor.document.fileName
				let textToSend = `load_file{(}'${current_file}'{)}`

				exec(`CALL ${__dirname}/src/run-focus.cmd ${swProcesses[0].pid} ${textToSend}`, (err, stdout) => {
					if (err) {
						console.log(err)
						vscode.window.showWarningMessage('Some probleming is ocurring on extension')
					}
					else {
						console.log(stdout)
					}
				})
			}
			else {
				vscode.window.showErrorMessage('SW process not found')
			}
		})
	})
}

exports.activate = activate

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
