import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Award, MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Sparkles, Navigation, Globe, HelpCircle } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API / Sanity submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 1200);
  };

  const faqs = [
    {
      q: 'Where is the main head office of IDEA Sri Lanka located?',
      a: 'Our central head office and primary fabrication workshop are located at 10-1/11, 3rd Lane, Galmaduwawatte, Kundasale, Kandy (Postal code: 20000).'
    },
    {
      q: 'How can community organizations or NGOs collaborate with IDEA?',
      a: 'We welcome partnerships with local CBOs, international development agencies, and government departments. You can submit your partnership proposal through the form above or email us directly at info@idealk.org.'
    },
    {
      q: 'Where can I inquire about Anagi biomass stoves or renewable energy tech?',
      a: 'You can contact our Kundasale office hotline via +94 81 2420436 or email idea.kandy@gmail.com for technical specifications, distribution requests, or workshop demonstrations.'
    },
    {
      q: 'Does IDEA offer internships or volunteer programs?',
      a: 'Yes, we regularly host university researchers, environmental students, and volunteers for field projects in eco-village development and biomass energy. Contact us with your CV and area of interest.'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#f4f7f5] text-slate-800">
      
      {/* 1. HERO HEADER SECTION (MATCHING PROJECTS, NEWS & DOWNLOADS STYLE) */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 bg-slate-900 overflow-hidden text-white">
        
        {/* Real High-Resolution Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80"
            alt="IDEA Kandy Kundasale Office Environment Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-emerald-950/65 z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (7 cols): Title, Breadcrumbs & Description */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Top Breadcrumb Nav */}
              <div className="flex flex-wrap items-center gap-3">
                <nav className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-xs">
                  <Link to="/" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                    <Home className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-emerald-300 font-extrabold">Contact Us</span>
                </nav>

                <span className="text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-xs">
                  You are here: <span className="text-emerald-300 font-extrabold ml-1">• Contact IDEA</span>
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-extrabold rounded-full border border-emerald-400/40 shadow-xs">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>35+ Years Sustainable Impact • Est. 1990</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                Get in Touch with IDEA
              </h1>

              <p className="text-slate-200 text-base sm:text-xl font-medium leading-relaxed max-w-2xl drop-shadow-sm">
                Have questions about our sustainable energy projects, eco-village initiatives, or partnership opportunities? Reach out to our Kundasale Head Office team.
              </p>

            </div>

            {/* Right Column (5 cols): Overlapping Translucent Glass Stats Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 relative">
              
              {/* Stat Glass Card 1 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">Fast Response</h3>
                  <p className="text-xs font-medium text-slate-300">Inquiries answered within 24 business hours</p>
                </div>
              </div>

              {/* Stat Glass Card 2 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">Central Head Office</h3>
                  <p className="text-xs font-medium text-slate-300">Kundasale, Kandy, Sri Lanka</p>
                </div>
              </div>

              {/* Stat Glass Card 3 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">11 Districts Network</h3>
                  <p className="text-xs font-medium text-slate-300">Active community footprint nationwide</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Organic Wave Cut */}
        <div className="w-full absolute -bottom-px left-0 right-0 overflow-hidden leading-none pointer-events-none z-20">
          <svg
            className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#f4f7f5]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C400,110 800,0 1200,70 L1200,120 L0,120 Z"></path>
          </svg>
        </div>

      </section>

      {/* 2. QUICK CONTACT CARDS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Our Location */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-[#00684a]/40 transition-all duration-300 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ebf5ee] text-[#00684a] flex items-center justify-center border border-[#00684a]/20">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Our Location</h3>
              <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                10-1/11, 3rd Lane, Galmaduwawatte Kundasale, Kandy Sri Lanka 20000
              </p>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed pt-2 border-t border-slate-100">
              Visit us at our headquarters in Kandy, where we coordinate our sustainable development initiatives across Sri Lanka.
            </p>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-[#00684a]/40 transition-all duration-300 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ebf5ee] text-[#00684a] flex items-center justify-center border border-[#00684a]/20">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Phone</h3>
              <p className="text-sm font-bold text-slate-900">
                +94 812 423 396
              </p>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed pt-2 border-t border-slate-100">
              Call us during office hours for immediate assistance with your inquiries about our programs and services.
            </p>
          </div>

          {/* Card 3: Email */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-[#00684a]/40 transition-all duration-300 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ebf5ee] text-[#00684a] flex items-center justify-center border border-[#00684a]/20">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Email</h3>
              <p className="text-sm font-bold text-[#00684a] truncate">
                info@idealk.org
              </p>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed pt-2 border-t border-slate-100">
              Send us an email and we&apos;ll respond as soon as possible with the information you need.
            </p>
          </div>

          {/* Card 4: Office Hours */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-[#00684a]/40 transition-all duration-300 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ebf5ee] text-[#00684a] flex items-center justify-center border border-[#00684a]/20">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Office Hours</h3>
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                Monday - Friday: 8:00 AM - 5:00 PM
              </p>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed pt-2 border-t border-slate-100">
              We&apos;re available during regular business hours. For urgent matters outside these hours, please send us an email.
            </p>
          </div>

        </div>
      </div>

      {/* 3. INTERACTIVE CONTACT FORM & GOOGLE MAP SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols): Send Us a Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00684a] bg-[#ebf5ee] px-3.5 py-1 rounded-full">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Send Us a Direct Message</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How Can We Help You?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                Fill out the inquiry form below and our team will get back to you promptly.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-[#ebf5ee] p-8 rounded-2xl border border-[#00684a]/30 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-[#00684a] mx-auto animate-bounce" />
                <h3 className="text-xl font-black text-slate-900">Thank You! Message Received</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-md mx-auto">
                  Your message has been sent successfully to the IDEA Kundasale Head Office team. We will review your inquiry and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-[#00684a] text-white text-xs font-bold rounded-xl hover:bg-[#043927] transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Nimal Perera"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00684a] focus:ring-1 focus:ring-[#00684a] transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. nimal@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00684a] focus:ring-1 focus:ring-[#00684a] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +94 77 123 4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00684a] focus:ring-1 focus:ring-[#00684a] transition"
                    />
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Subject / Category *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00684a] font-semibold text-slate-800 transition cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Project Partnership">Project Partnership &amp; Funding</option>
                      <option value="Biomass Cooking & Stoves">Biomass Energy &amp; Anagi Stoves</option>
                      <option value="Eco-Village & Climate">Eco-Village &amp; Climate Action</option>
                      <option value="Volunteering & Careers">Volunteering &amp; Job Applications</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Your Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Write details about your query or proposal..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:border-[#00684a] focus:ring-1 focus:ring-[#00684a] transition"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00684a] hover:bg-[#043927] text-white text-xs sm:text-sm font-extrabold py-3.5 px-6 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to IDEA</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

          {/* Right Column (5 cols): Embedded Google Map & Location Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Embedded Google Map Card */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-4 overflow-hidden">
              <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 relative">
                <iframe
                  title="IDEA Sri Lanka Kundasale Office Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.545738870817!2d80.672808!3d7.292398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae36605b9b8b8b9%3A0x8b8b8b8b8b8b8b8b!2sKundasale%2C%20Kandy!5e0!3m2!1sen!2slk!4v1680000000000!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="p-2 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Navigation className="w-4 h-4 text-[#00684a]" />
                  <span>Landmark &amp; Location Guide:</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Located near Galmaduwawatte Junction in Kundasale, just off the main Kandy-Mahiyangana highway. 15 minutes from Kandy city center.
                </p>

                <a
                  href="https://maps.google.com/?q=Kundasale,Kandy,Sri+Lanka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-[#00684a] bg-[#ebf5ee] hover:bg-[#00684a] hover:text-white px-4 py-2 rounded-xl transition border border-[#00684a]/30"
                >
                  <span>Open in Google Maps</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Support Info Box */}
            <div className="bg-gradient-to-br from-[#043927] to-[#00684a] text-white p-6 sm:p-7 rounded-3xl shadow-lg border border-[#00684a]/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Visit Us in Person</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">Office Visits &amp; Consultations</h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Prior appointments are recommended for project consultations, technology demonstrations, or partnership reviews. Please call ahead via +94 81 2420436.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* 4. FREQUENTLY ASKED QUESTIONS SECTION */}
      <div className="w-full bg-white py-14 sm:py-16 px-4 sm:px-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00684a] bg-[#ebf5ee] px-3.5 py-1 rounded-full">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Quick answers to common inquiries about IDEA Sri Lanka operations
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#f7faf7] rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:text-[#00684a] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg font-black text-[#00684a]">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>

                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 font-medium border-t border-slate-200/60 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}

export default ContactPage;
