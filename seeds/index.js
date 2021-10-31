const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '6178340687f8080c03b0e7e2',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,

      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt explicabo ducimus iure odit numquam quae vero voluptatum quam asperiores quaerat sequi fuga consectetur, molestias labore et eaque consequuntur obcaecati expedita.',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/dkcsp1ola/image/upload/v1635697259/YelpCamp/emcgbajp0ob4bv1xuvkv.jpg',
          filename: 'YelpCamp/emcgbajp0ob4bv1xuvkv',
        },
        {
          url: 'https://res.cloudinary.com/dkcsp1ola/image/upload/v1635670761/YelpCamp/dsjybyutfrgmh5susdvh.jpg',
          filename: 'YelpCamp/dsjybyutfrgmh5susdvh',
        },
        {
          url: 'https://res.cloudinary.com/dkcsp1ola/image/upload/v1635670673/YelpCamp/oj5tegzqnvfqthmb3jyw.jpg',
          filename: 'YelpCamp/oj5tegzqnvfqthmb3jyw',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
