const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
.get((req,res,next) => {
    leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    leaders.create(req.body)
    .then((leader) => {
        console.log('leader  Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

leaderRouter.route('/:leaderid')
.get((req,res,next) => {
    leaders.findById(req.params.leaderid)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderid);
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    leaders.findByIdAndUpdate(req.params.leaderid, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    leaders.findByIdAndRemove(req.params.leaderid)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = leaderRouter;
