import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ShowStudent = () => {

    const [students, setStudent] = useState([]);

    useEffect(() => {
        axios.get(`/api/students`).then(res => {
            setStudent(res.data.students);
        })
    }, []);

    const deleteStudent = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innetText = "Deleting...";
        axios.delete(`/api/students/${id}`)
            .then(response => {

                alert(response.data.message);
                thisClicked.closest("tr").remove();

            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        alert('404');
                    } else if (error.response.status === 500) {
                        alert('Server Error');
                    }
                }
            });
    }

    if (Object.keys(students).length === 0) {
        return (
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <h2 className='text-danger text-center'>No Data Found</h2>
                    </div>
                </div>

            </div>
        );
    }

    var studentDetails = "";
    studentDetails = students.map((item, index) => {
        return (
            <tr key={index}>

                <td>{item.name}</td>
                <td>{item.roll}</td>
                <td>{item.className}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>
                    <Link to={`/api/students/${item.id}/edit`} className="btn btn-warning mx-2">Edit</Link>
                    <button type='button' onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger mx-2">Delete</button>
                </td>
            </tr>

        );
    });
    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h3 className='align-center'>All Student Data
                                <Link to="/student/create" className="btn btn-danger float-end">Add Student</Link>
                            </h3>

                        </div>
                        <div className="card-body">
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Roll</th>
                                        <th scope="col">Class</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ShowStudent;
