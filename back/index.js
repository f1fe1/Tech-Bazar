import express from "express";
import mongoose from "mongoose";
import {registerValidation,loginValidation,createPostsValidation, } from "./validations.js"
import checkAuth from "./utils/checkAuth.js"
import *as UserController  from "./controllers/UserController.js"
import *as PostController  from "./controllers/PostController.js"
import *as mainPageController  from "./controllers/mainPageController.js"
import cors from "cors";
import multer from "multer";
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import handleValidationErrors from "./utils/handleValidationErrors.js";
import TelegramBot from "node-telegram-bot-api"
import dotenv from 'dotenv'; 
dotenv.config();
mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("db Ok"))
.catch((err) => console.log("db error",err))
 const  app = express();
 const storage = multer.diskStorage({
    destination:(_, __, cb) => {
      if(!fs.existsSync('uploads')){
        fs.mkdirSync('uploads')
      }
        cb(null,"uploads");
    },
    filename:(_, file, cb) => {
        cb(null, file.originalname);
    },
 })

 const upload = multer({storage})
 app.use(express.json());
 app.use(cors());
 app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

 "============================================================="
 const botToken =  process.env.TELEGRAM_BOT_TOKEN;
 const bot = new TelegramBot(botToken, { polling: true })
 app.use(express.urlencoded({ extended: true }));

 function sendTelegramMessage(chatId, message) {
    bot.sendMessage(chatId, message);
  }
  app.post('/form', (req, res) => {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const { name, email, phone, details, letter } = req.body;
    const telegramMessage = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMesssage: ${letter}\nDetails: ${details}`;
  
    sendTelegramMessage(chatId, telegramMessage)
    res.send('Form submitted successfully!');
  });
  app.post('/form2', (req, res) => {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const { fullName, phone, city, items, totalCount, cartTotalPrice , email ,number } = req.body;
  
    let itemsText = '';
    for (let i = 0; i < items.length; i++) {
      const { title, price, count } = items[i];
      itemsText += `${title} x ${count} - ${price} грн\n`;
    }
  
    const telegramMessage = `Name: ${fullName}\nPhone: ${phone}\nEmail: ${email}\nCity: ${city}\nDistrictDelivery: ${number}\n${itemsText}\nTotalCount: ${totalCount}\nTotalPrice: ${cartTotalPrice}`;
    sendTelegramMessage(chatId, telegramMessage);
    res.send('Form submitted successfully!')
  });

// Функція для видалення файлів

 app.use("/uploads", express.static("uploads"));
 const deleteFile = (url) => {
  const filePath = `uploads/${url}`
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

app.post("/removeImage", (req, res) => {
  try {
    const url = req.body.urlToDelete;
    console.log("URL to delete:", url);
      deleteFile(url);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Невдалося видалити файли",
    });
  }
});

app.post("/removeImages", (req, res) => {
  try {
    const urls = req.body.urls;
    urls.forEach((url) => {
      deleteFile(url);
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Невдалося видалити файли",
    });
  }
});

 app.post("/uploadImage",checkAuth,  upload.single('image'), (req,res) => {
    res.json({
        url:`/uploads/${req.file.originalname}`
    })
 } )

 app.post('/uploadImages', checkAuth, upload.array('images', 5), (req, res) => {
  const urls = req.files.map(file => `/uploads/${file.originalname}`);
  res.json({
      urls: urls,
  });
});

 app.get("/mainPage", mainPageController.getAll);
 app.patch("/mainPage/:id",checkAuth, mainPageController.update);

 app.post("/auth/register",registerValidation,handleValidationErrors, UserController.register );

 app.post("/auth/login",loginValidation,handleValidationErrors, UserController.login );

 app.get("/auth/me",  checkAuth ,UserController.getMe );
 
 app.get("/posts",PostController.getAll);
 app.get("/posts/:id",PostController.getOne);
 app.post("/posts",checkAuth, createPostsValidation,handleValidationErrors, PostController.create);
 app.delete("/posts/:id",checkAuth, PostController.remove);
 app.patch("/posts/:id",checkAuth,handleValidationErrors, PostController.update);

 app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("server work!")
 });