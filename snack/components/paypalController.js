 
const db = require("../utils/mysql2-connect.js");
const fs = require("fs");
const path = require("path");

 import gateway from "../utils/paypayMoney.js"  
const braintree =require("braintree")
module.exports = { 


     async   paypalPayMoney(req, res) {
        
        var gateway = braintree.connect({
            environment:  braintree.Environment.Sandbox,
            merchantId:   'xdk66bxgj8w6cdbf',
            publicKey:    'crmczsjvcjpvqrxh',
            privateKey:   '4fa7abe423ebe01d1bd2c063fdec1afa'
        });
        
        gateway.transaction
            .sale({
                amount: "1.00",
                paymentMethodNonce: "nonce-from-the-client",
                options: {
                submitForSettlement: true,
                },
            })
            .then(function (result) {
                gateway.testing.settlementDecline(result.transaction.id, (err, result) => { 
                    if (result.success) { 
                        res.send("Transaction ID: " + result.transaction.id)
                    } else {
                        console.error(result.message);
                        res.send("Transaction ID: " + result.message)
                
                    }
                });
    
  })
  .catch(function (err) {
    console.error(err);
  });
   
    },
     async  clientToken(req, res) {  
            gateway.clientToken.generate({}, (err, response) => {
              res.send({data:response.clientToken});
            }); 
   
    }
}
    