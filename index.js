const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

//Movie_Master
//kXpQUkkz29s0aRCU


const uri = "mongodb+srv://Movie_Master:kXpQUkkz29s0aRCU@cluster0.opynrpb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		client.connect();

		const database = client.db("MoviesDB");
		const MoviesCollection = database.collection("AllMovies")


		///////******** Movies Get ********/////////
		app.get('/movies/:text', async (req, res) => {
			if (req.params.text == "movie") {
				const result = await MoviesCollection.find({ type: req.params.text }).toArray();
				return res.send(result);
			}
		})

		///////******** Animes Get ********/////////
		app.get('/animes/:text', async (req, res) => {
			if (req.params.text == "anime") {
				const result = await MoviesCollection.find({ type: req.params.text }).toArray();
				return res.send(result);
			}
		})

		//////******** Edit Delete Movies ********////////
		app.get('/allMovies', async (req, res) => {
			const cursor = await MoviesCollection.find().toArray();
			res.send(cursor);
		})

		///////******** Get data by id ********/////////
		app.get("/editMovie/:id", async (req, res) => {
			const id = req.params.id;
			const query = {
				_id: new ObjectId(id),
			};

			const options = {
				projection: {
					name: 1,
					type: 1,
					category: 1,
					thumbnail: 1,
					MovieLink: 1,
					desc: 1,
					Quality: 1,
					Language: 1,
					hostEmail: 1,
					hostName: 1,
					_id: 1,
				},
			};

			const result = await MoviesCollection.findOne(query, options);
			res.send(result);
		});

		///////******** Receive single data for update Movies ********/////////
		/**app.get('update/:id', async(req, res) => {
			const id = req.params.id;
			const query = {_id: new ObjectId(id)}
			const result = await MoviesCollection.findOne(query);
			res.send(result)
		});**/

		///////******** Update data ********/////////
		app.put('/editMovie/:id', async (req, res) => {
			const id = req.params.id;
			const filter = { _id: new ObjectId(id) }
			const option = { upsert: true };
			const updatedMovie = req.body;
			const movie = {
				$set: {
					name: updatedMovie.name,
					type: updatedMovie.type,
					category: updatedMovie.category,
					thumbnail: updatedMovie.thumbnail,
					MovieLink: updatedMovie.MovieLink,
					desc: updatedMovie.desc,
					Quality: updatedMovie.Quality,
					Language: updatedMovie.Language,
					hostEmail: updatedMovie.hostEmail,
					hostName: updatedMovie.hostName,

				}
			}
			const result = await MoviesCollection.updateOne(filter, movie, option)
			res.send(result)
		});



		///////******** Single movie details ********/////////
		app.get("/movieDetails/:id", async (req, res) => {
			const id = req.params.id;
			const query = {
				_id: new ObjectId(id),
			};

			const options = {
				projection: {
					name: 1,
					type: 1,
					category: 1,
					thumbnail: 1,
					MovieLink: 1,
					desc: 1,
					Quality: 1,
					Language: 1,
					hostEmail: 1,
					hostName: 1,
					_id: 1,
				},
			};

			const result = await MoviesCollection.findOne(query, options);
			res.send(result);
		});

		///////******** Single anime details ********/////////
		app.get("/animeDetails/:id", async (req, res) => {
			const id = req.params.id;
			const query = {
				_id: new ObjectId(id),
			};

			const options = {
				projection: {
					name: 1,
					type: 1,
					category: 1,
					thumbnail: 1,
					MovieLink: 1,
					desc: 1,
					Quality: 1,
					Language: 1,
					hostEmail: 1,
					hostName: 1,
					_id: 1,
				},
			};

			const result = await MoviesCollection.findOne(query, options);
			res.send(result);
		});



		///////******** Delete Movie ********/////////

		app.delete('/allMovies/:id', async (req, res) => {
			const id = req.params.id;
			console.log(id)
			const query = { _id: new ObjectId(id) }
			const result = await MoviesCollection.deleteOne(query);
			res.send(result)
		});

		app.post('/addMovie', async (req, res) => {
			const addMovie = req.body;
			console.log('Movie', addMovie);
			const result = await MoviesCollection.insertOne(addMovie);
			res.send(result)
		})








		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} finally {
		// Ensures that the client will close when you finish/error
		// await client.close();
	}
}
run().catch(console.dir);


app.get('/', (req, res) => {
	res.send('SIMPLE MOVIE IS RUNNING')
})

app.listen(port, () => {
	console.log(`SIMPLE MOVIE IS RUNNING on port, ${port}`);
})
