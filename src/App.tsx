import { useCallback, useRef, useState } from 'react';
import OpeningScreen from './components/OpeningScreen';
import CelebrationScreen from './components/CelebrationScreen';
import PlanningScreen from './components/PlanningScreen';
import TimePickerScreen from './components/TimePickerScreen';
import FoodPickerScreen from './components/FoodPickerScreen';
import ConfirmationScreen from './components/ConfirmationScreen';

type Screen = 'opening' | 'celebration' | 'planning' | 'time' | 'food' | 'confirmation';

export default function App() {
  const [screen, setScreen] = useState<Screen>('opening');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  // Guard against rapid double-taps creating duplicate transitions.
  const transitioningRef = useRef(false);

  const goTo = useCallback((next: Screen) => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setScreen(next);
    window.setTimeout(() => {
      transitioningRef.current = false;
    }, 500);
  }, []);

  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200">
      <div
        key={screen}
        className="animate-screen-enter"
        style={{ minHeight: '100dvh' }}
      >
        {screen === 'opening' && <OpeningScreen onYes={() => goTo('celebration')} />}
        {screen === 'celebration' && (
          <CelebrationScreen onPlan={() => goTo('planning')} />
        )}
        {screen === 'planning' && (
          <PlanningScreen
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onContinue={() => goTo('time')}
            onBack={() => goTo('celebration')}
          />
        )}
        {screen === 'time' && (
          <TimePickerScreen
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
            onContinue={() => goTo('food')}
            onBack={() => goTo('planning')}
          />
        )}
        {screen === 'food' && (
          <FoodPickerScreen
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedFood={selectedFood}
            onSelectFood={setSelectedFood}
            onContinue={() => goTo('confirmation')}
            onBack={() => goTo('time')}
          />
        )}
        {screen === 'confirmation' && (
          <ConfirmationScreen
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedFood={selectedFood}
            onBack={() => goTo('food')}
          />
        )}
      </div>
    </main>
  );
}
