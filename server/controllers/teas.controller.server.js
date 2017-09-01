'use strict';

const mongoose = require('mongoose');
const Tea = mongoose.model('Tea');
const TeaType = mongoose.model('TeaType');
const socket = require('../socket.io.js');
const path = require('path');
const multer = require('multer');

module.exports.cartCheckout = (req, res) => {
    socket.emit('checkout', {message: 'succeeded'});
}

module.exports.getAllTeas = (req, res) => {
    socket.on('home', (data) => {
        console.log(data);
        socket.emit('data', 'socket test succeeded');
    });
    Tea.aggregate([
        {
            $group: {
                 _id: '$teaType',
                 teas: { $push: '$$ROOT'}
            }
        }
    ]).then(results => {
        res.json(results);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

    // Tea.find().then(results => {
    //     res.json(results);
    // }).catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    // });
};

module.exports.getTeaById = (req, res) => {
    Tea.findById(req.params.id).then(results => {
        res.json(results);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });
}

module.exports.getAllTeaTypes = (req, res) => {
    TeaType.find().then(results => {
        res.json(results);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

module.exports.addTea = (req, res) => {
    let tea = new Tea(req.body);

    tea.save().then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });    
}

module.exports.updateTea = (req, res) => {
    Tea.findByIdAndUpdate(req.body._id, req.body).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });    
}

module.exports.deleteTea = (req, res) => {
    Tea.findByIdAndRemove(req.params.id).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);        
    });    
}

module.exports.uploadTeaImage = (req, res) => {
    res.json(req.file);
}

module.exports.addTeaTypes = (req, res) => {
    const now = new Date();
    // let arr = [
    //     {
    //         name: 'Green',
    //         creationDate: now,
    //         updateDate: now
    //     },
    //     {
    //         name: 'Black',
    //         creationDate: now,
    //         updateDate: now
    //     },
    //     {
    //         name: 'Herbal',
    //         creationDate: now,
    //         updateDate: now
    //     },
    //     {
    //         name: 'White',
    //         creationDate: now,
    //         updateDate: now
    //     },
    //     {
    //         name: 'Oolong',
    //         creationDate: now,
    //         updateDate: now
    //     }
    // ];

    let arr = [
        {teaType: 'Green', name: "Apple Pie", price: 9.9, caffeineLevel: 1, description: "Crisp autumn apples enveloped in warm, fragrant cinnamon, nutmeg, and buttery pie crust. Chinese green tea adds a subtle sweet finish.", image: "Apple_Pie.jpg"},
        {teaType: 'Green', name: "Genmai Cha", price: 8.0, caffeineLevel: 1, description: "A blend of toasted rice, roasted barley, and green tealeaves, Genmai Cha is a good example of the ancient method of flavouring tea. During the roasting process, a few grains of the rice pop, resembling popcorn", image: "Genmai_Cha.jpg"},
        {teaType: 'Green', name: "Gyokuro Asahi", price: 9.5, caffeineLevel: 1, description: "In this blend, only the most tender, topmost leaves are selected, hand-picked, and steamed to prevent oxidation, then meticulously fired in baskets.", image: "Gyokuro_Asahi.jpg"},
        {teaType: 'Green', name: "Floral Jasmine", price: 9.9, caffeineLevel: 1, description: "Our Floral Jasmine Green tea features fresh, mellow overtones with a slightly astringent finish. Also makes a wonderful iced tea when brightened with a twist of fresh lemon.", image: "Floral_Jasmine.jpg"},
        {teaType: 'Green', name: "Moroccan Mint", price: 10.5, caffeineLevel: 1, description: "A refreshing minty green tea, ideal after an intense afternoon in the desert (or the office). Limited Quantities Available", image: "Moroccan_Mint.jpg"},
        {teaType: 'Green', name: "Pineapple", price: 13.0, caffeineLevel: 1, description: "Our sweet and zesty tropical blend consists of hand-picked, hand-sorted China green teas flavoured with ripe pineapples. Limited Quantities Available", image: "Pineapple.jpg"},
        {teaType: 'Green', name: "Organic Strawberry", price: 8.5, caffeineLevel: 1, description: "A refreshing Chinese rolled and twisted green tea balanced with the sweetness of wild strawberries.", image: "Organic_Strawberry.jpg"},
        {teaType: 'Green', name: "Sencha", price: 8.5, caffeineLevel: 1, description: "One of Japan's most popular natural leaf teas, Sencha Fukujyu Cha is known for its refreshingly sweet and grassy taste", image: "Sencha.jpg"},
        {teaType: 'Herbal', name: "Earl Grey Rooibos", price: 10.0, caffeineLevel: 0, description: "This naturally caffeine-free twist on the traditional favourite features antioxidant-rich organic rooibos scented with cold-press, first-press Italian bergamot essential oils to yield a clean and tart cup.", image: "Earl_Grey_Rooibos.jpg"},
        {teaType: 'Herbal', name: "Ginger Rooibos", price: 11.5, caffeineLevel: 0, description: "This sweet, full-bodied Rooibos is meticulously blended with the lively zing of fresh ginger root. Rich in vitamins, minerals, and antioxidants. Naturally caffeine-free", image: "Ginger_Rooibos.jpg"},
        {teaType: 'Herbal', name: "Harmony", price: 12.0, caffeineLevel: 0, description: "Organic peppermint leaves, organic chamomile flowers, orange blossoms, and allspice. A fresh and minty herbal blended for complexity, balanced with the fragrant notes of allspice.", image: "Harmony.jpg"},
        {teaType: 'Herbal', name: "Spiced Chai", price: 10.9, caffeineLevel: 0, description: "This herbal adaptation of our original house blend eschews black tea and is naturally caffeine-free.", image: "Spiced_Chai.jpg"},
        {teaType: 'Herbal', name: "Lemon Mango Tango", price: 8.9, caffeineLevel: 0, description: "Zesty Meyer lemons balance sweet, juicy mangoes. Light, fruity acidity makes for a refreshing infusion. A match made in heaven!", image: "Lemon_Mango_Tango.jpg"},
        {teaType: 'Herbal', name: "Lemon Verbena", price: 11.0, caffeineLevel: 0, description: "Lemon verbena has long been known as a folk-medicine remedy and is often associated with divine forces.", image: "Lemon_Verbena.jpg"},
        {teaType: 'Herbal', name: "Mountain Berry", price: 15.0, caffeineLevel: 0, description: "A ripe and fruity melange of SUPERFOOD Saskatoon berries (native to Canada), red and black currants, raisins, and wild blueberries.", image: "Mountain_Berry.jpg"},
        {teaType: 'Herbal', name: "Chamomile Flowers", price: 9.0, caffeineLevel: 0, description: "A tranquil and calming herbal infusion of sweet and apple-fragrant golden chamomile blossoms harvested from the fertile plains in the Nile Valley of Egypt.", image: "Chamomile_Flowers.jpg"},
        {teaType: 'Herbal', name: "Mocha Spice", price: 10.0, caffeineLevel: 0, description: "Our delicious Mocha Spice blend is an ideal java substitute with the richness of chicory combined with the subtle sweetness of carob. Malt, cinnamon & vanilla add to the complexity of this blend. Limited Quantities Available", image: "Mocha_Spice.jpg"},
        {teaType: 'Herbal', name: "Licorice Spice", price: 9.9, caffeineLevel: 0, description: "Smooth-textured and down-to-earth with a spicy edge. Soothes sore throats and tickling coughs with expressive, tangy finish. Limited Quantities Available", image: "Licorice_Spice.jpg"},
        {teaType: 'Black', name: "Chocolat", price: 14.0, caffeineLevel: 3, description: "An exotic tea blended exclusively for chocolate lovers, best with a spot of milk or as a smoothie with vanilla ice cream... Drink it after eight or when no one is looking.", image: "Chocolat.jpg"},
        {teaType: 'Black', name: "Cassis", price: 10.0, caffeineLevel: 3, description: "The blackcurrant in our Cassis Tea has a distinct, sharp taste which makes it suitable for combining with the natural depth of the black tea.", image: "Cassis.jpg"},
        {teaType: 'Black', name: "Coconut", price: 9.5, caffeineLevel: 3, description: "Revitalize memories of a perfect vacation. An estate Ceylon black tea with exotic coconut flavours.", image: "Coconut.jpg"},
        {teaType: 'Black', name: "English Breakfast", price: 10.5, caffeineLevel: 3, description: "One of the world's favourite morning teas, English Breakfast blends complex malty Indian and copper-liquor Ceylon teas with the brightness of a China keemun.", image: "English_Breakfast.jpg"},
        {teaType: 'Black', name: "Decaf Earl Grey", price: 12.0, caffeineLevel: 0, description: "A light Earl Grey blend with 98% less caffeine. Round in the cup with a delicate citrus bergamot aroma. A CO2 decaffeination process is used to maintain the integrity of this perfumed tea", image: "Decaf_Earl_Grey.jpg"},
        {teaType: 'Black', name: "Ginger Peach", price: 8.5, caffeineLevel: 3, description: "The warm fuzzy feeling of ripe peaches is complemented by the zing of fresh ginger root.", image: "Ginger_Peach.jpg"},
        {teaType: 'Black', name: "Irish Breakfast", price: 10.9, caffeineLevel: 3, description: "Inspired by tea served with breakfast at an Irish country inn, this cup is a brisk and full-flavoured blend of strong, dark, malty Assam and bright Kenyan black leaves.", image: "Irish_Breakfast.jpg"},
        {teaType: 'White', name: "White Blossom", price: 16.5, caffeineLevel: 1, description: "A delicate infusion paired with a subtle floral palate.", image: "White_Blossom.jpg"},
        {teaType: 'White', name: "Organic Jasmine Pearl", price: 11.0, caffeineLevel: 1, description: "A true white tea, hand-picked, hand-selected, meticulously perfumed, and then sorted twice (by size) in the mountainous Fuding, Fujian Province.", image: "Organic_Jasmine_Pearl.jpg"},
        {teaType: 'White', name: "Silver Leaf", price: 8.5, caffeineLevel: 1, description: "Harvested south of the Yangtze River, this premier connoisseur grade of white tea is named for the silver downy hairs that cover the young, unopened buds.", image: "Silver_Leaf.jpg"},
        {teaType: 'White', name: "Emperors Jasmine", price: 10.9, caffeineLevel: 1, description: "This unfermented tea, with its delicate cup, pale celadon liquor, and conspicuous palate, is ideal for the discerning jasmine connoisseur.", image: "Emperors_Jasmine.jpg"},
        {teaType: 'Oolong', name: "Darjeeling Oolong", price: 8.5, caffeineLevel: 2, description: "An epicurean blend of Indian champagne Darjeeling and a floral China oolong that yields a complex body and lingering orchid aroma.", image: "Darjeeling_Oolong.jpg"},
        {teaType: 'Oolong', name: "Jasmine Green Oolong", price: 15.9, caffeineLevel: 2, description: "The seductive aroma of night-blooming jasmine perfumes this blend of fancy oolong and green tealeaves with rich body and wondrous pale jade liquor.", image: "Jasmine_Green_Oolong.jpg"},
        {teaType: 'Oolong', name: "Mango Oolong", price: 12.9, caffeineLevel: 2, description: "Mingled with the scent of ripe mangoes, this refreshing Tung Ting oolong yields a sweet and delicate cup.", image: "Mango_Oolong.jpg"},
        {teaType: 'Oolong', name: "Pear Oolong", price: 11.9, caffeineLevel: 2, description: "Top-grade, high-mountain oolong tea from Formosa flavoured with natural essential oils of Bartlett pears, creating a sweet and delicious cup.", image: "Pear_Oolong.jpg"},
        {teaType: 'Oolong', name: "Vanilla Oolong", price: 12.5, caffeineLevel: 2, description: "A slight hint of cream lingers in this sweet and musky cup laced with the seductive aroma of vanilla bean.", image: "Vanilla_Oolong.jpg"}
    ];

    // TeaType.collection.insertMany(arr).then((d)=> {
    //     console.log(d);
    // }).catch(err => {
    //     console.log(err);
    // });

    Tea.collection.insertMany(arr).then((d)=> {
        console.log(d);
    }).catch(err => {
        console.log(err);
    });
}