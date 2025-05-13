import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  url = "http://localhost:4000";
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.data) {
        console.log(response.data.data);
        setOrders(response.data.data);
      }
      else {
        toast.error("Error");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <ToastContainer /> {/* Fixed: ToastContainer must be rendered */}
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => ( // orders will now be populated
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", " // Added comma for clarity
                  }
                })}
              </p>
              <p className="otder-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                </p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out of Delivery">Out of Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
