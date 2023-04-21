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
        const data = {name, parentCategory}
        if (editedCategory != null){
            data._id= editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
        } else {
            console.log(data);
        await axios.post('/api/categories', data);
        }
        setName('');
        fetchCategories();
    }
    function editCategory(category){
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
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
    return(
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit Category ${editedCategory.name}` : 'Create New Category'}</label>
            <form onSubmit={saveCategory} className="flex gap-1">
            <input 
                className="mb-0" 
                type="text" 
                placeholder={'Category name'} 
                value={name}
                onChange={e => setName(e.target.value)}
                />
                <select 
                    className="mb-0" 
                    onChange={e => setParentCategory(e.target.value)}
                    >
                    <option value="None">No Parent Category</option>
                    {categories.length > 0 && categories.map
                    (category => ( 
                        <option value={category._id}>{category.name}</option>
                    ))}
                </select>
            <button className="btn-primary" type="submit">Save</button>
            </form>
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
        </Layout>
    )
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
)

)