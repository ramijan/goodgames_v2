##GoodGames - WDI_DTLA1 Project 4 - Rami Burpee

GoodGames is a website where users can search for video games to add to their 
personal collection and sort into playing, played and backlog shelves. They
can also rate and review those games and read other user's reviews.
The idea and general design were inspired by http://www.goodreads.com/ and
https://www.grouvee.com/

Check it out here: https://goodgames-v2.herokuapp.com/

This project was build as a single page Angular app with a rails api backend
and a postgres db. 

All game information comes from the Giant Bomb API http://www.giantbomb.com/api/


File structure overview
-----------------------
ANGULAR
All the angular app code can be found in:
/app/assets/javascripts/ng-app

* The module is defined in the app.js file 
* All controllers are split into their own files

All html templates can be found in:

/app/assets/templates
(except for the index.html shell which is loaded by rails:
app/views/application/index.html)


RAILS

* Rails api controllers are all namespaced and can be found here:
/app/controllers/api
* Giant bomb search service:
/app/services/giant_bomb.rb




This is a work in progress.

Todos
-----
* Add ability to delete games from shelves / delete ratings/reviews
* Add ability to upload peronal avatar for profile
* Add edit profile page
* Add reset password functionality
* Update GiantBomb search to return all results, not just first 100
* Add intorudction page for new users
* Bug fixes listed in todos file
* Clean up angular code a lot