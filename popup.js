document.addEventListener('DOMContentLoaded', () => {

    const codeElement = document.getElementById('code').value;
    const documentElement = document.getElementById('document');

    function generateDocumentation(pythonCode) {

        let userDefinedFunctions = [];
        let globalVariables = [];
        let printStatements = [];
        let userDefinedClasses = [];
        let importedLibraries = [];
        let numberOfConditionalStatements = 0;
        let numberOfSwitchStatements = 0;
        let numberOfLoops = 0;
        let numberOfReturnStatements = 0;
    
        const lines = pythonCode.split('\n');
        lines.forEach(line => {
            if(line.trim().startsWith('def')) {
                let PARAMS;
                let conPARAMS = line.trim().split('(')[1].split(',')
                if(conPARAMS.length != 1) {
                    let lastParameter = conPARAMS[(conPARAMS.length) - 1].split(')')[0];
    
                    conPARAMS.pop();
                    conPARAMS.push(lastParameter);
                    PARAMS = conPARAMS;
                } else {
                    PARAMS = null;
                }
                const functionName = {
                    name: line.trim().split(' ')[1].split('(')[0],
                    parameters: PARAMS
                }
                userDefinedFunctions.push(functionName);
            }
    
            if(line.trim().startsWith('global')) {
                const variableName = line.trim().split(' ')[1];
                globalVariables.push({
                    gVariable: variableName
                })
            }
    
            if(line.trim().startsWith('print(')) {
                printStatements.push({
                    line: line.trim()
                });
            }
    
            if(line.trim().startsWith('class')) {
                userDefinedClasses.push({
                    className: line.trim().split(' ')[1].split(':')[0]
                });
            }
    
            if(line.trim().startsWith('import')) {
                importedLibraries.push({
                    imported: line.trim()
                });
            }
    
            if(line.trim().startsWith('if') || line.trim().startsWith('elif') || line.trim().startsWith('else')) {
                numberOfConditionalStatements++;
            }
    
            if(line.trim().startsWith('switch')) {
                numberOfSwitchStatements++;
            }
    
            if(line.trim().startsWith('for') || line.trim().startsWith('while')) {
                numberOfLoops++;
            }
    
            if(line.trim().startsWith('return')) {
                numberOfReturnStatements++;
            }
        });
    
        const documentationObject = {
            userDefinedFunctions: userDefinedFunctions,
            globalVariables: globalVariables,
            printStatements: printStatements,
            userDefinedClasses: userDefinedClasses,
            importedLibraries: importedLibraries,
            numberOfConditionalStatements: numberOfConditionalStatements,
            numberOfSwitchStatements: numberOfSwitchStatements,
            numberOfLoops: numberOfLoops,
            numberOfReturnStatements: numberOfReturnStatements
        };

        console.log(documentationObject);
    
        return documentationObject;
    }

    document.getElementById('run').addEventListener('click', () => {

        const codeElement = document.getElementById('code').value;
        const documentElement = document.getElementById('document');

        if (codeElement.length > 2) {
            console.log('Test one passed.')
            const documentation = JSON.stringify(generateDocumentation(codeElement), null, 2);

            console.log(documentation)

            documentElement.innerHTML = documentation;
        }
    });

    document.getElementById('download-pdf').addEventListener('click', () => {
        let date = new Date().toLocaleTimeString();
        if(documentElement != null) {
            let doc = new jspdf.jsPDF();
            doc.text(documentElement.value, 10, 10);
            doc.save(`codoc ${date}.pdf`);
        }
    });

});