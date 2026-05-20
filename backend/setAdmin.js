const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite');
db.run("UPDATE user SET perfil = 'admin' WHERE username = 'admin'", (err) => {
  console.log(err || 'Admin updated');
});
