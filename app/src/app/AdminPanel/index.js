// import Goods from './Goods';
import React from "react";
import styles from "./AdminPanel.module.css";
import { useSelector } from "react-redux";
import Goods from "../components/Goods";
import HeaderAdmin from "../components/HeaderAdmin";

function AdminPanel() {
    // const router = useSelector((state) => state.router.value)
    return (
        <>
         <HeaderAdmin/>
            <div className={styles.wrapper}>
                <Goods />
            </div>
        </>
    );
}
export default AdminPanel;
