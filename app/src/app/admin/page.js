"use client"
import { selectIsAuth } from '../Redux/auth';
import styles from './Admin.module.css';
import AdminPanel from '../AdminPanel';
import LoginForm from '../LoginForm';
import { fetchAuthMe } from '../Redux/auth';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';

function Admin() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe())
  },[])
  const isAuth = useSelector(selectIsAuth);
 console.log("isAuth"+ ":" + isAuth)
  return (
   <div className={styles.wrapper}>
   {isAuth ? <AdminPanel/> : <LoginForm/> }
   </div>
      );
}

export default Admin;
