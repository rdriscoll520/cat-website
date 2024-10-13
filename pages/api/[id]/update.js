import { connectToDatabase } from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query; // Get the image ID from the query params
  const { action } = req.body; // Expect 'like' or 'dislike' as the action
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const update =
        action === 'like' ? { $inc: { likes: 1 } } : { $inc: { dislikes: 1 } };

      const result = await db.collection('images').updateOne(
        { _id: new ObjectId(id) }, // Find the image by its MongoDB ObjectId
        update // Increment the likes or dislikes
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Image not found' });
      }

      res.status(200).json({ message: `${action} updated successfully!` });
    } catch (error) {
      res.status(500).json({ error: 'Error updating the image', details: error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
