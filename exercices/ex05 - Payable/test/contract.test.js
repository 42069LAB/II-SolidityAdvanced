const fs = require('fs');
const { compile } = require('./compile.test');

const ganache = require('ganache-cli');
const provider = ganache.provider();
const Web3 = require('web3');
const web3 = new Web3(provider);

const mocha = require('mocha');
const assert = require('assert');

mocha.describe('Payable - Exercice 05', () => {
    const contractName = 'Payable';
    let accounts = undefined;
    let contract = undefined;

    mocha.beforeEach(async () => {
        const { abi, bytecode } = compile(contractName, {
            'Payable.sol': {
                content: fs.readFileSync('./exercices/ex05 - Payable/sources/' + contractName + ".sol", "utf-8"),
            }
        });
        accounts = await web3.eth.getAccounts();
        contract = await new web3.eth.Contract(abi)
            .deploy({data: bytecode.object.toString()})
            .send({from: accounts[0], gas: 300000, value: 10});
    });
    mocha.it('has been deployed', () => {
        assert.ok(contract.options.address);
    });

    // Compléter le test ci-dessous
});
