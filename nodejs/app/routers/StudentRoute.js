module.exports = app => {
    const students = require("../controllers/StudentController.js");

    app.get("/students", students.findAll);
    app.get("/students/:studentId", students.findById);
    app.get("/students/delete/:studentId", students.deleteById);
    app.get("/students/create/student", students.create);
    app.get("/students/update/:studentId", students.update);
    app.get("/students/limit/:limit", students.limit);
    app.get("/students/search/searchname",students.search);
}