"use client";
import styles from "./descr.module.css";
import React from "react";
import { addCartItems } from "@/app/Redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { fetchGoods } from "@/app/Redux/goodsSlice";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "../../..//axios";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
// import { useState,  } from 'react';
function Description() {
  // const cartItems  = useSelector(state => state.cart.cartItems)
  // const cartItem   = useSelector (state => state.cart.cartItems.find((obj) => obj._id === good._id   ))
  // {openDescr,items,id}
  // onClick={() => openDescr()}
  // const dispatch  = useDispatch();
  // const addCartItem = (obj) =>{
  //     dispatch(addCartItems(obj));
  // }
  // const goods = useSelector((state) => state.goods.goods);
  const dispatch = useDispatch();
  const [parentData, setParentData] = useState(0);
  const [isLoading, setIsLoading] = useState("true");
  const [title, setTitle] = useState("");
  const [text1, setText1] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [slides, setSlides] = useState([]);
  const [good, setGood] = useState({});
  // const slides=[["/coffeMachine.jpg","/headPhones.jpg","/sl3.jpg","/sl1.jpg","/sl2.jpg"]]
  const pathname = usePathname();
  const parts = pathname.split("/description/descr/");
  const idf = parts[1];
  // useEffect(() => {
  //     const {data} = axios.get(`/posts/${idf}`);
  //     console.log(data)
  //   }, []);

  useEffect(() => {
    if (idf) {
      axios
        .get(`/posts/${idf}`)
        .then(({ data }) => {
          setGood(data);
          setIsLoading(false);
          console.log(data);
          setTitle(data.title);
          setText1(data.text1);
          setPrice(data.price);
          setCategory(data.category);
          setSlides([data.imagesSlider]);
          //   setValue("title", data.title.toString());
          //   setValue("price", data.price);
          //   setValue("text1", data.text1);
          //   setValue("category", data.category);
          //   setImgUrl(data.imgmain);
          //   setImgUrl2(data.imgsecond);
          //   setImgUrl3(data.imgthird);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const addCartItem = (obj) => {
    dispatch(addCartItems(obj));
  };

  //   const good = goods.find(obj => obj._id === idf);
  //   console.log(good);

  const [currentIndex, setcurrentIndex] = useState(0);
  const goToPrevios = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? slides[parentData].length - 1
      : currentIndex - 1;
    setcurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides[parentData].length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setcurrentIndex(newIndex);
    if (newIndex === 0) {
      setcurrentIndex(newIndex);
    }
  };
  const goToSlide = (slideIndex) => {
    setcurrentIndex(slideIndex);
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.preloadContainer}>
          <Image
            className={styles.logoPreload}
            width={300}
            height={300}
            src="/logo.svg"
            alt="logo"
          />
        </div>
      ) : (
        <div className={styles.wrapper}>
          <Header />
          <div className={styles.container}>
            <div className={styles.sliderStyles}>
              <div className={styles.slideStyles}>
                <img
                  className={styles.sl_img}
                  width={1500}
                  height={750}
                  src={slides[parentData][currentIndex]}
                />
                <div className={styles.arrows}>
                  <img
                    onClick={goToPrevios}
                    className={styles.leftArrowStyles}
                    height={32}
                    width={32}
                    src="/rarrow.png"
                    alt=""
                  />
                  <img
                    className={styles.rightArrowStyles}
                    onClick={goToNext}
                    height={32}
                    width={32}
                    src="/larrow.png"
                    alt=""
                  />
                </div>
              </div>

              <div className={styles.dotsContainer}>
                {slides[parentData].map((item, slideIndex) => (
                  <img
                    src={item}
                    width={100}
                    height={70}
                    onClick={() => goToSlide(slideIndex)}
                    className={`${styles.dots} ${
                      currentIndex === slideIndex ? styles.activeDot : ""
                    }`}
                    key={slideIndex}
                  />
                ))}
              </div>
            </div>
            <div className={styles.rigth_side}>
              <h2 className={styles.h3}>{title}</h2>
              <p className={styles.price}>{price} грн.</p>
              <p className={styles.descr}> {text1}</p>

              <div className={styles.forb}>
                <Link onClick={() => addCartItem(good)} href="/cart">
                  {" "}
                  <button className={styles.button}>ПРИДБАТИ</button>{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
export default Description;
