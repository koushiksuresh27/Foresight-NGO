import React from 'react';
import CountUp from 'react-countup';

const StatCard = ({ title, value, icon, bgColor, isPercentage = false }) => {
  return (
    <div className={`p-6 border-2 border-black shadow-neo-base ${bgColor} transition-transform duration-200 hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-black mb-2 tracking-widest uppercase">{title}</p>
          <h3 className="text-5xl font-extrabold font-display text-black flex items-end tracking-tighter">
            <CountUp 
              end={parseFloat(value) || 0} 
              decimals={isPercentage ? 1 : 0} 
              duration={1.5} 
              separator="," 
            />
            {isPercentage && <span className="text-2xl ml-1 mb-1">%</span>}
          </h3>
        </div>
        <div className={`p-4 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
