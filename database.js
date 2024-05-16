const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(express.static("public"))

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_database',
    port: 3306
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/student.html');
});

app.post("/students", async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;

    const connection = await dbConn
    const rows = await connection.query("insert into students (name, age, phone, email) values ('" + name + "', '" + age + "', '" + phone + "', '" + email + "')")
    // res.status(201).send(rows)
    res.send("<h1 style='color: blue'>คุณได้ทำการเพิ่มข้อมูลเรียบร้อยแล้ว</h1>");
})


app.listen(3000, () => {
    console.log('server started on port 3000!');
});