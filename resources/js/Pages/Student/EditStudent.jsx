import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';

const EditStudent = () => {
    
    let { id } = useParams();

    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState({});
    const [student, setStudent] = useState({});


    useEffect(() => {
        axios.get(`/api/students/${id}/edit`).then(res => {
            setStudent(res.data.student);
        })
    }, [id]);

    console.log(id);



    const handlerName = (e) => {
        e.persist();
        setStudent({ ...student, [e.target.name]: e.target.value });
    }
    const updateStudent = (e) => {
        e.preventDefault();
        const data = {
            name: student.name,
            roll: student.roll,
            className: student.className,
            phone: student.phone,
            address: student.address
        }

        axios.put(`/api/students/${id}`, data)
            .then(response => {
                navigate('/students');
                // alert(response.data.message);

            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        setInputErrorList(error.response.data.errors);
                    } else if (error.response.status === 500) {
                        alert('Server Error');
                    }
                }
            });

    }
    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-8 mx-auto align-center">
                    <div className="card">
                        <div className="card-header">
                            <h3>Edit Student
                                <Link to="/students" className="btn btn-danger float-end">Back</Link>
                            </h3>
                        </div>
                        <form onSubmit={updateStudent}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="col-md-9">
                                        <input type="text" id="name" name="name" value={student.name} onChange={handlerName} className="form-control" placeholder="Enter Your Name" />
                                        <span className="text-danger">{inputErrorList.name}</span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-3">
                                        <label htmlFor="roll">Roll</label>
                                    </div>
                                    <div className="col-md-9">
                                        <input type="number" id="roll" name="roll" value={student.roll} onChange={handlerName} className="form-control" placeholder="Enter Your Roll" />
                                        <span className="text-danger">{inputErrorList.roll}</span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-3">
                                        <label htmlFor="className">Class Name</label>
                                    </div>
                                    <div className="col-md-9">
                                        <input type="text" id="className" value={student.className} onChange={handlerName} name="className" className="form-control" placeholder="Enter Your Class Name" />
                                        <span className="text-danger">{inputErrorList.className}</span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-3">
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                    </div>
                                    <div className="col-md-9">
                                        <input type="number" id="phoneNumber" value={student.phone} onChange={handlerName} name="phone" className="form-control" placeholder="Enter Your Phone Number" />
                                        <span className="text-danger">{inputErrorList.phone}</span>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-3">
                                        <label htmlFor="address">Address</label>
                                    </div>
                                    <div className="col-md-9">
                                        <textarea id="address" cols="30" rows="5" value={student.address} onChange={handlerName} name="address" className="form-control" placeholder="Enter Your Address"></textarea>
                                        <span className="text-danger">{inputErrorList.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <input type="submit" value="Update Student Info" className="btn btn-success" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default EditStudent;
