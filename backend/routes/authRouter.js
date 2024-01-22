let express = require("express");
const authRoute = new express.Router();

const db = require("../server");



authRoute.post("/signup", function (req, res) {

    try {
        
    } catch (error) {
        
    }
    const checkEmailQuery = "SELECT * FROM login WHERE email = ?";
    const checkEmailValues = [req.body.email];
  
    db.query(checkEmailQuery, checkEmailValues, (err, data) => {
      if (err) {
        return res.json("Error checking email");
      }
  
      if (data.length > 0) {
        return res.status(409).json({msg:"Email already exists"});
      }
  
     
      const insertQuery = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
      const insertValues = [req.body.name, req.body.email, req.body.password];
  
      db.query(insertQuery, [insertValues], (err, data) => {
        if (err) {
          return res.status(500).json("Error signing up");
        }
        res.json({data: data ,
        message:"User created successfully"
        });
      });
    });
  });
  
  
  
  authRoute.post("/login", function (req, res) {
    const sql = "SELECT * FROM login  WHERE `email` = ? AND  `password` = ?";
    const values = [req.body.email, req.body.password];
    console.log(values);
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
      if (err) {
        return res.json(err);
      }
      if (data.length > 0) {
        return res.json({msg:"Success" ,data:data});
      } else {
        return res.json("fail");
      }
    });
  });
  module.exports = authRoute