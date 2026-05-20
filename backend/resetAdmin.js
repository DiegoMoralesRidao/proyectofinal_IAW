const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const db = new sqlite3.Database('database.sqlite');

async function resetAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Check if admin exists
    db.get("SELECT id FROM user WHERE username = 'admin'", (err, row) => {
      if (err) throw err;
      
      if (row) {
        // Update existing
        db.run("UPDATE user SET password = ?, perfil = 'admin' WHERE username = 'admin'", [hashedPassword], (err) => {
          if (err) throw err;
          console.log("Contraseña de 'admin' reseteada con éxito.");
        });
      } else {
        // Insert new
        db.run("INSERT INTO user (username, password, perfil) VALUES ('admin', ?, 'admin')", [hashedPassword], (err) => {
          if (err) throw err;
          console.log("Usuario 'admin' creado con éxito.");
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
}

resetAdmin();
