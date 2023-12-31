import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import ShowStudent from './Student/ShowStudent';
import StudentCreate from './Student/StudentCreate';
import EditStudent from './Student/EditStudent';
import NewProduct from './Products/NewProduct';
import ManageProduct from './Products/ManageProduct';
import EditProduct from './Products/EditProduct';

const Master = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/students' element={<ShowStudent/>} />
                <Route path='/student/create' element={<StudentCreate/>} />
                <Route path='/api/students/:id/edit' element={<EditStudent/>} />

                <Route path='/product/create' element={<NewProduct/>}/>
                <Route path='/product/manage' element={<ManageProduct/>} />
                <Route path='/api/products/:id/edit' element={<EditProduct/>} />


            </Routes>
        </>
    );
};

export default Master;
