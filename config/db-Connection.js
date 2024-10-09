const mongoose = require('mongoose');
const debuger = require('debug')("development:mongoose");
// debuger only consoles with specific command => set DEBUG=development:*
// to stop debuger  run this=> set DEBUG=

const config = require('config');


mongoose.connect(`${config.get("MONGODB_URL")}/WebStore`)
.then(()=>{ debuger("Connected") })
.catch((err)=>{ debuger(err) });

module.exports = mongoose.connection;