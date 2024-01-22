let express = require("express");
const studentRoute = new express.Router();

const db = require("../server");

studentRoute.get("/", function (req, res) {
  try {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
      if (err) {
        console.log("error");
      } else {
        res.status(201).json(data);
      }
    });
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
});

studentRoute.get("/student/:id", function (req, res) {
  try {
    const sql = "SELECT * FROM student where ID=?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
      if (err) {
        console.log("error");
      } else {
        res.status(201).json({ status: 201, data: data });
      }
    });
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
});

studentRoute.post("/create", function (req, res) {
  try {
    const sql = "INSERT INTO student (`Name`, `email`) VALUES (?)";
    const values = [req.body.name, req.body.email];
    db.query(sql, [values], (err, data) => {
      if (err) {
        console.log("error");
      } else {
        console.log("student created");
        res.status(201).json({ status: 201, data: data });
      }
    });
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
});

studentRoute.put("/update/:id", function (req, res) {
  try {
    const sql = "update  student set `Name` = ?, `Email`= ? where ID = ?";
    const values = [req.body.name, req.body.email];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
      if (err) {
        console.log("error");
      } else {
        console.log("student updated");
        res.status(201).json({ status: 201, data: data });
      }
    });
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
});

studentRoute.delete("/student/:id", function (req, res) {
  try {
    const sql = "DELETE FROM student where ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
      if (err) {
        console.log("error");
      } else {
        console.log("student delete");
        res.status(201).json({ status: 201, data: data });
      }
    });
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
});

module.exports = studentRoute;
