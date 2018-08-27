var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var demoSchema = new Schema({
   category:String
});
module.exports = mongoose.model('demo', demoSchema);