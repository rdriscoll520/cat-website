import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // Fetch all images from the 'images' collection
  const catImages = await db.collection('images').find({}).toArray();

  res.status(200).json(catImages);
}
