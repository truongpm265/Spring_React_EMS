import React,{useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../service/EmployeeService'
import { useNavigate } from 'react-router-dom'


const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(()=>{
        getAllEmployees();
    },[])

    function getAllEmployees(){
        listEmployees().then((response)=>{
            setEmployees(response.data)
        }).catch(error=>{
            console.error(error);
        })
    }
    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        console.log(id)
        deleteEmployee(id).then((response)=>{
            getAllEmployees();
        }).catch(error=>{
            console.error(error)
        })
    }

  return (
    <div className='container'>
        <h2 className='text-center'>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add new Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={()=> updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={()=> removeEmployee(employee.id)}
                                    style={{marginLeft:'10px'}}
                                >Delete</button>
                            </td>
                        </tr>)
                }
                <tr>
                    
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent