import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    async function saveProduct(e){
        e.preventDefault();
        const data = {title,description,price};
        if(_id) {
            //update
            await axios.put('/api/products', {...data, _id});
        } else {
            //create
            await axios.post('/api/products', data);
        }
        setGoToProducts(true);
    }
    if (goToProducts) {
        router.push('/products');
    }
    return(
            <form onSubmit={saveProduct}>
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
    );
}