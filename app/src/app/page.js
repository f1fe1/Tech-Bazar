"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Goods from "./components/Goods";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Cart from "./cart/page";
import Categor from "./components/categor";
export default function Home() {
    const scrollRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true); // Додано useState
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);
    
    return (
        <main ref={scrollRef} className={styles.main}>
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
                <>
                    <Header />

                    {/* <Goods currentPage={currentPage} setCurrentPage={setCurrentPage}/> */}
                    <Categor />
                    <Footer />
                </>
            )}
        </main>
    );
}
