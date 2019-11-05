<img src="icon.png" align="right" />

# DDS Midgardians! [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome#readme)
> Here is a brief overview of my response to your prompt. I am highely interested in working with you.

**Intitial Requirements from Brian**

- Define a database schema that supports movie names, actors in those movies, and user reviews for movies.
- Pull data from IMDB Interfaces into the database.
- Build an API which can:
  - Search for names of movies an actor has appeared in.
  - Search for names of actors in a given movie.
  - Rate a movie on a 1-5 scale, with a comment.
  - Search movies with a rating above a set value, and return both the movie name and the actors in it.
  - Application must have tests, although there is no specific coverage requirement.

**Accomplishing the Requirements**
- (1&2) I created a dockerized mysql database which contains roughly 140,000 entries pulled from the imdb website. I have divided the data into 4 respective tables: actors, reviews, movies, and movie-actors. Each table is in third normal form, and contains tconst/nconst keys as followed the imdb data format found here: https://www.imdb.com/interfaces/. Primary and foreign keys have been arranged between tables. To look at the database, login to the phpmyadmin container (directions below).
- (3) I created a dockerized nodejs server which is able to make one POST request and three GET requests to satisfy the API requirements above. The three post requests following HATEOAS URL conventions and all contain paginated JSON responses. The POST request extracts necessary input fields from the request body and uploads the result to the respective table. Input sanitization has not been performed, and only trivial error handeling.


# Deployment Guide

**Basic Requirements**

- Docker Toolbox.
- Git.
- Internet Connection.

## Installation

### Clone

- Clone this repo to your local machine using `https://github.com/GarrettHaley/IMDB-Backend.git`
```shell
C:\Users> git clone https://github.com/GarrettHaley/IMDB-Backend.git
```

### Setup

> Navigate to the IMDB-Backend file:

```shell
C:\Users> cd IMDB-Backend
```

> Now run the following commands:

```shell
C:\Users> docker-compose build
C:\Users> docker-compose up
```

- Three containers should now be running: asgard (mysql), midgard (nodejs), and elfheim (phpmyadmin). Below is a guide for accessing phpmyadmin and the nodejs server.

---

## Usage
##### Phpmyadmin 
- Accessing web portal: http://\<container_ip_address\>:80
- Username: imdb_admin
- Password: withGreatPowerComesGreatResponsibility

##### Nodejs Server 
- Accessing through chrome browser (recommended): http://\<container_ip_address\>:8000/desiredpath
- Examples:

GET actors who were in the movie top hat:
```shell
http://192.168.99.100:8000/movie/top%20hat/actors/
(specifying a page): /actors?page=1
```
GET movies Fred Astaire has been in:
```shell
 http://192.168.99.100:8000/actor/Fred%20Astaire/movies
 (specifying a page): /movies?page=2
```
GET movies with rating above a 2 (scale from 1-5) and their associated actors:
```shell
 http://192.168.99.100:8000/movies/rating/2
  (specifying a page): /rating/2?page=3
```

POST a review of a movie (url and request body):
```shell
 http://192.168.99.100:8000/movie/rate
 {
"title": "rumba",
"rating": 4.7,
"comment":"fantastic movie, wow."

}
```
## Tests (TODO)

- 

---

## Support

Reach out to me at one of the following places!

- garrett.haley@usmc.mil
- haleyg@oregonstate.edu
---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2015 © <a href="http://fvcproductions.com" target="_blank">FVCproductions</a>.
