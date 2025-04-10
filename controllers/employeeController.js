import { AllEmployees, Employee, addEmployee, updateEmployee, deleteEmployee } from "../models/Employee_db.js";

const AllEmployeesCon = async(req,res)=>{
    try{
        res.json(await AllEmployees());
    } catch(error){
        console.log(error)
    }
}

const EmployeeCon = async(req,res)=>{
    res.json(await Employee(req.params.employeeID));
}

const addEmployeeCon = async(req,res)=>{
    let {name,position,salary,contact,department,employmentHistory} = req.body; 
    try {
        await addEmployee(name,position,salary,contact,department,employmentHistory)
        res.json({
        message: 'Employee added successfully'
        });
    
    } catch (error) {
        console.log(error)
    }
}

const deleteEmployeeCon = async(req,res)=>{
    try {
        await deleteEmployee(req.params.employeeID)
        res.json({
        message: 'Employee deleted successfully'
        });
    } catch (error) {
        console.log(error)
    }
}

const updateEmployeeCon = async(req,res)=>{
    let {name,position,salary,contact,department,employeeID,employmentHistory} = req.body; 
    console.log(req.body);
    await updateEmployee(name,position,salary,contact,department,employeeID,employmentHistory);
    res.json({
        message: 'Employee updated successfully'
    });
}

export {AllEmployeesCon,EmployeeCon,addEmployeeCon,deleteEmployeeCon,updateEmployeeCon};