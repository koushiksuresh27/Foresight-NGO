import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertTriangle, FiTarget } from 'react-icons/fi';

const PredictionForm = ({ onPredictionSuccess }) => {
  const [formData, setFormData] = useState({
    donor_id: '',
    donation_frequency: '',
    average_donation: '',
    days_since_last_donation: '',
    campaign_engagement_score: '',
    total_donations: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    setTimeout(async () => {
      try {
        const numericData = {
          donation_frequency: Number(formData.donation_frequency),
          average_donation: Number(formData.average_donation),
          days_since_last_donation: Number(formData.days_since_last_donation),
          campaign_engagement_score: Number(formData.campaign_engagement_score),
          total_donations: Number(formData.total_donations)
        };

        const res = await axios.post('http://127.0.0.1:5000/predict', numericData, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        const predictionResult = res.data;
        setResult(predictionResult);

        if (onPredictionSuccess) {
          onPredictionSuccess({
            ...predictionResult,
            donor_id: formData.donor_id.trim() || `DONOR-${Math.floor(1000 + Math.random() * 9000)}`,
            timestamp: new Date().toISOString(),
            features: { ...numericData }
          });
        }
      } catch (err) {
        console.error("API Error:", err);
        const errorMsg = err.response?.data?.error || err.message || 'Failed to connect';
        setError(`Error: ${errorMsg}`);
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  const inputClass = "w-full bg-white border-2 border-black px-4 py-4 text-black font-medium placeholder-gray-400 focus:outline-none focus:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all text-lg";
  const labelClass = "block text-sm font-bold text-black mb-2 tracking-wide uppercase";

  return (
    <div className="bg-white border-2 border-black p-8 md:p-12 shadow-neo-lg flex flex-col">
      
      <div className="flex items-center space-x-4 mb-10 pb-6 border-b-2 border-black">
        <div className="p-3 border-2 border-black bg-neo-yellow shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <FiTarget className="text-black text-3xl" />
        </div>
        <h2 className="text-4xl font-extrabold font-display text-black uppercase tracking-tighter">Inference Matrix</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-10">
          <div className="md:col-span-2">
            <label className={labelClass}>Donor ID / Session Reference</label>
            <input type="text" name="donor_id" value={formData.donor_id} onChange={handleChange} className={inputClass} placeholder="e.g. DONOR-8042 (Optional, auto-generated if blank)" />
          </div>
          <div>
            <label className={labelClass}>Freq. (Yr)</label>
            <input type="number" name="donation_frequency" value={formData.donation_frequency} onChange={handleChange} required className={inputClass} placeholder="12" />
          </div>
          <div>
            <label className={labelClass}>Avg Don. ($)</label>
            <input type="number" step="0.01" name="average_donation" value={formData.average_donation} onChange={handleChange} required className={inputClass} placeholder="50.00" />
          </div>
          <div>
            <label className={labelClass}>Days Idle</label>
            <input type="number" name="days_since_last_donation" value={formData.days_since_last_donation} onChange={handleChange} required className={inputClass} placeholder="45" />
          </div>
          <div>
            <label className={labelClass}>Engagement</label>
            <input type="number" name="campaign_engagement_score" value={formData.campaign_engagement_score} onChange={handleChange} required className={inputClass} placeholder="8" />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Total Value ($)</label>
            <input type="number" step="0.01" name="total_donations" value={formData.total_donations} onChange={handleChange} required className={inputClass} placeholder="1500.00" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="relative w-full mt-10 bg-black border-2 border-black text-white font-display font-extrabold uppercase tracking-widest text-2xl py-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Execute Prediction'}
        </button>
      </form>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 bg-[#ff907c] border-2 border-black p-5 text-black font-bold uppercase shadow-neo-base text-lg text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`mt-10 p-8 border-2 border-black shadow-neo-lg ${result.prediction === 'Likely to Churn' ? 'bg-[#ff907c]' : 'bg-neo-sage'} flex flex-col md:flex-row items-center justify-between gap-6 transform transition-transform hover:scale-[1.02] duration-300`}
          >
            <div className="flex items-center space-x-6 w-full md:w-auto">
              <div className={`p-5 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                {result.prediction === 'Likely to Churn' ? (
                  <FiAlertTriangle className="text-5xl text-black" />
                ) : (
                  <FiCheckCircle className="text-5xl text-black" />
                )}
              </div>
              <div>
                <p className="text-black text-sm font-extrabold uppercase tracking-widest mb-1">Status</p>
                <h4 className={`text-4xl md:text-5xl font-display font-extrabold text-black tracking-tighter uppercase leading-none`}>
                  {result.prediction}
                </h4>
              </div>
            </div>
            <div className="text-center md:text-right bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full md:w-auto min-w-[160px]">
              <p className="text-black text-sm font-extrabold uppercase tracking-widest mb-2">Confidence</p>
              <p className="text-black font-display text-6xl font-extrabold tracking-tighter leading-none">{result.confidence_score}<span className="text-3xl">%</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PredictionForm;
