# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).



User.create({username: 'Avi', real_name: 'Avi Zacherman', password: 'bacon'})

User.create({username: 'notAvi', real_name: 'Not Me', password: 'vegan', hide_full_name: true})

Restaurant.create({name: "Totto Ramen", lat: 40.76501469999999, lng: -73.99101819999998, categories: ['ramen', 'japanese']})

Restaurant.create({name: "Brother Jimmy's BBQ", lat: 40.7723585, lng: -73.95611480000002, categories: ['BBQ'] })

Restaurant.create({name: "11 Madison Park", lat: 40.7415432, lng: -73.9864685, categories: ['Tasting Menu', 'New American']})

Restaurant.create({name: "Bar Coastal", lat: 40.77189, lng: -73.95342199999999, categories: ["Bar", "Pub Food"]})

Restaurant.create({name: "Hi-Life", lat: 40.7729687, lng: -73.9556255, categories: ["Sushi", "Bar", "Pub Food"]})

Restaurant.create({name: "Indigo Indian Bistro", lat: 40.77824740000001, lng: -73.97795439999999, categories: ["Indian"]})

Restaurant.create({name: "BarBacon", lat: 40.7662868, lng: -73.98654060000001, categories: ["Gastropub"]})

Restaurant.create({name: "Becco", lat: 40.7608279, lng: -73.98980699999998, categories: ["Italian"]})

Restaurant.create({name: "Minetta Tavern", lat: 40.7300326, lng: -74.0007814, categories: ["Pub", "Hamburgers"]})

Restaurant.create({name: "John's of Bleecker Street", lat: 40.7316187, lng: -74.0034468, categories: ["Pizza"]})

Restaurant.create({name: "Crif Dogs", lat: 40.72716399999999, lng: -73.98371500000002, categories: ["Hot Dogs"]})



Review.create({full_review: "This place was amazing, delicious and fantastically awesome #yumyumyum", user_id: 1, restaurant_id: 2, rating: 5})



Review.create({full_review: "TOTTO #RAMEN, #FUCKYEAH", user_id: 2, restaurant_id: 2, rating: 5})