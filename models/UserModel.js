const mongoClient = require('./mongo')
const {ObjectId} = require('mongodb')

var user = function()
{
    this.listUser = (id,callback)=>
    {
        mongoClient((client)=>
        {           
            var db = client.db('bloodbank')
            var where = {_id:{$ne:ObjectId(id)}}
            db.collection('user').find(where).toArray((err,data)=>
            {
                if(err)
                    callback([])
                else
                    callback(data)    
            });
        });
    }

    this.loginUser = (data,callback)=>
    {
        mongoClient((client)=>
        {
            var db = client.db('bloodbank')
            db.collection('user').findOne(data,(err,obj)=>
            {
                //console.log(err)
                //console.log(obj)
                if(err || obj==null)
                    callback(false)
                else
                    callback(obj)    
            });
        })
    }

    this.saveUser = (data,callback)=>
    {
        mongoClient((client)=>
        {
            var db = client.db('bloodbank')
            db.collection('user').insertOne(data,(err)=>
            {
                client.close()
                if(err)
                    callback(false)
                else
                    callback(true)    
            });
        })
    }
}

module.exports = new user()