import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


//Database Functionality 
import { Client } from 'pg';
import { getAllUsers, getSingleUser } from '../SQLqueries/queries';
import { MongoClient } from 'mongodb';

//Database variables 
const postgresHost = process.env.POSTGRES_HOST;
const postgresUser = process.env.POSTGRES_USER;
const postgresDb = process.env.POSTGRES_DB;

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp'; ;

const client: Client = new Client({
    user: postgresUser,
    host: postgresHost,
    database: postgresDb,
    port: 5432
});

  
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((err) => {
    const error = err as Error; 
    console.error('Error connecting to PostgreSQL', error.message);
  });



async function seedMongoDB() {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('dynamicapp');
    const usersCollection = db.collection('users');

    // Seed data
    const users = [
      { name: 'Alice', email: 'alice@example.com', age: 30 },
      { name: 'Bob', email: 'bob@example.com', age: 25 },
      { name: 'Charlie', email: 'charlie@example.com', age: 35 },
    ];

    // Insert seed data into MongoDB
    await usersCollection.insertMany(users);
    console.log('MongoDB Seed Completed');
  } catch (err) {
    console.error('Error seeding MongoDB:', err);
  } finally {
    await client.close();
  }
}
  
seedMongoDB();

const PORT = 3001;


app.get('/api/users', async (_, res) => {
    try {
      const result = await getAllUsers(client);
      res.json(result.rows); 
    } catch (err) {
      const error = err as Error;
      console.error('Error fetching users', error.message);
      res.status(500).send('Error fetching users');
    }
  });

app.get('/api/users/:id', async (req, res) => {
    try {
      const response = await getSingleUser(client, req.params.id);
      res.json(response.rows);
    } catch(err) {
        const error = err as Error;
        throw new Error(`${error}`);
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});