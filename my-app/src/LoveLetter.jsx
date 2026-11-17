import React, { useEffect, useRef, useState } from 'react';

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

      <div className="love-letter-container">
        <div className="letter-paper">
          <p>
            Αγαπημένη Ελενά μου, κάθε μέρα από αυτές τις υπέροχες μέρες που έχουν περάσει, καταλαβαίνω και μαθαίνω όλο και περισσότερους λόγους για τους οποίους σε αγαπώ. Ίσως το πιο γοητευτικό χαρακτηριστικό που σου βρίσκω είναι πως δεν είσαι επιφανειακό άτομο, καθώς ειδικά τον τελευταίο 1 μήνα μου έχεις δείξει πως είσαι πάντα στο πλάι μου και στις πλάκες, αλλά πιο σημαντικό και στις ανησυχίες μου και αυτό το εκτιμώ πάρα πάρα πολύ. Αυτό σε συνδυασμό με το πόσο τέλεια είσαι, με εμπνέει να γίνομαι καλύτερος και να υπομένω κάθε δυσκολία. Σε ευχαριστώ.
          </p>
          <p>
            Δεν ξέρω πώς τα καταφέρεις, αλλά ακόμα και η πιο απλή στιγμή μαζί σου γίνεται η αγαπημένη μου ανάμνηση. Μια ματιά σου, μια αγκαλιά σου, μια selfie σου, ένα φωνητικό σου, τέσσερα unread messages σου, ένα γέλιο σου ή ένα ριπόστ σου είναι ικανά να αλλάξουν όλη μου τη μέρα και να κάνει την καρδιά μου να χτυπάει πιο γρήγορα.
          </p>
          <p>
            Ανυπομονώ να σε ξαναδώ. Μακάρι να μπορούσα να κάνω την καρδιά σου να χτυπάει όπως χτυπάει η δική μου κάθε φορά που σε βλέπω, σε ακούω και σε σκέφτομαι. Με κάνεις ακόμη να νιώθω ήρεμος, σίγουρος και πραγματικά ο εαυτός μου και αυτό είναι που δεν θα άλλαζα με τίποτα στον κόσμο.
          </p>
          <p>
            Είσαι το πιο όμορφο κομμάτι της καθημερινότητάς μου. Ανυπομονώ πάντα για τις βόλτες μετά το σχολείο, ανυπομονώ να ακούω εσένα να μου εξιστορείς για την καθημερινότητά σου και ανυπομονώ να ακούσω το γέλιο σου.
          </p>
          <p>
            Τελευταίο και πιο σημαντικό, αν δεν το έχεις καταλάβει, σε εκτιμώ πάρα πολύ και ευχαριστώ τον κύριο κάθε μέρα για εσένα.
          </p>
        </div>
      </div>

      {onClose && (
        <button type="button" className="close-letter-btn" onClick={onClose}>
          Πίσω
        </button>
      )}
    </section>
  );
}
