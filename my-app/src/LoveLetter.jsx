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

      <h2 className="letter-heading">Έλενα μου,</h2>

      <p className="letter-body">
        Κάθε μέρα από αυτές τις υπέροχες μέρες που έχουν περάσει, καταλαβαίνω και μαθαίνω όλο και παραπάνω λόγους για τους οποίους σε αγαπώ. Ίσως το πιο γοητευτικό χαρακτηριστικό που σου βρίσκω είναι πως δεν είσαι ένα επιφανειακό άτομο, καθώς ειδικά αυτόν τον τελευταίο 1 μήνα μού έχεις δείξει πως είσαι πάντα στο πλάι μου και στις πλάκες, αλλά, πιο σημαντικό, και στις ανησυχίες μου και αυτό το εκτιμώ πάρα πολύ. Μακάρι να μπορούσα να κάνω την καρδιά σου να χτυπά όπως χτυπά η δικιά μου κάθε φορά που σε βλέπω, σε ακούω και σε σκέφτομαι.
        {'\n\n'}
        Δεν ξέρω πώς το καταφέρνεις, αλλά ακόμα και η πιο απλή στιγμή μαζί σου γίνεται η αγαπημένη μου ανάμνηση. Ένα βλέμμα σου, μια αγκαλιά ή ο τρόπος που γελάς αρκούν για να αλλάξει όλη μου η μέρα. Με κάνεις να νιώθω ήρεμος, τυχερός και πραγματικά ο εαυτός μου — και αυτό είναι κάτι που δεν θα άλλαζα με τίποτα στον κόσμο.
        {'\n\n'}
        Είσαι το πιο όμορφο κομμάτι της καθημερινότητάς μου. Ανυπομονώ για τις μικρές μας βόλτες, τα γέλια που θα μας πιάνουν χωρίς λόγο και όλα όσα θα ανακαλύψουμε μαζί. Χαρούμενα μας, αγάπη μου — να είναι μόνο η αρχή.
      </p>

      <p className="letter-signature">Με όλη μου την αγάπη, Άλεξ</p>

      {onClose && (
        <button type="button" className="close-letter-btn" onClick={onClose}>
          Πίσω
        </button>
      )}
    </section>
  );
}
