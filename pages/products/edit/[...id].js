import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id='+id).then(res => {
            setProductInfo(res.data);
        })
    }, [id]);
    console.log(productInfo)
    return (
        <Layout>
            <h1>Edit Product</h1>
            {productInfo && (
            <ProductForm {...productInfo}/>
            )}
        </Layout>
    )
}