import Image from 'next/image';


const catImages = [
  { src: '/images/cat1.jpeg', alt: 'Cat #1' },
  { src: '/images/cat2.jpeg', alt: 'Cat #2' },
  { src: '/images/cat3.jpg', alt: 'Cat #3' },
];

export default function Gallery() {
  return (
    <div>
      <h2>My Cat Gallery</h2>
      {catImages.map((img, index) => (
        <div key={index}>
          <Image src={img.src} alt={img.alt} width={300} height={300} />
        </div>
      ))}
    </div>
  );
}
