import { useState } from 'react';

// Import scenario images
import scenario1Desc from '../assets/scenarios/1/scenario1-desc.jpg';
import scenario1Choice from '../assets/scenarios/1/scenario1-choice.jpg';
import scenario1StayHome from '../assets/scenarios/1/scenario1-choice-stayhome.jpg';
import scenario1Supper from '../assets/scenarios/1/scenario1-choice-supper.jpg';

import scenario2Desc from '../assets/scenarios/2/scenario2-desc.png';
import scenario2Choice from '../assets/scenarios/2/scenario2-choice.png';
import scenario2Decorate from '../assets/scenarios/2/scenario2-choice-decorateroom.png';
import scenario2SaveMoney from '../assets/scenarios/2/scenario2-choice-savemoney.png';

import scenario3Desc from '../assets/scenarios/3/scenario3-desc.jpg';
import scenario3Choice from '../assets/scenarios/3/scenario3-choice.jpg';
import scenario3StayHome from '../assets/scenarios/3/scenario3-choice-stayhome.jpg';
import scenario3Cycling from '../assets/scenarios/3/scenario3-choice-cycling.jpg';

// Types
interface XPBars {
  money: number;
  socialLife: number;
  academics: number;
  happiness: number;
}

type GameStage = 'title' | 'desc' | 'choice' | 'result' | 'finalStats' | 'conclusion';

interface Choice {
  name: 'choice1' | 'choice2';
  buttonText: string; // Text to display on the choice button
  effect: Partial<XPBars>;
  resultImage: string;
  resultText: string[]; // Array of paragraphs for the consequence text
}

interface ScenarioData {
  id: number;
  descImage: string;
  choiceImage: string;
  descriptionText: string[]; // Array of paragraphs for the description
  choice1: Choice;
  choice2: Choice;
}

// ============================================
// SCENARIO CONFIGURATION
// Easy way to add/edit scenarios and their effects
// ============================================
const scenariosConfig: ScenarioData[] = [
  {
    id: 1,
    descImage: scenario2Desc,
    choiceImage: scenario2Choice,
    descriptionText: [
      "After cleaning up your room, you felt that something was amiss. Even though everything was in place, your room still ellicits a sense of emptiness.",
      "Ahah! Due to space constraints, you were not able to bring with you your personal items from back home. That's why your room feels incomplete. But how should you fill that gap..."
    ],
    choice1: {
      name: 'choice1',
      buttonText: 'DECORATE ROOM',
      effect: { money: -15, socialLife: 0, academics: 0, happiness: 20 },
      resultImage: scenario2Decorate,
      resultText: ["You have arrived back in your room with 2 reusable bags full of items from Clementi Mall.", "'That poster should definitely go up there, this little plant can sit by window, and let me put this frog down here...'", "Half a day later, your room is finally decorated, embellished with items that remind you of home."]
    },
    choice2: {
      name: 'choice2',
      buttonText: 'SAVE MONEY',
      effect: { money: 20, socialLife: 0, academics: 0, happiness: -20 },
      resultImage: scenario2SaveMoney,
      resultText: ["'The emptiness of my room gets to me at least my wallet isn't empty,' you think to yourself.", "Can you put a price on the feeling of home? How do you make sense of the spacious spaces around you?"]
    }
  },
  {
    id: 2,
    descImage: scenario1Desc,
    choiceImage: scenario1Choice,
    descriptionText: [
      "You are walking back to your room after the first day of lectures. As you head back, you notice some of your hallmates gathered near the lounge.",
      "Curiosity got the better of you and overhear that they are talking about you. Later that night, that same hallmate knocked on your door and invites you to join them for supper."
    ],
    choice1: {
      name: 'choice1',
      buttonText: 'JOIN SUPPER',
      effect: { money: -10, socialLife: 20, academics: 0, happiness: 15 },
      resultImage: scenario1Supper, // Assuming top button is "supper"
      resultText: [
        "You had a great time at supper! You found out that they were talking about you earlier that day, but it was because they were discussing what would be the best way to approach you without being intimidating.",
        "They were only trying to be considerate, and that was something that you could appreciate."
      ]
    },
    choice2: {
      name: 'choice2',
      buttonText: 'STAY HOME',
      effect: { money: 10, socialLife: -15, academics: 0, happiness: 5 },
      resultImage: scenario1StayHome, // Assuming bottom button is "stay home"
      resultText: [
        "In an unfamiliar environment, your room formed a safe space. Even so, you could not help but wonder why your name was mentioned in your hallmates' conversation.",
        "That thought accompanied you throughout the night. Should you have accepted the invitation?"
      ]
    }
  },
  {
    id: 3,
    descImage: scenario3Desc,
    choiceImage: scenario3Choice,
    descriptionText: [
      "Your neighbourhood has organised a cycling outing to East Coast Park this coming Saturday. The event is expected to last the entire day from 9am to 6pm.",
      "Everyone in your neighbourhood is going but you have yet to make a decision. Your main concern is that your scholarship requires you to uphold a certain academic standard and with your final quiz soon approaching..."
    ],
    choice1: {
      name: 'choice1',
      buttonText: 'JOIN CYCLING',
      effect: { money: -5, socialLife: 25, academics: -15, happiness: 10 },
      resultImage: scenario3Cycling,
      resultText: [
        "East Coast Park was a blast! You took the opportunity to talk to more people and make new friends. Surprisingly, you found someone who loved TV remotes as much as you did!",
        "Additionally, you felt that it was good to get out and socialise one last time, given that you have been cooped up in your room studying all week."]
    },
    choice2: {
      name: 'choice2',
      buttonText: 'REJECT THE INVITE',
      effect: { money: 5, socialLife: -10, academics: 30, happiness: -10 },
      resultImage: scenario3StayHome,
      resultText: [
        "You hunkered down and locked in on Saturday while everyone was out enjoying themselves. Your handphone buzzes periodically, filled with messages from those who attended the event.",
        "Because of your academic effort, you performed well for your quiz, only at the expense of your relationship with your hallmates."]
    }
  }
];

export function DecisionGame() {
  // Initial XP bar values
  const initialXP: XPBars = {
    money: 50,
    socialLife: 50,
    academics: 50,
    happiness: 50
  };

  const [xp, setXP] = useState<XPBars>(initialXP);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [gameStage, setGameStage] = useState<GameStage>('title');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());

  const currentScenario = scenariosConfig[currentScenarioIndex];
  const isLastScenario = currentScenarioIndex === scenariosConfig.length - 1;

  // Preload image helper
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (imagesLoaded.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => new Set([...prev, src]));
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  };

  // Helper function to update XP bars
  const applyEffect = (effect: Partial<XPBars>) => {
    setXP(prev => ({
      money: Math.max(0, Math.min(100, prev.money + (effect.money || 0))),
      socialLife: Math.max(0, Math.min(100, prev.socialLife + (effect.socialLife || 0))),
      academics: Math.max(0, Math.min(100, prev.academics + (effect.academics || 0))),
      happiness: Math.max(0, Math.min(100, prev.happiness + (effect.happiness || 0)))
    }));
  };

  // Handle choice selection
  const handleChoice = async (choice: Choice) => {
    setIsLoading(true);
    setSelectedChoice(choice);
    applyEffect(choice.effect);

    try {
      await preloadImage(choice.resultImage);
      setGameStage('result');
    } catch (error) {
      console.error('Failed to load image:', error);
      setGameStage('result'); // Show anyway
    } finally {
      setIsLoading(false);
    }
  };

  // Move to next scenario
  const goToNextScenario = async () => {
    setIsLoading(true);

    try {
      if (isLastScenario) {
        setGameStage('finalStats');
      } else {
        const nextScenario = scenariosConfig[currentScenarioIndex + 1];
        await preloadImage(nextScenario.descImage);
        setCurrentScenarioIndex(prev => prev + 1);
        setGameStage('desc');
        setSelectedChoice(null);
      }
    } catch (error) {
      console.error('Failed to load image:', error);
      if (isLastScenario) {
        setGameStage('finalStats');
      } else {
        setCurrentScenarioIndex(prev => prev + 1);
        setGameStage('desc');
        setSelectedChoice(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Reset game
  const resetGame = () => {
    setXP(initialXP);
    setCurrentScenarioIndex(0);
    setGameStage('title');
    setSelectedChoice(null);
  };

  // Helper to handle stage transitions with loading
  const handleStageTransition = async (newStage: GameStage) => {
    setIsLoading(true);

    try {
      if (newStage === 'desc' && currentScenario) {
        await preloadImage(currentScenario.descImage);
      } else if (newStage === 'choice' && currentScenario) {
        await preloadImage(currentScenario.choiceImage);
      }
      setGameStage(newStage);
    } catch (error) {
      console.error('Failed to load image:', error);
      setGameStage(newStage); // Show anyway
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary/80 relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="relative">
            {/* Spinning comic-style loader */}
            <div className="w-24 h-24 border-8 border-yellow-300 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl animate-pulse">⚡</span>
            </div>
          </div>
        </div>
      )}

      {/* Title Screen */}
      {gameStage === 'title' && (
        <div className="w-full h-screen flex flex-col items-center justify-center p-8 md:p-12 bg-linear-to-br from-purple-600 via-pink-500 to-orange-400 relative overflow-hidden">
          {/* Polka dots pattern overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, white 2px, transparent 2px)`,
              backgroundSize: '40px 40px'
            }}
          />


          {/* Animated comic elements - scattered around */}
          <div className="absolute top-20 left-20 text-5xl md:text-7xl font-bold text-yellow-300 transform -rotate-12 animate-pulse" style={{ textShadow: '3px 3px 0 #000, -2px -2px 0 #fff' }}>
            👥
          </div>
          <div className="absolute top-32 right-32 text-4xl md:text-6xl font-bold text-cyan-300 transform rotate-12 animate-bounce" style={{ textShadow: '3px 3px 0 #000, -2px -2px 0 #fff' }}>
            💰
          </div>
          <div className="absolute bottom-32 left-32 text-5xl md:text-7xl font-bold text-pink-300 transform rotate-6" style={{ textShadow: '3px 3px 0 #000, -2px -2px 0 #fff' }}>
            😊
          </div>
          <div className="absolute bottom-20 right-20 text-4xl md:text-6xl font-bold text-green-300 transform -rotate-6 animate-pulse" style={{ textShadow: '3px 3px 0 #000, -2px -2px 0 #fff' }}>
            📚
          </div>

          <h1 className="relative z-10 text-6xl md:text-8xl lg:text-9xl font-anton font-bold text-center mb-6 transform rotate-1"
            style={{
              color: '#FFF',
              textShadow: '8px 8px 0 #000, 4px 4px 0 #FF1493',
              WebkitTextStroke: '4px black'
            }}
          >
            Walk Their Path
          </h1>

          <p className="relative z-10 text-xl md:text-2xl font-radio font-bold text-black text-center mb-12 bg-white px-10 py-5 transform -rotate-1 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-w-3xl">
            <span className='underline'>An Interactive Decision-Based Experience</span>
            <br />
            <span className="text-lg md:text-xl">You are about to begin a new chapter of your life here in Singapore. How will you balance your finances, academics, social life and personal happiness?</span>
          </p>

          <button
            onClick={() => handleStageTransition('desc')}
            className="relative z-10 group px-16 py-6 text-3xl md:text-4xl font-anton font-bold text-black bg-yellow-300 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] transform transition-all duration-200 hover:scale-110 hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] hover:-translate-y-2 hover:rotate-2"
          >
            START!
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-red-500 border-2 border-black rounded-full animate-ping" />
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-red-500 border-2 border-black rounded-full flex items-center justify-center text-white text-2xl font-bold">
              GO
            </div>
          </button>
        </div>
      )}

      {/* Description Screen */}
      {gameStage === 'desc' && currentScenario && (
        <div className="w-full h-screen relative overflow-hidden">
          {/* Blurred background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentScenario.descImage})`,
              filter: 'blur(10px)',
              transform: 'scale(1.1)'
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Main content */}
          <div className="relative w-full h-full flex items-center justify-between gap-8 pt-8 px-8 md:px-16">
            {/* Image on left - rotated slightly */}
            <div className="transform -rotate-2 shadow-[12px_12px_0_0_rgba(255,255,255,0.3)] shrink-0 max-w-3xl">
              <img
                src={currentScenario.descImage}
                alt="Scenario description"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            {/* Text space on right */}
            <div className="group flex-1 max-w-2xl max-h-[80vh] bg-white/95 backdrop-blur-sm rounded-2xl border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,0.8)] p-8 transform rotate-1 transition-all duration-300 cursor-pointer hover:scale-105 overflow-y-auto">
              <h2 className="text-3xl md:text-4xl font-anton font-bold text-black mb-4 transform -rotate-1">
                THE SITUATION
              </h2>
              <div className="text-lg md:text-xl text-black leading-relaxed space-y-4 blur-sm group-hover:blur-none transition-all duration-300">
                {currentScenario.descriptionText.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Persistent XP Bar - Top Right */}
          <PersistentXPBar xp={xp} />

          {/* Comic-style NEXT arrow button - bottom right */}
          <button
            onClick={() => handleStageTransition('choice')}
            className="absolute bottom-8 right-8 w-24 h-24 bg-yellow-300 border-4 border-white rounded-full shadow-[6px_6px_0_0_rgba(255,255,255,0.6)] flex items-center justify-center text-5xl transform transition-all duration-200 hover:scale-110 hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.8)] hover:-translate-y-1 hover:bg-yellow-400"
          >
            →
          </button>
        </div>
      )}

      {/* Choice Screen */}
      {gameStage === 'choice' && currentScenario && (
        <div className="w-full h-screen relative overflow-hidden">
          {/* Blurred background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentScenario.choiceImage})`,
              filter: 'blur(10px)',
              transform: 'scale(1.1)'
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Main content */}
          <div className="relative w-full h-full flex items-center justify-between pt-8 px-8 md:px-16">
            {/* Image on left - rotated slightly */}
            <div className="transform -rotate-1 shadow-[12px_12px_0_0_rgba(255,255,255,0.3)]">
              <img
                src={currentScenario.choiceImage}
                alt="Make your choice"
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>

            {/* Choice buttons on right side */}
            <div className="flex flex-col gap-6 mr-8 md:mr-16">
              <button
                onClick={() => handleChoice(currentScenario.choice1)}
                className="px-12 py-6 text-2xl md:text-3xl font-anton font-bold text-white bg-linear-to-r from-cyan-400 to-cyan-600 border-4 border-white shadow-[6px_6px_0_0_rgba(255,255,255,0.6)] transform rotate-2 transition-all duration-200 hover:scale-110 hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.8)] hover:-rotate-1"
              >
                {currentScenario.choice1.buttonText}
              </button>

              <button
                onClick={() => handleChoice(currentScenario.choice2)}
                className="px-12 py-6 text-2xl md:text-3xl font-anton font-bold text-white bg-linear-to-r from-pink-400 to-pink-600 border-4 border-white shadow-[6px_6px_0_0_rgba(255,255,255,0.6)] transform -rotate-2 transition-all duration-200 hover:scale-110 hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.8)] hover:rotate-1"
              >
                {currentScenario.choice2.buttonText}
              </button>
            </div>
          </div>

          {/* Persistent XP Bar - Top Right */}
          <PersistentXPBar xp={xp} />
        </div>
      )}

      {/* Result Screen */}
      {gameStage === 'result' && selectedChoice && (
        <div className="w-full h-screen relative overflow-hidden">
          {/* Blurred background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${selectedChoice.resultImage})`,
              filter: 'blur(10px)',
              transform: 'scale(1.1)'
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Main content */}
          <div className="relative w-full h-full flex items-center justify-between gap-8 pt-8 px-8 md:px-16">
            {/* Image on left - rotated slightly */}
            <div className="transform rotate-1 shadow-[12px_12px_0_0_rgba(255,255,255,0.3)] shrink-0 max-w-3xl">
              <img
                src={selectedChoice.resultImage}
                alt="Result"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            {/* Text space on right */}
            <div className="group flex-1 max-w-2xl max-h-[80vh] bg-white/95 backdrop-blur-sm rounded-2xl border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,0.8)] p-8 transform -rotate-1 transition-all duration-300 cursor-pointer hover:scale-105 overflow-y-auto">
              <h2 className="text-3xl md:text-4xl font-anton font-bold text-black mb-4 transform rotate-1">
                CONSEQUENCE
              </h2>
              <div className="text-lg md:text-xl text-black leading-relaxed space-y-4 blur-sm group-hover:blur-none transition-all duration-300">
                {selectedChoice.resultText.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Persistent XP Bar - Top Right */}
          <PersistentXPBar xp={xp} />

          {/* Next button - comic style */}
          <button
            onClick={goToNextScenario}
            className="absolute bottom-8 right-8 px-10 py-4 text-2xl font-anton font-bold text-white bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 border-4 border-white shadow-[6px_6px_0_0_rgba(255,255,255,0.6)] transform transition-all duration-200 hover:scale-110 hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.8)]"
          >
            {isLastScenario ? 'SEE FINAL STATS!' : 'NEXT SCENARIO →'}
          </button>
        </div>
      )}

      {/* Final Stats Screen */}
      {gameStage === 'finalStats' && (
        <div className="w-full h-screen flex flex-col items-center justify-center p-6 md:p-8 bg-background relative overflow-y-auto">
          {/* Polka dots pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle, currentColor 2px, transparent 2px)`,
              backgroundSize: '30px 30px',
              color: 'var(--secondary)'
            }}
          />

          {/* Title and Text box side by side */}
          <div className="relative z-10 w-full max-w-6xl flex flex-col pt-4 md:flex-row items-center justify-center gap-6 mb-8">
            <h1 className="text-4xl md:text-6xl font-anton font-bold text-center transform -rotate-2"
              style={{
                color: '#6C5CE7',
                textShadow: '4px 4px 0 #FFD93D, -2px -2px 0 black',
                WebkitTextStroke: '2px black'
              }}
            >
              FINAL STATS
            </h1>

            <p className="text-lg md:text-xl font-bold text-black text-center bg-yellow-300 px-6 py-3 transform rotate-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] shrink-0">
              Here's how your journey shaped your experience!
            </p>
          </div>

          {/* Large XP Bars */}
          <div className="relative z-10 w-full max-w-3xl space-y-4 mb-6">
            <ComicXPBar label="💰 MONEY" value={xp.money} color="from-green-400 to-green-600" />
            <ComicXPBar label="👥 SOCIAL LIFE" value={xp.socialLife} color="from-blue-400 to-blue-600" />
            <ComicXPBar label="📚 ACADEMICS" value={xp.academics} color="from-purple-400 to-purple-600" />
            <ComicXPBar label="😊 HAPPINESS" value={xp.happiness} color="from-yellow-400 to-yellow-600" />
          </div>

          <button
            onClick={() => handleStageTransition('conclusion')}
            className="relative z-10 px-10 py-4 text-2xl font-anton font-bold text-white bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transform transition-all duration-200 hover:scale-105 hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
          >
            CONTINUE →
          </button>
        </div>
      )}

      {/* Conclusion Screen */}
      {gameStage === 'conclusion' && (
        <div className="w-full h-screen flex flex-col items-center justify-center p-6 md:p-8 bg-background relative overflow-y-auto">
          {/* Polka dots pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle, currentColor 2px, transparent 2px)`,
              backgroundSize: '30px 30px',
              color: 'var(--secondary)'
            }}
          />

          <h1 className="relative z-10 text-3xl md:text-5xl font-anton font-bold text-center mb-8 transform -rotate-1"
            style={{
              color: '#FF6B6B',
              textShadow: '4px 4px 0 #4ECDC4, -2px -2px 0 black',
              WebkitTextStroke: '2px black'
            }}
          >
            Every Choice Matters
          </h1>

          <div className="relative z-10 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <p className="text-base md:text-lg font-bold text-black text-center bg-white px-6 py-6 transform rotate-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              The reality is that international students face these decisions <span className="text-red-600">every single day</span>. With every decision, sacrifices are made and trade-offs are incurred.
            </p>

            <p className="text-base md:text-lg font-bold text-black text-center bg-white px-6 py-6 transform -rotate-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              Balancing finances, a social life, academics, and personal happiness isn't easy when you're far from home.
            </p>

            <p className="text-base md:text-lg font-bold text-black text-center bg-yellow-300 px-6 py-6 transform rotate-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              Now imagine doing this in a <span className="text-purple-700">foreign country</span>, with <span className="text-purple-700">different cultures</span>, and <span className="text-purple-700">limited support</span>.
            </p>

            <p className="text-lg md:text-xl font-bold text-white text-center bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 px-6 py-6 transform -rotate-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              A simple conversation from you could make ALL the difference.
            </p>
          </div>

          <button
            onClick={resetGame}
            className="relative z-10 group px-12 py-5 text-2xl md:text-3xl font-anton font-bold text-white bg-linear-to-r from-green-400 via-blue-500 to-purple-600 border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transform transition-all duration-200 hover:scale-105 hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
          >
            RESTART
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-300 border-2 border-black rounded-full animate-spin" />
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-300 border-2 border-black rounded-full flex items-center justify-center text-black text-xl">
              ↻
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

// Persistent XP Bar in Top Right Corner - Minimalist Comic Style
interface PersistentXPBarProps {
  xp: XPBars;
}

function PersistentXPBar({ xp }: PersistentXPBarProps) {
  return (
    <div className="absolute top-4 right-4 bg-yellow-300 border-4 border-white rounded-xl p-3 shadow-[6px_6px_0_0_rgba(255,255,255,0.5)] space-y-2 z-30 transform rotate-2">
      {/* Halftone pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none rounded-xl"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1px)`,
          backgroundSize: '4px 4px'
        }}
      />

      <h3 className="text-sm font-anton font-bold text-black text-center mb-1 relative z-10" style={{ textShadow: '1px 1px 0 rgba(255,255,255,0.5)' }}>
        STATUS
      </h3>
      <MiniXPBar emoji="💰" value={xp.money} color="bg-green-500" />
      <MiniXPBar emoji="👥" value={xp.socialLife} color="bg-blue-500" />
      <MiniXPBar emoji="📚" value={xp.academics} color="bg-purple-500" />
      <MiniXPBar emoji="😊" value={xp.happiness} color="bg-yellow-500" />
    </div>
  );
}

// Mini XP Bar for persistent display - Minimalist
interface MiniXPBarProps {
  emoji: string;
  value: number;
  color: string;
}

function MiniXPBar({ emoji, value, color }: MiniXPBarProps) {
  return (
    <div className="flex items-center gap-2 relative z-10">
      <span className="text-base">{emoji}</span>
      <div className="flex-1 h-3 bg-white rounded-full border-2 border-gray-300 overflow-hidden min-w-[100px]">
        <div
          className={`h-full ${color} transition-all duration-500 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// Comic-styled XP Bar Component (for result overlays and final stats)
interface ComicXPBarProps {
  label: string;
  value: number;
  color: string;
}

function ComicXPBar({ label, value, color }: ComicXPBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-anton font-bold text-xl text-white" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>
          {label}
        </span>
      </div>
      <div className="w-full h-8 bg-gray-800 rounded-full border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] overflow-hidden relative">
        {/* Halftone pattern overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none z-10"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1px)`,
            backgroundSize: '4px 4px'
          }}
        />
        <div
          className={`h-full bg-linear-to-r ${color} transition-all duration-700 ease-out rounded-full relative z-0`}
          style={{ width: `${value}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full bg-linear-to-t from-transparent via-white/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
