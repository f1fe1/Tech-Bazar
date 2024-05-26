"use client";
import Image from "next/image";
import styles from "./Goods.module.css";
import { useState } from "react";
import Good from "./Good";
import Link from "next/link";
import Categor from "../categor";
import { usePathname } from 'next/navigation'
import Description from "../Description";
import { useEffect } from "react";
import MyLoader from "./Good/PizzaBlock";
import { useSelector, useDispatch } from "react-redux";
import { getCatId, setCatId } from "../../Redux/filterSlice";
import { fetchGoods } from "@/app/Redux/goodsSlice";
import ReactPaginate from "react-paginate";
export default function Goods({ currentPage, setCurrentPage }) {
    const isLoading = useSelector((state) => state.goods.status === "loading");
    const dispatch = useDispatch();
    let [isPress, setIsPress] = useState(false);
    const goods = useSelector((state) => state.goods.goods);
    const catId = useSelector((state) => state.filter.catId);
    const inputValued = useSelector((state) => state.search.inputValue);
    const pathname = usePathname();
    const parts = pathname.split("/home/goods/");
    const valueCat = parts[1];
    const [idf, setIdf] = useState(0);
    const pullOut = (idt) => {
        setIdf(idt);
    };
   console.log(catId);
    const goodsPerPage = 15; // Кількість товарів на одній сторінці
    const pullOutD = (idd) => {
        setIdf(idd);
    };
    useEffect(() => {
        dispatch(fetchGoods());
      dispatch(setCatId(valueCat))
        console.log(catId);
    }, []);
    // console.log(goods);
    const ar = [1, 2, 3, 4, 5, 6, 7, 8];
    const startIndex = currentPage * goodsPerPage;
    const endIndex = startIndex + goodsPerPage;
    const currentGoods = goods.slice(startIndex, endIndex);
    const filtredGoods = goods.filter((item) =>
        item.title.toLowerCase().includes(inputValued.toLowerCase())
    );
    console.log(filtredGoods);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    return (
        <>
           { (pathname === "/admin") ? 
            <div className={styles.wrapperAdmin}>
            <div className={styles.goods}>
           { goods.map((item, index) => (
                        <Good
                            isPress={isPress}
                            setIsPress={setIsPress}
                            setIdf={setIdf}
                            callback2={(idd) => pullOut(idd)}
                            callback={(idt) => pullOut(idt)}
                            key={index}
                            good={item}
                        />
                    ))}
                 </div>
            </div>
                :
        <div className={styles.wrapper}>
            <Link className={styles.a} href={"/"}>
                <div className={styles.button_cat}>
                <img width={40} height={40} src="/boxes.png" alt="" />
                <span>Каталог товарів</span>
            </div>
            </Link> 
            <div className={styles.goods}>
                {isLoading ? (
                    ar.map(( _ , index) => <MyLoader key={index}/>)
                ) : inputValued ? (
                    ( filtredGoods
                            .filter((obj) => obj.category === catId)
                            .map((item, index) => (
                                <Good
                                    isPress={isPress}
                                    setIsPress={setIsPress}
                                    setIdf={setIdf}
                                    callback={(idt) => pullOut(idt)}
                                    key={index}
                                    good={item}
                                />
                            ))
                     )
                ) :  (
                    currentGoods.filter((obj) => obj.category === catId)
                        .map((item, index) => (
                            <Good
                                isPress={isPress}
                                setIsPress={setIsPress}
                                setIdf={setIdf}
                                callback={(idt) => pullOut(idt)}
                                key={index}
                                good={item}
                            />
                        ))
                )}
            </div>
            <ReactPaginate
                previousLabel={"←"}
                nextLabel={"→"}
                breakLabel={"..."}
                pageCount={Math.ceil(goods.length / goodsPerPage)}
                marginPagesDisplayed={0}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
            />
           
        </div>
}
        </>
    );
}
