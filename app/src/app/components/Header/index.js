"use client"
import styles from "./Header.module.css";
import React from "react"
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {setInputValue} from "../../Redux/searchSlice"
import { usePathname } from "next/navigation";
import Link from "next/link";
function Header() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const inputValue = useSelector(state => state.search.inputValue)
  const count = useSelector((state) => state.cart.totalCount)
    let  [open,setOpen] = React.useState("true")
    let openHandler = () => {
        setOpen(!open);
      }
		return (
			<header className={styles.header}>
			  <div className={styles.leftHeader}>
				 {pathname.includes("/description/descr") ? 
					<Link href={"/"}><Image className={styles.arrow} width={35} height={35} src={"/arrowLeft.png"} alt="left" /></Link> :
					<Image width={60} height={60} src={"/logo.svg"} alt="logo" />
				 }
				 <div className={(pathname === "/" || pathname.includes("/description/descr")) ? styles.store_title1 : styles.store_title}>
					<h3 className={styles.title_store}>Used Tech</h3>
					<p>Дешева техніка з Європи</p>
				 </div>
			  </div>
			  {(pathname === "/" || pathname.includes("/description/descr")) ? null :
				 <div className={styles.inpc}>
					<svg alt="img" className={styles.zoom} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
					  <path d="M10 2a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 14a6 6 0 1 1 6-6 6 6 0 0 1-6 6zm10.71 2.29l-2.5-2.5a1 1 0 1 0-1.42 1.42l2.5 2.5a1 1 0 0 0 1.42-1.42z" fill="white"/>
					</svg>
					<input id="search" name="search" onChange={(event) => setInputValue(event.target.value)} value={inputValue} placeholder="пошук..." className={styles.input} type="text" />
				 </div>
			  }
			  <div className={styles.iconCart}>
				 <Link href="/cart"><Image width={30} height={30} src={"/ct.png"} alt="icon" /></Link>
				 <span className={styles.badge}>{count}</span>
			  </div>
			</header>
		 );
	  };
export default Header;
