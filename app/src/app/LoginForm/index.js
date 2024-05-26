import React, { useContext,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from './LoginForm.module.css';
import { useDispatch } from "react-redux";
import { fetchUserData } from '../Redux/auth';
function LoginForm() {
  const dispatch = useDispatch();
  // const [screenWidth, setScreenWidth] = React.useState(innerWidth);
  const { register, handleSubmit, reset , setError, formState: { errors, isValid } } = useForm(
    {
      defaultValues: {
      email: "",
      password:""
    },
    }
  );
  // useEffect(() => {
  //   function handleResize() {
  //     setScreenWidth(innerWidth);
  //   }
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);
  // const apiForm2 = process.env.REACT_APP_API_URL_FORM_TWO
  const onSubmit = async (data) => {
    const values = await dispatch(fetchUserData(data))
    if (!values.payload) return alert("Не вдалося авторизуватись");
    if ("token" in values.payload) localStorage.setItem("token", values.payload.token);
  };


  // if (screenWidth < 1200) {
  //   return <div>Ваш екран занадто малий для перегляду цієї сторінки</div>;
  // }

  return (
	<>
	  <div className={styles.wrapper}>
		 <div className={styles.content}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			  <section id="home">
				 <h1 className={styles.h1}>АВТОРИЗАЦІЯ</h1>
			  </section>

			  <div className={styles.item}>
				 <label htmlFor="email"></label>
				 <input
					className={styles.input}
					placeholder="Логін"
					type="email"
					id="email"
					{...register("email", { required: true })}
				 />
				 {errors.email && (
					<span style={{ color: "red" }}>Введіть логін</span>
				 )}
			  </div>

			  <div className={styles.item}>
				 <label htmlFor="password"></label>
				 <input
					className={styles.input}
					placeholder="Пароль"
					type="password"
					id="password"
					{...register("password", { required: true })}
				 />
				 {errors.password && (
					<span style={{ color: "red" }}>Введіть пароль</span>
				 )}
			  </div>

			  <button className={styles.button} type="submit">
				 ВВІЙТИ
			  </button>
			</form>
		 </div>
	  </div>
	</>
 );
};

export default LoginForm;