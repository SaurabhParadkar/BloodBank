const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const path = require('path')

const webrouter = require('./routers/WebRouter')
const userrouter = require('./routers/UserRouter')


const app = express()

app.set('view engine','ejs')
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())
app.use(session({secret:"universal indore"}))

// app.use((request,response,next)=>
// {
//     console.log("Request come ...... ")
//     next()
// })
// app.use("/web",(request,response,next)=>
// {
//     console.log("Web Request come ...... ")
//     next()
// })

app.use("/web",(request,response,next)=>
{
    if(request.session.user==undefined)
        next()
    else           
        response.redirect('/user/home')
})
app.use("/user",(request,response,next)=>
{
    if(request.session.user==undefined)
        response.redirect('/web/login')
    else           
        next()
})

app.use('/web',webrouter) // /web
app.use('/user',userrouter)

app.listen(8989,()=>
{
    console.log("http://localhost:8989/web/home")
})
