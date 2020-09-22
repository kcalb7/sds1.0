# sds1.0
projeto semana devSuperior 1.0


## Frontend: React
[sds1-douglas-web.netlify.app](https://sds1-douglas-web.netlify.app/)


## Backend API REST: Spring
[Basic adress](https://sds1-douglas.herokuapp.com)

### GET

[All games](https://sds1-douglas.herokuapp.com/games): `/games`

[All records](https://sds1-douglas.herokuapp.com/records): `/records`

#### Filtered and paged records
 
Min. date: `min=2020-09-01T00:00:00Z`
 
Date limit: `max=2020-09-30T00:00:00Z`
 
Number of page: `page=0`
 
Results per page: `linesPerPage=20`
 
Order [age|moment|name]: `orderBy=moment`
 
Direction [ASC|DESC]: `direction=DESC`
 
 
[Example](https://sds1-douglas.herokuapp.com/records?min=2020-09-01T00:00:00Z&max=2020-09-30T00:00:00Z&page=0&linesPerPage=20&orderBy=moment&direction=DESC): `/records?min=2020-09-01T00:00:00Z&max=2020-09-30T00:00:00Z&page=0&linesPerPage=20&orderBy=moment&direction=DESC`

### POST
#### Create new record
[New record](https://sds1-douglas.herokuapp.com/records): `/records`
##### JSON
`{
	"name": "Douglas Braga",
	"age": 28,
	"gameId": 3
}`
