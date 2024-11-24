import { useSelector } from "react-redux"
import { selectCart } from "../../../store"
const LessonInfo = () => {
    const cart = useSelector(selectCart)
    const { selectedBooks} = cart
    console.log(selectedBooks);
  return (
    <div>LessonInfo</div>
  )
}

export default LessonInfo