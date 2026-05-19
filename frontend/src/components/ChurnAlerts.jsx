import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

const ChurnAlerts = ({ alerts }) => {
  return (
    <div className="bg-[#ff907c] border-2 border-black p-6 shadow-neo-base h-full flex flex-col">
      <div className="flex items-center space-x-3 border-b-2 border-black pb-4 mb-4">
        <div className="p-2 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <FiAlertTriangle className="text-black text-xl" />
        </div>
        <h3 className="text-xl font-display font-extrabold text-black uppercase tracking-tighter">Priority Alerts</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {alerts.length === 0 ? (
          <div className="h-full flex items-center justify-center border-2 border-black border-dashed bg-white/50 p-4 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-black">No Active Alerts</p>
          </div>
        ) : (
          <AnimatePresence>
            {alerts.map((alert) => (
              <motion.div 
                key={alert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-extrabold bg-black text-white px-2 py-0.5 uppercase tracking-widest">
                    ID_{alert.id}
                  </span>
                  <span className="text-[10px] font-bold border-b border-black">{alert.time}</span>
                </div>
                <p className="text-sm font-bold text-black">
                  High Risk ({alert.confidence_score}%) detected. Immediate action required.
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ChurnAlerts;
