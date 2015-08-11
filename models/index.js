var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var statuses = ['open', 'closed'];


var pageSchema = new mongoose.Schema({
    title: {type: String, required: true},
    urlTitle: {type: String, required: true},
    content: {type: String, required: true},
    status: {type: String, enum: statuses},
    date: {type: Date, default: Date.now},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

pageSchema.virtual('route').get(function() {
  return '/wiki/' + this.urlTitle;
});


var userSchema = new mongoose.Schema({
    name: {
      first: {type: String, required: true},
      last: {type: String, required: true}},
    email: {type: String, required: true, unique: true},
});
