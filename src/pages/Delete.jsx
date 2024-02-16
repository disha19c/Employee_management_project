import React from 'react';
import "../styles/Delete.css"
import "../styles/Display.css"


const DeleteEmp = ({ isOpen, onClose, onDelete }) => {



    return (<>
        <div className="modal"></div>
        <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
            <div className="modal-content">
                <p>Are you sure you want to delete this item?</p>
                <button onClick={onDelete}>Delete</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    </>
    );
};

export default DeleteEmp;

