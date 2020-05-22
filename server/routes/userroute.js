const express=require('express');
const router=express.Router();

const userController=require('../controller/usercontroller');

router.post('/',userController.login)

router.get('/get',userController.get)



module.exports=router;