"use client"
import Image from 'next/image'
import styles from './Good.module.css'
import { usePathname } from 'next/navigation'
import { useSelector,useDispatch } from "react-redux";
import Link from 'next/link';
import { useState,useEffect } from 'react';
import {addCartItems} from '@/app/Redux/cartSlice';
import { fetchRemoveGoods } from '@/app/Redux/goodsSlice';
import axios from '../../../axios';
export default function Good({isPress, setIsPress, setIdf, good}) {
  const cartItems  = useSelector(state => state.cart.cartItems)
  const cartItem   = useSelector (state => state.cart.cartItems.find((obj) => obj._id === good._id ))
  const pathname = usePathname();
  const dispatch  = useDispatch(); 
  console.log("id" + " " + good._id);
  const isEditing = (pathname.includes("/home/goods/") ) ? true : false  ;
const removeGood = async (_id) => {
  const urlToDelete = good.imgmain.replace('https://usedtech-fb06c88c0961.herokuapp.com/uploads', '');
  const urlsToDelete = good.imagesSlider.map(item => {
    return item.replace('https://usedtech-fb06c88c0961.herokuapp.com/uploads', '');
  });
  try {
    urlsToDelete && await axios.post("/removeImages",{ urls: urlsToDelete }); 
    urlToDelete && await axios.post("/removeImage", { urlToDelete: urlToDelete }); 
    dispatch(fetchRemoveGoods(_id));
  } catch(error) {
    console.error('Помилка видалення файлу:', error);
  }
}
  return (
      <div className={styles.Item}>
         { isEditing ? null :
   <div className={styles.editItems}>
                  <Image onClick={() => removeGood(good._id)}  width={50} height={50} className={styles.delete} src="/trashBox.png" alt="jjk" />
                  <Link href={`/admin/create/${good._id}`}> <Image width={50} height={50} className={styles.edit} src="/edit.png" alt="hjh" /></Link>
                  </div>
                  }
               <Image className={styles.goodPhoto} height={200} width={200} src={good.imgmain} alt='jk'/>
               <p className={styles.title}>{good.title}</p>
               <div className={styles.item_footer}>
               <span className={styles.price} >{good.price} ₴</span>
               { (pathname === "/admin") ? null :
               <Link href={`/description/descr/${good._id}`} ><button className={styles.button}     ><img width={15} height={15} src="/zoom.png" alt="img" />ДЕТАЛІ</button></Link> 
              }
               </div>
            </div>
   
  )
}
