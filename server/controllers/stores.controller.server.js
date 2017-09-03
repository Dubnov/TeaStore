'use strict';

const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const socket = require('../socket.io.js');

module.exports.getAllStores = (req, res) => {
    socket.on('home', (data) => {
        console.log(data);
        socket.emit('data', 'socket test succeeded');
    });
    Store.find().then(results => {
        res.json(results);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

module.exports.fillData = (req, res) => {
    Store.find().then((results) => {
        if (results.length == 0) {

            let arr = [
                {name:"Best Tea Store", address:"מנחם בגין 12", city:"תל אביב", phone:"053-2491029"},
                {name:"Tea For Life", address:"צהל 65", city:"קרית אונו", phone:"03-5433391"},
                {name:"Not Just Tea", address:"גולומב 22", city:"ירושלים", phone:"054-8041900"}];

            Store.collection.insertMany(arr).then((d)=> {
                console.log(d);
            }).catch(err => {
                console.log(err);
            });
        }
    })
}