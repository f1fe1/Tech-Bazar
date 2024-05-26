"use client"
import styles from "./OrdersForm.module.css";
import React from "react";
import { useState } from "react";
import FramedCart from "../FramedCart";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import axios from "../../axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { clearItems } from "../../Redux/cartSlice";
function OrdersForm({ openCart,itemsCart,setItemsCart,sum }) {
    const cartItems = useSelector (state => state.cart.cartItems)
    const totalCount = useSelector((state) => state.cart.totalCount);
    const cartTotalPrice = useSelector((state) => state.cart.cartTotalPrice);
    const [citys ,setCitys] = useState([]);
    const cats = [];
for (let i = 0; i < cartItems.length; i++ ){
  if (cartItems[i].category == 1) cats.push(cartItems[i].category);
  console.log(cats);
}
    let [onSub, setOnSub] = useState(false);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
  const apiForm2 = process.env.REACT_APP_API_URL_FORM_TWO
//   const onChangeCity = () => {
//     const requestData = {
//       apiKey: "09cac77573a7c8ad80764c2a9f1e9d3b",
//       modelName: "Address",
//       calledMethod: "getSettlements",
//       methodProperties: {
//         AreaRef : "dcaae60e-4b33-11e4-ab6d-005056801329"
//       }
//     }
  
//   axios.get('https://api.novaposhta.ua/v2.0/json/', { params: requestData })
//       .then(response => {
//           console.log('Response:', response.data);
//       })
//       .catch(error => {
//           console.error('Error:', error);
//       });
//   }

// onChangeCity()


  const onSubmit = (data) => {
    const newData = { ...data,totalCount:totalCount,  cartTotalPrice:cartTotalPrice };
    newData.items = []; // Створення масиву items в newData
    cartItems.forEach((item) => {
      newData.items.push({ // Додавання нового об'єкту до масиву
        title: item.title,
        price: item.price,
        count: item.count,
      });
    });
      console.log("---------------------");
      console.log(newData);
      console.log("---------------------");
    axios.post("/form2", newData)
    .then((response) => {
      if (response.status === 200) {
        dispatch(clearItems())
        setOnSub(!onSub);
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Form submission failed.');
    });
  };      
    // fetchData() 
    return onSub ? (
        <FramedCart openCart={openCart} />
    ) : (
        <div className={styles.drawer}>
          <h2 className={styles.h2}>Заповніть поля:</h2>
            <div className={styles.cart_Items}>
                <div className={styles.form}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("fullName", { 
                                required: "Field is required",
                                minLength: 2,
                                maxLength: 50,
                            })}
                            name="fullName"
                            type="text"
                            placeholder="прізвище та ім'я"
                        />
                        {errors.fullName && <p style={{color:"red",height:'-20px',marginTop:"-15px",marginBottom:"-15px"}}>{errors.fullName.message}</p>}
                        <div className={styles.item}>
        <label htmlFor="email"></label>
        <input placeholder="e-mail" type="email" id="email" {...register('email', { required:"Field is required" })} />
       
      </div>
      {errors.email && <span style={{color:"red",height:'-20px',marginTop:"-15px",marginBottom:"-15px"}} >{errors.email.message}</span>}    
                        <input 
                            {...register("phone",{ 
                                required: "Field is required",
                            })}
                            name="phone"
                            type="tel"
                            placeholder="телефон"
                        />
                         {errors.phone && <p style={{color:"red",height:'-20px',marginTop:"-15px",marginBottom:"-15px"}}>{errors.phone.message}</p>}
                        <input
                            {...register("city",{ 
                                required: "Field is required",
                                minLength: 2,
                                maxLength: 20,
                            })}
                            name="city"
                            type="text"
                            placeholder="місто"
                        />
                        {errors.city && <p style={{color:"red",height:'-20px',marginTop:"-15px",marginBottom:"-15px"}}>{errors.city.message}</p>}
                        {/* <select onChange={onChangeCity} className={styles.select}  id="city" {...register('city',{ 
                                required: "Field is required",
                            })}>
<option className={styles.option} value=" ">Виберіть область</option>
<option className={styles.option} value="dcaad3d6-4b33-11e4-ab6d-005056801329">АРК</option>
<option className={styles.option} value="dcaad5a7-4b33-11e4-ab6d-005056801329">Вінницька область</option>
<option className={styles.option} value="dcaad676-4b33-11e4-ab6d-005056801329">Волинська область</option>
<option className={styles.option} value="dcaad735-4b33-11e4-ab6d-005056801329">Дніпропетровська область</option>
<option className={styles.option} value="dcaad81c-4b33-11e4-ab6d-005056801329">Донецька</option>
<option className={styles.option} value="dcaad8fb-4b33-11e4-ab6d-005056801329">Житомирська область</option>
<option className={styles.option} value="dcaad993-4b33-11e4-ab6d-005056801329">Закарпатська область</option>
<option className={styles.option} value="dcaada26-4b33-11e4-ab6d-005056801329">Запорізька область</option>
<option className={styles.option} value="dcaadac6-4b33-11e4-ab6d-005056801329">Івано-Франківська область</option>
<option className={styles.option} value="dcaadb64-4b33-11e4-ab6d-005056801329">Київська область</option>
<option className={styles.option} value="dcaadbf9-4b33-11e4-ab6d-005056801329">Кіровоградська область</option>
<option className={styles.option} value="dcaadc91-4b33-11e4-ab6d-005056801329">Луганська область</option>
<option className={styles.option} value="dcaadd3a-4b33-11e4-ab6d-005056801329">Львівська область</option>
<option className={styles.option} value="dcaaddd7-4b33-11e4-ab6d-005056801329">Миколаївська область</option>
<option className={styles.option} value="dcaade6d-4b33-11e4-ab6d-005056801329">Одеська область</option>
<option className={styles.option} value="dcaadf02-4b33-11e4-ab6d-005056801329">Полтавська область</option>
<option className={styles.option} value="dcaadfa0-4b33-11e4-ab6d-005056801329">Рівненська область</option>
<option className={styles.option} value="dcaae036-4b33-11e4-ab6d-005056801329">Сумська область</option>
<option className={styles.option} value="dcaae303-4b33-11e4-ab6d-005056801329">Тернопільська область</option>
<option className={styles.option} value="dcaae3a1-4b33-11e4-ab6d-005056801329">Харківська область</option>
<option className={styles.option} value="dcaae44b-4b33-11e4-ab6d-005056801329">Херсонська область</option>
<option className={styles.option} value="dcaae4e5-4b33-11e4-ab6d-005056801329">Хмельницька область</option>
<option className={styles.option} value="dcaae57c-4b33-11e4-ab6d-005056801329">Черкаська область</option>
<option className={styles.option} value="dcaae60e-4b33-11e4-ab6d-005056801329">Чернівецька область</option>
<option className={styles.option} value="dcaae6a8-4b33-11e4-ab6d-005056801329">Чернігівська область</option>
</select> */}
{/* {errors.city && <p style={{color:"red",height:'-20px',marginTop:"-15px",marginBottom:"-15px"}}>{errors.city.message}</p>} */}
                        <input
                            {...register("number",{ 
                                required: "Field is required",
                                minLength: 2,
                                maxLength: 20,
                            })}
                            name="number"
                            type="number"
                            placeholder="відділення нової пошти"
                        />
                        {errors.number && <p style={{color:"red",height:'-20px',marginTop:"-15px",marginBottom:"-15px"}}>{errors.city.message}</p>}
                        <button onClick={handleSubmit(onSubmit)} className={styles.submit} type="submit">ОФОРМИТИ</button>
                        <Link href="/cart"> <button className={styles.back} >НАЗАД</button> </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default OrdersForm;
