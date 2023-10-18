import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function OrdersPage(){
    const [orders, setOrders] = useState([]);
    useEffect(()=> {
        axios.get('/api/orders').then(res => {
            setOrders(res.data);
        }) ;
    }, []);
    return(
        <Layout>
            <h1>Orders</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Date / Time</th>
                        <th>Recipient</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Products</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map(order => (
                        <tr key={order._id}>
                            <td>
                                {(new Date(order.createdAt)).toLocaleString()}
                            </td>
                            <td>
                                {order._id}
                            </td>
                            <td>
                                {order.name}
                            </td>
                            <td>
                                {order.email}
                            </td>
                            <td>
                                {order.city} 
                                <br />
                                {order.country}
                                <br />
                                {order.postalCode}
                            <br/>
                                {order.streetAddress}
                            </td>
                            <td>
                                {order.line_items.map(item => (
                                    <>
                                    {item.price_data?.product_data.name} X {item.quantity} <br/>
                                    {/* {JSON.stringify(item)}<br/> */}
                                    </>
                                ))}
                            </td>
                            <td>
                                {order.paid ? "Closed" : "Open"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}