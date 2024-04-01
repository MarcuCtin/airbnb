const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const jwtSecret = 'secret'
const Place = require('./models/place')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader')
const multer = require('multer');
const fs = require('fs');
const Booking = require('./models/booking');
app.use(express.json());
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));
app.get('/test',(req,res)=>{
    console.log('muoie')
})
mongoose.connect('mongodb+srv://marku212:akitainu21@cluster0.fqrerk4.mongodb.net/?retryWrites=true&w=majority');
console.log(process.env.MONGO_URL)
app.use('*',(req,res,next)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err, user)=>{
            if(err)  throw err;
            req.user=user;
            console.log('verified token',user)
            next();
        })
    }
    else{
        next();
    } 
})
app.post('/register',async(req,res)=>{
    const{name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password,salt)
    })
    await user.save();
    res.json(user);
})
app.post('/login',async(req,res)=>{
    const{email,password} = req.body;
    const user = await User.findOne({email});
    if(user){
        const passOk = bcrypt.compareSync(password,user.password);
        if(passOk){
            jwt.sign({
                email:user.email,
                id:user._id,
            },jwtSecret,{},(err,token)=>{
                if(err)throw err
                res.cookie('token',token).json(user)
            })
        }
        else{
            res.status(422).json('pass not ok')
        }
    }
    else{
        res.json('user not found')
    }
})
app.get('/profile',async (req,res)=>{
    try{
    const {name,email,_id} =  await User.findById(req.user.id); 
    res.json({name,email,_id});
    }
    catch(e){
        console.log(e)
    }    
})
app.post('/logout',async(req,res)=>{
    res.cookie('token','').json(true)

})
app.post('/upload-by-link',async (req,res)=>{
    const {link} = req.body;
    const newName = 'photo'+ Date.now() +'.jpg';
    const img = await imageDownloader.image({
        url:link,
        dest: __dirname+'/uploads/'+newName,
        extractFilename:false,
        
    })
    console.log(img)
    const auxName = 'uploads/'+newName
    res.json(auxName)
})
const photosMiddleware  = multer({dest:'uploads'})
app.post('/upload',photosMiddleware.array('photos',8),async(req,res)=>{
    const uploadedFiles = [];
    console.log(req.files)
    for(let i = 0 ;i<req.files.length;i++){
        const {path,originalname} = req.files[i];
        uploadedFiles.push(path);
    }
    
    res.json(uploadedFiles)
})

app.post('/places',async(req,res)=>{
    const {
        title,
      address,
      addedPhotos,
      description,
      perks,
      extra,
      price,
      checkin,
      checkout,
      maxGuests
    } = req.body
           const place = await Place.create({
                owner:req.user.id,
                title,
                address,
                addedPhotos,
                description,
                perks,
                extra,
                price,
                checkin,
                checkout,
                maxGuests
            })
    res.json(place)
})

app.get('/places',async (req,res)=>{
    const {id} = req.user;
    res.json(await Place.find({owner:id}))
})
app.get('/places/:id',async(req,res)=>{
    const {id} = req.params;

    res.json(await Place.findById(id))
})
app.put('/places',async(req,res)=>{
    const {
        id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        price,
        extra,
        checkin,
        checkout,
        maxGuests
    } = req.body
    const placeDoc = await Place.findById(id);

    if(req.user.id === placeDoc.owner.toString()){
         placeDoc.set({
            title,
            address,
            addedPhotos,
            description,
            price,
            perks,
            extra,
            checkin,
            checkout,
            maxGuests
        })
        await placeDoc.save()
        res.json('ok')
    }
})
app.get('/main',async(req,res)=>{
    const places = await Place.find();
    
    console.log(places)
    res.json(places);
    
})
app.post('/bookings',(req,res)=>{

    const {
        checkin,checkout,numberOfGuests,phone,name,place,price
    } = req.body;
    Booking.create({
        user:req.user.id,
        checkin,checkout,numberOfGuests,phone,name,place,price})
    .then((doc)=>{
        res.json(doc);
    })
    .catch(e=>{
        throw e;
    })
})
app.get('/bookings',async(req,res)=>{
    
    res.json(await Booking.find({
        user:req.user.id
    }).populate('place'))
})
app.listen('8080',(req,res)=>{
    console.log('listening');
})
