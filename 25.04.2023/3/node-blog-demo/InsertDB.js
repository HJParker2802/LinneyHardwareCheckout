var mysql = require('mysql')
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root', //
  password: 'MySQLRootPassword', //
  database: 'webdb',
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO users (id, name, email) VALUES ?";
    var values = [
      ['0','John', 'John@John.com'],
      ['1','Peter', 'Lowstreet Peter@Peter.com'],
      ['2','Amy', 'Amy@Amy.com'],
      ['3','Hannah', 'Hanna@Hanna.com'],
      ['4','Michael', 'Valley Michael.Michael.com'],
      ['5','Sandy', 'Sandy@Sandy.com'],
      ['6','Betty', 'Betty@Betty.com']
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
