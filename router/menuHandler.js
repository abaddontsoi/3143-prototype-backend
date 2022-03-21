const express = require('express');
const router = express.Router();

const menu = require('../menu/menu.json')

// const menuPic =require('../menu/menu_pic')

router.get('/', (req, res)=>{
    
    res.send(menu)
})

module.exports = router