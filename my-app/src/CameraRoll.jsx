import { useState } from 'react';

const PHOTOS = [
  { id: 1, src: '/WE.jpg', caption: '' },
  { id: 2, src: '/W2.jpg', caption: '' },
  { id: 3, src: '/W3.jpg', caption: '' },
  { id: 4, src: '/W4.jpg', caption: '' },
  { id: 5, src: '/W5.jpg', caption: '' },
  { id: 6, src: '/W6.jpg', caption: '' },
  { id: 7, src: '/W1.jpg', caption: '' },
  { id: 8, src: '/E1.jpg', caption: '' },
  { id: 9, src: '/E1.jpg', caption: '' },
  { id: 10, src: '/E1.jpg', caption: '' },
  { id: 12, src: '/E1.jpg', caption: '' },
  { id: 13, src: '/E1.jpg', caption: '' },
  { id: 14, src: '/E1.jpg', caption: '' },
  { id: 15, src: '/E1.jpg', caption: '' },
  { id: 16, src: '/E1.jpg', caption: '' },
  { id: 17, src: '/E1.jpg', caption: '' },
  { id: 18, src: '/E1.jpg', caption: '' },
  { id: 19, src: '/E1.jpg', caption: '' },
  { id: 20, src: '/E1.jpg', caption: '' },
  { id: 21, src: '/E1.jpg', caption: '' },
  { id: 22, src: '/E1.jpg', caption: '' },
  { id: 23, src: '/E1.jpg', caption: '' },
  { id: 24, src: '/E1.jpg', caption: '' },
  { id: 25, src: '/E1.jpg', caption: '' },
];


export default function CameraRoll({ onClose }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section className="letter-page">

      <div className="camera-grid">
        {PHOTOS.map((photo) => (
          <button
            key={photo.id}
            type="button"
            className="camera-thumb-btn"
            onClick={() => setSelectedPhoto(photo.src)}
          >
            <img
              src={photo.src}
              alt={`Ανάμνηση ${photo.id}`}
              loading="lazy"
              className="camera-thumb-img"
            />
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="photo-lightbox"
          onClick={() => setSelectedPhoto(null)}
        >
          <img
            src={selectedPhoto}
            alt="Μεγέθυνση"
            className="lightbox-img"
          />
        </div>
      )}

      {onClose && (
        <button type="button" className="close-letter-btn" onClick={onClose}>
          Πίσω
        </button>
      )}
    </section>
  );
}
