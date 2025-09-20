import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function ProductCreate() {
    const [product, setProduct] = useState({id:'', name: '', description:"",
         category:"", 
         tags:"",
         stock:1, price:0});
    const navigate = useNavigate();
    const handleCreateProduct = async () => {
        const baseUrl = 'http://localhost:8080';
        const header = {"headers" :{"Authorization":`Bearer ${token}`}}
        const response = await axios.post(`${baseUrl}/products/admin/save`,{...product},header);
        alert('Product Created Successfully.');
        navigate('/admin');
    };
    useEffect(()=>{
        if(localStorage.getItem("token") == null) {
            navigate("/admin/login");
        }        
    },[]);
    return (
        <>
            <h3>Create Product</h3>
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

                    <button type="button" className="btn btn-primary"
                        onClick={handleCreateProduct}>Create Product</button>
                </form>
            </div>
        </>
    )
}