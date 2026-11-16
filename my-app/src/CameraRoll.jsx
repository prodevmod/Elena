import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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
  { id: 11, src: '/E1.jpg', caption: '' },
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
  { id: 26, src: '/E1.jpg', caption: '' },
  { id: 27, src: '/E1.jpg', caption: '' },
  { id: 28, src: '/E1.jpg', caption: '' },
  { id: 29, src: '/E1.jpg', caption: '' },
  { id: 30, src: '/E1.jpg', caption: '' },
  { id: 31, src: '/E1.jpg', caption: '' },
];

export default function CameraRoll({ onClose }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = new Audio('/Lovers.mp3');
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));

    const handleTabChange = () => {
      if (document.hidden) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleTabChange);

    return () => {
      document.removeEventListener('visibilitychange', handleTabChange);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true));
    }
  };

  return (
    <section className="letter-page">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <button
          type="button"
          className="close-letter-btn"
          style={{ margin: 0, padding: '4px 12px', fontSize: '0.9rem' }}
          onClick={toggleMusic}
        >
          {isPlaying ? '🔇' : '🔊'}
        </button>
      </div>

      <div className="camera-grid">
        {PHOTOS.map((photo) => (
          <button
            key={photo.id}
            type="button"
            className={`camera-thumb-btn ${photo.src === '/E1.jpg' ? 'missing-photo' : ''}`}
            onClick={() => setSelectedPhoto(photo.src)}
          >
            {photo.src === '/E1.jpg' ? (
              <span
                className="missing-photo-placeholder"
                aria-label="Κενή θέση για μια μελλοντική φωτογραφία"
              />
            ) : (
              <img
                src={photo.src}
                alt={`Ανάμνηση ${photo.id}`}
                loading="lazy"
                className="camera-thumb-img"
              />
            )}
          </button>
        ))}
      </div>

      {selectedPhoto &&
        createPortal(
          <div
            className="photo-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Μεγέθυνση φωτογραφίας"
            onClick={() => setSelectedPhoto(null)}
          >
            <img
              src={selectedPhoto}
              alt="Μεγέθυνση"
              className="lightbox-img"
            />
          </div>,
          document.body,
        )}

      {onClose && (
        <button type="button" className="close-letter-btn" onClick={onClose}>
          Πίσω
        </button>
      )}
    </section>
  );
}
