import React from "react";
import '../styles/AddEmp.css';
import { useState } from 'react';
import statesData from '../json-files/states_cities.json';



const EditEmp = ({ selectedEmployee, setisEditing, editEmployee }) => {
    const { employee_name, email, mobile_no, date_of_joining, state, city, designation, manager_id } = selectedEmployee || {};
    const [inputName, setInputName] = useState(employee_name || "");
    const [inputMail, setInputMail] = useState(email || "");
    const [inputMobile, setInputMobile] = useState(mobile_no || "");
    const date = new Date(date_of_joining);
    const formattedDate = date.toISOString().split('T')[0];
    const [inputDate, setInputDate] = useState(formattedDate || "");


    const states = Object.keys(statesData);

    const [selectedState, setSelectedState] = useState(state || "");
    const [cities, setCities] = useState(city || "");

    const [selectedManager, setSelectedManager] = useState(manager_id || "");
    let managers = [
        { label: "John Doe", value: "1" },
        { label: "Jane Smith", value: "2" },
        { label: "Ava Miller", value: "6" },
        { label: "Grace Evans", value: "10" },
        { label: "Olivia Wilson", value: "13" },
        { label: "Henry Scott", value: "14" },
        { label: "Chloe Turner", value: "18" },
        { label: "Emma Martin", value: "21" },
        { label: "Lucas Scott", value: "22" },
        { label: "Aubrey Taylor", value: "26" },
        { label: "Nora Scott", value: "27" },
        { label: "Caleb Turner", value: "31" },
        { label: "Nora Scott", value: "32" },
        { label: "Penelope Wilson", value: "36" },
        { label: "Aubrey Taylor", value: "37" },
        { label: "Grayson Turner", value: "41" },
        { label: "Caleb Turner", value: "42" },
        { label: "Landon Turner", value: "46" },
        { label: "Jackson Turner", value: "47" },
    ];
    const [selectedDesignation, setSelectedDesignation] = useState(designation || "");
    const designations = [
        "CEO",
        "CTO",
        "Software Engineer",
        "UI/UX Designer",
        "CFO",
        "Lead Software Engineer",
        "Software Engineer",
        "Senior Software Engineer",
        "Chief Marketing Officer",
        "Marketing Specialist",
        "Chief Operating Officer",
        "Operations Manager",
        "Business Analyst",
        "HR Manager",
        "HR Specialist",
        "Finance Manager",
        "Accountant",
        "Financial Analyst",
        "Chief Technology Officer",
        "Software Engineer",
        "UI/UX Designer",
        "Chief Financial Officer",
        "Finance Manager",
        "Financial Analyst",
        "Accountant",
        "Chief Human Resources Officer",
        "HR Manager",
        "HR Specialist",
        "Recruitment Specialist",
        "Employee Relations Specialist",
        "Chief Legal Officer",
        "Legal Counsel",
        "Legal Analyst",
        "Contracts Manager",
        "Compliance Specialist",
        "Chief Sales Officer",
        "Sales Manager",
        "Sales Representative",
        "Key Account Manager",
        "Sales Support Specialist",
        "Chief Customer Officer",
        "Customer Service Manager",
        "Customer Success Specialist",
        "Technical Support Specialist",
    ];



    const handleChangeState = (event) => {
        const state = event.target.value;
        setSelectedState(state);
        setCities("");
    };
    const handleChangeCity = (event) => {
        const city = event.target.value;
        setCities(city)
    };

    const handleChangeDesignation = (event) => {
        const designation = event.target.value;
        setSelectedDesignation(designation);
    };

    const handleChangeManager = (event) => {
        const manager = event.target.value;
        setSelectedManager(manager);
    };
    const handleCancel = (event) => {
        setisEditing(false);
    };


    const handleSubmit = () => {
        if (inputName.trim() === "" || inputMail.trim() === "" || inputMobile.trim() === "") {
            alert("fill in all the fields.");
            return;
        }
        const Data = {
            employee_name: inputName,
            email: inputMail,
            mobile_no: inputMobile,
            state: selectedState,
            city: cities,
            designation: selectedDesignation,
            manager: selectedManager,
            date_of_joining: inputDate,
        };

        alert("successfully submitted");
        editEmployee({ Data });
    };


    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="true" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Climate+Crisis&display=swap" />


            <div className="info-container">
                <div className="left">Employee Details</div>
                <div className="right">
                    <p>Edit Employee Details</p>

                    <div>
                        <input className="content" type="text" value={inputName} placeholder="Enter the Name"
                            onChange={(e) => setInputName(e.target.value)}>
                        </input>
                        <input className="content" type="email" value={inputMail} placeholder="Enter the Email ID"
                            onChange={(e) => setInputMail(e.target.value)}>
                        </input>
                        <input className="content" type="tel" value={inputMobile} pattern="[0-9]{10}" placeholder="Enter the Mobile #"
                            onChange={(e) => setInputMobile(e.target.value)}>
                        </input>

                        <select className="content" value={selectedState} onChange={handleChangeState}>
                            <option value="" disabled="disabled">Select the State</option>
                            {states.map((state, index) => (<option key={index} value={state}>{state}</option>))}
                        </select>

                        <select className="content" value={cities} onChange={handleChangeCity}>
                            <option value="" disabled>Select the City</option>
                            {statesData[selectedState]?.map((city, index) => (<option key={index} value={city}> {city}
                            </option>))}
                        </select>

                        <select className="content" value={selectedDesignation} onChange={handleChangeDesignation}>
                            <option value="" disabled> Select the Designation</option>
                            {designations.map((designation, index) => (<option key={index} value={designation}>{designation}
                            </option>))}
                        </select>

                        <select className="content" value={selectedManager} onChange={handleChangeManager}>
                            <option value="" disabled>Select the Manager</option>
                            {managers.map((manager, index) => (<option key={index} value={manager.value}> {manager.label}
                            </option>))}
                        </select>
                        <input className="content" type="date" value={inputDate} placeholder="Date of Joining"
                            onChange={(e) => setInputDate(e.target.value)}>
                        </input>

                    </div>
                    <div className="btns">
                        <button onClick={() => handleSubmit()}>{"Add Employee"}</button>
                        <button onClick={() => handleCancel()}>{"Cancel"}</button>
                    </div>
                </div>
            </div>


        </>
    )
};
export default EditEmp;
