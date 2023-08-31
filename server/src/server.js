const app = require('./app');
const {serverPort} = require('./secrect');

// Express Server 
app.listen(serverPort,()=>{
    console.log(`Epxress server is running at http://localhost:${serverPort}`);
});


