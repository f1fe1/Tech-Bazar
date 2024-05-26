import styles from './Description.module.css';
import React from 'react';
import { addCartItems } from '@/app/Redux/cartSlice';
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';

function Description({ isPress, setIsPress, good }) {
  const dispatch = useDispatch();
  const addCartItem = (obj) => {
    dispatch(addCartItems(obj));
  };

  return (
	<div className={styles.wrapper}>
	  <div className={styles.container}>
		 <div onClick={() => setIsPress(!isPress)} className={styles.closeIcon}></div>
		 <h2 className={styles.h3}>Опис товару:</h2>
		 <div className={styles.textBox}>
			<p>{good.text1}</p>
		 </div>
		 <Link href="/cart">
			<button onClick={() => addCartItem(good)}>
			  <span>ПРИДБАТИ</span>
			</button>
		 </Link>
	  </div>
	</div>
 );
}

export default Description;
