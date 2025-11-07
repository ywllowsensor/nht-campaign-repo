import { useState } from 'react';

// ============================================
// HOW TO ADD MORE SCENARIOS:
// ============================================
// 1. Add your 4 images to src/assets/scenarios/[number]/ folder:
//    - scenario[number]-desc.jpg (description screen)
//    - scenario[number]-choice.jpg (choice screen with 2 buttons)
//    - scenario[number]-choice-[option1].jpg (result for choice 1)
//    - scenario[number]-choice-[option2].jpg (result for choice 2)
//
// 2. Import them at the top
// 3. Add a new object to scenariosConfig array below
// 4. Adjust the XP effects for each choice
// ============================================

// Import scenario images
import scenario1Desc from '../assets/scenarios/1/scenario1-desc.jpg';
import scenario1Choice from '../assets/scenarios/1/scenario1-choice.jpg';
import scenario1StayHome from '../assets/scenarios/1/scenario1-choice-stayhome.jpg';
import scenario1Supper from '../assets/scenarios/1/scenario1-choice-supper.jpg';

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
    descImage: scenario1Desc,
    choiceImage: scenario1Choice,
    descriptionText: [
      "Add your scenario description here. This is where you can explain the situation, context, and what the international student is facing in this moment.",
      "You can add multiple paragraphs to fully describe the scenario and help the player understand the situation before making their choice."
    ],
    choice1: {
      name: 'choice1',
      effect: { money: -10, socialLife: 20, academics: -5, happiness: 15 },
      resultImage: scenario1Supper, // Assuming top button is "supper"
      resultText: [
        "Describe what happened as a result of choosing to go to supper. Explain the immediate consequences and how it affects the international student's situation.",
        "Show the impact on their money, social life, academics, and happiness. Help the player understand the real-world implications of this decision."
      ]
    },
    choice2: {
      name: 'choice2',
      effect: { money: 10, socialLife: -15, academics: 10, happiness: -5 },
      resultImage: scenario1StayHome, // Assuming bottom button is "stay home"
      resultText: [
        "Describe what happened as a result of choosing to stay home. Explain the immediate consequences and how it affects the international student's situation.",
        "Show the impact on their money, social life, academics, and happiness. Help the player understand the real-world implications of this decision."
      ]
    }
  }
  // Add more scenarios here following the same pattern:
  // {
  //   id: 2,
  //   descImage: scenario2Desc,
  //   choiceImage: scenario2Choice,
  //   descriptionText: [
  //     "First paragraph of scenario 2 description...",
  //     "Second paragraph of scenario 2 description..."
  //   ],
  //   choice1: { 
  //     name: 'choice1', 
  //     effect: { ... }, 
  //     resultImage: scenario2Result1,
  //     resultText: ["First paragraph...", "Second paragraph..."]
  //   },
  //   choice2: { 
  //     name: 'choice2', 
  //     effect: { ... }, 
  //     resultImage: scenario2Result2,
  //     resultText: ["First paragraph...", "Second paragraph..."]
  //   }
  // },
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

  const currentScenario = scenariosConfig[currentScenarioIndex];
  const isLastScenario = currentScenarioIndex === scenariosConfig.length - 1;

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
  const handleChoice = (choice: Choice) => {
    setSelectedChoice(choice);
    applyEffect(choice.effect);
    setGameStage('result');
  };

  // Move to next scenario
  const goToNextScenario = () => {
    if (isLastScenario) {
      // Game completed - show final stats
      setGameStage('finalStats');
    } else {
      setCurrentScenarioIndex(prev => prev + 1);
      setGameStage('desc');
      setSelectedChoice(null);
    }
  };

  // Reset game
  const resetGame = () => {
    setXP(initialXP);
    setCurrentScenarioIndex(0);
    setGameStage('title');
    setSelectedChoice(null);
  };

  return (
    <div className="w-full min-h-screen bg-primary/80 relative">
      {/* Title Screen */}
      {gameStage === 'title' && (
        <div className="w-full h-screen flex flex-col items-center justify-center p-8 md:p-12 bg-linear-to-br from-blue-600 to-blue-400 relative overflow-hidden">
          {/* Comic burst decorations */}
          <div className="absolute top-10 left-10 text-6xl md:text-8xl font-bold text-yellow-400 transform -rotate-12 animate-bounce" style={{ textShadow: '4px 4px 0 #FF6B6B, -2px -2px 0 black' }}>
            POW!
          </div>
          <div className="absolute bottom-10 right-10 text-6xl md:text-8xl font-bold text-pink-400 transform rotate-12 animate-bounce" style={{ textShadow: '4px 4px 0 #4ECDC4, -2px -2px 0 black' }}>
            BAM!
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-anton font-bold text-center mb-6 transform -rotate-2"
            style={{
              color: '#FF6B6B',
              textShadow: '6px 6px 0 #4ECDC4, -3px -3px 0 black',
              WebkitTextStroke: '3px black'
            }}
          >
            Walk Their Path
          </h1>
          
          <p className="text-2xl md:text-3xl font-radio font-bold text-black text-center mb-12 bg-yellow-300 px-8 py-4 transform rotate-1 border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] max-w-3xl">
            Make choices. See consequences. Feel the journey.
          </p>

          <button
            onClick={() => {
              setGameStage('desc');
            }}
            className="group relative px-16 py-6 text-3xl md:text-4xl font-anton font-bold text-white bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] transform transition-all duration-200 hover:scale-110 hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] hover:-translate-y-2"
          >
            START YOUR JOURNEY!
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 border-2 border-black rounded-full animate-ping" />
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 border-2 border-black rounded-full flex items-center justify-center text-black text-2xl">
              ★
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
            <div className="transform -rotate-2 shadow-[12px_12px_0_0_rgba(255,255,255,0.3)] flex-shrink-0">
              <img 
                src={currentScenario.descImage}
                alt="Scenario description"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            
            {/* Text space on right */}
            <div className="flex-1 max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,0.8)] p-8 transform rotate-1">
              <h2 className="text-3xl md:text-4xl font-anton font-bold text-black mb-4 transform -rotate-1">
                THE SITUATION
              </h2>
              <div className="text-lg md:text-xl text-black leading-relaxed space-y-4">
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
            onClick={() => setGameStage('choice')}
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
                CHOICE 1
              </button>
              
              <button
                onClick={() => handleChoice(currentScenario.choice2)}
                className="px-12 py-6 text-2xl md:text-3xl font-anton font-bold text-white bg-linear-to-r from-pink-400 to-pink-600 border-4 border-white shadow-[6px_6px_0_0_rgba(255,255,255,0.6)] transform -rotate-2 transition-all duration-200 hover:scale-110 hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.8)] hover:rotate-1"
              >
                CHOICE 2
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
            <div className="transform rotate-1 shadow-[12px_12px_0_0_rgba(255,255,255,0.3)] flex-shrink-0">
              <img 
                src={selectedChoice.resultImage}
                alt="Result"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            
            {/* Text space on right */}
            <div className="flex-1 max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,0.8)] p-8 transform -rotate-1">
              <h2 className="text-3xl md:text-4xl font-anton font-bold text-black mb-4 transform rotate-1">
                CONSEQUENCE
              </h2>
              <div className="text-lg md:text-xl text-black leading-relaxed space-y-4">
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
          {/* Comic burst decoration */}
          <div className="absolute top-4 left-4 text-4xl md:text-5xl font-bold text-green-400 transform -rotate-12 animate-pulse" style={{ textShadow: '3px 3px 0 #FFD93D, -2px -2px 0 black' }}>
            BOOM!
          </div>

          <h1 className="text-4xl md:text-6xl font-anton font-bold text-center mb-4 transform -rotate-2"
            style={{
              color: '#6C5CE7',
              textShadow: '4px 4px 0 #FFD93D, -2px -2px 0 black',
              WebkitTextStroke: '2px black'
            }}
          >
            FINAL STATS
          </h1>

          <p className="text-lg md:text-xl font-bold text-black text-center mb-6 bg-yellow-300 px-6 py-3 transform rotate-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] max-w-xl">
            Here's how your journey shaped your experience
          </p>

          {/* Large XP Bars */}
          <div className="w-full max-w-3xl space-y-4 mb-6">
            <ComicXPBar label="💰 MONEY" value={xp.money} color="from-green-400 to-green-600" />
            <ComicXPBar label="👥 SOCIAL LIFE" value={xp.socialLife} color="from-blue-400 to-blue-600" />
            <ComicXPBar label="📚 ACADEMICS" value={xp.academics} color="from-purple-400 to-purple-600" />
            <ComicXPBar label="😊 HAPPINESS" value={xp.happiness} color="from-yellow-400 to-yellow-600" />
          </div>

          <button
            onClick={() => setGameStage('conclusion')}
            className="px-10 py-4 text-2xl font-anton font-bold text-white bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transform transition-all duration-200 hover:scale-105 hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
          >
            CONTINUE →
          </button>
        </div>
      )}

      {/* Conclusion Screen */}
      {gameStage === 'conclusion' && (
        <div className="w-full h-screen flex flex-col items-center justify-center p-6 md:p-8 bg-background relative overflow-y-auto">
          {/* Comic decorations - smaller and positioned better */}
          <div className="absolute top-4 right-4 text-4xl md:text-5xl font-bold text-pink-400 transform rotate-12 animate-bounce" style={{ textShadow: '3px 3px 0 #4ECDC4, -2px -2px 0 black' }}>
            ZING!
          </div>
          <div className="absolute bottom-4 left-4 text-4xl md:text-5xl font-bold text-yellow-400 transform -rotate-12 animate-bounce" style={{ textShadow: '3px 3px 0 #FF6B6B, -2px -2px 0 black' }}>
            WOW!
          </div>

          <h1 className="text-3xl md:text-5xl font-anton font-bold text-center mb-4 transform -rotate-1"
            style={{
              color: '#FF6B6B',
              textShadow: '4px 4px 0 #4ECDC4, -2px -2px 0 black',
              WebkitTextStroke: '2px black'
            }}
          >
            Every Choice Matters
          </h1>

          <div className="max-w-3xl space-y-4 mb-6">
            <p className="text-base md:text-lg font-bold text-black text-center bg-white px-6 py-4 transform rotate-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              International students face these decisions <span className="text-red-600">every single day</span>.
            </p>
            
            <p className="text-base md:text-lg font-bold text-black text-center bg-white px-6 py-4 transform -rotate-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              Balancing money, social life, academics, and happiness isn't easy when you're far from home.
            </p>

            <p className="text-base md:text-lg font-bold text-black text-center bg-yellow-300 px-6 py-4 transform rotate-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              Now imagine doing this in a <span className="text-purple-700">foreign country</span>, with <span className="text-purple-700">different cultures</span>, and <span className="text-purple-700">limited support</span>.
            </p>

            <p className="text-lg md:text-xl font-bold text-white text-center bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 px-6 py-4 transform -rotate-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              A simple conversation from you could make ALL the difference. 💙
            </p>
          </div>

          <button
            onClick={resetGame}
            className="group relative px-12 py-5 text-2xl md:text-3xl font-anton font-bold text-white bg-linear-to-r from-green-400 via-blue-500 to-purple-600 border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] transform transition-all duration-200 hover:scale-105 hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
          >
            PLAY AGAIN!
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
      <span className="text-xs font-bold text-black w-7 text-right">{value}</span>
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
        <span className="font-anton font-bold text-xl text-yellow-300" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>
          {value}
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
          <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
