const express = require('express');
const morgan = require('morgan');
const timeout = require('connect-timeout'); //express v4
const helmet = require('helmet')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const http = require('http')
require('dotenv').config()


// IMPORT CERTIFICATE
const https = require('https')

const key = require('./config/keys');
const router = require('./routes/router');

function haltOnTimedout(req, res, next){
    if (!req.timedout) next();
}
// let ddos = new Ddos({whitelist: [process.env.SELF_IP], burst:10, limit:6,maxexpiry: 3600})

/**
 * Express Config
 */
let app = express();
// app.use(ddos.express);
app.disable('x-powered-by')
app.use(morgan('combined'));
app.use(express.json({limit:'5mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/static', express.static('uploads'))
app.use('/assets', express.static('assets'))
app.use('/file', express.static('assets/files'))
app.use(helmet())
app.set('view engine', 'ejs')

const ctx = require('./config/constants')
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(ctx.systemError())
})

/**
 * End Point Access
 */
app.use('/skripsi/api/v1', router);
app.use(timeout(400000));
app.use(haltOnTimedout);



/**
 * Run Server
 */
const port = 5000

// UNCOMMENT THIS FOR HTTPS RUN AFTER Certificate setup
// app.listen( port, () => {
//     console.log(`listening to ${port}`)
// })

var httpServer = http.createServer(app);
// let httpsServer = https.createServer(certificate, app);
httpServer.listen(port, () => {
    console.log(`listening on ${port}`);
});

// // // COMMENT THIS IF YOU USING HTTP
// httpsServer.listen(port, () => {
//     console.log(`listening on ${port}`);
// });

// require('./test/playground/connection')
