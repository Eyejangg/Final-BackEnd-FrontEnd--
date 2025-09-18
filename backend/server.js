// Import libraries
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ประกาศ app ก่อนการใช้งาน
const app = express();

// ตั้งค่า app
app.use(cors());
app.use(express.json()); // สำหรับรับข้อมูล JSON

// API endpoint ตัวอย่าง
app.get("/api/greet", (req, res) => {
  res.json({ message: "Welcome from new feature!" });
});

let dataStore = []; // เก็บข้อมูลที่รับมาจาก frontend

app.post("/api/add", (req, res) => {
  const newData = req.body; // รับข้อมูลจาก request body
  if (!newData.name) {
    return res.status(400).json({ message: "Name is required" }); // ตรวจสอบให้แน่ใจว่ามีข้อมูล "name"
  }
  dataStore.push(newData); // บันทึกข้อมูลลงใน dataStore
  res
    .status(201)
    .json({ message: "ชื่อของคุณถูกเพิ่มเข้าสู่รายชื่อ!", data: newData });
});

// เพิ่ม API สำหรับดึงข้อมูลทั้งหมด
app.get("/api/data", (req, res) => {
  res.json({ data: dataStore }); // ส่งข้อมูลทั้งหมดที่เก็บใน dataStore
});


// ตั้งค่า port และเริ่มต้น server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
