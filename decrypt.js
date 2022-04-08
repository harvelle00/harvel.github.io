const express = require("express");
const app = express();
const CryptoJS = require("crypto-js");
const bodyParser = require('body-parser');
const { default: Axios } = require("axios");
const axios = require('axios');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/', urlencodedParser, function(req,res) {
    let client_secret = 'XXXX';
    let data = req.body.data;


let encryption_key = CryptoJS.enc.Utf8.parse(client_secret.substr(0, 16));
let base64_original = data.replace(/-/g, '+').replace(/_/g, '/');
let buff = Buffer.from(base64_original, 'base64');
let iv = buff.slice(0, 16);
let payload = buff.slice(16);

let decryptedData = CryptoJS.AES.decrypt(payload.toString('base64'), encryption_key,
{ iv: CryptoJS.enc.Hex.parse(iv.toString('hex')) });

let json = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

res.send(json);
console.log(json);


/*
axios.put("https://app.ecwid.com/api/v3/111111111/orders/" + json.cart.order.referenceTransactionId + "?token=secret_XXXXXXX", {
    "paymentStatus": "PAID"
})
.then((result) => {
    console.log(result);
})
*/
    



});

app.listen(80, function () {
    console.log('App is listening on port 80');
  });
