#! /usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const rp = require('request-promise');
const ejs = require('ejs');
const prettier = require("prettier");
const jsonUrl = 'https://raw.githubusercontent.com/trustwallet/wallet-core/master/coins.json';

const main = async () => {
    const coins = JSON.parse(await rp(jsonUrl));
    coins.forEach(coin => {
        // Extract code from derivation path
        coin.code = (/m\/\d{2}'\/(\d+)/).exec(coin.derivationPath)[1];
    });

    await generateCoinType(coins);
};

const generateCoinType = async (coins) => {
    const methods = [
        {
            name: 'id',
            returnType: 'string',
            body: (coin) => `return '${coin.id}'`
        },
        {
            name: 'decimals',
            returnType: 'number',
            body: (coin) => `return ${coin.decimals}`
        },
        {
            name: 'networkName',
            returnType: 'string',
            body: (coin) => `return '${coin.name}'`
        },
        {
            name: 'blockchain',
            returnType: 'string',
            body: (coin) => `return '${coin.blockchain}'`
        },
        {
            name: 'derivationPath',
            returnType: 'string',
            body: (coin) => `return "${coin.derivationPath}"`
        },
        {
            name: 'symbol',
            returnType: 'string',
            body: (coin) => `return '${coin.symbol}'`
        }
    ];

    const template = await fs.readFile(path.resolve(__dirname, 'CoinType.ejs'), 'utf8');
    let data = await ejs.render(template, { coins, methods });
    data = await prettier.format(data, { parser: 'typescript', singleQuote: true, trailingComma: 'es5' });
    await fs.writeFile(path.resolve(__dirname, '../src/CoinType.ts'), data);
};

main();
