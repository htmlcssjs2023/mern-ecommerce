const express = require('express');
// this is used to check server port area.
const morgan = require('morgan');
// This is used for request body;
const bodyParser = require('body-parser');
// This is http-error package
const createError = require('http-errors');

// How many request can send in single minute;
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');

const app = express();


// Middleware
app.use(morgan('dev'));

// express js built in middleware is used for request body;
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// This middleware is used to limit sever request;
const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max:5,
    message: "Try again later"
});
app.use(xssClean());
app.use(rateLimiter);


const isLoggin = (req, res, next)=>{
    const login = true;
    if(login){
        req.body.id = 2000;
        next();
    }
    else{
        return res.status(300).send({
            user:"Invalid user"
        });
    }
   
}

// application level middleware
app.use(isLoggin);

app.get('/get', (req, res)=>{
    res.status(200).send({
        message:"get: api"
    })
});

app.post('/post', (req, res)=>{
    res.status(200).send({
        message:"post: api"
    })
});

// isLogin middleware === Router level middleware
// app.get('/app/user', isLoggin, (req, res)=>{
//     res.status(300).send({
//         message:"Return to user profile"
//     });
// });

app.get('/app/user',(req, res)=>{
    console.log(`User Id: ${req.body.id}`);
    res.status(300).send({
        message:"Return to user profile"
    });
});


// https-error ====================

// app.use((req,res,next)=>{
//     res.status(404).json({
//         message:`This page not available!`
//     });
// });

app.use((req,res,next)=>{
    next(createError(404,'Page not found'));
})

app.use((err, req, res, next)=>{
    res.status(err.status || 600).json({
        success:false,
        message:err.status
    });
})

module.exports = app;
