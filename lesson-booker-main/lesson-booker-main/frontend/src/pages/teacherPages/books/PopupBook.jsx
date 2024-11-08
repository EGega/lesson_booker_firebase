import { useSelector } from "react-redux"
import { selectCart } from "../../../store/index.js"
import styled from "./PopupBook.module.css"
import { useDispatch } from "react-redux";
import { addBookToCart } from "../../../store/index.js";
const PopupBook = ({popUp, showPopUp, book}) => {
const dispatch = useDispatch();
const addThisBook = () => {
  const isBookAlreadySelected = selectedBooks.some(
    (selectedBook) => selectedBook.id === book.id
  ); 
  if (!isBookAlreadySelected) {
    dispatch(addBookToCart(book));
  }
  showPopUp(false);
};
    const cart = useSelector(selectCart)
    const { selectedBooks} = cart
    console.log(selectedBooks);
  return (
    <>
    <div className={styled.container} >
      <div  className={styled.popup}>
          <div className={styled.select}>
             <img src={book.image} className={styled.image} alt="" />
             <h2>{book.title}</h2>
           <div className={styled.buttons}>
             <button onClick={addThisBook} className={styled.add}>Add to cart</button>
             <button onClick={() => showPopUp(false)} className={styled.cancel}>Cancel</button>
           </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default PopupBook