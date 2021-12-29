const router=require('express').Router();
const {order,capture}=require('../controllers/razor');

//Order
router.get('/order',order);

//Capture
router.post('/capture/:paymentId',capture);

module.exports=router;