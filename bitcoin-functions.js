// You must have node and npm downloaded on your computer

// Require bitcoinjs-lib
var bitcoin = require("bitcoinjs-lib");

// Make variable for keyPair
var keyPair = bitcoin.ECPair.makeRandom();

// Test by logging address to console and save to variable // A valid bitcoin address should be returned
console.log(keyPair.getAddress());
var address = keyPair.getAddress();

// Console Log Wallet Import Format / Private Key and save to variable (WIF)
console.log(keyPair.toWIF());
var pkey = keyPair.toWIF();

// Create a custom bitcoin address
var bitcoin = require("bitcoinjs-lib");
var hit = 0;      // When it hits the correct custom address
var tryN = 0;     // Number of tries
while(hit < 1)    // Test addresses
{
  var keyPair = bitcoin.ECPair.makeRandom();
  var address = keyPair.getAddress();
  var pkey = keyPair.toWIF();
  
  var custom = address.substring(0,3);    // First 3 characters will be custom
  console.log(tryN + " " + custom);
  if(custom == "1Di" || custom == "1D1"){
    console.log(address + " " + pkey);
    hit = 2     // So that the while loop stops
  }
  tryN++;
}
