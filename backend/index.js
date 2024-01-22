let db = require("./server");
let express = require("express");
let app = express();
const cors = require("cors");
const PDFDocument = require('pdfkit');
let router = require("./routes/router");
let studentRoute = require("./routes/studentRouter");
let authRoute = require("./routes/authRouter");
const fs = require('fs');


app.use(express.json());
app.use(cors());

app.use(router);
app.use(studentRoute);
app.use(authRoute);

app.use("/uploads", express.static("./uploads"))




app.get('/generate-pdf', (req, res) => {
  // Fetch student data from the database
  db.query('SELECT * FROM student', (error, results, fields) => {
    if (error) throw error;

    // Generate PDF
    const pdfDoc = new PDFDocument();
    const pdfPath = 'students.pdf';
    const stream = fs.createWriteStream(pdfPath);

    pdfDoc.pipe(stream);

    // Add student data to the PDF
    results.forEach((student) => {
      pdfDoc.text(`Name: ${student.Name}, Email: ${student.email}`);
      // Add more information as needed
      pdfDoc.moveDown();
    });

    pdfDoc.end();

    stream.on('finish', () => {
      // Send the generated PDF as a response
      res.setHeader('Content-disposition', 'attachment; filename=students.pdf');
      res.setHeader('Content-type', 'application/pdf');
      fs.createReadStream(pdfPath).pipe(res);
      // Optionally, you can remove the generated PDF file after sending
      fs.unlink(pdfPath, (err) => {
        if (err) console.error(err);
      });
    });
  });
});

////////////////////////////////////
// I send this comment routers into router/studentRouter file 

// app.get("/", function (req, res) {
//   const sql = "SELECT * FROM student";
//   db.query(sql, (err, data) => {
//     if (err) return res.json("Error");
//     return res.json(data);
//   });
// });
// app.get("/student/:id", function (req, res) {
//   const sql = "SELECT * FROM student where ID=?";
//   const id = req.params.id;
//   db.query(sql,[id], (err, data) => {
//     if (err) return res.json("Error");
//     return res.json(data);
//   });
// });
// app.post("/create", function (req, res) {
//   const sql = "INSERT INTO student (`Name`, `email`) VALUES (?)";

//   const values = [req.body.name, req.body.email];
//   db.query(sql, [values], (err, data) => {
//     if (err) return res.json("Error");
//     return res.json(data);
//   });
// });

// app.put("/update/:id", function (req, res) {
//   const sql = "update  student set `Name` = ?, `Email`= ? where ID = ?";

//   const values = [req.body.name, req.body.email];
//   const id = req.params.id;
//   db.query(sql, [...values, id], (err, data) => {
//     if (err) return res.json("Error");
//     return res.json(data);
//   });
// });

// app.delete("/student/:id", function (req, res) {
//   const sql = "DELETE FROM   student  where ID = ?";

//   const id = req.params.id;
//   db.query(sql, [id], (err, data) => {
//     if (err) return res.json("Error");
//     return res.json(data);
//   });
// });

db.connect(function (error) {
  if (error) {
    console.log(error);
    throw error;
  } else {
    console.log("database connect");
  }
});

///////////////login
//  this routes send into authRouter file

// app.post("/signup", function (req, res) {
//   const checkEmailQuery = "SELECT * FROM login WHERE email = ?";
//   const checkEmailValues = [req.body.email];

//   db.query(checkEmailQuery, checkEmailValues, (err, data) => {
//     if (err) {
//       return res.json("Error checking email");
//     }

//     if (data.length > 0) {
//       return res.status(409).json({msg:"Email already exists"});
//     }

   
//     const insertQuery = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
//     const insertValues = [req.body.name, req.body.email, req.body.password];

//     db.query(insertQuery, [insertValues], (err, data) => {
//       if (err) {
//         return res.status(500).json("Error signing up");
//       }
//       res.json({data: data ,
//       message:"User created successfully"
//       });
//     });
//   });
// });

// app.post("/login", function (req, res) {
//   const sql = "SELECT * FROM login  WHERE `email` = ? AND  `password` = ?";
//   const values = [req.body.email, req.body.password];
//   console.log(values);
//   db.query(sql, [req.body.email, req.body.password], (err, data) => {
//     if (err) {
//       return res.json(err);
//     }
//     if (data.length > 0) {
//       return res.json("Success");
//     } else {
//       return res.json("fail");
//     }
//   });
// });









app.listen(7000, () => {
  console.log("listening 7000");
});
