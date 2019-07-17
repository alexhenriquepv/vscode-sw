const vscode = require('vscode')
const { exec } = require('child_process')
const processWindows = require("node-process-windows")
const swName = 'sw_magik_win32'

class MagikVSCode {

    constructor(ctx) {
        this.init(ctx)
    }

    findProcess(callback) {
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

    init (ctx) {
        const config = vscode.workspace.getConfiguration('magik-vscode')
        const alias_exe = `${config.productPath}/bin/x86/runalias.exe`
        const sw_env = `${config.productPath}/config/environment.bat`
        const gis_aliases = `${config.productPath}/config/gis_aliases`

        let disposable = vscode.commands.registerCommand('magik.opensession', () => {
            this.findProcess((swProcesses) => {
                if (swProcesses.length == 0) {
                    let runalias = `START ${alias_exe} -e "${sw_env}" -a "${gis_aliases}" swaf`
                    exec(runalias, (err, stdout) => {
                        if (err) {
                            console.log(err)
                            vscode.window.showErrorMessage('Fail to start SW session')
                        }
                        else {
                            console.log(stdout)

                            // kill runalias.exe after executed
                            setTimeout(() => {
                                exec('tskill runalias')
                            }, 2000)
                        }
                    })
                }
            })
        })

        ctx.subscriptions.push(disposable)

        disposable = vscode.commands.registerCommand('magik.compileFile', () => {
            this.findProcess((swProcesses) => {
                if (swProcesses.length > 0) {
                    processWindows.focusWindow(swProcesses[0])

                    let current_file = vscode.window.activeTextEditor.document.fileName
                    let textToSend = 'load_file{(}'.concat(`'`).concat(current_file).concat(`'`).concat('{)}')
                    textToSend = textToSend.replace(' ', '[SPACE]')
                    exec(`CALL ${__dirname}/run-focus.cmd ${swProcesses[0].pid} ${textToSend}`, (err, stdout) => {
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
                    vscode.window.showErrorMessage('SW session not found')
                }
            })
        })

        ctx.subscriptions.push(disposable)
    }
}

module.exports = MagikVSCode
