import express from 'express';
const router = express.Router();

let students = [];

router.post('/', (req, res) => {
    const studentData = req.body;
    students.push(studentData);
    res.status(201).json({ message: 'Student data received', data: studentData });
});

export default router;
