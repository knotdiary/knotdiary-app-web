var fs = require('fs');
var jsf = require('json-schema-faker');
var faker = require('faker');

jsf.extend('faker', function() { return faker; });
jsf.format('randomImage', function() { 
  var imageSources = [
    'https://source.unsplash.com/640x480',
    'https://source.unsplash.com/400x600',
    'https://source.unsplash.com/800x600',
    'https://source.unsplash.com/720x560',
    'https://source.unsplash.com/920x600',
    'https://source.unsplash.com/600x900',
    'https://source.unsplash.com/540x320',
    'https://source.unsplash.com/1024x768',
    'https://source.unsplash.com/768x1024',
    'https://source.unsplash.com/1200x900',
  ]
  var randomImage = imageSources[Math.floor(Math.random() * imageSources.length)];
  return randomImage;
});
jsf.format('pastDate', function() { return faker.date.past().toISOString(); });
jsf.format('futureDate', function() { return faker.date.future().toISOString(); });

var userSchema = require('./schema/userSchema');
var users = jsf(userSchema);
var loginSchema = require('./schema/loginSchema');
var login = jsf(loginSchema);;
var tokenUserSchema = require('./schema/tokenUserSchema');
var tokenUser = jsf(tokenUserSchema);;

var json = JSON.stringify({
  users,
  posts,
  login,
  tokenUser,
});

fs.writeFile('./mock/api/db.json', json, function(err) {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Mock API data generated.');
  }
});
