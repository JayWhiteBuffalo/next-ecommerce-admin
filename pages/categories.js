import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import { withSwal } from 'react-sweetalert2';

 function Categories({swal}) {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [properties, setProperties] = useState([]);
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
        setProperties([]);
        fetchCategories();
    }
    function editCategory(category){
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
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
                            <option value={category._id}>{category.name}</option>
                        ))}
                    </select>
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
                        <div className="flex gap-1 mb-2">
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
                        <td>Category Name</td>
                        <td>Parent Category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map
                    (category => ( 
                    <tr>
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