import styles from './Item.module.css';
import {removeItem,addCartItems,increment,decrement} from "../../../Redux/cartSlice";
import { useSelector,useDispatch } from "react-redux";
import Image from 'next/image';
function Item({_id,imgmain,price,title,typeid,sizes,type}) {
    const dispatch = useDispatch();
    const cartItems = useSelector (state => state.cart.cartItems)
    const cartItem   = cartItems.find((obj) => (obj._id == _id ))
    const addedCount = cartItem ?  cartItem.count : 0; 
  return (
            <div className={styles.cart_item}>
              <div className={styles.descr}>
              <div className={styles.mainimg}><Image width={50} height={50} src={imgmain} alt="icon" /></div>
              <div className={styles.title_inner_cart}>
                <h3>{title}</h3>
              </div>
              </div>
              <div className={styles.cart_item_rigth}>
              <div className={styles.count}>
                <span onClick={() => dispatch(decrement({_id}))} className={styles.span_min} >-</span>
                <span>{addedCount}</span>
                <span onClick={() => dispatch(increment({_id}))} className={styles.span_plus} >+</span>
              </div>
              <div className={styles.price}>{(price * addedCount)}₴</div>
              </div>
              <Image onClick={() => dispatch(removeItem({_id}))} className={styles.del_cart} width={20} height={20} src="/close.png" alt="icon" />
            </div>
  );
}
export default Item;
