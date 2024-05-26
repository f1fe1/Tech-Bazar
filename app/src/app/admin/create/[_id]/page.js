"use client"
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation'
import { useState } from 'react';
import axios from '../../../axios';
import styles from './create.module.css';
import HeaderAdmin from '@/app/components/HeaderAdmin';
function Create(props) {
  const pathname = usePathname()
  const [imgUrl, setImgUrl] = useState("");
  const [imgUrls, setImgUrls] =  React.useState([]);
  function extractRestOfString(inputString, delimiter) {
    const delimiterIndex = inputString.indexOf(delimiter);
    if (delimiterIndex !== -1) {
      return inputString.slice(delimiterIndex + delimiter.length);
    }
    return inputString;
  }
  const id = extractRestOfString(pathname, '/admin/create/');  
  console.log(typeof(imgUrls));
  console.log(imgUrls);
  const isEditing = (id != "0") ? true : false;
  const { register, handleSubmit, reset , setValue , formState: { errors } } = useForm();
  // const apiForm2 = process.env.REACT_APP_API_URL_FORM_TWO
  const onSubmit = (data) => {
    const newData =  { ...data, imgmain: imgUrl , imagesSlider: imgUrls };
    { isEditing ?  axios.patch(`/posts/${id}`, newData)
    .then(function (response) {
      alert("Елемент успішно відредаговано)");
      reset()
    }).then(setImgUrl("")).then(setImgUrls([]))
    .catch(function (error) {
      alert("Не вдалося відредагувати елемент) Спробуйте будь ласка пізніше)");
    })
     : axios.post("/posts", newData)
    .then(function (response) {
      alert("Елемент успішно додано)");
      reset()
    }).then(setImgUrl("")).then(setImgUrls([]))
    .catch(function (error) {
      alert("Не вдалося додати елемент) Спробуйте будь ласка пізніше)");
    }); }
  };
  const handleChangeFile = async (event) => {
    try {
        const formData = new FormData ()
        const file = event.target.files[0];
        formData.append('image', file)
        const {data} = await axios.post("/uploadImage", formData)
        // setImgUrl(`https://ehealthy-767d8856a732.herokuapp.com${data.url}`);
        setImgUrl(`http://localhost:4444${data.url}`);
       
    } catch (error) {
      console.warn(error);
      alert("Помилка при завантаженні файлу")
    }
  }
  const handleChangeFiles = async (event) => {
    try {
        const formData = new FormData ();

        // Отримуємо всі вибрані файли
        const files = event.target.files;

        // Перебираємо кожен файл
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]); // Додаємо кожен файл до FormData з іменем 'images'
        }
        const {data} = await axios.post("/uploadImages", formData);
        const modifiedUrls = data.urls.map(url => 'http://localhost:4444' + url);
        setImgUrls(modifiedUrls);
       
    } catch (error) {
      console.warn(error);
      alert("Помилка при завантаженні файлу")
    }
}
  
  React.useEffect(()=>{
    if (id !== "0" && id !== undefined && id !== null) {
    axios.get(`/posts/${id}`).then( ({data}) => {
      setValue("title", data.title.toString());
      setValue("price", data.price);
      setValue("text1", data.text1);
      setValue("category", data.category);
      setImgUrl(data.imgmain);
      setImgUrls(data.imagesSlider);
    } ).catch((err) =>{
      console.log(err);
    })
  }
  },[])

  const deleteImage = async () => {
    const urlToDelete = imgUrl.replace('http://localhost:4444/uploads', '');
    try {
      await axios.post("/removeImage", { urlToDelete: urlToDelete }); 
      setImgUrl(""); 
    } catch(error) {
      console.error('Помилка видалення файлу:', error);
    }
  }

  const handleDeleteImage = async (event, index) => {
    event.preventDefault();
    const urlToDelete = imgUrls[index].replace('http://localhost:4444/uploads', '');
    console.log("URLTO :" + urlToDelete) // Отримуємо URL для видалення
    
    try {
      await axios.post("/removeImage", { urlToDelete: urlToDelete }); // Викликаємо бекенд для видалення
      const updatedUrls = [...imgUrls.slice(0, index), ...imgUrls.slice(index + 1)]; // Оновлюємо стан
      setImgUrls(updatedUrls);
    } catch (error) {
      console.error('Помилка видалення файлу:', error);
    }
};
  return (
    <>
    <HeaderAdmin/>
    <div className={styles.wrapper}>
    <div className={styles.content}>
    <div className={styles.item}>
  <label htmlFor="img1">Фото товару:</label>
  <input 
    onChange={handleChangeFile}   
    className={styles.inputPhoto} 
    type="file" 
    id="img1" 
    required
  />
   { imgUrl && <div className={styles.phoitem}> 
 <img width={100} height={100} src={imgUrl} alt="product" /> 
<button onClick={deleteImage} className={styles.butDel}>Видалити</button>
</div>
}
</div>
<div className={styles.item} >
  <label htmlFor="imgsSlider">Фото слайдеру товару:</label>
  <input 
    onChange={handleChangeFiles}   
    className={styles.inputPhoto} 
    type="file" 
    multiple
    id="imgsSlider" 
    required
  />
  <div className={styles.imgs}>
  {imgUrls.map((item, index) => <div  key={item}  className={styles.phoitem}> 
  <img key={item} width={100} height={100} src={item} alt={`product ${index}`} /> 
  <button  key={item}  onClick={(e) => handleDeleteImage(e, index)} className={styles.butDel}>Видалити</button>
  </div>
  )}
  </div>
</div>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.item}>
  <label htmlFor="category"></label>
  <select className={styles.select} id="category" {...register('category', { required: true })}>
    <option className={styles.option1} value="lapTops">      Ноутбуки</option>
    <option className={styles.option}  value="smartphones">  Смартфони</option>
    <option className={styles.option}  value="headphones">   Навушники</option>
    <option className={styles.option}  value="musicmachines">Музичне обладнання</option>
    <option className={styles.option}  value="paverbanks">   Павербанки</option>
    <option className={styles.option}  value="coffemachines">Кавові машини</option>
    <option className={styles.option}  value="printmachines">Друкарське обладнання</option>
    <option className={styles.option}  value="pc">Комп&apos;ютери</option>
  </select>
  {errors.category && <span style={{color:"red"}}>snajdshb</span>}
</div>
      <div className={styles.item}>
        <label htmlFor="title"></label>
        <input   className={styles.input}  placeholder=" назва товару" type="text" id="name" {...register('title', { required: true })} />
        {errors.title && <span style={{color:"red"}} >всі поля мають бути заповнені</span>}
      </div>
      <div className={styles.item}>
        <label htmlFor="price"></label>
        <input   className={styles.input}  placeholder=" ціна" type="number" id="price" {...register('price', { required: true })} />
        {errors.price && <span style={{color:"red"}} >всі поля мають бути заповнені</span>}
      </div>
      <div className={styles.item}>
      <label htmlFor="text1"></label>
      <textarea className={styles.textarea}  placeholder=" опис товару " rows="4" cols="50" type="text" id="text1" {...register('text1', { required: true })}/>
      {errors.text1 && <span style={{color:"red"}} >всі поля мають бути заповнені</span>}
      </div>
      {/* <div className={styles.item}>
      <label htmlFor="text2"></label>
      <textarea className={styles.textarea}  placeholder=" опис товару 2" rows="4" cols="50" type="text" id="text2" {...register('text2', { required: true })}/>
      {errors.text2 && <span style={{color:"red"}} >всі поля мають бути заповнені</span>}
      </div> */}
      <button className={styles.button} type="submit">
       { isEditing ? "ЗБЕРЕГТИ ЕЛЕМЕНТ" : "СТВОРИТИ ЕЛЕМЕНТ"  }
        </button>
    </form>
    </div>
    </div>
    </>
  );
}

export default  Create;
