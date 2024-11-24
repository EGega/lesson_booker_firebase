import Navbar from '../../components/navbar/Navbar'
import styled from './Cart.module.css'
import TotalCart from './totalCart/TotalCart'
import { useSelector } from 'react-redux'
import { selectCart } from "../../store/index"
import { useDispatch } from 'react-redux';
import { removeBookFromCart, increaseThePrice, decreaseThePrice, removeBookIfQuantityZero } from "../../store/index.js";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
const Cart = () => {
  const cart = useSelector(selectCart)
  const {selectedBooks} = cart
  console.log(selectedBooks);
  const dispatch = useDispatch()
  const removeHandler = (id) => {
    dispatch(removeBookFromCart(id))
  }

  const increaseHandler = (index) => {
  dispatch(increaseThePrice(index))
  }
  const decreaseHandler = (index) => {
   dispatch(decreaseThePrice(index))
   dispatch(removeBookIfQuantityZero(index))
  } 

  return (
    <>
    <Navbar/>
   <div className={styled.container}>
    <div className={styled.products} >
      {
        selectedBooks && 
      selectedBooks?.map((el, index) => {
        const {title, author, price, image, id, quantity } = el
       return ( 
       <div className={styled.product} key={id}>
          <img src={image} className={styled.img} alt="" />
          <div className={styled.nameAndPrice}>
           <div className={styled.nameAmountDelete}>
           <h4>{title} by {author}</h4>
          <div className={styled.incDecDel} >
              <div className={styled.incDec}>
               <CiCircleMinus className={styled.dec} onClick={() => {
                  decreaseHandler(index, quantity, id)}
               }  />
               <input  type="number" min="0" max="10" value={quantity} className={styled.number}  />
               <CiCirclePlus onClick={() => increaseHandler(index)} className={styled.inc} />
              </div>
            <FaRegTrashAlt onClick={() => removeHandler(id)} className={styled.delete}/>
            </div>
          </div>
          <h3>{price} $</h3>
          </div>
        </div>
         )    
        })
        
      }

    </div>
      <TotalCart />
   </div>
    </>
  )
}

export default Cart

