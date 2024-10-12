"use client"
import { useEffect, useState } from 'react';

export default function CatGallery() {
  const [catImages, setCatImages] = useState([]);

  useEffect(() => {
    async function fetchCatImages() {
      const response = await fetch('/api/cat-images');
      const data = await response.json();
      setCatImages(data);
    }

    fetchCatImages();
  }, []);

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

  