import { useEffect, useRef, useState } from 'react';

export default function TenThingsLetter({ onClose }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = new Audio('/canttake.mp3');
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

      <img
        src="/10tihabty.png"
        alt="10 Things I Hate About You"
        className="movie-logo"
      />

      <ol className="hate-list">
        <li>Μισώ το υπέροχό σου χαμόγελο</li>
        <li>Μισώ το πώς πάντα μου λες να το βουλώσω</li>
        <li>Μισώ το πώς τα μάτια σου με κάνουν να ανυπομονώ να τα ξαναδώ</li>
        <li>Μισώ το ότι δεν είμαι μαζί σου όλη μέρα, κάθε μέρα</li>
        <li>Μισώ το πόσο έξυπνη είσαι</li>
        <li>Μισώ το πώς με κάνεις να ξεχνώ όλα μου τα προβλήματα</li>
        <li>Μισώ το πώς έχεις πάντα δίκιο</li>
        <li>Μισώ το πώς με αποσπάς κάθε λεπτό της ημέρας</li>
        <li>Μισώ το άρωμά σου</li>
        <li>Μα πιο πολύ μισώ το πόσο πολύ δεν σε μισώ, αλλά αντιθέτως ΣΕ ΑΓΑΠΩ, Έλενά μου</li>
      </ol>


      <div className="eyes-section">
        <h3 className="eyes-heading">Τα μάτια σου...</h3>
        <img
          src="/E12.jpg"
          alt="Τα μάτια σου"
          className="eyes-photo"
        />
        <p className="eyes-caption">
          Ίσως το καλύτεπο πραγμα που εχω δει ποτέ
        </p>
      </div>

      {onClose && (
        <button type="button" className="close-letter-btn" onClick={onClose}>
          Πίσω
        </button>
      )}
    </section>
  );
}
