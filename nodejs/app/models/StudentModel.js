const sql = require('./db.js');

// Tạo hàm khởi tạo sinh viên

const Student = function(student) {
    this.name = student.name;
    this.age = student.age;
    this.sex = student.sex;
    this.address = student.address;
    this.classs = student.classs;
    this.score = student.score;
}

//tạo sinh viên mới
Student.create = (newStudent, result) => {
    sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Creat student: ", { id: res.insertId, ...newStudent });
        result(null, { id: res.insertId, ...newStudent });
    });
};

// tìm sinh viên theo id
Student.findById = (studentId, result) => {
    sql.query(`SELECT * FROM students WHERE id = ${studentId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // nếu tìm được sinh viên 
        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // không có id được tìm thấy
        result({ kind: "not_found" }, null);
    });
};

//xoá một sinh viên theo id
Student.remove = (id, result) => {
    sql.query("DELETE FROM students WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted student with id: ", id);
        result(null, res);
    });
};

// lấy tất cả các sinh viên
Student.getAll = result => {
    sql.query("SELECT * FROM students", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("students: ", res);
        result(null, res);
    });
};

// limit

Student.getLimit = (limit, result) => {
        sql.query(`SELECT * FROM students LIMIT ${limit}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("students limit: ", res);
        result(null, res)
    });
};

//search

Student.getSearch = (search,result) => {
    sql.query(`SELECT * FROM students WHERE name LIKE '%${search}%'`, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("students search: ", res);
        result(null, res)
    });
};

// update student
Student.updateById = (id, student, result) => {
    sql.query(
        "UPDATE students SET name = ?, age = ?, sex = ?, address = ?, classs = ?, score = ? WHERE id = ?", [student.name, student.age, student.sex, student.address, student.classs, student.score, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated student: ", { id: id, ...student });
            result(null, { id: id, ...student });
        }
    );
};

module.exports = Student;