const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

app.use(bodyParser.json());
app.use(cors());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "politeknik",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Konek...");
});

app.get("/api/mahasiswa", (req, res) => {
  let sql = "SELECT * FROM mahasiswa";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, data: results }));
  });
});

app.get("/api/mahasiswa/:id", (req, res) => {
  let sql = "SELECT * FROM mahasiswa WHERE id=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, data: results }));
  });
});

app.post("/api/mahasiswa", (req, res) => {
  let data = {
    nama: req.body.nama,
    nim: req.body.nim,
    email: req.body.email,
    telepon: req.body.telepon,
    angkatan: req.body.angkatan,
    semester: req.body.semester,
    IPK: req.body.IPK,
  };
  let sql = "INSERT INTO mahasiswa SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, data: results }));
  });
});

app.put("/api/mahasiswa/:id", (req, res) => {
  let sql =
    "UPDATE MAHASISWA SET nama='" +
    req.body.nama +
    "', nim='" +
    req.body.nim +
    "', email='" +
    req.body.email +
    "', telepon='" +
    req.body.telepon +
    "', angkatan='" +
    req.body.angkatan +
    "', semester='" +
    req.body.semester +
    "', IPK='" +
    req.body.IPK +
    "' WHERE id=" +
    req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, data: results }));
  });
});

app.delete("/api/mahasiswa/:id", (req, res) => {
  let sql = "DELETE FROM mahasiswa WHERE id=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, data: results }));
  });
});

app.listen(8080, () => {
  console.log("server berjalan di port 8080...");
});
