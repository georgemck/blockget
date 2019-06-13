"use strict";
exports.__esModule = true;
require("reflect-metadata");
var WebSocket = require("isomorphic-ws");
var Credentials_1 = require("dist/crypto/Credentials");
var DCoreSdk_1 = require("dist/DCoreSdk");
var AssetAmount_1 = require("dist/models/AssetAmount");
var ChainObject_1 = require("dist/models/ChainObject");
// import { create } from "rxjs-spy";
// init rxjs-spy and log all tags
// const spy = create();
// spy.log();
// create api for websocket
var api = DCoreSdk_1.DCoreSdk.createForWebSocket(function () { return new WebSocket("wss://testnet-api.dcore.io/"); });
// create account credentials
var credentials = new Credentials_1.Credentials(ChainObject_1.ChainObject.parse("1.2.27"), "5Hxwqx6JJUBYWjQNt8DomTNJ6r6YK8wDJym4CMAH1zGctFyQtzt");
// send 1DCT to account id '1.2.28 (public-account-10)' with encrypted 'hello memo' memo
var disposable = api.accountApi.transfer(credentials, "public-account-10", new AssetAmount_1.AssetAmount(100000000), "hello memo")
    .subscribe(function (confirmation) { return console.log(confirmation.id); });
