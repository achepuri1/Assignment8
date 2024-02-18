
const express = require('express');
const app = express();
const port = 3000;

const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost',
     user:'root',
     password: 'root',
     database: 'sample',
     port: 3306,
     connectionLimit: 5
});

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});


// GET Request 1: Get all agents list
app.get('/agents', (req, res) => {
  pool.getConnection()
      .then(conn => {

         conn.query("SElECT * FROM agents")
             .then((rows) => {
                res.json(rows);
                conn.end();
        
             })    
            .catch(err => {
                console.log(err);
                conn.end();
            })
            
       }).catch(err => {
           console.log(err);
       });
      });


// GET Request 2: Get all customers list
app.get('/customers', (req, res) => {
  pool.getConnection()
      .then(conn => {

         conn.query("SElECT * FROM customer")
             .then((rows) => {
                res.json(rows);
                conn.end();
        
             })    
            .catch(err => {
                console.log(err);
                conn.end();
            })
            
       }).catch(err => {
           console.log(err);
       });
      });
      
       // GET Request 3: Get all food items
app.get(‘/foods', (req, res) => {
  pool.getConnection()
      .then(conn => {

         conn.query("SELECT * FROM foods")
             .then((rows) => {
                res.json(rows);
                conn.end();

             })
            .catch(err => {
                console.log(err);
                conn.end();
            })

       }).catch(err => {
           console.log(err);
       });
      });



app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
);
