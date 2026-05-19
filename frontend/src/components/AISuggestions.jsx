import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, 
  FiCalendar, 
  FiPhoneCall, 
  FiHeart, 
  FiAward, 
  FiZap, 
  FiTrendingUp, 
  FiCpu,
  FiCornerDownRight
} from 'react-icons/fi';

const AISuggestions = ({ prediction }) => {
  // Determine card style and recommendations based on prediction result
  const isAwaiting = !prediction;
  const isHighRisk = prediction?.prediction === 'Likely to Churn';

  let cardBg = 'bg-white';
  let cardShadow = 'shadow-neo-base';
  let borderColor = 'border-black';
  let accentColor = 'bg-neo-yellow';
  let headingText = 'Donor Intelligence suggestions';
  let statusText = 'SCANNER OFFLINE';

  let recommendations = [];

  if (isAwaiting) {
    statusText = 'AWAITING INFERENCE';
    recommendations = [
      { text: 'Awaiting Donor Inference matrix to generate retention strategies.', icon: <FiCpu className="text-xl" /> }
    ];
  } else if (isHighRisk) {
    cardBg = 'bg-[#ff907c]'; // Salmon / Churn risk red
    accentColor = 'bg-white';
    headingText = 'High Risk Churn Alert & Action Plan';
    statusText = 'CRITICAL INTERVENTION';
    recommendations = [
      { 
        text: 'Send personalized appreciation email', 
        icon: <FiMail className="text-xl" />,
        action: 'Email Dispatcher'
      },
      { 
        text: 'Offer campaign re-engagement benefits', 
        icon: <FiHeart className="text-xl" />,
        action: 'Campaign Manager'
      },
      { 
        text: 'Schedule follow-up call outreach', 
        icon: <FiPhoneCall className="text-xl" />,
        action: 'CR Link'
      },
      { 
        text: 'Invite donor to upcoming high-profile NGO event', 
        icon: <FiCalendar className="text-xl" />,
        action: 'Event Inviter'
      }
    ];
  } else {
    cardBg = 'bg-neo-sage'; // Sage / Safe stable green
    accentColor = 'bg-white';
    headingText = 'Donor Retention Suggestions';
    statusText = 'RETAINED & STABLE';
    recommendations = [
      { 
        text: 'Maintain regular automated engagement', 
        icon: <FiTrendingUp className="text-xl" />,
        action: 'Nurture Stream'
      },
      { 
        text: 'Recommend loyalty recognition and certificates', 
        icon: <FiAward className="text-xl" />,
        action: 'Awards Portal'
      },
      { 
        text: 'Add donor to High-Value Donor Segment', 
        icon: <FiZap className="text-xl" />,
        action: 'VIP Database'
      }
    ];
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`w-full ${cardBg} border-2 border-black p-6 md:p-8 ${cardShadow} transition-all duration-300 relative overflow-hidden my-8`}
    >
      {/* Neo brutalist high-contrast badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-5 mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 border-2 border-black ${accentColor} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
            <FiCpu className="text-black text-xl animate-pulse" />
          </div>
          <h3 className="text-xl md:text-2xl font-display font-extrabold uppercase tracking-tight text-black">
            {headingText}
          </h3>
        </div>
        <span className="text-xs font-black uppercase bg-black text-white px-3 py-1 border border-black tracking-widest shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
          {statusText}
        </span>
      </div>

      {/* Suggestion list */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={statusText}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-4"
          >
            {isAwaiting ? (
              <div className="flex items-center justify-center p-8 border-2 border-dashed border-black bg-white bg-opacity-40 rounded-none">
                <div className="text-center">
                  <FiCpu className="text-5xl mx-auto mb-3 text-black animate-spin" style={{ animationDuration: '3s' }} />
                  <p className="font-display font-extrabold text-lg uppercase tracking-tight text-black">
                    Awaiting prediction signal
                  </p>
                  <p className="font-sans font-bold text-xs uppercase tracking-wider text-black opacity-60 mt-1">
                    Submit donor data above to generate AI actionable recommendations
                  </p>
                </div>
              </div>
            ) : (
              recommendations.map((rec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2.5 border-2 border-black bg-neo-yellow text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-neo-yellow transition-colors">
                      {rec.icon}
                    </div>
                    <span className="font-sans font-extrabold text-sm md:text-base text-black uppercase tracking-tight">
                      {rec.text}
                    </span>
                  </div>
                  {rec.action && (
                    <div className="mt-3 sm:mt-0 flex items-center space-x-1.5 self-end sm:self-auto bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)] group-hover:bg-neo-yellow group-hover:text-black group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <FiCornerDownRight className="text-sm font-bold" />
                      <span>Execute {rec.action}</span>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AISuggestions;
