// import Goods from './Goods';
import React from "react";
import styles from "./HeaderAdmin.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/Redux/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
function HeaderAdmin() {
    const dispatch = useDispatch();
    const pathname = usePathname();
    // const router = useSelector((state) => state.router.value)
    const onClickLogout = () => {
        if (confirm("Ви дійсно хочете вийти?")) {
            dispatch(logout());
            localStorage.removeItem("token");
        }
    };
    return (
        <>
            <div className={styles.wrapper}>
                <ul className={styles.header}>
                    <Link href="/admin">
                        <li
                            className={
                                pathname == "/admin" || pathname.length > 16
                                    ? styles.header_item_active
                                    : styles.header_item
                            }
                        >
                            Товари
                        </li>
                    </Link>
                    <Link href={`/admin/create/0`}>
                        <li
                            className={
                                pathname == "/admin/create/0"
                                    ? styles.header_item_active
                                    : styles.header_item
                            }
                        >
                            Додати товар
                        </li>
                    </Link>
                    <li onClick={onClickLogout} className={styles.header_item}>
                        Вихід
                    </li>
                </ul>
            </div>
        </>
    );
}
export default HeaderAdmin;
