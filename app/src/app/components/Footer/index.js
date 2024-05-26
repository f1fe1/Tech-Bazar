"use client"
import styles from './Footer.module.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
// import { Link as ScrollLink, scroller  } from "react-scroll";
// import { isMobile } from 'react-device-detect';
// function handleClickStart()  {
//     scroller.scrollTo("home", {
//       duration: 800,
//       delay: 0,
//       smooth: "easeInOutQuart",
//     });
//   }
  
function Footer() {  
	return (
		<>
		  <footer className={styles.footer}>
			 <a href='https://www.instagram.com/s.p.studio.ua/' target="_blank" className={styles.fd}>
				© 2023 Simplifier of business processes.
			 </a>
		  </footer>
		</>
	 );
  };

export default Footer;