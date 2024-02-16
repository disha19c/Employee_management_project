import React, { useState, useMemo } from 'react';
import '../styles/AddEmp.css';
import '../styles/Display.css';



function Display({ csvData, setisAdding, handleEdit, handleDelete }) {
    const [SelectAll, setSelectAll] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: '',
        direction: 'ascending',
    });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    const renderHeader = () => {
        const headers = ['employee_name', 'designation', 'manager', 'experience'];

        return headers.map((header) => (
            <th key={header} onClick={() => handleSort(header)}>
                {header.replace('_', ' ')}
                <i className={`fa-solid fa-sort icon ${sortConfig.key === header ? sortConfig.direction : ''}`}></i>
            </th>
        ));
    };

    const handleSelectAll = () => {
        setSelectAll(!SelectAll)
        setSelectedCheckboxes(SelectAll ? [] : csvData.map((emp) => emp.employee_id));
    }
    const handleSelectRow = (empId) => {
        const updatedCheckboxes = selectedCheckboxes.includes(empId)
            ? selectedCheckboxes.filter((id) => id !== empId)
            : [...selectedCheckboxes, empId];

        setSelectAll(updatedCheckboxes.length === csvData.length);
        setSelectedCheckboxes(updatedCheckboxes);
    };

    const getManagerNameById = (managerId) => {
        const manager = csvData.find((employee) => employee.employee_id === managerId);
        return manager ? manager.employee_name : '';
    };
    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };
    const calculateTotalDays = (experience) => {
        return experience.years * 365 + experience.months * 30.44 + experience.days;
    };

    const sortedCsvData = useMemo(() => {
        if (sortConfig.key === '') {
            return csvData;
        }
        const sortableData = [...csvData];
        sortableData.sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            if (sortConfig.key === 'experience') {
                aValue = calculateTotalDays(a[sortConfig.key]);
                bValue = calculateTotalDays(b[sortConfig.key]);
            }
            if (sortConfig.key === 'manager') {
                aValue = getManagerNameById(a.manager_id);
                bValue = getManagerNameById(b.manager_id);
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        return sortableData;
    }, [csvData, sortConfig]);


    const filteredCsvData = useMemo(() => {
        return sortedCsvData.filter((row) => {
            const isEmployeeNameMatch = row.employee_name.toLowerCase().includes(searchQuery);
            const isManagerNameMatch = getManagerNameById(row.manager_id).toLowerCase().includes(searchQuery);

            return isEmployeeNameMatch || isManagerNameMatch;
        });
    }, [sortedCsvData, searchQuery, getManagerNameById]);



    const displayedData = searchQuery ? filteredCsvData : sortedCsvData;



    return (
        <><link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
        />
            <link
                rel="preconnect"
                href="https://fonts.googleapis.com"
                crossOrigin="true"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Climate+Crisis&display=swap"
            />

            <div id="heading">Employee Details</div>
            <div className="displayContainer">
                <div id="title">Employee Info</div>
                <div className='topBtns'>
                    <button onClick={() => setisAdding(true)} >Add Employee</button>
                    <button onClick={() => handleEdit(selectedCheckboxes[0])} >Edit Employee</button>
                    <button onClick={() => handleDelete(selectedCheckboxes)} >Delete Employee</button>
                </div>
                <div className="Search">
                    <input className="searchBar" type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" checked={SelectAll} onChange={handleSelectAll}></input>All</th>
                            {renderHeader()}
                        </tr>
                    </thead>
                    <tbody>

                        {displayedData.map((row, index) => (

                            < tr key={index} >
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedCheckboxes.includes(row.employee_id)}
                                        onChange={() => handleSelectRow(row.employee_id)}
                                    />
                                </td>
                                <td>{row.employee_name}</td>
                                <td>{row.designation}</td>
                                <td>

                                    {row.manager_id === row.employee_id
                                        ? 'Self'
                                        : getManagerNameById(row.manager_id)}
                                </td>

                                <td>{`${row.experience.years} years, ${row.experience.months} months, ${row.experience.days} days`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div >


        </>
    );
};



export default Display;