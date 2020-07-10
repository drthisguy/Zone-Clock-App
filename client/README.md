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
Sapling is an engineering firm in the Philadelphia suburbs that designs and manufactures clocks and synchronized, clock systems.  One of the items we offer are zone clocks.  And in Sapling production, these zone clocks should be pre-configured for whichever cities the customer chooses to use. The Zone Clock Setup Utility makes this process painless and straight forward by providing all the needed offset, bias and daylight saving information needed to program the Sapling clocks specifically. (raw GMT offset may differ form what is displayed here, depending on the status of daylight savings)  Additionally, it'll provided other reginal information such as the city's location, displayed on a world map as well as its current, local time displayed on both an analog and digital clock.  With your browser's local memory storage, the user's search history is maintained to easily repeat common searches with a single click. The history list will also show the local times for these cities without the need to submit new searches.  This way the list can also be used to confirm all clocks are setup correctly when finishing up. 
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

[Github Repo](https://github.com/drthisguy/zoneclock-utility)

[Deployed Website](https://sapling-zoneclocks.herokuapp.com/)

___

## Screens:
![image](https://user-images.githubusercontent.com/48693333/87196215-ebe2a100-c2c7-11ea-9420-01662a02565d.png)
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
