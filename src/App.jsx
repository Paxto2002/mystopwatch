import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    setIsRunning(true);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  const resumeTimer = () => {
    if (!isRunning && time > 0 && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIsRunning(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans px-4">
      <div className="bg-[#0d1117] border border-green-400/20 shadow-[0_0_40px_#00ff88] rounded-3xl p-8 backdrop-blur-xl w-full max-w-sm text-center transition-all duration-300">
        <h1 className="text-4xl font-extrabold text-green-400 mb-6 tracking-widest">
          Paxto Timer
        </h1>

        <div className="text-[3rem] font-mono font-bold text-[#00ff88] mb-8 tracking-wider drop-shadow-[0_0_15px_#00ff88]">
          {time} <span className="text-base font-light text-white/60">sec</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
          {(!isRunning && time === 0) && (
            <button
              onClick={startTimer}
              className="bg-[#00ff88]/20 border border-green-500 hover:bg-[#00ff88]/40 text-green-300 py-2 px-5 rounded-xl shadow-lg hover:shadow-[0_0_20px_#00ff88] transition duration-300 font-semibold"
            >
              ▶️ Start
            </button>
          )}

          {isRunning && (
            <button
              onClick={stopTimer}
              className="bg-[#ff4f4f]/20 border border-red-500 hover:bg-[#ff4f4f]/40 text-red-300 py-2 px-5 rounded-xl shadow-lg hover:shadow-[0_0_20px_#ff4f4f] transition duration-300 font-semibold"
            >
              ⏸ Stop
            </button>
          )}

          {!isRunning && time > 0 && (
            <button
              onClick={resumeTimer}
              className="bg-[#ffd700]/20 border border-yellow-500 hover:bg-[#ffd700]/40 text-yellow-300 py-2 px-5 rounded-xl shadow-lg hover:shadow-[0_0_20px_#ffd700] transition duration-300 font-semibold"
            >
              🔄 Resume
            </button>
          )}

          {time > 0 && (
            <button
              onClick={resetTimer}
              className="bg-gray-700 border border-gray-500 hover:bg-gray-600 text-white py-2 px-5 rounded-xl shadow-lg hover:shadow-[0_0_20px_#94a3b8] transition duration-300 font-semibold"
            >
              🔁 Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
