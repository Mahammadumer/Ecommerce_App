import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductEdit() {
    const [product, setProduct] = useState({id:'', name: '', description:"",
         category:"", 
         tags:"",
         stock:1, price:0});
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const loadProduct = async () => {
            const baseUrl = 'http://localhost:8080';
            const header = {"headers" :{"Authorization":`Bearer ${token}`}}
            const response = await axios.get(`${baseUrl}/products/${id}`,header);
            const queriedProduct = response.data;
            setProduct(queriedProduct);
    }    
    useEffect(() => {
        
        if(localStorage.getItem("token") == null) {
            navigate("/admin/login");
            return;
        }        
    
        loadProduct();
    },[]);
    const handleUpdateProduct = async () => {
        const baseUrl = 'http://localhost:8080';
        const header = {"headers" :{"Authorization":`Bearer ${token}`}}
        const response = await axios.put(`${baseUrl}/products/admin/${id}`,{...product},header);
        alert('Product Updated Successfully.');
        navigate('/admin');
    };
    return(
        <>
        <h3>Edit Product</h3>
        <div className="container">
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" 
                         value={product.name} onChange={(event) => { setProduct({...product, name:event.target.value}); } } 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" 
                        value={product.description} onChange={(event) => { setProduct({...product, description:event.target.value}); } }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Cateogory</label>
                        <input type="text" className="form-control" id="category" 
                        value={product.category} onChange={(event) => { setProduct({...product, category:event.target.value}); } }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">Tags</label>
                        <input type="text" className="form-control" id="tags" 
                        value={product.tags} onChange={(event) => { setProduct({...product, tags:event.target.value}); } }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="stock" className="form-label">Stock</label>
                        <input type="text" className="form-control" id="stock" 
                        value={product.stock} onChange={(event) => { setProduct({...product, stock:event.target.value}); } }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="text" className="form-control" id="price" 
                        value={product.price} onChange={(event) => { setProduct({...product, price:event.target.value}); } }
                        />
                    </div>

                    <button type="button" className="btn btn-warning"
                        onClick={handleUpdateProduct}>Update Product</button>
                </form>
            </div>
        </>
    )
}