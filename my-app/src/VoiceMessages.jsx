import { useState, useRef, useEffect } from 'react';

const VOICE_MESSAGES = [
  { id: 1, title: 'Ηχητικό 1', src: '/voice1.mp3' },
  { id: 2, title: 'Ηχητικό 2', src: '/voice2.mp3' },
  { id: 3, title: 'Ηχητικό 3', src: '/voice3.mp3' },
  { id: 4, title: 'Ηχητικό 4', src: '/voice4.mp3' },
];

const WAVE_BARS = [
  35, 65, 45, 90, 100, 65, 40, 80, 95, 50, 75, 100, 60, 45, 85, 55, 70, 40,
];

function formatSeconds(sec) {
  if (!sec || Number.isNaN(sec) || !Number.isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function VoiceMessages({ onClose }) {
  const [playingId, setPlayingId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [progress, setProgress] = useState({});
  const [durations, setDurations] = useState({});
  const audioRef = useRef(null);
  const activeIdRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      const id = activeIdRef.current;
      if (id && audio.duration) {
        setProgress((prev) => ({
          ...prev,
          [id]: audio.currentTime / audio.duration,
        }));
      }
    };

    const handleCanPlay = () => {
      setLoadingId(null);
    };

    const handleEnded = () => {
      const id = activeIdRef.current;
      if (id) {
        setProgress((prev) => ({ ...prev, [id]: 0 }));
      }
      activeIdRef.current = null;
      setPlayingId(null);
      setLoadingId(null);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const loaders = VOICE_MESSAGES.map((item) => {
      const temp = new Audio();
      temp.preload = 'metadata';
      temp.src = item.src;
      const onMeta = () => {
        setDurations((prev) => ({ ...prev, [item.id]: temp.duration }));
      };
      temp.addEventListener('loadedmetadata', onMeta);
      return { temp, onMeta };
    });

    return () => {
      loaders.forEach(({ temp, onMeta }) => {
        temp.removeEventListener('loadedmetadata', onMeta);
        temp.src = '';
      });
    };
  }, []);

  const togglePlay = async (item) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingId === item.id) {
      audio.pause();
      activeIdRef.current = null;
      setPlayingId(null);
      setLoadingId(null);
      return;
    }

    const savedRatio = progress[item.id] || 0;
    audio.pause();
    audio.src = item.src;
    audio.load();

    activeIdRef.current = item.id;
    setPlayingId(item.id);
    setLoadingId(item.id);

    try {
      await audio.play();
      setLoadingId(null);
      if (savedRatio > 0 && savedRatio < 0.99 && audio.duration) {
        audio.currentTime = savedRatio * audio.duration;
      }
    } catch (err) {
      console.error('Audio load/play error:', err);
      activeIdRef.current = null;
      setPlayingId(null);
      setLoadingId(null);
    }
  };

  const handleSeek = (e, item) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const audio = audioRef.current;

    setProgress((prev) => ({ ...prev, [item.id]: clickRatio }));

    if (playingId === item.id && audio && audio.duration) {
      audio.currentTime = clickRatio * audio.duration;
    }
  };

  return (
    <section className="letter-page">
      <div className="voice-list">
        {VOICE_MESSAGES.map((item) => {
          const isPlaying = playingId === item.id;
          const isLoading = loadingId === item.id;
          const currentRatio = progress[item.id] || 0;
          const totalDur = durations[item.id];

          return (
            <div key={item.id} className="insta-voice-wrapper">
              <div className={`insta-bubble ${isPlaying ? 'playing' : ''}`}>
                <button
                  type="button"
                  className="insta-play-btn"
                  onClick={() => togglePlay(item)}
                  aria-label={isPlaying ? 'Παύση' : 'Αναπαραγωγή'}
                >
                  {isLoading ? '•••' : isPlaying ? '❚❚' : '▶'}
                </button>

                <div
                  className="insta-waveform"
                  onClick={(e) => handleSeek(e, item)}
                >
                  {WAVE_BARS.map((height, idx) => {
                    const barRatio = idx / WAVE_BARS.length;
                    const isFilled = barRatio <= currentRatio;

                    return (
                      <span
                        key={idx}
                        className={`wave-bar ${isFilled ? 'filled' : ''}`}
                        style={{ height: `${height}%` }}
                      />
                    );
                  })}
                </div>

                <span className="insta-duration">
                  {totalDur
                    ? formatSeconds(
                        isPlaying ? totalDur * (1 - currentRatio) : totalDur
                      )
                    : '0:00'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {onClose && (
        <button type="button" className="close-letter-btn" onClick={onClose}>
          Πίσω
        </button>
      )}
    </section>
  );
}
