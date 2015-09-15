# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#User Tests

User.create({username: 'Avi', real_name: 'Avi Zacherman', password: 'bacon'})
User.create({username: 'notAvi', real_name: 'Not Me', password: 'vegan', hide_full_name: true})

Restaurant.create({name: "Totto Ramen", lat: 40.764987, lng: 40.764987, categories: ['ramen', 'japanese']})