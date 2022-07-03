const express = require('express')
const router = express.Router()

const userModel = require('../models/UserModel')
const requestModel = require('../models/RequestModel')

router.post('/saverequest',(request,response)=>
{
    var data = request.body
    data.date = new Date().toDateString();
    data.senduser = request.session.user._id

    requestModel.saveRequest(data,(result)=>
    {
        response.redirect('/user/request')
    })
})

router.get('/request',(request,response)=>
{
    requestModel.listByUser(request.session.user._id,(result)=>
    {
        response.render('request',{
            list : result
        })
    })    
})

router.get('/home',(request,response)=>
{
    console.log(">>> ",request.session.user)
    var name = request.session.user.name;
    var id = request.session.user._id
    
    console.log(id)
    userModel.listUser(id,(records)=>
    {
        requestModel.listOtherUser(request.session.user._id,(result)=>
        {
            response.render('userhome',{
                name:name,
                users:records,
                list:result
            });
        })           
    })    
})

router.get('/logout',(request,response)=>
{
    request.session.destroy();
    response.redirect("/web/login")
});

module.exports = router