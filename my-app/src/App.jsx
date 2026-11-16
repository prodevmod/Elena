import { useState, useEffect } from 'react';
import LoveLetter from './LoveLetter';
import TenThingsLetter from './TenThingsLetter';
import VoiceMessages from './VoiceMessages';
import CameraRoll from './CameraRoll';

const LEFT_HEARTS = [
  { top: '6%', left: '-14px', size: 'clamp(72px, 18vw, 110px)', rotate: -20 },
  { top: '34%', left: '-6px', size: 'clamp(64px, 16vw, 95px)', rotate: 24 },
  { top: '62%', left: '-16px', size: 'clamp(76px, 19vw, 115px)', rotate: -14 },
  { top: '86%', left: '-8px', size: 'clamp(68px, 17vw, 100px)', rotate: 28 },
];

const RIGHT_HEARTS = [
  { top: '10%', right: '-14px', size: 'clamp(70px, 18vw, 108px)', rotate: 22 },
  { top: '38%', right: '-6px', size: 'clamp(76px, 19vw, 112px)', rotate: -25 },
  { top: '66%', right: '-16px', size: 'clamp(64px, 16vw, 95px)', rotate: 16 },
  { top: '88%', right: '-8px', size: 'clamp(72px, 18vw, 105px)', rotate: -18 },
];

const PHOTO_STICKERS = [
  { src: '/E2.jpg', top: '18%', left: '7%', rotate: -12 },
  { src: '/E3.jpg', top: '30%', right: '7%', rotate: 10 },
  { src: '/E4.jpg', top: '66%', left: '6%', rotate: 8 },
  { src: '/E5.jpg', top: '78%', right: '6%', rotate: -9 },
  { src: '/E6.jpg', top: '48%', right: '3%', rotate: 14 },
];

const DEFAULT_PLANS = [
  { id: 1, text: 'Να δούμε μαζί μια ταινία', done: false },
];

// September 17, 2026 at 04:30 (Month is 0-indexed: 8 = September)
const START_DATE = new Date(2026, 8, 17, 4, 30, 0);

function pad(num) {
  return String(num).padStart(2, '0');
}

function getElapsedTime() {
  const diff = Math.max(0, Date.now() - START_DATE.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
  };
}

export default function App() {
  const [elapsed, setElapsed] = useState(getElapsedTime);
  const [stage, setStage] = useState('closed');
  const [plans, setPlans] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('love-plans')) || DEFAULT_PLANS;
    } catch {
      return DEFAULT_PLANS;
    }
  });
  const [newPlan, setNewPlan] = useState('');

  useEffect(() => {
    localStorage.setItem('love-plans', JSON.stringify(plans));
  }, [plans]);

  const addPlan = (event) => {
    event.preventDefault();
    const text = newPlan.trim();
    if (!text) return;

    setPlans((currentPlans) => [
      ...currentPlans,
      { id: Date.now(), text, done: false },
    ]);
    setNewPlan('');
  };

  const togglePlan = (id) => {
    setPlans((currentPlans) =>
      currentPlans.map((plan) =>
        plan.id === id ? { ...plan, done: !plan.done } : plan,
      ),
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(getElapsedTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (stage === 'opening-love') {
      const timer = setTimeout(() => setStage('fading-love'), 900);
      return () => clearTimeout(timer);
    }
    if (stage === 'fading-love') {
      const timer = setTimeout(() => setStage('letter-love'), 600);
      return () => clearTimeout(timer);
    }
    if (stage === 'fading-ten') {
      const timer = setTimeout(() => setStage('letter-ten'), 600);
      return () => clearTimeout(timer);
    }
    if (stage === 'fading-audio') {
      const timer = setTimeout(() => setStage('letter-audio'), 600);
      return () => clearTimeout(timer);
    }
    if (stage === 'fading-camera') {
      const timer = setTimeout(() => setStage('letter-camera'), 600);
      return () => clearTimeout(timer);
    }
  }, [stage]);
    useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden) {
        setElapsed(getElapsedTime());
        setStage((prev) => {
          if (prev === 'opening-love' || prev === 'fading-love') return 'letter-love';
          if (prev === 'fading-ten') return 'letter-ten';
          if (prev === 'fading-audio') return 'letter-audio';
          if (prev === 'fading-camera') return 'letter-camera';
          return prev;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const isMenuVisible =
    stage === 'closed' ||
    stage === 'opening-love' ||
    stage === 'fading-love' ||
    stage === 'fading-ten' ||
    stage === 'fading-audio' ||
    stage === 'fading-camera';

  const isFadingOut =
    stage === 'fading-love' ||
    stage === 'fading-ten' ||
    stage === 'fading-audio' ||
    stage === 'fading-camera';

  return (
    <>
      <div className="hearts-layer">
        {LEFT_HEARTS.map((heart, index) => (
          <img
            key={`left-${index}`}
            src="/heart.png"
            alt=""
            className="heart-img"
            style={{
              top: heart.top,
              left: heart.left,
              width: heart.size,
              height: heart.size,
              transform: `rotate(${heart.rotate}deg)`,
            }}
          />
        ))}

        {RIGHT_HEARTS.map((heart, index) => (
          <img
            key={`right-${index}`}
            src="/heart.png"
            alt=""
            className="heart-img"
            style={{
              top: heart.top,
              right: heart.right,
              width: heart.size,
              height: heart.size,
              transform: `rotate(${heart.rotate}deg)`,
            }}
          />
        ))}

        <div className="photo-stickers" aria-hidden="true">
          {PHOTO_STICKERS.map((sticker, index) => (
            <img
              key={`sticker-${index}`}
              src={sticker.src}
              alt=""
              className="photo-sticker"
              loading="lazy"
              style={{
                top: sticker.top,
                left: sticker.left,
                right: sticker.right,
                transform: `rotate(${sticker.rotate}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      <main className="main-content">
        <h1 className="title">Χαρούμενα μας</h1>

        <div className="counter-wrapper">
          <div className="timer-text">
            {elapsed.days}:{elapsed.hours}:{elapsed.minutes}
          </div>
          <div className="timer-labels">
            <span>Μερες</span>
            <span>Ωρες</span>
            <span>Λεπτα</span>
          </div>
        </div>

        {isMenuVisible && (
          <div className={`card-stage ${isFadingOut ? 'fading-out' : ''}`}>
            <button
              type="button"
              className="card-button"

              onClick={() => stage === 'closed' && setStage('opening-love')}
              aria-label="Άνοιξε το γράμμα αγάπης"
            >
              <img
                src={
                  stage === 'opening-love' || stage === 'fading-love'
                    ? '/open_card.png'
                    : '/card.png'
                }
                alt="Κάρτα αγάπης"
                className="card-image"
              />
            </button>


            <button
              type="button"
              className="card-button logo-button"
              onClick={() => stage === 'closed' && setStage('fading-ten')}
              aria-label="10 Things I Hate About You"
            >
              <img
                src="/10tihabty.png"
                alt="10 Things I Hate About You"
                className="logo-card-image"
              />
            </button>

            <button
              type="button"
              className="card-button audio-button"
              onClick={() => stage === 'closed' && setStage('fading-audio')}
              aria-label="Φωνητικά μηνύματα"
            >
              <img
                src="/audio.png"
                alt="Φωνητικά μηνύματα"
                className="audio-card-image"
              />
            </button>

            <button
              type="button"
              className="card-button camera-button"
              onClick={() => stage === 'closed' && setStage('fading-camera')}
              aria-label="Camera Roll"
            >
              <img
                src="/camera.avif"
                alt="Camera Roll"
                className="camera-card-image"
              />
            </button>
          </div>
        )}

        {stage === 'closed' && (
          <div className="plans-area">
            <div className="plans-heading">
              <span className="plans-icon">♡</span>
              <span>Να κάνουμε μαζί</span>
            </div>
            <div className="plans-list">
              {plans.map((plan) => (
                <label key={plan.id} className={`plan-item ${plan.done ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    checked={plan.done}
                    onChange={() => togglePlan(plan.id)}
                  />
                  <span>{plan.text}</span>
                </label>
              ))}
            </div>
            <form className="plan-form" onSubmit={addPlan}>
              <input
                type="text"
                value={newPlan}
                onChange={(event) => setNewPlan(event.target.value)}
                placeholder="Πρόσθεσε μια ιδέα..."
                aria-label="Πρόσθεσε κάτι που θέλουμε να κάνουμε μαζί"
                maxLength={80}
              />
              <button type="submit" aria-label="Πρόσθεσε ιδέα">+</button>
            </form>
          </div>
        )}

        {stage === 'letter-love' && (
          <LoveLetter onClose={() => setStage('closed')} />
        )}

        {stage === 'letter-ten' && (
          <TenThingsLetter onClose={() => setStage('closed')} />
        )}

        {stage === 'letter-audio' && (
          <VoiceMessages onClose={() => setStage('closed')} />
        )}

        {stage === 'letter-camera' && (
          <CameraRoll onClose={() => setStage('closed')} />
        )}
      </main>
    </>
  );
}
