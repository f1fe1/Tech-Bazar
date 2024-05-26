"use client";
import Image from "next/image";
import styles from "./Home.module.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Goods from "../../../components/Goods";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
export default function Main() {
    const scrollRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true); // Додано useState
    const [currentPage, setCurrentPage] = useState(0); // Додайте стан для поточної сторінки
    const scrollToTop = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ top: 0, behavior: "smooth" });
        }
    };
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);
    useEffect(() => {
        console.log("useEffect called with currentPage:", currentPage);
        try {
            scrollToTop();
            console.log("scrollTo executed successfully");
        } catch (error) {
            console.error("Error in scrollTo:", error);
        }
    }, [currentPage]);
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

                    <Goods currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                    <Footer />
                </>
            )}
        </main>
    );
}
