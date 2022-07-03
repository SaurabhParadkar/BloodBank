const express = require('express')
const router = express.Router()

const userModel = require('../models/UserModel')

router.post("/usersave",(request,response)=>
{
    console.log(request.body);
    userModel.saveUser(request.body,(result)=>
    {
        response.redirect('/web/register?reg='+result)
    })
});

router.get("/home",(request,response)=>
{
    response.render('index')
})

router.get("/contact",(request,response)=>
{
    response.render('contact')
})

router.get("/register",(request,response)=>
{
    var msg = "";
    if(request.query.reg!=undefined)
    {
        if(request.query.reg=='true')
            msg = "Registeration Done !"
        else
            msg = "Registeration Failed !"            
    }
    response.render('register',{
        msg : msg
    })
})

router.all("/login",(request,response)=>
{
    if(request.method=="GET")
    {
        var msg = "";
        if(request.query.err!=undefined)
        {            
            msg = "Invalid Id or Password !"            
        }
        response.render('login',{msg:msg})
    }else
    {
        userModel.loginUser(request.body,(user)=>
        {
            if(user)
            {
                //console.log(user)
                request.session.user = user;
                response.redirect('/user/home')
            }else
               response.redirect('/web/login?err=1')
        })
    }    
})




module.exports = router