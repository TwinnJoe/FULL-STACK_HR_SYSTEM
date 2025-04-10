import { AllAttendance, Attendance, addAttendance} from "../models/Attendance_db.js";

const AllAttendanceCon = async(req,res)=>{
    res.json(await AllAttendance());
}

const AttendanceCon = async(req,res)=>{
    res.json(await Attendance(req.params.employeeID));
}

const addAttendanceCon = async(req,res)=>{
    let {employeeID,date,attendance_Status} = req.body; 
    await addAttendance(employeeID,date,attendance_Status);
    res.json({
    message: 'Attendance added successfully'
    });
}


export {AllAttendanceCon,AttendanceCon,addAttendanceCon};