import { useEffect, useRef, useState } from 'react';

export default function LoveLetter({ onClose }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = new Audio('/Anagki.mp3');
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));

    return () => {
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
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          className="close-letter-btn"
          style={{ margin: 0, padding: '4px 12px', fontSize: '0.9rem' }}
          onClick={toggleMusic}
        >
          {isPlaying ? '🔇' : '🔊'}
        </button>
      </div>

      <h2 className="letter-heading">Αγάπη μου,</h2>

      <p className="letter-body">
        [Γράψε εδώ την πρώτη σου παράγραφο...]
        {'\n\n'}
        [Γράψε εδώ τη δεύτερη παράγραφό σου...]
      </p>

      <p className="letter-signature">Με όλη μου την αγάπη ❤️</p>

      {onClose && (
        <button type="button" className="close-letter-btn" onClick={onClose}>
          Πίσω
        </button>
      )}
    </section>
  );
}
