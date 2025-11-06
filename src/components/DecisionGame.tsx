import { useState } from 'react';
import type { ReactNode } from 'react';

// Types
interface XPBars {
  money: number;
  socialLife: number;
  academics: number;
  happiness: number;
}

type ScreenType = 
  | 'title'
  | 'scenario1' | 'result1a' | 'result1b'
  | 'scenario2' | 'result2a' | 'result2b'
  | 'scenario3' | 'result3a' | 'result3b'
  | 'scenario4' | 'result4a' | 'result4b'
  | 'conclusion';

interface Decision {
  text: string;
  effect: Partial<XPBars>;
  resultScreen: ScreenType;
}

interface Scenario {
  background: string;
  description: string;
  decision1: Decision;
  decision2: Decision;
}

// Game data
const scenarios: Record<string, Scenario> = {
  scenario1: {
    background: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
    description: 'You just arrived at your university campus for the first time. Your roommate invites you to a campus tour with other international students, but you also need to set up your bank account today.',
    decision1: {
      text: 'Join the campus tour',
      effect: { socialLife: 15, happiness: 10, money: -5 },
      resultScreen: 'result1a'
    },
    decision2: {
      text: 'Set up bank account',
      effect: { money: 20, academics: 5, socialLife: -10 },
      resultScreen: 'result1b'
    }
  },
  scenario2: {
    background: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200',
    description: 'It\'s your first week of classes. You\'re struggling with the coursework and need to decide between joining a study group or spending money on a private tutor.',
    decision1: {
      text: 'Join study group',
      effect: { academics: 15, socialLife: 10, money: 0 },
      resultScreen: 'result2a'
    },
    decision2: {
      text: 'Hire private tutor',
      effect: { academics: 20, money: -25, socialLife: -5 },
      resultScreen: 'result2b'
    }
  },
  scenario3: {
    background: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200',
    description: 'Your friends are planning a weekend trip to explore the city, but you have a major assignment due next week and you\'re running low on funds.',
    decision1: {
      text: 'Go on the trip',
      effect: { happiness: 20, socialLife: 15, money: -20, academics: -10 },
      resultScreen: 'result3a'
    },
    decision2: {
      text: 'Stay and study',
      effect: { academics: 20, happiness: -10, socialLife: -15 },
      resultScreen: 'result3b'
    }
  },
  scenario4: {
    background: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200',
    description: 'End of semester is approaching. You can take on a part-time job to help with finances, or focus entirely on preparing for final exams.',
    decision1: {
      text: 'Take part-time job',
      effect: { money: 30, academics: -15, happiness: -5, socialLife: 5 },
      resultScreen: 'result4a'
    },
    decision2: {
      text: 'Focus on exams',
      effect: { academics: 25, happiness: 10, money: -10 },
      resultScreen: 'result4b'
    }
  }
};

const results: Record<string, { title: string; description: string; nextScreen: ScreenType }> = {
  result1a: {
    title: 'Great Choice!',
    description: 'You made new friends and learned your way around campus. You feel more connected but spent some money on snacks during the tour.',
    nextScreen: 'scenario2'
  },
  result1b: {
    title: 'Practical Decision',
    description: 'You successfully set up your bank account and can now manage your finances better. However, you missed out on making early connections with other students.',
    nextScreen: 'scenario2'
  },
  result2a: {
    title: 'Building Connections',
    description: 'The study group helped you understand the material better and you made friends who share similar academic goals.',
    nextScreen: 'scenario3'
  },
  result2b: {
    title: 'Investing in Success',
    description: 'The tutor provided personalized help and your grades improved significantly, but it was expensive and you studied alone.',
    nextScreen: 'scenario3'
  },
  result3a: {
    title: 'Making Memories',
    description: 'You had an amazing time exploring the city with friends. The experience enriched your cultural understanding, but you\'ll need to catch up on your assignment.',
    nextScreen: 'scenario4'
  },
  result3b: {
    title: 'Academic Focus',
    description: 'You completed your assignment early and to a high standard. Your friends understood, but you feel like you missed out on a bonding experience.',
    nextScreen: 'scenario4'
  },
  result4a: {
    title: 'Financial Stability',
    description: 'Your part-time job provided much-needed income and some work experience. However, balancing work and studies was challenging and affected your exam preparation.',
    nextScreen: 'conclusion'
  },
  result4b: {
    title: 'Academic Excellence',
    description: 'You devoted yourself to studying and feel confident about your exams. Your finances are tighter now, but you\'re proud of your academic dedication.',
    nextScreen: 'conclusion'
  }
};

export function DecisionGame() {
  // Initial XP bar values
  const initialXP: XPBars = {
    money: 50,
    socialLife: 50,
    academics: 50,
    happiness: 50
  };

  const [xp, setXP] = useState<XPBars>(initialXP);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('title');
  const [showModal, setShowModal] = useState(false);

  // Helper function to update XP bars
  const applyEffect = (effect: Partial<XPBars>) => {
    setXP(prev => ({
      money: Math.max(0, Math.min(100, prev.money + (effect.money || 0))),
      socialLife: Math.max(0, Math.min(100, prev.socialLife + (effect.socialLife || 0))),
      academics: Math.max(0, Math.min(100, prev.academics + (effect.academics || 0))),
      happiness: Math.max(0, Math.min(100, prev.happiness + (effect.happiness || 0)))
    }));
  };

  // Reset game
  const resetGame = () => {
    setXP(initialXP);
    setCurrentScreen('title');
    setShowModal(false);
  };

  // Get current scenario number
  const getScenarioKey = (): string => {
    if (currentScreen.startsWith('scenario')) {
      return currentScreen;
    }
    return '';
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[800px] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden relative">
        
        {/* Title Screen */}
        {currentScreen === 'title' && (
          <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-linear-to-br from-indigo-600 to-purple-600">
            <h1 className="text-6xl font-anton text-white mb-8">International Student Journey</h1>
            <div className="max-w-2xl text-center text-white space-y-6 mb-12">
              <p className="text-xl">
                Experience the challenges and decisions faced by international students studying abroad.
              </p>
              <p className="text-lg">
                Your choices will affect four key aspects of your life:
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="font-bold">Money</div>
                  <div className="text-sm">Manage your finances</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="font-bold">Social Life</div>
                  <div className="text-sm">Build connections</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-2xl mb-2">📚</div>
                  <div className="font-bold">Academics</div>
                  <div className="text-sm">Excel in your studies</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-2xl mb-2">😊</div>
                  <div className="font-bold">Happiness</div>
                  <div className="text-sm">Maintain well-being</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setCurrentScreen('scenario1')}
              className="px-12 py-4 bg-white text-purple-600 font-bold text-2xl rounded-full hover:bg-purple-100 hover:scale-105 transition-all shadow-lg"
            >
              Start Your Journey
            </button>
          </div>
        )}

        {/* Scenario Screens */}
        {['scenario1', 'scenario2', 'scenario3', 'scenario4'].includes(currentScreen) && (
          <div className="w-full h-full relative">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${scenarios[getScenarioKey()].background})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Info Button - Top Left */}
            <button
              onClick={() => setShowModal(true)}
              className="absolute top-6 left-6 z-20 w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:scale-110 transition-all"
              aria-label="Show scenario description"
            >
              ℹ️
            </button>

            {/* XP Bars - Top Right */}
            <div className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl min-w-[280px]">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Your Status</h3>
              <div className="space-y-3">
                <XPBar label="💰 Money" value={xp.money} color="bg-green-500" />
                <XPBar label="👥 Social Life" value={xp.socialLife} color="bg-blue-500" />
                <XPBar label="📚 Academics" value={xp.academics} color="bg-purple-500" />
                <XPBar label="😊 Happiness" value={xp.happiness} color="bg-yellow-500" />
              </div>
            </div>

            {/* Decision Buttons - Centered on Image */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="flex flex-col gap-6 w-full max-w-2xl px-8">
                <button
                  onClick={() => {
                    const scenario = scenarios[getScenarioKey()];
                    applyEffect(scenario.decision1.effect);
                    setCurrentScreen(scenario.decision1.resultScreen);
                  }}
                  className="w-full px-8 py-6 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl rounded-xl shadow-2xl hover:scale-105 transition-all"
                >
                  {scenarios[getScenarioKey()].decision1.text}
                </button>
                <button
                  onClick={() => {
                    const scenario = scenarios[getScenarioKey()];
                    applyEffect(scenario.decision2.effect);
                    setCurrentScreen(scenario.decision2.resultScreen);
                  }}
                  className="w-full px-8 py-6 bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold text-xl rounded-xl shadow-2xl hover:scale-105 transition-all"
                >
                  {scenarios[getScenarioKey()].decision2.text}
                </button>
              </div>
            </div>

            {/* Modal for Scenario Description */}
            {showModal && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="bg-white rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Scenario</h2>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-3xl text-gray-500 hover:text-gray-800 leading-none"
                      aria-label="Close modal"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {scenarios[getScenarioKey()].description}
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Result Screens */}
        {Object.keys(results).includes(currentScreen) && (
          <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-linear-to-br from-slate-800 to-slate-900">
            <div className="max-w-3xl text-center space-y-8">
              <h2 className="text-5xl font-anton text-white mb-6">
                {results[currentScreen as keyof typeof results].title}
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed">
                {results[currentScreen as keyof typeof results].description}
              </p>

              {/* Updated XP Bars */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">Updated Status</h3>
                <XPBar label="💰 Money" value={xp.money} color="bg-green-500" showValue />
                <XPBar label="👥 Social Life" value={xp.socialLife} color="bg-blue-500" showValue />
                <XPBar label="📚 Academics" value={xp.academics} color="bg-purple-500" showValue />
                <XPBar label="😊 Happiness" value={xp.happiness} color="bg-yellow-500" showValue />
              </div>

              <button
                onClick={() => setCurrentScreen(results[currentScreen as keyof typeof results].nextScreen)}
                className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl rounded-full transition-all hover:scale-105 shadow-lg"
              >
                {results[currentScreen as keyof typeof results].nextScreen === 'conclusion' 
                  ? 'See Final Results' 
                  : 'Next Scenario'}
              </button>
            </div>
          </div>
        )}

        {/* Conclusion Screen */}
        {currentScreen === 'conclusion' && (
          <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-linear-to-br from-purple-900 via-indigo-900 to-blue-900">
            <h1 className="text-6xl font-anton text-white mb-8">Journey Complete!</h1>
            <p className="text-2xl text-white mb-12">Here's how you managed your semester abroad:</p>
            
            {/* Final XP Bars - Centered */}
            <div className="bg-white rounded-2xl p-12 shadow-2xl w-full max-w-2xl space-y-6 mb-12">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Final Status</h2>
              <XPBar label="💰 Money" value={xp.money} color="bg-green-500" showValue large />
              <XPBar label="👥 Social Life" value={xp.socialLife} color="bg-blue-500" showValue large />
              <XPBar label="📚 Academics" value={xp.academics} color="bg-purple-500" showValue large />
              <XPBar label="😊 Happiness" value={xp.happiness} color="bg-yellow-500" showValue large />
              
              {/* Summary message based on performance */}
              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                <p className="text-center text-lg text-gray-700">
                  {getConclusion(xp)}
                </p>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="px-12 py-4 bg-white text-purple-600 font-bold text-2xl rounded-full hover:bg-purple-100 hover:scale-105 transition-all shadow-lg"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// XP Bar Component
interface XPBarProps {
  label: string;
  value: number;
  color: string;
  showValue?: boolean;
  large?: boolean;
}

function XPBar({ label, value, color, showValue = false, large = false }: XPBarProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className={`font-semibold text-gray-800 ${large ? 'text-xl' : 'text-sm'}`}>
          {label}
        </span>
        {showValue && (
          <span className={`font-bold text-gray-600 ${large ? 'text-xl' : 'text-sm'}`}>
            {value}/100
          </span>
        )}
      </div>
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${large ? 'h-6' : 'h-3'}`}>
        <div
          className={`${color} h-full transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// Get conclusion message based on final stats
function getConclusion(xp: XPBars): string {
  const total = xp.money + xp.socialLife + xp.academics + xp.happiness;
  const avg = total / 4;

  if (avg >= 75) {
    return "Outstanding! You've achieved an excellent balance across all aspects of your international student life. You managed finances, studies, friendships, and well-being brilliantly.";
  } else if (avg >= 60) {
    return "Great job! You navigated the challenges of studying abroad successfully. While some areas needed sacrifice, you maintained a healthy overall balance.";
  } else if (avg >= 45) {
    return "You made it through! The semester had its ups and downs, and you learned valuable lessons about the trade-offs of student life abroad.";
  } else {
    return "It was a challenging semester. You faced difficult decisions and some areas suffered, but you gained important insights about priorities and balance.";
  }
}
