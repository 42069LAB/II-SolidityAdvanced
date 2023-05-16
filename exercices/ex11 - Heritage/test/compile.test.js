const solc = require('solc');

function compile(fileName, contractName, content) {
    const input = {
        language: 'Solidity',
        sources: content,
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };
    const { contracts } = JSON.parse(solc.compile(JSON.stringify(input)));

    return {
        "abi": contracts[fileName + ".sol"][contractName].abi,
        "bytecode": contracts[fileName + ".sol"][contractName].evm.bytecode,
    };
}

module.exports = {
    compile,
}
