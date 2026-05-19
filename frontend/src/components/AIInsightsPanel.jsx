import React from 'react';
import { FiCpu, FiMessageSquare } from 'react-icons/fi';

const AIInsightsPanel = ({ latestResult }) => {
  let insights = [];
  
  if (!latestResult) {
    insights = ["Awaiting inference data to generate contextual insights.", "Model v2.1 loaded and ready."];
  } else if (latestResult.prediction === 'Likely to Churn') {
    insights = [
      `CRITICAL: Behavior matches ${latestResult.confidence_score}% of historical churn profiles.`,
      "Recommendation: Immediately dispatch re-engagement email sequence.",
      "Insight: Dropping engagement is the primary flag."
    ];
  } else {
    insights = [
      "STATUS SAFE: User exhibits stable donation patterns.",
      "Insight: High engagement score strongly correlates with retention.",
      "Recommendation: Consider for 'Loyalty Tier' upgrade campaign."
    ];
  }

  return (
    <div className="bg-neo-yellow border-2 border-black p-6 shadow-neo-base h-full flex flex-col">
      <div className="flex items-center space-x-3 border-b-2 border-black pb-4 mb-4">
        <div className="p-2 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <FiCpu className="text-black text-xl" />
        </div>
        <h3 className="text-xl font-display font-extrabold text-black uppercase tracking-tighter">AI Analysis</h3>
      </div>
      
      <div className="flex-1 space-y-4">
        {insights.map((text, i) => (
          <div key={i} className="flex items-start space-x-3 bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <FiMessageSquare className="text-black mt-1 flex-shrink-0" />
            <p className="text-sm font-bold text-black leading-snug">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsightsPanel;
