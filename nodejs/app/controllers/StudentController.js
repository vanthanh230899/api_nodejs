const Student = require("../models/StudentModel.js");

exports.findAll = (req, res) => {
    Student.getAll((err, data) => {
        if (err)
            res.status(500).send({
                massage: err.massage || "Some error occurred while retrieving student"
            });
        else res.send(data);
    });
};

exports.limit = (req, res) => {
    Student.getLimit(req.params.limit, (err, data) => {
        if (err)
            res.status(500).send({
                massage: errr.massage || "Some error occurred while retrieving student",
            });
        else res.send(data);
    });
};

exports.findById = (req, res) => {
    Student.findById(req.params.studentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Student with id ${req.params.studentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Student with id " + req.params.studentId
                });
            }
        } else res.send(data);
    });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Student
    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        address: req.body.address,
        classs: req.body.classs,
        score: req.body.score
    });

    // Save Student in the database
    Student.create(student, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Student."
            });
        else res.send(data);
    });
};

//xoá sinh viên theo id
exports.deleteById = (req, res) => {
    Student.remove(req.params.studentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    massage: `Not found Student with id ${req.params.studentId}`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Student with id " + req.params.studentId
                });
            };
        } else res.send({ message: `Student was deleted successfully!` });
    });
};

//update sinh vien theo id

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Student.updateById(
        req.params.studentId,
        new Student(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.studentId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.studentId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.search = (req,res) => {
    Student.getSearch(req.body.name,(err,data) => {
        if (err)
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Student."
        });
        else res.send(data);
    })
}