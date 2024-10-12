"use client"
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import styles from '../styles/EmblaCarousel.module.css'; // Optional styling file

const catImages = Array.from({ length: 61 }, (_, index) => ({
    src: `/images/cat${index + 1}.jpeg`,
    alt: `Cat #${index + 1}`,
  }));
  

export default function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 5 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {catImages.map((img, index) => (
            <div className={styles.embla__slide} key={index}>
              <Image src={img.src} alt={img.alt} width={800} height={600} />
            </div>
          ))}
        </div>
      </div>
      <button className={styles.embla__button__prev} onClick={scrollPrev}>
        Prev
      </button>
      <button className={styles.embla__button__next} onClick={scrollNext}>
        Next
      </button>
      <div className={styles.embla__dots}>
        {catImages.map((_, index) => (
          <button
            key={index}
            className={`${styles.embla__dot} ${index === selectedIndex ? styles.is_selected : ''}`}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
