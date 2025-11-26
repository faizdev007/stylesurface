
import React, { useState } from 'react';
import Button from './Button';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { syncLeadToCRM } from '../../utils/crm';

interface LeadFormProps {
  className?: string;
  onSuccess?: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ className = '', onSuccess }) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    fullName: '',
    phone: '',
    userType: '',
    requirement: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        // 1. Save to Supabase (Primary Database)
        const { data, error } = await supabase.from('leads').insert({
            full_name: formState.fullName,
            phone: formState.phone,
            user_type: formState.userType,
            requirement: formState.requirement
        }).select().single();

        if (error) throw error;

        
        // 2. Push to CRM (Zoho/HubSpot via Zapier Webhook)
        // We don't await this to block the UI, but we trigger it.
        if (data) {
            syncLeadToCRM(data);
        }
        
        // Success UI Update
        console.log("Form Submitted Successfully");
        
        setIsSubmitting(false);
        if (onSuccess) onSuccess();
        navigate('/thank-you');
        
        setFormState({
            fullName: '',
            phone: '',
            userType: '',
            requirement: ''
        });
    } catch (err) {
        console.error("Submission Error", err);
        setIsSubmitting(false);
        alert("There was an error submitting your request. Please try again.");
    }
  };

  const inputClasses = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-gray-50 hover:bg-white text-industrial-dark placeholder-gray-400";

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      <div>
        <label className="block text-sm font-semibold text-industrial-dark mb-1.5">Full Name</label>
        <input 
          type="text" 
          name="fullName" 
          required 
          className={inputClasses}
          placeholder="Enter your full name"
          value={formState.fullName}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-industrial-dark mb-1.5">Phone Number</label>
        <input 
          type="tel" 
          name="phone" 
          required 
          className={inputClasses}
          placeholder="+91 98765 43210"
          value={formState.phone}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-industrial-dark mb-1.5">I am a...</label>
        <div className="relative">
            <select 
            name="userType" 
            required
            className={`${inputClasses} appearance-none cursor-pointer`}
            value={formState.userType}
            onChange={handleChange}
            disabled={isSubmitting}
            >
            <option value="" disabled>Select your role</option>
            <option value="Interior Designer">I am an Interior Designer</option>
            <option value="Retailer">I am a Retailer</option>
            <option value="Wholesaler">I am a Wholesaler</option>
            <option value="Dealer">I am a Dealer</option>
            <option value="Personal Use">I want for personal use</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-industrial-dark mb-1.5">Requirement</label>
        <textarea 
          name="requirement" 
          rows={2}
          className={inputClasses}
          placeholder="Type, thickness, quantity..."
          value={formState.requirement}
          onChange={handleChange}
          disabled={isSubmitting}
        ></textarea>
      </div>

      <Button type="submit" fullWidth variant="accent" size="lg" className="mt-2" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Processing...
          </span>
        ) : (
          "Contact Us Now"
        )}
      </Button>
    </form>
  );
};

export default LeadForm;
