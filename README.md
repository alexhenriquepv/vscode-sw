# VSCode Magik Smallworld
### Extension for compile magik code with one click :)
![Extension Image](https://magikvideo.files.wordpress.com/2019/07/ext2.png)

## Installation
1. Download extension on [Marketplace](https://marketplace.visualstudio.com/items?itemName=alexhenriquepv.vscodesw)
2. Enable `Editor: Format on Type` in the VSCode settings to allow adding _ and auto indentation.

## Usage
* Edit your settings your settings.
    - File -> Preferences -> Settings -> Magik Smallworld.
    - Select your Smallworld version.
    - Select the Smallworld instalation path.

    ![Extension Settings](/icons/settings.png)

* Open a Magik file on VSCode editor.

* Open a Magik session.
    ![Extension Open session](/icons/session.png)

* (Optional) Load the file vscode_dev.magik at the Magik prompt (**Alt+M**).
    This will load a set of utility procs to support navigating and compiling Magik in VS Code.
    (vscode_dev.magik is supplied in this extension - I would recommend copying this to a convenient location to load after a session starts or load in .magik)
    The dev procs mfind() (aka mf()) and open_class() (aka oc()) will then be available at the Magik prompt.

* Execute the code.
    ![Extension compile file](/icons/compile.png)

## Features
Adds the following features to VS Code:
* Compile Code Commands:
    * `Magik Open Session` (**F7**)
    * `Magik Compile Method` (**F7**)
    * `Magik Compile File` (**Ctrl+F7**)
    * `Magik Compile Selection` (**F8**)
* Code Navigation Commands:
    * `Magik Goto` (**F3**) to jump to source. Click on a method name and invoke the command to jump to source or display method candidates at the Magik prompt.
    * `Go to Definition` (**F12**) and `Peek Definition` (**Alt+F12**) in Magik.
    * `Find All References` (**Shift+F12**) and `List All References` (**Shift+Alt+F12**) in Magik. (Only searches in the current file - use Find in Folder to expand a search)
* Code Formating:
    * Magik Syntax highlighting
    * Auto indenting of Magik code
    * Auto completion for Magik keywords, classes, globals and methods.
    * Adds _ before Magik keywords
    * Snippets for common Magik definitions
    * Command `Magik Indent Region` (**Ctrl+I**)
    * Command `Magik Indent File` (**Ctrl+Shift+I**)
    * Command `Magik Format Region` (**Alt+F**)
    * Command `Magik Format File` (**Shift+Alt+F**)
* Linting:
    * Command `Magik Check File` (**Ctrl+Shift+F7**)

    The following errors/warnings are highlighted in the code:
    * Undefined variables
    * Unused variables
    * Undefined method usage
    * Use of a class name as a local variable
    * Private methods that are classified as Basic
    * Missing comment from a Basic method
    * (Hint) Complex methods with a cyclomatic complexity over 10
    * (Hint) Long methods with more than 40 lines of code
* Symbols:
    * Search Magik methods in the current session (**Ctrl+T**)
    * Magik definitions in the current file to support Outline view
* Testing:
    * Command `Magik Run Test` to run the current test method (**Alt+F7**)
* Other:
    * Displays method help for indentified method calls.
    * Command `Magik New Buffer` to create a new Magik file in the temp directory (**Alt+N**)

(Use Ctrl+Shift+P to list available commands and type Magik)

### **Method Search**
You can search for Magik methods using **Ctrl+T** and typing `<method name>` or `<class name>`.`<method name>`.
Use **Alt+T** to refresh symbols.

### **Magik Linting**
Magik files are scanned when they are opened and saved or by using the command `Magik Check File`.
Warning: This does not confirm the code is without issues!

The linting can be enable/diabled using the setting `magik-vscode.enableLinting`.

## Extension Settings

* Enable auto indentation of Magik code (`true` by default)
```json
    "magik-vscode.enableAutoIndentation": true
```

* Enable linting of Magik code (`true` by default)
```json
    "magik-vscode.enableLinting": true
```

* Smallworld version (`5` by default)
```json
    "magik-vscode.version": 5
```

* The Core instalation directory (`C:/GE_Smallworld/Core520/core` by default)
```json
    "magik-vscode.productPath": "C:/GE_Smallworld/Core520/core"
```

## Known Issues
* Version 4 of Smallwolrd do not permit the use of integrated terminal. The extension uses a external terminal to force a session.
* The extension permits a unique session for time.
* Magik symbols (to support searching for methods) are not loaded automatically after compiling code - use **Alt+T** to refresh symbols.
* No highlighting or formatting at the Magik prompt - I suggest creating a temp magik file for writing Magik (**Alt+N**).
* Linting only available inside methods.

Please add issues here:
https://github.com/alexhenriquepv/vscode-sw/issues
