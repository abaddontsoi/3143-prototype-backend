const express = require('express');
const router = express.Router();
const fs = require('fs');

const users = [
    // structure of users profile
    {
        accountID:"account1",
        pwd:"1234",
        email: "abc@gmail.com",
        customerName:"taai man",
        phone:"12348765",
        address:"wan chai",
    },
    {
        accountID:"abaddon",
        pwd:"123123",
        email: "a@gmail.com",
        customerName:"taan",
        phone:"765",
        address:" asdff ",
    },
]

const users_login = [
    {
        accountID:"account1",
        pwd:"1234"
    }
]

const orders = [
    {
        orderID: "account101",
        accountID:"account1",
        orderedItems: [],
        totalCost: 20,
    }
]

function regCheck(account, pwd) {
    return (
        pwd.length >= 5
        // true
    )
}
router.post('/signMeUp', (req,res)=>{
    // console.log(req)

    if (regCheck(req.body.accountID, req.body.pwd)) {
        users.push({
            accountID:req.body.accountID,
            pwd: req.body.pwd,
            email: req.body.email,
            customerName:req.body.customerName,
            phone: req.body.phone,
            address: req.body.address,
        })

        users_login.push({
            accountID: req.body.accountID,
            pwd: req.body.pwd,
        })
        console.log(users_login)
        res.send('Success');
    } else {
        res.send('failed');
    }
})

function loginVerify(loginList, payload){
    for (let index = 0; index < loginList.length; index++) {
        const element = loginList[index];
        if(JSON.stringify(element) === JSON.stringify(payload)){
            return true;
        }
    }
    return false;
}

router.get('/userCre',(req,res)=>{
    
    let str = JSON.stringify(users_login)
    res.send(str)
    // console.log(str2)
})

router.get('/userDetail',(req,res)=>{
    
    let str = JSON.stringify(users)
    res.send(str)
    console.log(str)
})


router.post('/userUpdate',(req,res)=>{
    const paylaod = {
        accountID:req.body.accountID,
        pwd: req.body.pwd,
        email: req.body.email,
        customerName:req.body.customerName,
        phone: req.body.phone,
        address: req.body.address,
    }
    console.log(paylaod);

    const stripped = {
        accountID:req.body.accountID,
        pwd: req.body.pwd,
    }

    for (let index = 0; index < users.length; index++) {
        // const element = users[index];
        const element = {
            accountID:users[index].accountID,
            pwd: users[index].pwd,    
        }
        if (stripped.accountID === element.accountID) {
            users[index] = paylaod
            users_login[index] = stripped
            res.send('Success')
            break;
        }else{
            // res.send(JSON.stringify(stripped) + JSON.stringify(element))
            console.log('not match')
        }
    }
})


// router.post('/logmein', (req, res)=>{
//     let login_payload = {
//         email: req.body.accountID,
//         pwd: req.body.pwd,
//     }
//     if (loginVerify(users_login, login_payload)) {
//         res.send(req.body.accountID + ' logged in');
//     } else {
//         res.send('login failed');
//     }
// })

router.post('/order', (req,res)=>{
    // console.log(req.body)
    let payload = req.body
    var counter = 0
    for (let index = 0; index < orders.length; index++) {
        const element = orders[index];
        if (JSON.stringify(payload.orderID)==JSON.stringify(element.orderID)) {
            orders[index] = payload;
            console.log('susccess');
            console.log(orders[index]);
            counter++;
        }
        // else{
        //     orders.push(payload);
        //     console.log('pushed');
        //     console.log(orders)
        // }
    }
    if (counter == 0) {
        orders.push(payload);
        console.log('pushed')
    }
})

router.get('/order', (req,res)=>{
    res.send(orders)
})

module.exports = router;