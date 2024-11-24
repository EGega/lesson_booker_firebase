import React from 'react'
import { useSelector } from 'react-redux'
import { selectCart } from '../../../store'
import { removeBookFromCart } from '../../../store'
import styled from "./CheckoutTotal.module.css"
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
const CheckoutTotal = () => {
  console.log(process.env);
  const apiKey = process.env.REACT_APP_PUBLIC_KEY
  console.log(apiKey);
  const stripePromise = loadStripe("pk_test_51OnOCVLVDzYn9hzV24mti4SD38VrF2mhfYEEIpVSgkZQ0s0iw0iYUA5A8mpup4rQrB5ufDhdIQx3ir2IYcqxbFtf00xEP11yXY")
  const cart = useSelector(selectCart)
  const {selectedBooks} = cart 
  console.log(selectedBooks);
  const dispatch = useDispatch()
  const removeHandler = (id) => {
    dispatch(removeBookFromCart(id))
  }
  const handlePayment = async () => {
    const stripe = await stripePromise;
  
  const session = await fetch('http://localhost:4000/create-checkout-session', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ items: selectedBooks }),
}).then((res) => res.json());

const result = await stripe.redirectToCheckout({ sessionId: session.id });
  };
  
  return (
    <>
    <div className={styled.container}>
        <div className={styled.selectedBooks}>
        {selectedBooks.map((book) => {
            const {title, image, quantity, price, id} =  book
            return (
          <div className={styled.book}>
            <img  src={image} alt="" />
            <p>{title}</p>
            <p>{quantity === 1 ? `${quantity} Book` : `${quantity} Books`}</p>
            <p>{price}$</p>
             <FaRegTrashAlt className={styled.delete}  onClick={() => removeHandler(id)} /> 
          </div> )
        })}
        </div>
     {
     selectedBooks.length !== 0 && <div>
      <h4>Total Price: {selectedBooks.reduce((acc, curr) => acc + curr.price, 0)} $ </h4>  
      <button className={styled.button} onClick={handlePayment}> Pay </button>
    </div> 
     } 
    </div>
    </>
  )
}
 
export default CheckoutTotal