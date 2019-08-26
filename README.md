# web-core

[![Build Status](https://dev.azure.com/TrustWallet/Web%20Core/_apis/build/status/Web%20Core-CI?branchName=master)](https://dev.azure.com/TrustWallet/Web%20Core/_build/latest?definitionId=37&branchName=master)

This repository is a monorepo including the [`trust wallet`](https://trustwallet.com) developers components and tools. 
Each public sub-package is independently published to NPM.

#### Typescript/JavaScript Packages

| Package                                                             | Version                                                                                                                                     | Description                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@trustwallet/walletconnect`](/packages/walletconnect)             | [![npm version](https://badge.fury.io/js/%40trustwallet%2Fwalletconnect.svg)](https://badge.fury.io/js/%40trustwallet%2Fwalletconnect)      | Trust Wallet extension for WalletConnect with aditional methods to support multi-chain dApps.      
| [`@trustwallet/ui`](/packages/ui)                                   | [![npm version](https://badge.fury.io/js/%40trustwallet%2Fui.svg)](https://badge.fury.io/js/%40trustwallet%2Fui)                            | UI components and assets.
| [`@trustwallet/eslint-config`](/packages/eslint-config)             | [![npm version](https://badge.fury.io/js/%40trustwallet%2Feslint-config.svg)](https://badge.fury.io/js/%40trustwallet%2Feslint-config)      | ESLint configuration for all packages in the monorepo
| [`@trustwallet/provider`](/packages/provider)                       | [![npm version](https://badge.fury.io/js/%40trustwallet%2Fprovider.svg)](https://badge.fury.io/js/%40trustwallet%2Fprovider)                | Trust Provider wrapper
| [`@trustwallet/rpc`](/packages/rpc)                                 | [![npm version](https://badge.fury.io/js/%40trustwallet%2Frpc.svg)](https://badge.fury.io/js/%40trustwallet%2Frpc)                          | Trust RPC clients
| [`@trustwallet/types`](/packages/types)                             | [![npm version](https://badge.fury.io/js/%40trustwallet%2Ftypes.svg)](https://badge.fury.io/js/%40trustwallet%2Ftypes)                      | Typescript types used throughout the monorepo
