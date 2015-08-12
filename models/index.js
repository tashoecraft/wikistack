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

pageSchema.pre('validate',function(next) {
  if (typeof this.title !== 'undefined' && this.title !== '') {
    this.urlTitle = this.title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    this.urlTitle = Math.random().toString(36).substring(2, 7);
}
next();
});

var userSchema = new mongoose.Schema({
      name: {type: String, required: true},
      email: {type: String, required: true, unique: true},
});

userSchema.statics.findOrCreate = function(props) {
  var self = this;
  return self.findOne({email: props.email}).exec().then(function(user){
    if (user) return user;
    else return self.create({
      email: props.email,
      name:  props.name
    });
  });
};


var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);


module.exports = {
  Page: Page,
  User: User
};
