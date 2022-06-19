## Commends:

### Crud

1.01. Display all the documents in the restaurant collection: `db.restaurants.find().pretty()`

1.02. Display all restaurants that have a specific cuisine: `db.restaurants.find({cuisineType: "Asia"})`

1.03. Display only kosher restaurants: `db.restaurants.find({kosher: true})`

1.04. Display only a specific cities restaurants: `db.restaurants.find({"address.city": "Tel Aviv"})`

1.05. Display a specific restaurants address: `db.restaurants.find({address: {city: 'Tel Aviv',street: 'Dizengoff',coordinates: [ -47.564, 20.677 ]}})`

1.06. Display a specific restaurants coordinates: `db.restaurants.find({"address.coordinates": [ -47.564, 20.677 ]})`

1.07. Display all restaurants in ascending order by restaurant name: `db.restaurants.find({}).collation({locale: "en"}).sort({name: 1})`

1.08. Display all restaurants in ascending order by city names: `db.restaurants.find({}).collation({locale: "en"}).sort({"address.city": 1})`

1.09. Update a specific restaurant's name: `db.restaurants.updateOne({_id:ObjectId("62af3265a0266d8ee9b8bc25")}, {$set:{name:"a plus"}})`

1.10. Update a specific restaurant by adding a new review: `db.restaurants.updateOne({_id:ObjectId("62af3265a0266d8ee9b8bc25")}, {$push:{reviews: {date: "19.6.22", score: 5}}})`

1.11. Update all restaurants to be kosher: `db.restaurants.updateMany({}, {$set:{kosher: true}})`

1.12. Delete a specific restaurant: `db.restaurants.deleteOne({_id:ObjectId("62af3265a0266d8ee9b8bc24")})`

1.13. Delete all restaurants: `db.restaurants.deleteMany({})`

### ForEach Queries

2.01. Print all restaurant names: `db.restaurants.find().forEach((restaurant) => {print("Restaurant name: " + restaurant.name)})`

2.02. Print all restaurant cities: `db.restaurants.find().forEach((restaurant) => {print("Restaurant city: " + restaurant.address.city)})`

2.03. Print all restaurant coordinates: `db.restaurants.find().forEach((restaurant) => {print("Restaurant coordinates: " + restaurant.address.coordinates)})`

### Advanced Queries

3.01. Query for restaurant names that start with a specific alphabet: `db.restaurants.find({"name": /^h/i})`

3.02. Query how many documents you have from the restaurant collection: `db.restaurants.find().count()`

3.03. Get restaurants that include reviews from a specific date: `db.restaurants.find({"reviews.date": "11.2.22"})`

### Aggregation Operations

4.01. Display all restaurants average score: `db.restaurants.aggregate([{$unwind: "$reviews"}, {$group: {_id: "$name", avgScore: {$avg: "$reviews.score"}}}])`

4.02. Display a specific restaurant average score: `db.restaurants.aggregate([{$match: {_id:ObjectId("62af3265a0266d8ee9b8bc25")}}, {$unwind: "$reviews"}, {$group: {_id: "$name", avgScore: {$avg: "$reviews.score"}}}])`
