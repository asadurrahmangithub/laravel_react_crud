import React,{useState,useEffect} from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

const ManageProduct = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`/api/products`).then(res => {
            setProducts(res.data.product);
        })
    }, []);

    const deleteProduct = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innetText = "Deleting...";
        axios.delete(`/api/products/${id}`)
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

    if (Object.keys(products).length === 0) {
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

    var productDetails = "";
    productDetails = products.map((item, index) => {
        return (
            <tr key={index}>

                <td>{item.product_name}</td>
                <td>{item.category}</td>
                <td>{item.product_code}</td>
                <td>{item.product_price}</td>
                <td>{item.description}</td>
                <td>
                    <img src={`http://127.0.0.1:8000/${item.image}`} alt="" style={{ height: "50px", width: "50px" }}/>
                </td>
                <td>
                    <Link to={`/api/products/${item.id}/edit`} className="btn btn-warning mx-2">Edit</Link>
                    <button type='button' onClick={(e) => deleteProduct(e, item.id)} className="btn btn-danger mx-2">Delete</button>
                </td>
            </tr>

        );
    });
    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-12 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h3 className='text-success text-center'>All Product Data
                                <Link to="/product/create" className="btn btn-primary float-end">Add Product</Link>
                            </h3>

                        </div>
                        <div className="card-body table-responsive">
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Product Code</th>
                                        <th scope="col">Product Price</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">image</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ManageProduct;
