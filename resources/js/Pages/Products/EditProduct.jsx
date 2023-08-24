import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {

    let {id} = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState({});

    const [photo, setPhoto] = useState([]);

    // const [inputErrorList, setInputErrorList] = useState({});

    const heandlerImage = (e) => {
        setPhoto({ image: e.target.files[0] });
    }

    useEffect(() => {
        axios.get(`/api/products/${id}/edit`).then(res => {
            setProduct(res.data.product);
        })
    }, [id]);

    console.log(id);

    const heandlerName = (e) => {
        e.persist();
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const updateProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('_method', 'put');
        formData.append('product_name', product.product_name);
        formData.append('category', product.category);
        formData.append('product_code', product.product_code);
        formData.append('product_price', product.product_price);
        formData.append('description', product.description);
        formData.append('image', photo.image);

        // const data = {
        //     product_name: product.product_name,
        //     category: product.category,
        //     image: photo.image
        // }

        // console.log(formData);

        axios.post(`/api/products/${id}`, formData)
            .then(response => {
                navigate('/product/manage');
                alert(response.data.message);

            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 500) {
                        alert('Server Error');
                    }else if(error.response.status === 404){
                        alert('404 Not Found!');
                    }
                }
            });
    }

    return (
        <>

            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-md-9 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <h3 className='text-success text-center'>Product Info Update

                                    <Link to="/product/manage" className='btn btn-danger float-end'>Back</Link>

                                </h3>
                            </div>
                            <form onSubmit={updateProduct} encType='multipart/form-data'>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <label htmlFor="product_name">Product Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input type="text" id="product_name" value={product.product_name} onChange={heandlerName} name="product_name" className="form-control" placeholder="Enter Your Product Name " />
                                            {/* <span className="text-danger">{inputErrorList.product_name}</span> */}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-3">
                                            <label htmlFor="category">Category</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input type="text" id="category" name="category" value={product.category} onChange={heandlerName} className="form-control" placeholder="Enter Your Product Category" />
                                            {/* <span className="text-danger">{inputErrorList.category}</span> */}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-3">
                                            <label htmlFor="product_code">Product Code</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input type="number" id="product_code" name="product_code" value={product.product_code} onChange={heandlerName} className="form-control" placeholder="Enter Your Product Code" />
                                            {/* <span className="text-danger">{inputErrorList.product_code}</span> */}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-3">
                                            <label htmlFor="product_price">Product Price</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input type="number" id="product_price" name="product_price" value={product.product_price} onChange={heandlerName} className="form-control" placeholder="Enter Your Product Price" />
                                            {/* <span className="text-danger">{inputErrorList.product_price}</span> */}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-3">
                                            <label htmlFor="description">Description</label>
                                        </div>
                                        <div className="col-md-9">
                                            <textarea id="description" cols="30" rows="5" name="description" value={product.description} onChange={heandlerName} className="form-control" placeholder="Enter Your Product Description"></textarea>
                                            {/* <span className="text-danger">{inputErrorList.description}</span> */}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-3">
                                            <label htmlFor="image">Image</label>
                                        </div>
                                        <div className="col-md-4">
                                            <img src={`http://127.0.0.1:8000/${product.image}`} style={{ height: "100px", width: "100px" }} alt="" />
                                        </div>
                                        <div className="col-md-5 mt-3">
                                            <input type="file" id="image" name="image" onChange={heandlerImage} className="form-control" />
                                            {/* <span className="text-danger">{inputErrorList.image}</span> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <input type="submit" value="Create Product" className="btn btn-success" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default EditProduct;
