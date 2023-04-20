import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products(){
    return(
        <Layout>
            <div className="flex gap-4">
            <Link className="bg-blue-900 rounded-md text-white py-1 px-2" href={'/products/new'}>
                Add New Product
            </Link>
            <Link className="bg-blue-900 rounded-md text-white py-1 px-2" href={'/products/list'}>
                Remove Product
            </Link>
            </div>
        </Layout>
    )
}