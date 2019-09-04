export enum CoinType {
  nebulas = 2718,
  ethereum = 60,
  bitcoin = 0,
  bitcoincash = 145,
  callisto = 820,
  dash = 5,
  decred = 42,
  digibyte = 20,
  doge = 3,
  classic = 61,
  ellaism = 163,
  ethersocial = 31102,
  gochain = 6060,
  groestlcoin = 17,
  icon = 74,
  iost = 291,
  litecoin = 2,
  ontology = 1024,
  viacoin = 14,
  poa = 178,
  thundertoken = 1001,
  tomochain = 889,
  tron = 195,
  vechain = 818,
  wanchain = 5718350,
  xdai = 700,
  zcoin = 136,
  zcash = 133,
  binance = 714,
  ripple = 144,
  tezos = 1729,
  nimiq = 242,
  stellar = 148,
  aion = 425,
  cosmos = 118,
  neo = 888,
  kin = 2017,
  theta = 500,
  lux = 3003,
  qtum = 2301,
  bravocoin = 282,
  steem = 135,
  eos = 194,
  nano = 165,
  iotex = 304,
  zilliqa = 313,
  semux = 7562605,
  dexon = 237,
  zelcash = 19167,
  ark = 111,
  ravencoin = 175,
  waves = 5741564,
  aeternity = 457,
  terra = 330,
  monacoin = 22,
  fio = 235,
}

export class CoinTypeUtils {
  static id(coin: CoinType): string {
    switch (coin) {
      case CoinType.nebulas:
        return 'nebulas';
      case CoinType.ethereum:
        return 'ethereum';
      case CoinType.bitcoin:
        return 'bitcoin';
      case CoinType.bitcoincash:
        return 'bitcoincash';
      case CoinType.callisto:
        return 'callisto';
      case CoinType.dash:
        return 'dash';
      case CoinType.decred:
        return 'decred';
      case CoinType.digibyte:
        return 'digibyte';
      case CoinType.doge:
        return 'doge';
      case CoinType.classic:
        return 'classic';
      case CoinType.ellaism:
        return 'ellaism';
      case CoinType.ethersocial:
        return 'ethersocial';
      case CoinType.gochain:
        return 'gochain';
      case CoinType.groestlcoin:
        return 'groestlcoin';
      case CoinType.icon:
        return 'icon';
      case CoinType.iost:
        return 'iost';
      case CoinType.litecoin:
        return 'litecoin';
      case CoinType.ontology:
        return 'ontology';
      case CoinType.viacoin:
        return 'viacoin';
      case CoinType.poa:
        return 'poa';
      case CoinType.thundertoken:
        return 'thundertoken';
      case CoinType.tomochain:
        return 'tomochain';
      case CoinType.tron:
        return 'tron';
      case CoinType.vechain:
        return 'vechain';
      case CoinType.wanchain:
        return 'wanchain';
      case CoinType.xdai:
        return 'xdai';
      case CoinType.zcoin:
        return 'zcoin';
      case CoinType.zcash:
        return 'zcash';
      case CoinType.binance:
        return 'binance';
      case CoinType.ripple:
        return 'ripple';
      case CoinType.tezos:
        return 'tezos';
      case CoinType.nimiq:
        return 'nimiq';
      case CoinType.stellar:
        return 'stellar';
      case CoinType.aion:
        return 'aion';
      case CoinType.cosmos:
        return 'cosmos';
      case CoinType.neo:
        return 'neo';
      case CoinType.kin:
        return 'kin';
      case CoinType.theta:
        return 'theta';
      case CoinType.lux:
        return 'lux';
      case CoinType.qtum:
        return 'qtum';
      case CoinType.bravocoin:
        return 'bravocoin';
      case CoinType.steem:
        return 'steem';
      case CoinType.eos:
        return 'eos';
      case CoinType.nano:
        return 'nano';
      case CoinType.iotex:
        return 'iotex';
      case CoinType.zilliqa:
        return 'zilliqa';
      case CoinType.semux:
        return 'semux';
      case CoinType.dexon:
        return 'dexon';
      case CoinType.zelcash:
        return 'zelcash';
      case CoinType.ark:
        return 'ark';
      case CoinType.ravencoin:
        return 'ravencoin';
      case CoinType.waves:
        return 'waves';
      case CoinType.aeternity:
        return 'aeternity';
      case CoinType.terra:
        return 'terra';
      case CoinType.monacoin:
        return 'monacoin';
      case CoinType.fio:
        return 'fio';
    }
  }
  static decimals(coin: CoinType): number {
    switch (coin) {
      case CoinType.nebulas:
        return 18;
      case CoinType.ethereum:
        return 18;
      case CoinType.bitcoin:
        return 8;
      case CoinType.bitcoincash:
        return 8;
      case CoinType.callisto:
        return 18;
      case CoinType.dash:
        return 8;
      case CoinType.decred:
        return 8;
      case CoinType.digibyte:
        return 8;
      case CoinType.doge:
        return 8;
      case CoinType.classic:
        return 18;
      case CoinType.ellaism:
        return 18;
      case CoinType.ethersocial:
        return 18;
      case CoinType.gochain:
        return 18;
      case CoinType.groestlcoin:
        return 8;
      case CoinType.icon:
        return 18;
      case CoinType.iost:
        return 8;
      case CoinType.litecoin:
        return 8;
      case CoinType.ontology:
        return 0;
      case CoinType.viacoin:
        return 8;
      case CoinType.poa:
        return 18;
      case CoinType.thundertoken:
        return 18;
      case CoinType.tomochain:
        return 18;
      case CoinType.tron:
        return 6;
      case CoinType.vechain:
        return 18;
      case CoinType.wanchain:
        return 18;
      case CoinType.xdai:
        return 18;
      case CoinType.zcoin:
        return 8;
      case CoinType.zcash:
        return 8;
      case CoinType.binance:
        return 8;
      case CoinType.ripple:
        return 6;
      case CoinType.tezos:
        return 6;
      case CoinType.nimiq:
        return 5;
      case CoinType.stellar:
        return 7;
      case CoinType.aion:
        return 18;
      case CoinType.cosmos:
        return 6;
      case CoinType.neo:
        return 8;
      case CoinType.kin:
        return 5;
      case CoinType.theta:
        return 18;
      case CoinType.lux:
        return 8;
      case CoinType.qtum:
        return 8;
      case CoinType.bravocoin:
        return 3;
      case CoinType.steem:
        return 3;
      case CoinType.eos:
        return 4;
      case CoinType.nano:
        return 30;
      case CoinType.iotex:
        return 18;
      case CoinType.zilliqa:
        return 12;
      case CoinType.semux:
        return 9;
      case CoinType.dexon:
        return 18;
      case CoinType.zelcash:
        return 8;
      case CoinType.ark:
        return 8;
      case CoinType.ravencoin:
        return 8;
      case CoinType.waves:
        return 8;
      case CoinType.aeternity:
        return 18;
      case CoinType.terra:
        return 6;
      case CoinType.monacoin:
        return 8;
      case CoinType.fio:
        return 9;
    }
  }
  static networkName(coin: CoinType): string {
    switch (coin) {
      case CoinType.nebulas:
        return 'Nebulas';
      case CoinType.ethereum:
        return 'Ethereum';
      case CoinType.bitcoin:
        return 'Bitcoin';
      case CoinType.bitcoincash:
        return 'Bitcoin Cash';
      case CoinType.callisto:
        return 'Callisto';
      case CoinType.dash:
        return 'Dash';
      case CoinType.decred:
        return 'Decred';
      case CoinType.digibyte:
        return 'DigiByte';
      case CoinType.doge:
        return 'Dogecoin';
      case CoinType.classic:
        return 'Ethereum Classic';
      case CoinType.ellaism:
        return 'Ellaism';
      case CoinType.ethersocial:
        return 'Ethersocial';
      case CoinType.gochain:
        return 'GoChain';
      case CoinType.groestlcoin:
        return 'Groestlcoin';
      case CoinType.icon:
        return 'ICON';
      case CoinType.iost:
        return 'IOST';
      case CoinType.litecoin:
        return 'Litecoin';
      case CoinType.ontology:
        return 'Ontology';
      case CoinType.viacoin:
        return 'Viacoin';
      case CoinType.poa:
        return 'POA Network';
      case CoinType.thundertoken:
        return 'Thunder Token';
      case CoinType.tomochain:
        return 'TomoChain';
      case CoinType.tron:
        return 'Tron';
      case CoinType.vechain:
        return 'VeChain';
      case CoinType.wanchain:
        return 'Wanchain';
      case CoinType.xdai:
        return 'xDai';
      case CoinType.zcoin:
        return 'Zcoin';
      case CoinType.zcash:
        return 'Zcash';
      case CoinType.binance:
        return 'Binance';
      case CoinType.ripple:
        return 'XRP';
      case CoinType.tezos:
        return 'Tezos';
      case CoinType.nimiq:
        return 'Nimiq';
      case CoinType.stellar:
        return 'Stellar';
      case CoinType.aion:
        return 'Aion';
      case CoinType.cosmos:
        return 'Cosmos';
      case CoinType.neo:
        return 'NEO';
      case CoinType.kin:
        return 'Kin';
      case CoinType.theta:
        return 'Theta';
      case CoinType.lux:
        return 'Lux';
      case CoinType.qtum:
        return 'Qtum';
      case CoinType.bravocoin:
        return 'BravoCoin';
      case CoinType.steem:
        return 'Steem';
      case CoinType.eos:
        return 'EOS';
      case CoinType.nano:
        return 'Nano';
      case CoinType.iotex:
        return 'IoTeX';
      case CoinType.zilliqa:
        return 'Zilliqa';
      case CoinType.semux:
        return 'Semux';
      case CoinType.dexon:
        return 'DEXON';
      case CoinType.zelcash:
        return 'Zelcash';
      case CoinType.ark:
        return 'ARK';
      case CoinType.ravencoin:
        return 'Ravencoin';
      case CoinType.waves:
        return 'Waves';
      case CoinType.aeternity:
        return 'Aeternity';
      case CoinType.terra:
        return 'Terra';
      case CoinType.monacoin:
        return 'Monacoin';
      case CoinType.fio:
        return 'FIO';
    }
  }
  static blockchain(coin: CoinType): string {
    switch (coin) {
      case CoinType.nebulas:
        return 'Nebulas';
      case CoinType.ethereum:
        return 'Ethereum';
      case CoinType.bitcoin:
        return 'Bitcoin';
      case CoinType.bitcoincash:
        return 'Bitcoin';
      case CoinType.callisto:
        return 'Ethereum';
      case CoinType.dash:
        return 'Bitcoin';
      case CoinType.decred:
        return 'Bitcoin';
      case CoinType.digibyte:
        return 'Bitcoin';
      case CoinType.doge:
        return 'Bitcoin';
      case CoinType.classic:
        return 'Ethereum';
      case CoinType.ellaism:
        return 'Ethereum';
      case CoinType.ethersocial:
        return 'Ethereum';
      case CoinType.gochain:
        return 'Ethereum';
      case CoinType.groestlcoin:
        return 'Bitcoin';
      case CoinType.icon:
        return 'Icon';
      case CoinType.iost:
        return 'IOST';
      case CoinType.litecoin:
        return 'Bitcoin';
      case CoinType.ontology:
        return 'Ontology';
      case CoinType.viacoin:
        return 'Bitcoin';
      case CoinType.poa:
        return 'Ethereum';
      case CoinType.thundertoken:
        return 'Ethereum';
      case CoinType.tomochain:
        return 'Ethereum';
      case CoinType.tron:
        return 'Tron';
      case CoinType.vechain:
        return 'Vechain';
      case CoinType.wanchain:
        return 'Wanchain';
      case CoinType.xdai:
        return 'Ethereum';
      case CoinType.zcoin:
        return 'Bitcoin';
      case CoinType.zcash:
        return 'Bitcoin';
      case CoinType.binance:
        return 'Binance';
      case CoinType.ripple:
        return 'Ripple';
      case CoinType.tezos:
        return 'Tezos';
      case CoinType.nimiq:
        return 'Nimiq';
      case CoinType.stellar:
        return 'Stellar';
      case CoinType.aion:
        return 'Aion';
      case CoinType.cosmos:
        return 'Cosmos';
      case CoinType.neo:
        return 'NEO';
      case CoinType.kin:
        return 'Stellar';
      case CoinType.theta:
        return 'Theta';
      case CoinType.lux:
        return 'Bitcoin';
      case CoinType.qtum:
        return 'Bitcoin';
      case CoinType.bravocoin:
        return 'EOS';
      case CoinType.steem:
        return 'Steem';
      case CoinType.eos:
        return 'EOS';
      case CoinType.nano:
        return 'Nano';
      case CoinType.iotex:
        return 'IoTeX';
      case CoinType.zilliqa:
        return 'Zilliqa';
      case CoinType.semux:
        return 'Semux';
      case CoinType.dexon:
        return 'Ethereum';
      case CoinType.zelcash:
        return 'Bitcoin';
      case CoinType.ark:
        return 'Ark';
      case CoinType.ravencoin:
        return 'Bitcoin';
      case CoinType.waves:
        return 'Waves';
      case CoinType.aeternity:
        return 'Aeternity';
      case CoinType.terra:
        return 'Cosmos';
      case CoinType.monacoin:
        return 'Bitcoin';
      case CoinType.fio:
        return 'FIO';
    }
  }
  static derivationPath(coin: CoinType): string {
    switch (coin) {
      case CoinType.nebulas:
        return "m/44'/2718'/0'/0/0";
      case CoinType.ethereum:
        return "m/44'/60'/0'/0/0";
      case CoinType.bitcoin:
        return "m/84'/0'/0'/0/0";
      case CoinType.bitcoincash:
        return "m/44'/145'/0'/0/0";
      case CoinType.callisto:
        return "m/44'/820'/0'/0/0";
      case CoinType.dash:
        return "m/44'/5'/0'/0/0";
      case CoinType.decred:
        return "m/44'/42'/0'/0/0";
      case CoinType.digibyte:
        return "m/84'/20'/0'/0/0";
      case CoinType.doge:
        return "m/44'/3'/0'/0/0";
      case CoinType.classic:
        return "m/44'/61'/0'/0/0";
      case CoinType.ellaism:
        return "m/44'/163'/0'/0/0";
      case CoinType.ethersocial:
        return "m/44'/31102'/0'/0/0";
      case CoinType.gochain:
        return "m/44'/6060'/0'/0/0";
      case CoinType.groestlcoin:
        return "m/84'/17'/0'/0/0";
      case CoinType.icon:
        return "m/44'/74'/0'/0/0";
      case CoinType.iost:
        return "m/44'/291'/0'/0'/0'";
      case CoinType.litecoin:
        return "m/84'/2'/0'/0/0";
      case CoinType.ontology:
        return "m/44'/1024'/0'/0/0";
      case CoinType.viacoin:
        return "m/84'/14'/0'/0/0";
      case CoinType.poa:
        return "m/44'/178'/0'/0/0";
      case CoinType.thundertoken:
        return "m/44'/1001'/0'/0/0";
      case CoinType.tomochain:
        return "m/44'/889'/0'/0/0";
      case CoinType.tron:
        return "m/44'/195'/0'/0/0";
      case CoinType.vechain:
        return "m/44'/818'/0'/0/0";
      case CoinType.wanchain:
        return "m/44'/5718350'/0'/0/0";
      case CoinType.xdai:
        return "m/44'/700'/0'/0/0";
      case CoinType.zcoin:
        return "m/44'/136'/0'/0/0";
      case CoinType.zcash:
        return "m/44'/133'/0'/0/0";
      case CoinType.binance:
        return "m/44'/714'/0'/0/0";
      case CoinType.ripple:
        return "m/44'/144'/0'/0/0";
      case CoinType.tezos:
        return "m/44'/1729'/0'/0'";
      case CoinType.nimiq:
        return "m/44'/242'/0'/0'";
      case CoinType.stellar:
        return "m/44'/148'/0'";
      case CoinType.aion:
        return "m/44'/425'/0'/0'/0'";
      case CoinType.cosmos:
        return "m/44'/118'/0'/0/0";
      case CoinType.neo:
        return "m/44'/888'/0'/0'/0'";
      case CoinType.kin:
        return "m/44'/2017'/0'";
      case CoinType.theta:
        return "m/44'/500'/0'/0/0";
      case CoinType.lux:
        return "m/44'/3003'/0'/0/0";
      case CoinType.qtum:
        return "m/44'/2301'/0'/0/0";
      case CoinType.bravocoin:
        return "m/44'/282'/0'/0/0";
      case CoinType.steem:
        return "m/44'/135'/0'/0/0";
      case CoinType.eos:
        return "m/44'/194'/0'/0/0";
      case CoinType.nano:
        return "m/44'/165'/0'";
      case CoinType.iotex:
        return "m/44'/304'/0'/0/0";
      case CoinType.zilliqa:
        return "m/44'/313'/0'/0/0";
      case CoinType.semux:
        return "m/44'/7562605'/0'/0'/0'";
      case CoinType.dexon:
        return "m/44'/237'/0'/0/0";
      case CoinType.zelcash:
        return "m/44'/19167'/0'/0/0";
      case CoinType.ark:
        return "m/44'/111'/0'/0/0";
      case CoinType.ravencoin:
        return "m/44'/175'/0'/0/0";
      case CoinType.waves:
        return "m/44'/5741564'/0'/0'/0'";
      case CoinType.aeternity:
        return "m/44'/457'/0'/0'/0'";
      case CoinType.terra:
        return "m/44'/330'/0'/0/0";
      case CoinType.monacoin:
        return "m/44'/22'/0'/0/0";
      case CoinType.fio:
        return "m/44'/235'/0'/0/0";
    }
  }
  static symbol(coin: CoinType): string {
    switch (coin) {
      case CoinType.nebulas:
        return 'NAS';
      case CoinType.ethereum:
        return 'ETH';
      case CoinType.bitcoin:
        return 'BTC';
      case CoinType.bitcoincash:
        return 'BCH';
      case CoinType.callisto:
        return 'CLO';
      case CoinType.dash:
        return 'DASH';
      case CoinType.decred:
        return 'DCR';
      case CoinType.digibyte:
        return 'DGB';
      case CoinType.doge:
        return 'DOGE';
      case CoinType.classic:
        return 'ETC';
      case CoinType.ellaism:
        return 'ELLA';
      case CoinType.ethersocial:
        return 'ESN';
      case CoinType.gochain:
        return 'GO';
      case CoinType.groestlcoin:
        return 'GRS';
      case CoinType.icon:
        return 'ICX';
      case CoinType.iost:
        return 'IOST';
      case CoinType.litecoin:
        return 'LTC';
      case CoinType.ontology:
        return 'ONT';
      case CoinType.viacoin:
        return 'VIA';
      case CoinType.poa:
        return 'POA';
      case CoinType.thundertoken:
        return 'TT';
      case CoinType.tomochain:
        return 'TOMO';
      case CoinType.tron:
        return 'TRX';
      case CoinType.vechain:
        return 'VET';
      case CoinType.wanchain:
        return 'WAN';
      case CoinType.xdai:
        return 'xDAI';
      case CoinType.zcoin:
        return 'XZC';
      case CoinType.zcash:
        return 'ZEC';
      case CoinType.binance:
        return 'BNB';
      case CoinType.ripple:
        return 'XRP';
      case CoinType.tezos:
        return 'XTZ';
      case CoinType.nimiq:
        return 'NIM';
      case CoinType.stellar:
        return 'XLM';
      case CoinType.aion:
        return 'AION';
      case CoinType.cosmos:
        return 'ATOM';
      case CoinType.neo:
        return 'NEO';
      case CoinType.kin:
        return 'KIN';
      case CoinType.theta:
        return 'THETA';
      case CoinType.lux:
        return 'LUX';
      case CoinType.qtum:
        return 'QTUM';
      case CoinType.bravocoin:
        return 'BRAVO';
      case CoinType.steem:
        return 'STEEM';
      case CoinType.eos:
        return 'EOS';
      case CoinType.nano:
        return 'NANO';
      case CoinType.iotex:
        return 'IOTX';
      case CoinType.zilliqa:
        return 'ZIL';
      case CoinType.semux:
        return 'SEM';
      case CoinType.dexon:
        return 'DXN';
      case CoinType.zelcash:
        return 'ZEL';
      case CoinType.ark:
        return 'ARK';
      case CoinType.ravencoin:
        return 'RVN';
      case CoinType.waves:
        return 'WAVES';
      case CoinType.aeternity:
        return 'AE';
      case CoinType.terra:
        return 'LUNA';
      case CoinType.monacoin:
        return 'MONA';
      case CoinType.fio:
        return 'FIO';
    }
  }
}
