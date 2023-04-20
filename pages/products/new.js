import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";

export default function NewProduct(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    async function createProduct(e){
        e.preventDefault();
        const data = {title,description,price};
        await axios.post('/api/products', data);
    }
    return(
        <Layout>
            <form onSubmit={createProduct}>
                <h1>New Product</h1>
                <input 
                    type="text" 
                    placeholder="product name"
                    value={title} onChange={e => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea 
                    placeholder="description"
                    value={description}
                    onChange={e=> setDescription(e.target.value)}
                />
                <label>Price (in USD)</label>        
                <input 
                    type="text" 
                    placeholder="price"
                    value={price}
                    onChange={e=> setPrice(e.target.value)}
                />
                <button 
                    className="btn-primary"
                    type="submit">
                    Save
                </button>
            </form>
        </Layout>
    );
}