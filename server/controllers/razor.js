const Razorpay=require('razorpay');
const request = require('request');
const {nanoid}=require('nanoid');

const razorInstance = new Razorpay({
    key_id : process.env.KEY_ID,
    key_secret : process.env.KEY_SECRET
  })

//Order
exports.order=async(req,res)=>{
    try {
        const options ={
            amount : 10*100,
            currency : "INR",
            receipt: nanoid(),
            payment_capture: 0, //1
      
          };
          razorInstance.orders.create(options,async function(err,order){
            if(err){
             res.status(500).json({
                message: "Something error!s"
              })
            }
            else res.status(200).json(order);
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//Capture
exports.capture=async(req,res)=>{
    try {
        return request(
            {
              method : "POST",
              url : `https://${process.env.KEY_ID}:${process.env.KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
              form:{
                amount : 10 *100,
                currency: "INR"
              },
            },
            async function(err,response,body){
              if(err){
                res.status(500).json({
                  message: "Something error!s"
                })
              }
              else res.status(200).json(body)
            }
          )
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}