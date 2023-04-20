import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "./Spinner";

export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images:existingImages,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    async function saveProduct(e){
        e.preventDefault();
        const data = {title,description,price, images};
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
    async function uploadImages(e) {
        const files = e.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }
    return(
            <form onSubmit={saveProduct}>
                <label>Product Name</label>
                <input 
                    type="text" 
                    placeholder="product name"
                    value={title} onChange={e => setTitle(e.target.value)}
                />
                <label>
                    Photos
                </label>
                <div className="mb-2 flex flex-wrap gap-2">
                    {!!images?.length && images.map(link => (
                        <div key={link} className="h-24">
                            <img src={link} alt="" className="rounded-lg"/>
                        </div>
                    ))}
                    {isUploading && (
                        <div className="h-24 p-1 flex items-center">
                            <Spinner/>
                        </div>
                    )}
                    <label className=" cursor-pointer w-24 h-24 flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" onChange={uploadImages} className="hidden"/>
                    </label>
                </div>
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