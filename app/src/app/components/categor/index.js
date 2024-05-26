"use client";
import React from "react";
import styles from "./Categor.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { getCatId, setCatId } from "../../Redux/filterSlice";
function Categor() {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const [isClicked, setIsclicked] = useState(false);
  const categories = [
    { name: "Ноутбуки", src: "/lapTops.jpg", urlValue: "lapTops" },
    { name: "Смартфони", src: "/Smartphones.jpg", urlValue: "smartphones" },
    { name: "Навушники", src: "/headPhones.jpg", urlValue: "headphones" },
    {
      name: "Музичне обладнання",
      src: "/musicObl.png",
      urlValue: "musicmachines",
    },
    { name: "Павербанки", src: "/paverbank.jpg", urlValue: "paverbanks" },
    {
      name: "Кавові машини",
      src: "/coffeMachine.jpg",
      urlValue: "coffemachines",
    },
    // { name: "ПК", src: "/pc.jpg" , urlValue:"pc" },
    { name: "Друкарське обладнання", src: "/R.jpg", urlValue: "printmachines" },
    { name: "Комп'ютери", src: "/pc.jpg", urlValue: "pc" },
  ];
  const ar = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
	<>
	  <ul className={pathName == "/" ? styles.categories : styles.categories2}>
		 {categories.map((value) => (
			<Link key={value.urlValue} href={`/home/goods/${value.urlValue}`}>
			  <li key={value.urlValue} className={styles.categories_Item}>
				 {value.name}
				 <Image height={150} width={150} src={value.src} alt="img" />
			  </li>
			</Link>
		 ))}
	  </ul>
	</>
 );
};

export default Categor;
