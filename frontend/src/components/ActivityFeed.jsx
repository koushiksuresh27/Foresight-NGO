import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiActivity, FiAlertOctagon } from 'react-icons/fi';

const ActivityFeed = ({ feed }) => {
  return (
    <div className="bg-white border-2 border-black p-6 shadow-neo-base flex flex-col h-full min-h-[300px]">
      <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
        <h3 className="text-xl font-display font-extrabold text-black uppercase tracking-tighter">Live Feed</h3>
        <div className="flex items-center space-x-2 bg-black px-2 py-1 border-2 border-black">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">Rec_ing</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {feed.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-black bg-gray-50">
            <FiActivity className="text-3xl text-gray-400 mb-2" />
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Awaiting Data</p>
          </div>
        ) : (
          <AnimatePresence>
            {feed.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-start space-x-3 ${item.prediction === 'Likely to Churn' ? 'bg-[#ff907c]/20' : 'bg-neo-sage/20'}`}
              >
                <div className={`p-2 border-2 border-black bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`}>
                  {item.prediction === 'Likely to Churn' ? <FiAlertOctagon className="text-black" /> : <FiActivity className="text-black" />}
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-center mb-1 w-full">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-black">ID_{item.id}</p>
                    <span className="text-[10px] font-bold bg-white border border-black px-1">{item.time}</span>
                  </div>
                  <p className="text-sm font-bold text-black">{item.prediction}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
