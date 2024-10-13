"use client"
import { useEffect, useState } from 'react';

export default function CatGallery() {
  const [catImages, setCatImages] = useState([]);

  // Fetch cat images from the API
  useEffect(() => {
    async function fetchCatImages() {
      const response = await fetch('/api/cat-images');
      const data = await response.json();
      setCatImages(data);
    }

    fetchCatImages();
  }, []);

  // Function to handle like/dislike actions
  const handleAction = async (id, action) => {
    const response = await fetch(`/api/${id}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action }),
    });

    const result = await response.json();
    console.log(result.message);

    // Update the state locally so the UI reflects the new like/dislike counts
    setCatImages((prevImages) =>
      prevImages.map((image) =>
        image._id === id
          ? action === 'like'
            ? { ...image, likes: image.likes + 1 }
            : { ...image, dislikes: image.dislikes + 1 }
          : image
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Cat Gallery</h1>
      <div className="grid grid-cols-3 gap-4">
        {catImages.map((image) => (
          <div key={image._id} className="relative group bg-gray-800 rounded-lg p-4">
            <img src={image.url} alt={image.alt} className="w-full rounded-md" />
            <div className="mt-2 text-white">
              <p>{image.alt}</p>
              <p>Likes: {image.likes}</p>
              <p>Dislikes: {image.dislikes}</p>
              <p>Total Score: {image.likes - image.dislikes}</p>
              <button
                onClick={() => handleAction(image._id, 'like')}
                className="p-2 m-1 bg-green-500 rounded"
              >
                Like
              </button>
              <button
                onClick={() => handleAction(image._id, 'dislike')}
                className="p-2 m-1 bg-red-500 rounded"
              >
                Dislike
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
