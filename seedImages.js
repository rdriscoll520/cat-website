// Import required modules
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs for the images

// MongoDB connection details
const MONGODB_URI = 'mongodb://127.0.0.1:27017';
const MONGODB_DB = 'catGallery';

const images = Array.from({ length: 61 }, (_, index) => ({
  url: `/images/cat${index + 1}.jpeg`,
  alt: `Cat #${index + 1}`,
  likes: 0,
  dislikes: 0,
  id: uuidv4(), // Generate a unique ID for each image
}));

async function seedImages() {
  // Connect to the database
  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db(MONGODB_DB);
    const collection = db.collection('images');

    // Insert images into the collection
    await collection.insertMany(images);
    console.log('Images inserted successfully!');
  } catch (error) {
    console.error('Error inserting images:', error);
  } finally {
    await client.close();
  }
}

// Run the script
seedImages();
