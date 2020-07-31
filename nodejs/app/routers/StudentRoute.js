module.exports = app => {
    const students = require("../controllers/StudentController.js");

    app.get("/students", students.findAll);
    app.get("/students/:studentId", students.findById);
    app.delete("/students/:studentId", students.deleteById);
    app.post("/students", students.create);
    app.put("/students/:studentId", students.update);
    app.get("/students/limit/:limit", students.limit);
    app.post("/students/search",students.search);
}