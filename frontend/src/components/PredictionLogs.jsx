import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertOctagon, FiShield, FiClock, FiTrash2, FiActivity } from 'react-icons/fi';

const PredictionLogs = ({ logs = [], onClearLogs }) => {
  // Filter logs into the two categories
  const highRiskLogs = logs.filter(log => log.prediction === 'Likely to Churn');
  const stableLogs = logs.filter(log => log.prediction === 'Not Likely to Churn');

  const formatTimestamp = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + 
             ' ' + date.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
    } catch (e) {
      return isoString;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    show: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } },
    exit: { opacity: 0, x: 20, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <div className="w-full my-8">
      {/* Logs Section Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-black">
        <div className="flex items-center space-x-3">
          <div className="p-2 border-2 border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
            <FiActivity className="text-xl" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white uppercase tracking-tight">
            Prediction History & Logs
          </h2>
        </div>
        {logs.length > 0 && (
          <button
            onClick={onClearLogs}
            className="flex items-center justify-center space-x-2 bg-[#ff907c] hover:bg-black hover:text-[#ff907c] text-black border-2 border-black font-display font-extrabold uppercase text-xs py-2 px-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <FiTrash2 className="text-sm" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        /* Entirely Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border-2 border-dashed border-white border-opacity-40 p-12 text-center bg-white bg-opacity-5 flex flex-col items-center justify-center"
        >
          <div className="p-4 bg-white border-2 border-black shadow-neo-base mb-4 text-black text-3xl">
            <FiClock className="animate-pulse" />
          </div>
          <h3 className="font-display font-extrabold text-xl uppercase tracking-wide text-white">
            Telemetry Database Empty
          </h3>
          <p className="font-sans font-bold text-xs uppercase tracking-wider text-white opacity-50 mt-1 max-w-sm">
            Inference logger is currently awaiting real-time analysis reports. New items will be routed and indexed here automatically.
          </p>
        </motion.div>
      ) : (
        /* Side by Side Panels */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Panel A: Likely to Churn */}
          <div className="bg-white border-2 border-black p-6 shadow-neo-base flex flex-col h-full min-h-[300px]">
            <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-4">
              <div className="flex items-center space-x-2">
                <FiAlertOctagon className="text-2xl text-[#ff907c]" />
                <h3 className="font-display font-extrabold text-lg uppercase tracking-tight text-black">
                  Likely to Churn
                </h3>
              </div>
              <span className="font-display font-extrabold bg-[#ff907c] text-black border-2 border-black px-2 py-0.5 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {highRiskLogs.length} Records
              </span>
            </div>

            <div className="flex-1 space-y-4 max-h-[450px] overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {highRiskLogs.length === 0 ? (
                  <motion.div 
                    key="high-risk-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex items-center justify-center border-2 border-dashed border-black border-opacity-20 p-8 text-center bg-gray-50"
                  >
                    <p className="font-sans font-bold text-xs uppercase tracking-wider text-black text-opacity-40">
                      No high-risk logs recorded.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="high-risk-list"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                  >
                    {highRiskLogs.map((log) => (
                      <motion.div
                        key={log.id}
                        variants={itemVariants}
                        layout
                        className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:scale-[1.01] transition-transform duration-200"
                      >
                        {/* Red warning border strip */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff907c]"></div>
                        
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-display font-black text-xs bg-black text-white px-2 py-0.5 uppercase tracking-wider border border-black shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.4)]">
                            {log.donor_id}
                          </span>
                          <span className="font-display font-extrabold text-[10px] bg-[#ff907c] text-black px-1.5 py-0.5 border border-black uppercase tracking-wider">
                            CRITICAL RISK
                          </span>
                        </div>

                        <div className="flex items-end justify-between mt-3">
                          <div>
                            <div className="flex items-center space-x-1 text-black opacity-60 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                              <FiClock />
                              <span>{formatTimestamp(log.timestamp)}</span>
                            </div>
                            <div className="text-[10px] text-black font-extrabold uppercase opacity-80">
                              Freq: {log.features?.donation_frequency}/yr · Idle: {log.features?.days_since_last_donation}d
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="block text-[9px] font-black uppercase text-black opacity-55 tracking-widest leading-none mb-1">
                              Confidence
                            </span>
                            <span className="font-display font-black text-3xl tracking-tighter text-black leading-none">
                              {log.confidence_score}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Panel B: Stable Donors */}
          <div className="bg-white border-2 border-black p-6 shadow-neo-base flex flex-col h-full min-h-[300px]">
            <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-4">
              <div className="flex items-center space-x-2">
                <FiShield className="text-2xl text-neo-sage" />
                <h3 className="font-display font-extrabold text-lg uppercase tracking-tight text-black">
                  Stable Donors
                </h3>
              </div>
              <span className="font-display font-extrabold bg-neo-sage text-black border-2 border-black px-2 py-0.5 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {stableLogs.length} Records
              </span>
            </div>

            <div className="flex-1 space-y-4 max-h-[450px] overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {stableLogs.length === 0 ? (
                  <motion.div 
                    key="stable-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex items-center justify-center border-2 border-dashed border-black border-opacity-20 p-8 text-center bg-gray-50"
                  >
                    <p className="font-sans font-bold text-xs uppercase tracking-wider text-black text-opacity-40">
                      No safe/stable logs recorded.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="stable-list"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                  >
                    {stableLogs.map((log) => (
                      <motion.div
                        key={log.id}
                        variants={itemVariants}
                        layout
                        className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:scale-[1.01] transition-transform duration-200"
                      >
                        {/* Green safe border strip */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-neo-sage"></div>

                        <div className="flex justify-between items-start mb-2">
                          <span className="font-display font-black text-xs bg-black text-white px-2 py-0.5 uppercase tracking-wider border border-black shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.4)]">
                            {log.donor_id}
                          </span>
                          <span className="font-display font-extrabold text-[10px] bg-neo-sage text-black px-1.5 py-0.5 border border-black uppercase tracking-wider">
                            SECURE / LOYAL
                          </span>
                        </div>

                        <div className="flex items-end justify-between mt-3">
                          <div>
                            <div className="flex items-center space-x-1 text-black opacity-60 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                              <FiClock />
                              <span>{formatTimestamp(log.timestamp)}</span>
                            </div>
                            <div className="text-[10px] text-black font-extrabold uppercase opacity-80">
                              Freq: {log.features?.donation_frequency}/yr · Idle: {log.features?.days_since_last_donation}d
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="block text-[9px] font-black uppercase text-black opacity-55 tracking-widest leading-none mb-1">
                              Confidence
                            </span>
                            <span className="font-display font-black text-3xl tracking-tighter text-black leading-none">
                              {log.confidence_score}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default PredictionLogs;
