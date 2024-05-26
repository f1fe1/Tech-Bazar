"use client"
import styles from './Cart.module.css';
import EmptyCart from './EmptyCart';
import FullCart from './FullCart';
import { useSelector,useDispatch } from "react-redux";
function Cart() {
  const cartItems = useSelector(state => state.cart.cartItems)
  return (
        <>
        <div className={styles.container}>
      {(cartItems.length != 0) ?
      <FullCart/> :
       <EmptyCart/>
    }
      </div> 

</>
  );
}

export default Cart;
