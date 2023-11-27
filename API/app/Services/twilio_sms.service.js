require("dotenv").config();
const twilio = require("twilio");
console.log(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)
const client = twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN
);
// TWILIO_ACCOUNT_SID='AC81be3c06511493241dc8301020540f2d'

// TWILIO_AUTH_TOKEN='045630b213d8ef06cfdb55624b2a82c7'
// TO_PHONE_NUMBER='+918519899222'
// TWILIO_PHONE_NUMBER='6281208432'
console.log(process.env.TO_PHONE_NUMBER)
function sendSMS(from, to, body) {
    client.messages
      .create({
          from:from,
      to:"+918519899222", //this must be a verified phone number for twilio trial accounts
      body:'Please user this OPT to verify your number 74536',
        })
      .then((message) => {
        console.log(
          `SMS message sent from ${from} to ${to}. Message SID: ${message.sid}`
        );
      })
    .catch((error) => {
      console.error(error);
    });
}

sendSMS(
  process.env.TWILIO_PHONE_NUMBER,
  process.env.TO_PHONE_NUMBER,
  "This is an SMS notification!"
);

module.exports=sendSMS;