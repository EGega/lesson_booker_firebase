import React from 'react'
import styled from "./Numerator.module.css"
import { useSelector } from "react-redux"
import { selectCart } from "../../store/index"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
const Numerator = () => {
const cart = useSelector(selectCart)
const { selectedBooks} = cart
const navigate = useNavigate()
console.log(selectedBooks.length);
  return (
    <>
    {selectedBooks.length !== 0 ? <div className={styled.main}>
      {/* <AiOutlineShoppingCart className={styled.card} /> */}
      <h4 onClick={() => {
        navigate("/cart")
      }} className={styled.number}>{selectedBooks.length} </h4> 
     </div> : null}

    </>
  )
}

export default Numerator