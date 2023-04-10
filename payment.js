const express = require('express');
const Router = express.Router();
const url ='https://api.tap.company/v2/'
const paymentTries = require('./paymentTries.js');


const {createElement} = require('./mongoose.js');
var axios = require('axios');

// const test= {name:'ali',pass:'aaa'}
// const jsonTest = JSON.stringify(test)
// console.log(JSON.parse(jsonTest))

Router.post('/payment/create',(req,res)=>{
  const userData = req.body;
  console.log(req.body)
  // const userData = JSON.parse(jsonData)
  const Data ={ 
    "amount": userData.amount,
    "currency": userData.currency,
    "threeDSecure": true,
    "save_card": false,
    "description": "Test Description",
    "statement_descriptor": "Sample",
    "metadata": {
      "udf1": "test 1",
      "udf2": "test 2"
    },
    "reference": {
      "transaction": "txn_0001",
      "order": "ord_0001"
    },
    "receipt": {
      "email": true,
      "sms": true
    },
    "customer": {
      "first_name": userData.name,
      "middle_name": "test",
      "last_name": "test",
      "email": userData.email,
      "phone": {
        "country_code": "965",
        "number": "50000000"
      }
    },
    "merchant": {
      "id": ""
    },
    "source": {
      "id": "src_all"
    },
    "post": {
      "url": "https://test.ag-platform.com/api/payment/result"
    },
    "redirect": {
      "url": "https://test.ag-platform.com"
    }
  }

  // console.log(Data)
  var stringData = JSON.stringify(Data);
   
  axios({
    method: 'post',
    url: 'https://api.tap.company/v2/charges',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer sk_test_KbRv4hBUPuGjFa8kZDCy1YdL'
    },
    data : stringData
  })
    .then(function (data) {
      res.send(JSON.stringify(data.data));
    })
    .catch(function (error) {
      console.log(error);
      res.send(error)
    });
})

Router.post("/payment/result",(req,res)=>{
  const data = req.body;
  createElement({res:data},paymentTries);
  res.send('success-recived')
  console.log('hi')
})
module.exports = Router;
// {"_id":{"$oid":"63cf5e783d7e1fafb6f3327d"},"res":
// {
//   "id":"chg_TS02A4420230727q1H12401037","object":"charge","live_mode":false,"api_version":"V2","method":"POST","status":"DECLINED","amount":{"$numberInt":"299"},"currency":"SAR","threeDSecure":true,"card_threeDSecure":false,"save_card":false,"merchant_id":"","product":"","statement_descriptor":"Sample","description":"Test Description","metadata":{"udf1":"test 1","udf2":"test 2"},"transaction":{"timezone":"UTC+03:00","created":"1674545309654","expiry":{"period":{"$numberInt":"30"},"type":"MINUTE"},"asynchronous":false,"amount":{"$numberInt":"299"},"currency":"SAR"},"reference":{"track":"tck_TS04A4420230727Dg712401084","payment":"4424230727010840339","gateway":"123456789012345","acquirer":"302404113386","transaction":"txn_0001","order":"ord_0001"},"response":{"code":"507","message":"Declined, Card Issuer"},"security":{"threeDSecure":{"id":"3ds_TS07A2920230728n1YH2401654","status":"Y"}},"acquirer":{"response":{"code":"15","message":"No Such Issuer"}},"gateway":{"response":{"code":"8","message":"Transaction declined by issuer"}},"card":{"object":"card","first_six":"450875","scheme":"VISA","brand":"VISA","last_four":"1019"},"receipt":{"id":"204424230727015215","email":true,"sms":true},"customer":{"first_name":"student","last_name":"test","email":"student@gmail.com","phone":{"country_code":"965","number":"50000000"}},"merchant":{"country":"BH","currency":"BHD","id":"11197415"},"source":{"object":"token","type":"CARD_NOT_PRESENT","payment_type":"DEBIT","payment_method":"VISA","channel":"INTERNET","id":"tok_ue052323428ZkPN24HA0l236"},"redirect":{"status":"PENDING","url":"https://test.ag-platform.com"},"post":{"attempt":{"$numberInt":"1"},"status":"PENDING","url":"https://test.ag-platform.com/api/payment/result"},"activities":[{"id":"activity_TS02A3020230728Mj9b2401295","object":"activity","created":{"$numberDouble":"1.6745453096540E+12"},"status":"INITIATED","currency":"SAR","amount":{"$numberInt":"299"},"remarks":"charge - created"},{"id":"activity_TS01A4520230728Hj4x2401622","object":"activity","created":{"$numberDouble":"1.6745453256220E+12"},"status":"DECLINED","currency":"SAR","amount":{"$numberInt":"299"},"remarks":"charge - declined"}],"auto_reversed":false},"__v":{"$numberInt":"0"}}
