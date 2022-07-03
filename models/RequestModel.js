const mongoClient = require('./mongo')
const {ObjectId} = require('mongodb')

var request = function()
{
    this.listOtherUser = (id,callback)=>
    {
        mongoClient((client)=>
        {           
            var db = client.db('bloodbank')
            var where = {senduser:{$ne:id}}
            db.collection('request').find(where).toArray((err,data)=>
            {
                if(err)
                    callback([])
                else
                    callback(data)    
            });
        });
    }
    this.listByUser = (id,callback)=>
    {
        mongoClient((client)=>
        {           
            var db = client.db('bloodbank')
            var where = {senduser:id}
            db.collection('request').find(where).toArray((err,data)=>
            {
                if(err)
                    callback([])
                else
                    callback(data)    
            });
        });
    }

    this.saveRequest = (data,callback)=>
    {
        mongoClient((client)=>
        {
            var db = client.db('bloodbank')
            db.collection('request').insertOne(data,(err)=>
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

module.exports = new request()