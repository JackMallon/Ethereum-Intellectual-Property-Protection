//Import
var bitcoin = require("bitcoinjs-lib");

console.log("Sending...");

//Transaction builder
var txb = new bitcoin.TransactionBuilder();

//Last transaction hash
txb.addInput(
  "3d80cd75be2ec572ad3128b4963c9ab5757e30a031926671f66ed1d5bbb0f5c6",
  6
);

//How much to send
txb.addOutput("1Di3SfHdjWJ75SywA5wtsNijDc8kRLgq8Y", 229178);

//Change address
//txb.addOutput("1D1wodZWwpYU3nEtjhSgiWV9tRDcyJrLw3", 398130);

//Private key and generate pair
var yourAddressPrivateKeyWIF =
  "Kz2yhocSyxL4zUpnVySZrH4V7LhC9uoFptegHqb8pwZyqideAZ1F";
var yourAddresskeyPair = bitcoin.ECPair.fromWIF(yourAddressPrivateKeyWIF);
txb.sign(0, yourAddresskeyPair);

//Build transaction and send
txb.build().toHex();

console.log("Completed");
/*var bitcoin = require("bitcoinjs-lib");

//My private key
var key = bitcoin.ECKey.fromWIF(
  "Kz2yhocSyxL4zUpnVySZrH4V7LhC9uoFptegHqb8pwZyqideAZ1F"
);

var tx = new bitcoin.TransactionBuilder();

//Add the txId and index
tx.addInput(
  "3d80cd75be2ec572ad3128b4963c9ab5757e30a031926671f66ed1d5bbb0f5c6",
  6
);

//
tx.addOutput("12idKQBikRgRuZEbtxXQ4WFYB7Wa3hZzhT", 249000);
tx.sign(0, key);
console.log(tx.build().toHex());
*/
