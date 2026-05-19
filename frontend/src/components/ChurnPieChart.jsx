import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-black text-xs font-bold uppercase tracking-wider mb-1">{payload[0].name}</p>
        <p className="text-black font-display text-3xl font-extrabold tracking-tighter" >
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const ChurnPieChart = ({ activeDonors, churnRiskDonors }) => {
  const data = [
    { name: 'Active', value: activeDonors || 1 },
    { name: 'At Risk', value: churnRiskDonors || 1 }
  ];

  const COLORS = ['#b7c6c2', '#ff907c']; // Neo-sage, Light Red

  const hasData = activeDonors > 0 || churnRiskDonors > 0;

  return (
    <div className="bg-white border-2 border-black p-8 shadow-neo-base h-full flex flex-col min-h-[400px]">
      <div className="mb-6 pb-4 border-b-2 border-black">
        <h2 className="text-3xl font-extrabold font-display text-black uppercase tracking-tighter">Distribution</h2>
      </div>
      
      <div className="flex-grow w-full h-full min-h-[250px] relative">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={110}
                paddingAngle={0}
                dataKey="value"
                stroke="#000000"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="square" 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => <span className="text-black font-bold uppercase tracking-widest ml-2">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-black font-bold uppercase tracking-widest">
            No data.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChurnPieChart;
