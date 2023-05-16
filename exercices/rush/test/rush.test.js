const fs = require('fs');
const { compile } = require('./compile.test');

const ganache = require('ganache-cli');
const provider = ganache.provider();
const Web3 = require('web3');
const web3 = new Web3(provider);

const mocha = require('mocha');
const assert = require('assert');

mocha.describe('Leboncoin - Rush', () => {
    const contractName = 'RushChapterII';
    let accounts = undefined;
    let contract = undefined;

    mocha.beforeEach(async () => {
        const { abi, bytecode } = compile(contractName, {
            'RushChapterII.sol': {
                content: fs.readFileSync('./exercices/rush/sources/' + contractName + ".sol", "utf-8"),
            }
        });
        accounts = await web3.eth.getAccounts();
        contract = await new web3.eth.Contract(abi)
            .deploy({data: bytecode.object.toString()})
            .send({from: accounts[0], gas: 3000000});
    });

    mocha.it('has been deployed', () => {
        assert.ok(contract.options.address);
    });

    // TODO: Write tests
});
