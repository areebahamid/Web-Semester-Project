const mongoose = require('mongoose');
const debuger = require('debug')("development:mongoose");
// debuger only consoles with specific command => set DEBUG=development:*
// to stop debuger  run this=> set DEBUG=

const config = require('config');


mongoose.connect(`${config.get("MONGODB_URL")}`)
.then(()=>{ debuger("Connected") 
    console.log("Database Connected")
})
.catch((err)=>{ debuger(err) 
    console.log("not connected")
    console.log(err)
});

module.exports = mongoose.connection;