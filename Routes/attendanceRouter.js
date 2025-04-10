import express from 'express';
import {AllAttendanceCon, AttendanceCon, addAttendanceCon} from '../controllers/attendanceController.js';

const router = express.Router();


router.get('/', AllAttendanceCon);

router.get('/attendance/:employeeID', AttendanceCon);

router.post('/', addAttendanceCon);

export default router;