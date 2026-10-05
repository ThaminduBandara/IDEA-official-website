import React, { useState } from 'react';
import { X, CheckCircle2, Heart, Sparkles, Send, UserCheck, ShieldCheck, Check } from 'lucide-react';

export function JoinUsModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    district: '',
    language: 'English',
    fullAddress: '',
    selectedInterests: [],
    experience: '',
    motivation: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
    'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
    'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa',
    'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ];

  const interestOptions = [
    'Environmental Conservation',
    'Renewable Energy',
    'Community Gardens',
    'Waste Management',
    'Water Conservation',
    'Climate Change Awareness',
    'Sustainable Agriculture',
    'Education & Outreach',
    'Research & Development',
    'Fundraising & Advocacy',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => {
      const exists = prev.selectedInterests.includes(interest);
      if (exists) {
        return {
          ...prev,
          selectedInterests: prev.selectedInterests.filter((i) => i !== interest),
        };
      } else {
        return {
          ...prev,
          selectedInterests: [...prev.selectedInterests, interest],
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      district: '',
      language: 'English',
      fullAddress: '',
      selectedInterests: [],
      experience: '',
      motivation: '',
    });
    onClose();
  };

  return (
    /* Outer Backdrop with onClick to close when clicking outside */
    <div
      onClick={handleResetAndClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn transition-opacity duration-300"
    >
      
      {/* Inner Modal Dialog Card (e.stopPropagation prevents closing when clicking inside) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl shadow-black/40 border border-slate-200/80 relative p-5 sm:p-7 space-y-5 text-slate-800 my-auto transform transition-all duration-300"
      >
        {isSubmitted ? (
          <div className="text-center py-10 space-y-5 relative">
            <button
              onClick={handleResetAndClose}
              className="absolute top-0 right-0 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition z-20"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
            <CheckCircle2 className="w-16 h-16 text-[#00684a] mx-auto animate-bounce" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Welcome to the IDEA Community!
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-medium">
              Thank you for applying to join Integrated Development Association (IDEA). Our regional coordinator will review your profile and contact you via email/phone within 2 business days.
            </p>
            <div className="pt-2">
              <button
                onClick={handleResetAndClose}
                className="bg-[#00684a] hover:bg-[#043927] text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-md transition"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Medium Compact Header Banner with integrated Close Button X */}
            <div className="bg-gradient-to-br from-[#043927] via-[#00684a] to-[#043927] text-white px-5 py-4 rounded-2xl shadow-sm relative overflow-hidden space-y-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
              
              {/* Close Button X inside banner top-right */}
              <button
                onClick={handleResetAndClose}
                className="absolute top-3.5 right-3.5 p-1.5 text-emerald-100/90 hover:text-white hover:bg-white/20 rounded-full transition-colors z-20 cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-amber-300 bg-black/30 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                  <Sparkles className="w-3 h-3" />
                  <span>Community Membership</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Join IDEA
              </h2>

              <p className="text-xs text-emerald-100/90 font-medium leading-snug max-w-md">
                Help us contribute to sustainable development in Sri Lanka. Fill out this form to become part of our community.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#00684a] focus:ring-2 focus:ring-[#00684a]/20 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#00684a] focus:ring-2 focus:ring-[#00684a]/20 transition"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#00684a] focus:ring-2 focus:ring-[#00684a]/20 transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="077XXXXXXX or +94XXXXXXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#00684a] focus:ring-2 focus:ring-[#00684a]/20 transition"
                  />
                </div>
              </div>

              {/* Row 3: District & Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">District *</label>
                  <select
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#00684a] focus:ring-2 focus:ring-[#00684a]/20 font-semibold text-slate-800 cursor-pointer transition"
                  >
                    <option value="">Select your district</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Preferred Language</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#00684a] focus:ring-2 focus:ring-[#00684a]/20 font-semibold text-slate-800 cursor-pointer transition"
                  >
                    <option value="English">English</option>
                    <option value="Sinhala">Sinhala (සිංහල)</option>
                    <option value="Tamil">Tamil (தமிழ்)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Full Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Address</label>
                <textarea
                  name="fullAddress"
                  rows={2}
                  placeholder="Enter your complete address including city and postal code"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-[#00684a] focus:ring-2 focus:ring-[#00684a]/20 transition"
                />
              </div>

              {/* Row 5: Areas of Interest Grid */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Areas of Interest (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {interestOptions.map((interest) => {
                    const isSelected = formData.selectedInterests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`text-left text-xs font-semibold p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#ebf5ee] text-[#00684a] border-[#00684a] font-bold shadow-xs scale-[1.01]'
                            : 'bg-slate-50 text-slate-700 border-slate-200/90 hover:bg-slate-100'
                        }`}
                      >
                        <span>{interest}</span>
                        <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#00684a] border-[#00684a] text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 6: Relevant Experience */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Relevant Experience (Optional)</label>
                <textarea
                  name="experience"
                  rows={2}
                  placeholder="Tell us about any relevant experience or skills you have"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-[#00684a] focus:ring-2 focus:ring-[#00684a]/20 transition"
                />
              </div>

              {/* Row 7: Why do you want to join us? */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Why do you want to join us?</label>
                <textarea
                  name="motivation"
                  rows={2}
                  placeholder="Share your motivation for joining IDEA Sri Lanka and how you'd like to contribute"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:border-[#00684a] focus:ring-2 focus:ring-[#00684a]/20 transition"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 py-3 px-6 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#00684a] hover:bg-[#043927] text-white text-xs sm:text-sm font-extrabold py-3 px-8 rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </>
        )}

      </div>

    </div>
  );
}

export default JoinUsModal;
