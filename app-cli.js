// Get badge length and point for a particular language from treehouse profile
// example https://teamtreehouse.com/adityaarakeri.json

const profile = require('./profile.js');

const users = process.argv.slice(2);

profile.get(users);