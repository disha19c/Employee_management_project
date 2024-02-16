import React, { useState, useEffect } from 'react';
import Display from './Display';
import AddEmp from './AddEmp';
import EditEmp from './EditEmp';
import DeleteEmp from './Delete';
import { parse } from 'papaparse';
import employeesData from '../csv-files/employee_data.csv';


const calculateExperience = (joiningDate) => {
    const currentDate = new Date();
    const joinDate = new Date(joiningDate);
    const timeDiff = currentDate - joinDate;

    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

    return { years, months, days };
};



const Dashboard = () => {
    let [csvData, setCsvData] = useState([]);
    const [isAdding, setisAdding] = useState(false);
    let [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEditing, setisEditing] = useState(false);
    const [isDelete, setIsDelete] = useState(false);


    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(employeesData);
            const csvString = await response.text();

            parse(csvString, {
                header: true,
                complete: (result) => {
                    let resultData = result.data.filter((x) => x.employee_id !== '');
                    let csvData = resultData.map((row) => ({
                        ...row, experience: calculateExperience(row.date_of_joining),
                    }));


                    setCsvData(csvData);
                },
            });
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {

        if (id) {
            const selectedEmployee = csvData[id - 1];

            setSelectedEmployee(selectedEmployee);
            setisEditing(true);
        }
        else {
            alert("Select The employee to be edited");
            setisEditing(false);
        }
    }

    const handleDelete = (id) => {
        if (!id || id.length === 0) {
            alert("Select employees to be deleted");
            return;
        }
        selectedEmployee = setSelectedEmployee(id);
        setIsDelete(true);

    };


    const onDelete = () => {
        if (selectedEmployee.length > 0) {
            const updatedCsvData = csvData.filter((emp) => !selectedEmployee.includes(emp.employee_id));
            setCsvData(updatedCsvData);

            setSelectedEmployee([]);
            setIsDelete(false);
            setSelectedEmployee(null);
        } else {
            alert("No employee selected for deletion");
        }
    };


    const onClose = () => {
        setIsDelete(false);
        setSelectedEmployee(null);

    }

    const addEmployee = ({ Data }) => {

        const newEmployee = {
            ...Data,
            experience: calculateExperience(Data.date_of_joining),
        };
        setCsvData((prevData) => [...prevData, newEmployee]);
        csvData.push(newEmployee);
        console.log(csvData)
        setisAdding(false);
    };


    const editEmployee = ({ Data }) => {
        const updatedData = csvData.map((employee) => {
            if (employee.employee_id === selectedEmployee.employee_id) {
                return {
                    ...employee,
                    ...Data,
                    experience: calculateExperience(Data.date_of_joining),
                };
            }
            return employee;
        });
        setCsvData(updatedData);
        setisEditing(false);
    };
    const totalEmployees = csvData.length;





    return (
        <>
            {!isAdding && !isEditing && (
                <>
                    <Display
                        csvData={csvData}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        setisAdding={setisAdding}
                    />
                </>
            )}

            {isAdding && (
                <AddEmp
                    csvData={csvData}
                    addEmployee={addEmployee}
                    setEmployees={setCsvData}
                    setisAdding={setisAdding}
                    totalEmployees={totalEmployees}
                />
            )}
            {isEditing && (
                <EditEmp
                    csvData={csvData}
                    editEmployee={editEmployee}
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                    setisEditing={setisEditing}

                />
            )}
            {isDelete && (
                <DeleteEmp
                    isOpen={isDelete}
                    onClose={onClose}
                    onDelete={onDelete}
                    selectedEmployee={selectedEmployee}
                />
            )}

        </>
    )
}
export default Dashboard;