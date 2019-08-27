#! /usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const rp = require('request-promise');
const jsonUrl = 'https://raw.githubusercontent.com/trustwallet/wallet-core/master/coins.json';

const main = async () => {
    const coins = JSON.parse(await rp(jsonUrl));
    await generateCoinType(coins);
};

const generateCoinType = async (coins) => {
    const coinTypeEnum = buildCoinTypeEnum(coins);
    const coinTypeNamespace = buildNamespace(() =>
        buildFunction(coins, 'decimals', (coin) => `return ${coin.decimals};`)
        + buildFunction(coins, 'name', (coin) => `return "${coin.name}";`)
        + buildFunction(coins, 'blockchain', (coin) => `return "${coin.blockchain}";`)
        + buildFunction(coins, 'derivationPath', (coin) => `return "${coin.derivationPath}";`)
        + buildFunction(coins, 'symbol', (coin) => `return "${coin.symbol}";`)
    );
    const data = coinTypeEnum + coinTypeNamespace;
    await fs.writeFile(path.resolve(__dirname, '../src/CoinType.ts'), data);
};

const buildCoinTypeEnum = (coins) => {
    var output = 'export enum CoinType {\n';
    output += coins
        .map(coin => {
            const code = (/m\/\d{2}'\/(\d+)/).exec(coin.derivationPath)[1];
            return `  ${coin.id} = ${code},\n`;
        })
        .reduce((acc, line) => acc + line, '');
    output += '}\n';
    return output;
};

const buildNamespace = (fn) => {
    var output = 'export namespace CoinType {\n';
    output += fn();
    output += '}\n';
    return output;
};

const buildFunction = (coins, fnName, fn) => {
    var output = `  export function ${fnName}(coin: CoinType) {\n`;
    output += '    switch (coin) {\n';
    output += coins
        .map((coin) => `      case CoinType.${coin.id}: ${fn(coin)}`)
        .reduce((acc, line) => acc + line + '\n', '');
    output += '    }\n';
    output += '  }\n';
    return output;
};

main();
