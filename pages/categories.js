import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";
import { withSwal } from 'react-sweetalert2';

 function Categories({swal}) {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [properties, setProperties] = useState([]);
    const [image, setImage] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    useEffect(() => {
        fetchCategories();
    }, []);
    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
            console.log('Categories Fetch End')
        });
    }
    async function saveCategory(e){
        e.preventDefault();
        const data = {
            name, 
            parentCategory,
            image, 
            properties:properties.map(p => ({
                name:p.name, 
                values:p.values.split(','),
            })),
        };
        if (editedCategory != null){
            data._id= editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
        } else {
            console.log(data);
        await axios.post('/api/categories', data);
        }
        setName('');
        setParentCategory('');
        setImage('');
        setProperties([]);
        fetchCategories();
    }

    async function uploadImage(e) {
        const files = e.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            if (image > 0) {
            setImage(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        } else {
            setImage(oldImages => {
                return [oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }
}
    function updateImagesOrder(image){
        setImage(image);
    }

    function editCategory(category){
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
        setImage(category.image);
        setProperties(category.properties.map(({name, values}) => ({
            name,
            values:values.join(',')
         })));
    }
    function deleteCategory(category){
        swal.fire({
            title: 'Are you Sure?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(result => {
            // when confirmed and promise resolved...
            if (result.isConfirmed) {
                const {_id} = category;
                axios.delete('/api/categories?_id='+_id);
                fetchCategories();
            }
        }).catch(error => {
            // when promise rejected...
        });
    }
    function addProperty(){
        setProperties(prev => {
            return [...prev, {name:'',values:''}]
        })
    }
    function handlePropertyNameChange(index, property, newName){
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties
        })
    }
    function handlePropertyValuesChange(index, property, newValues){
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties
        })
    }
    function removeProperty(indexToRemove){
        setProperties(prev => {
            return [...prev].filter((p, pIndex) => {    
                return pIndex !== indexToRemove;
            });
        })
    }
    return(
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit Category ${editedCategory.name}` : 'Create New Category'}</label>
            <form onSubmit={saveCategory} >
                <div className="flex gap-1">
                    <input              
                    type="text" 
                    placeholder={'Category name'} 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <select  
                        onChange={e => setParentCategory(e.target.value)}
                        >
                        <option value="None">No Parent Category</option>
                        {categories.length > 0 && categories.map
                        (category => ( 
                            <option key={category.name} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <label>
                    Photos
                </label>
                <div className="mb-2 flex flex-wrap gap-2">
                    <ReactSortable 
                        list={image} 
                        setList={updateImagesOrder}
                        className="flex flex-wrap gap-1">
                    {!!image?.length && image.map(link => (
                        <div key={link} className="h-24">
                            <img src={link} alt="" className="rounded-lg"/>
                        </div>
                    ))}
                    </ReactSortable>
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
                    <input type="file" onChange={uploadImage} className="hidden"/>
                    </label>
                </div>

                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button 
                        onClick={addProperty}
                        type='button' 
                        className="btn-default text-sm mb-2"
                    >
                        Add New Property
                    </button>
                    {properties.length > 0 && properties.map((property,index) => (
                        <div key={property.name} className="flex gap-1 mb-2">
                            <input 
                                className="mb-0"
                                type="text" 
                                value={property.name} 
                                placeholder="property name"
                                onChange={e => handlePropertyNameChange(index, property, e.target.value)}
                            />
                            <input
                                className="mb-0" 
                                onChange={e => handlePropertyValuesChange(index,property,e.target.value)}
                                type="text" 
                                value={property.values} 
                                placeholder="values, comma separated"
                            />
                            <button 
                                type="button"
                                onClick={() => removeProperty(index)}
                                className="btn-default">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-1">
                {editedCategory && (
                <button 
                    onClick={() => {
                        setEditedCategory(null); 
                        setName(''); 
                        setParentCategory('');
                        setProperties([]);
                    }} 
                    type="button" 
                    className="btn-default"
                >
                    Cancel
                </button>
                )}
                <button className="btn-primary" type="submit">Save</button>
                </div>
            </form>
            {!editedCategory && (
                <table className="basic mt-4">
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Parent Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map
                    (category => ( 
                    <tr key={category.name}>
                        <td>{category.name}</td>
                        <td>{category?.parent?.name}</td>
                        <td>
                            <button 
                                onClick={() => editCategory(category)} 
                                className="btn-primary mr-1"
                                >
                                    Edit
                            </button>
                            <button 
                                onClick={() => deleteCategory(category)}
                                className="btn-primary">Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}
            
        </Layout>
    )
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
)

)