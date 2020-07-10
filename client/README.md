[Company Directory](https://page-tyler.herokuapp.com/contact)


# 16-React-Profile

Zone Clock Setup Utility.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Links](#links)
* [Screens](#screen-grabs)
* [Sources](#sources)
* [Issues](#issues)

___

## General info
I work for an engineering firm in the Philadelphia suburbs named Sapling that designs and manufactures clocks and synchronized, clock systems.  One of the items we offer are zone clocks.  And in Sapling production, these zone clocks should be pre-configured for whichever cities the customer chooses to use. The Zone Clock Setup Utility makes this process painless and straight forward by providing all the needed offset, bias and daylight saving information needed to program the clock.  Additionally, it'll provided more reginal information such as the city's location, displayed on a world map as well as its current, local time displayed on both an analog and digital clock.  With the browser's local storage, a user's search history is maintained to easily repeat common searches with a single click. The history list will also show the local times for these cities without submitting new searches, so it can also be used to confirm all clocks are setup correctly when finishing up.  
___

## Technologies
* ReactJS
* Google Maps API
* Google Places API
* Google Geocoding API
* TimezoneDB API
* React Day Picker

	
## Setup
To run this project locally using npm cli:
```
$ type: npm install && npm start (Your own API keys needed).
$ Or See deployed website.  
```
___

## Links:

[Github Repo](url here)

[Deployed Website](url here)

___

## Screens:
![image](url here)
___

## Sources
https://reactjs.org/docs  
reacttraining.com. 
https://react.semantic-ui.com.  
https://stackoverflow.com


## Issues & Contact

No known major issues. Daylight savings checks are currently not being made on cities in the history list.  therefore, if DST starts/ends between now and some previous search of that city, the displayed time could be incorrect. Clicking on it again however, will at least render the correct information in the main container.  It is recommended that the history list be cleared from time to time.  

If there are any other issues found or if there are just questions, email:  
page.c.tyler@gmail.com 

Enjoy.
