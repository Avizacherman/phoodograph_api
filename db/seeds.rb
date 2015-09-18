# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

seedImg = File.read("#{Rails.root}/public/seed.jpg")

User.create({username: 'Avi', real_name: 'Avi Zacherman', password: 'bacon', password_confirmation: "bacon", email: "avizacherman@gmail.com"})

User.create({username: 'notAvi', real_name: 'Not Me', password: 'vegan', hide_full_name: true, password_confirmation: "vegan", email: "notavi@example.com"})

User.create({username: "Andrea", real_name: "Andrea", password: "ramen", hide_full_name: true, password_confirmation: "ramen", email: "andrea@andrea.com"})

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


Review.create({full_review: "One of my favorite places to go in the city. Hot dogs are delicious and go good with a tasty Miller High Life. A great place to end the night. #hotdogs #greatness #millerhighlife #champagneofbeers #crif #dogs #crifdogs
",img: "#{seedImg}", rating: 5,
               
               restaurant_id: 1,
               user_id: 3})

Review.create({full_review: "The best ramen in the city. Flavorful and I love the vibe. There's usually a bit of a wait but it's really worth it. #yum #ramen #deliciousramen #tottoramen #ramenislife
",img: "#{seedImg}", rating: 5,
               
               restaurant_id: 2,
               user_id: 3})


Review.create({full_review: " The upper east side location has been one of my favorite bars/restaurants since before I even moved to New York. The vibe is laid back and I enjoy the country feel. Drinks are priced on par with the rest of the city and their BBQ is solid. The staff is really friendly also. #BBQ #theonlyplaceilltoleratecountrymusic #brotherjimmys #brojimsues
",img: "#{seedImg}", rating: 4,
               
               restaurant_id: 3,
               user_id: 3})


Review.create({full_review: " This bar is bro central. Pretty much the only time I go is with my friends when we want to get crazy. Happy Hour daily until 8 and all day Saturdays and Sundays. Food is ok, good drunk food, tater tots are solid. Sign up early for beer pong - but if your friend Kate blacks out a throws a stool at someone over a beer pong feud you WILL be asked to leave (just for the night.) #brofest #beerpong #itfeelslikecollege #jakesdilemma
",img: "#{seedImg}", rating:4, 
               
               restaurant_id: 4,
               user_id: 3})


Review.create({full_review: "Best brunch in the city. The value and quality for the money I haven't found anywhere else. Latin vibe with good music, tasty variety of unlimited sangrias, and decent portions of good food. Make a reservation at least a few weeks in advance - it fills up quick. #sangria #bottomlessbrunch #bestbrunch #calleocho
",img: "#{seedImg}", rating:5,
               
               restaurant_id: 5,
               user_id: 3})



Review.create({full_review: "Great dumpling place. In the heart of Chinatown, so you get the whole experience. Their whole menu is great and reasonably priced, but they are really known for their steamed and soup dumplings. Expect a wait, as it's become pretty popular. #dumplings #chinese #chinatown #shanghaidimsum
",img: "#{seedImg}", rating:5,
               
               restaurant_id: 6,
               user_id: 3})


Review.create({full_review: "If you're a Syracuse fan this is the place to be. An unassuming sports bar that, during SU basketball season will transport you from the UES to Chucks or Faegans. Owner and staff are awesome, their food is really good - the burgers and wings are a must have. They almost always offer wrist band specials for games for unlimited beer and half price wings. #cusebar #gocuse #orangecountry #eastend
",img: "#{seedImg}", rating:5,
              
               restaurant_id: 7,
               user_id: 3})


Review.create({full_review: "Absolutely delicious ice cream - lives up to the hype. Sometimes there's a wait, sometimes not, but it's always worth it. My favorite sundae is the Mermaid - with key lime pie crumbs, full of flavor. #icecream #eastvillage #big #gay #icecream #biggayicecream #sogay
",img: "#{seedImg}", rating:5,
               
               restaurant_id: 8,
               user_id: 3})


Review.create({full_review: " I have only ordered through delivery - everything so far is delicious. Ice cream sundaes made from tasty ice cream flavors, donuts, brownies, and shakes. Lots of variety and prices are reasonable. #icecream #delivery #guiltypleasure #holeycream
",img: "#{seedImg}", rating:5,
               
               restaurant_id: 9,
               user_id: 3})


Review.create({full_review: " Classic delivery treat. Original with a whole mess of toppings. It's as good as it gets. #originalass #alloftheraspberries #froyosoitshealthy #pinkberry
",img: "#{seedImg}", rating:4,
               
               restaurant_id: 10,
               user_id: 3})


Review.create({full_review: "Huge burritos, good food and fantastic drinks. The bulldog is delicious and will go to your head quickly! Their guacamole is homemade and tasty as well. A great place to indulge in your Mexican craving or celebrate a drinking holiday! #bulldog #tequila #guac #burritogreatness #blockheads
",img: "#{seedImg}", rating:4,
               
               restaurant_id: 11,
               user_id: 3})
