const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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
		await client.connect();

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
	console.log(`SIMPLE MOIVE IS RUNNING on port, ${ port }`);
})
