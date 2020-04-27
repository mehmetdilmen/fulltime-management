const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://mehmetdilmen:Sevenfold12@cluster0-shard-00-00-7isja.gcp.mongodb.net:27017,cluster0-shard-00-01-7isja.gcp.mongodb.net:27017,cluster0-shard-00-02-7isja.gcp.mongodb.net:27017/test?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin', {useMongoClient: true});
    mongoose.connection.on('open', () => {
        console.log('DB Bağlandı');
    });

    mongoose.connection.on('error', (err) => {
        console.log('DB Hata', err);
    });

    mongoose.Promise = global.Promise;
};


