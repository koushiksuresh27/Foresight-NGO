import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PredictionForm from './components/PredictionForm';
import AISuggestions from './components/AISuggestions';
import PredictionLogs from './components/PredictionLogs';

function App() {
  const [latestPrediction, setLatestPrediction] = useState(null);
  const [logs, setLogs] = useState([]);


  useEffect(() => {
    try {
      const stored = localStorage.getItem('donor_prediction_logs');
      if (stored) {
        const parsed = JSON.parse(stored);
        setLogs(parsed);
        if (parsed.length > 0) {
          
          setLatestPrediction(parsed[0]);
        }
      }
    } catch (e) {
      console.error('Failed to load logs from localStorage:', e);
    }
  }, []);

  const handlePredictionSuccess = (predictionData) => {
    const newLog = {
      id: `LOG-${Date.now()}`,
      ...predictionData
    };

    setLatestPrediction(newLog);

    setLogs((prevLogs) => {
      
      const updated = [newLog, ...prevLogs];
      
      
      const highRisk = updated.filter(l => l.prediction === 'Likely to Churn').slice(0, 10);
      const stable = updated.filter(l => l.prediction === 'Not Likely to Churn').slice(0, 10);
      
      
      const merged = [...highRisk, ...stable].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      try {
        localStorage.setItem('donor_prediction_logs', JSON.stringify(merged));
      } catch (e) {
        console.error('Failed to save logs to localStorage:', e);
      }
      return merged;
    });
  };

  const handleClearLogs = () => {
    setLogs([]);
    setLatestPrediction(null);
    try {
      localStorage.removeItem('donor_prediction_logs');
    } catch (e) {
      console.error('Failed to clear logs from localStorage:', e);
    }
  };

  return (
    <div className="min-h-screen bg-neo-charcoal text-black font-sans selection:bg-neo-yellow overflow-x-hidden flex flex-col items-center justify-center p-4 md:p-8 relative">
      <div className="absolute inset-0 neo-pattern opacity-20 pointer-events-none"></div>

      <div className="max-w-3xl w-full relative z-10 py-12">

        {/* Header Area */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold font-display tracking-tighter text-white uppercase leading-none drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            FORESIGHT <span className="text-neo-yellow">NGO</span>
          </h1>
          <p className="text-white mt-6 text-sm font-bold tracking-widest uppercase bg-black inline-block px-5 py-2 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            Prediction Engine Demo
          </p>
        </motion.div>

        {/* Centered Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <PredictionForm onPredictionSuccess={handlePredictionSuccess} />
        </motion.div>

        {/* AI suggestions card */}
        <AISuggestions prediction={latestPrediction} />

        {/* Prediction History / Logs */}
        <PredictionLogs logs={logs} onClearLogs={handleClearLogs} />

      </div>
    </div>
  );
}

export default App;

