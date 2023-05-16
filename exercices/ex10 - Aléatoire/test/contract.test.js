const fs = require('fs');
const { compile } = require('./compile.test');

const ganache = require('ganache-cli');
const provider = ganache.provider();
const Web3 = require('web3');
const web3 = new Web3(provider);

const mocha = require('mocha');
const assert = require('assert');

mocha.describe('Aléatoire - Exercice 10', () => {
    const contractName = 'Random';
    let accounts = undefined;
    let contract = undefined;

    mocha.beforeEach(async () => {
        const { abi, bytecode } = compile(contractName, {
            'Random.sol': {
                content: fs.readFileSync('./exercices/ex10 - Aléatoire/sources/' + contractName + ".sol", "utf-8"),
            }
        });
        accounts = await web3.eth.getAccounts();
        contract = await new web3.eth.Contract(abi)
            .deploy({data: bytecode.object.toString()})
            .send({from: accounts[0], gas: 300000});
    });

    mocha.it('has been deployed', () => {
        assert.ok(contract.options.address);
    });

    // Compléter le test ci-dessous
});
