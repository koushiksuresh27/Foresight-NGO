import React from 'react';
import { FiServer, FiCpu, FiClock } from 'react-icons/fi';

const SystemStatus = ({ isConnected }) => {
  return (
    <div className="bg-white border-2 border-black p-6 shadow-neo-base h-full flex flex-col justify-center">
      <h3 className="text-xl font-display font-extrabold text-black uppercase tracking-tighter border-b-2 border-black pb-4 mb-4">System Core</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FiServer className="text-black text-xl" />
            <span className="text-sm font-bold text-black uppercase tracking-wider">API Uplink</span>
          </div>
          <div className={`px-2 py-1 border-2 border-black text-xs font-bold uppercase ${isConnected ? 'bg-neo-sage text-black' : 'bg-[#ff907c] text-black'}`}>
            {isConnected ? 'Stable' : 'Offline'}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FiCpu className="text-black text-xl" />
            <span className="text-sm font-bold text-black uppercase tracking-wider">Model Node</span>
          </div>
          <div className="px-2 py-1 border-2 border-black bg-neo-yellow text-black text-xs font-bold uppercase">
            v2.1 Active
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FiClock className="text-black text-xl" />
            <span className="text-sm font-bold text-black uppercase tracking-wider">Latency</span>
          </div>
          <div className="text-sm font-bold text-black bg-white border border-black px-2 py-1">
            {isConnected ? '24ms' : '--'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
