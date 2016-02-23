# Phoodography

[Phoodography](https://phoodography.herokuapp.com/)

A Ruby on Rails, React, Google Maps based restaurant review site. Built as the final project for my Web Development Immersive course at General Assembly. Prior to starting this project, I knew nothing of React except that Facebook used it and in a week I had built a fully functioning MVP utilizing it. Much of the site is built without 3rd-party gems, particularly session control and API controls

## Technology

- React 0.13
- Ruby on Rails 4.2
- PostgresSQL
- Rails Geokit
- Google Maps Web API v3

### API Endpoints

**"/api/v0"**

#### Restaurants

**"/restaurant"***

Query Strings

- location | lat,lng
- radius | distance in miles from location (defaults to 5)
- categories | category of restaurant (currently only accepts one input)
- name | name of restaurant
- rating | average rating of restaurant reviews
- limit | maximum number of restaurants to display (defaults to 25)

#### Reviews

**"/reviews"**

Query Strings

- rating | rating of review
- hashtags | searches for a hashtag in the review
- username | username associated with review
- offset | offset start point for review data (defaults to 0)
- limit | maximum number of reviews to display (defaults to 10)
