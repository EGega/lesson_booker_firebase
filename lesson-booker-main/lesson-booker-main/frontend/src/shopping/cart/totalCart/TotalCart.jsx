import React from 'react'
import styled from "../totalCart/TotalCart.module.css"
import { useSelector } from 'react-redux'
import { selectCart } from "../../../store/index"
import { useNavigate } from 'react-router-dom'
import loadinggif from "../../../assets/gifs/redirect.gif"
const TotalCart = () => {
const cart = useSelector(selectCart)
const {selectedBooks} = cart
const navigate = useNavigate()

if(selectedBooks.length === 0) {
    setTimeout(() => {
        navigate("/books")
    }, 1000)
}
  return (
    <>
    { selectedBooks.length !== 0 ? 
    <div className={styled.container}>
      <h4>Selected Items: {selectedBooks.length} </h4>
      <h4>Total Price: {selectedBooks.reduce((acc, curr) => acc + curr.price, 0)} $ </h4>
      <button className={styled.button} onClick={ () =>  {navigate("/checkout")}} > Complete Shopping </button>
    </div> : 
    <div className={styled.redirect}>
        <h2>Redirecting</h2> 
      <img src={loadinggif} alt="" />
    </div>   
    }
    </>
  )
}

export default TotalCart