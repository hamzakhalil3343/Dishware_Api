const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());


promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the Promotions to you!');
})
.post((req, res, next) => {
    res.end('Will add the Promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Promotion');
})
.delete((req, res, next) => {
    res.end('Deleting all Promotion');
});
promoRouter.route('/:promoId')
.get( (req,res,next) => {
    res.end('Will send details of the Promotion: ' + req.params.promoId +' to you!');
})
.post( (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /Promotions/'+ req.params.promoId);
})
.put( (req, res, next) => {
  res.write('Updating the Promotion: ' + req.params.promoId + '\n');
  res.end('Will update the promotion: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete(  (req, res)=> {
    res.end('Deleting promotion: ' + req.params.promoId);
});



module.exports = promoRouter;
