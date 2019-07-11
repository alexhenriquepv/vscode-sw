
@if (@X)==(@Y) @end /* JScript comment 
    @echo off 
    cscript //E:JScript //nologo "%~f0" "%~nx0" %* 
    exit /b %errorlevel% 
@if (@X)==(@Y) @end JScript comment */ 

// Send text to another window (prompt, browser)
// http://social.technet.microsoft.com/wiki/contents/articles/5169.vbscript-sendkeys-method.aspx

var sh = new ActiveXObject("WScript.Shell")
var ARGS = WScript.Arguments
var scriptName = ARGS.Item(0)

var process_id = ""
var text_to_send = ""

function help () {
    WScript.Echo("run.cmd process_id text_to_send")
}

function parseArgs(){ 

    if (ARGS.Length < 3) { 
        WScript.Echo("insufficient arguments")
        WScript.Quit(43)
    }
    
    process_id = ARGS.Item(1)
    text_to_send = ARGS.Item(2)
}

function init () {
    parseArgs()
    var result = sh.AppActivate(process_id)
    WScript.Echo(result)

    if (result){
        sh.SendKeys(text_to_send + "{ENTER}")
        WScript.Quit(0)
    } 
    else {
        WScript.Echo("Failed to find application with pid " + process_id)
        sh.SendKeys(text_to_send + "{ENTER}${ENTER}")
        WScript.Quit(1)
    }
}

if (process_id === "") {
	help()
}

init()