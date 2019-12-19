const app = require('express')()
const port = 7777

const mongo = require('mongodb').MongoClient
const url = "mongodb://localhost:27017"

function displayProducts(result,products){
	var display = ''
	products.forEach( produit => {
		let name = JSON.stringify(produit.title)
		let description = JSON.stringify(produit.description)
		let type = JSON.stringify(produit.type)
		display += `${name} (${type}): ${description}<br>`
	})

	result.send(display)

}

app.get('/produits', (request,response) => {
	mongo.connect(url,{useUnifiedTopology : true}, (err,db) =>{
		if(err){
			response.status(500)
			response.send('<h1>Ooops, something went wrong</h1>')
		}

		let products = db.db("boutique").collection("produits")

		products.find({},
		{
			/*projection :{
				_id : 0,
				title : 1,
				description : 1,
				type : 1
			}*/
		}
		).toArray( (err,result) =>{
			response.header("Access-Control-Allow-Origin", "*")
			response.send(result)

			console.log("Request!\n")
			//displayProducts(response,result)
		})
	})
})

app.get('/produits/:type',(request,response) =>{
	let type = request.params.type
	mongo.connect(url,{useUnifiedTopology : true}, (err,db) =>{
		if(err){
			response.status(500)
			response.send("<h1>Internal Error</h1>")
		}

		let products = db.db("boutique").collection("produits")

		products.find({
			"type" : type
		}).toArray((err,result) => {
			response.send(result)
		})

	})
})

app.get('/produits/:name/:min/:max',(request,response) =>{
	let name = request.params.name
	let min = request.params.min
	let max = request.params.max
	mongo.connect(url,{useUnifiedTopology : true}, (err,db) =>{
		if(err){
			response.status(500)
			response.send("<h1>Internal Error</h1>")
		}

		let products = db.db("boutique").collection("produits")
		if(name == ''){
			products.find(
				{$and : [{price : {$lt:max}},{price: {$gt : min}}]}
			).toArray((err,result) => {
				response.header("Access-Control-Allow-Origin", "*")
				console.log("retour : "+result)
				response.send(result)
			})
		}

	})
})

app.get('/login/:username/:password', (request,response) => {
	let username = request.params.username
	let password = request.params.password
	
	mongo.connect(url,{useUnifiedTopology : true}, (err,db) =>{
		if(err){
			response.status(500)
			response.send("<h1>Internal Error</h1>")
		}else{

			let employees = db.db("boutique").collection("employees")

			employees.findOne({$and :[{"userId" : username},{"password" : password}]},(err,result) => {
				response.header("Access-Control-Allow-Origin", "*")
				console.log(result)
				console.log(password)
				response.send(result)
			})
			
		}

	})
})

app.get('/register/:username/:password/:email', (request,response) => {
	let username = request.params.username
	let password = request.params.password
	let email    = request.params.email
	
	mongo.connect(url,{useUnifiedTopology : true}, (err,db) =>{
		if(err){
			response.status(500)
			response.send("<h1>Internal Error</h1>")
		}else{

			let employees = db.db("boutique").collection("employees")

			employees.findOne({"userId" : username},(err,result) => {
				response.header("Access-Control-Allow-Origin", "*")
				if(result != undefined){
					console.log(`${username} existe déjà`)
					response.send(undefined)
				}
				else{
					let user = {"userId":username,"password":password,"emailAddress":email}
					employees.insertOne(user,(err,res) =>{
						if(err) throw err
						console.log(`${user} inséré dans la database`)
						response.send({"status" : "OK"})
					})
				}
				
			})
			
		}

	})
})


app.get('/panier/:username',(request,response) =>{
	let username = request.params.username
	mongo.connect(url,{useUnifiedTopology : true}, (err,db) =>{
		if(err){
			response.status(500)
			response.send("<h1>Internal Error</h1>")
		}

		let products = db.db("boutique").collection("paniers")

		products.find({
			"user" : username
		}).toArray((err,result) => {
			response.header("Access-Control-Allow-Origin", "*")
			response.send(result)
		})

	})
})

app.get('/addpanier/:username/:pname/:price',(request,response) =>{
	let username = request.params.username
	let name = request.params.pname
	let price = request.params.price
	mongo.connect(url,{useUnifiedTopology : true}, (err,db) =>{
		if(err){
			response.status(500)
			response.send("<h1>Internal Error</h1>")
		}

		let products = db.db("boutique").collection("paniers")

		products.findOne({"user" : username},(err,result)=>{
			if(result==undefined){
				products.insertOne({"user":username,"produits":[]},(err,result)=>{})
			}
			let quantity = 0
			products.findOne({"user" : username},(err,result)=>{
				result["produits"].forEach(produit=>{
					if(produit.name == name){
						quantity = produit.quantity
						//console.log(quantity)
					}
					
				})
				if(quantity == 0)
					products.updateOne({
						"user" : username
						},
						{
							$addToSet : {produits:{"name":name,"quantity":quantity+1,"price":price}}
						},(err,result) => {
							response.header("Access-Control-Allow-Origin", "*")
							response.send(result)
					})
				else{
					let produits = result["produits"]
					//console.log(produits)
					produits.forEach(produit =>{
						if(produit.name == name){
							produit.quantity++
						}
					})
					products.updateOne({"user":username},{$set : {"produits" : produits}},(err,result)=>{
						response.header("Access-Control-Allow-Origin", "*")
						response.send(result)
					})

				}

				
			})
			
		})
		

	})
})


app.get('/delpanier/:username',(request,response) =>{
	let username = request.params.username
	mongo.connect(url,{useUnifiedTopology : true}, (err,db) =>{
		if(err){
			response.status(500)
			response.send("<h1>Internal Error</h1>")
		}

		let products = db.db("boutique").collection("paniers")
		products.updateOne({"user":username},{$set : {"produits" : []}},(err,result)=>{
						response.header("Access-Control-Allow-Origin", "*")
						response.send(result)
		})

	})
})




app.listen(port, () => {
	console.log(`Serveur : écoute sur le port ${port}`)
})