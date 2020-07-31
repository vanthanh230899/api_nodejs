// Thêm module mysql
const mysql  = require ("mysql");

// Thêm module config
const dbConfig = require ('../config/Config.js');

// Tạo connection liên kết với database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user : dbConfig.USER,
    password : dbConfig.PASSWORD,
    database : dbConfig.DB
});

// Mở kết nối với database

connection.connect(error => {
    if(error) throw error;
    console.log("success connect database");
});

// Tạo một module connection
module.exports = connection;    