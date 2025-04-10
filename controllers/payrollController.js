import { AllPayroll, Payroll, addPayroll, deletePayroll, updatePayroll } from "../models/Payroll_db.js";

const AllPayrollCon = async(req,res)=>{
    res.json(await AllPayroll());
}

const PayrollCon = async(req,res)=>{
    res.json(await Payroll(req.params.employeeID));
}

const addPayrollCon = async(req,res)=>{
    let {employeeID,hours_worked,leave_days,salary,performance} = req.body; 
    await addPayroll(employeeID,hours_worked,leave_days,salary,performance);
    res.json({
    message: 'Payroll added successfully'
    });
}

const deletePayrollCon = async(req,res)=>{
    await deletePayroll(req.params.payroll_ID);
    res.json({
    message: 'Payroll deleted successfully'
    });
}

const updatePayrollCon = async(req,res)=>{
    let {employeeID,hours_worked,leave_days,salary,performance,payroll_ID} = req.body; 
    await updatePayroll(employeeID,hours_worked,leave_days,salary,performance,payroll_ID);
    res.json({
    message: 'Payroll updated successfully'
    });
}

export {AllPayrollCon,PayrollCon,addPayrollCon,deletePayrollCon,updatePayrollCon};