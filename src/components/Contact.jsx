import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { staggerContainer, fadeUp, slideLeft, slideRight, useScrollAnimation } from '../hooks/useScrollAnimation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Reusable Input Field Component
const InputField = ({ label, name, type = 'text', value, onChange, placeholder, required }) => (
  <div>
    <label className="block font-body text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-brand-blue">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all duration-200 bg-white"
    />
  </div>
);

export default function Contact() {
  const { ref, isInView } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace this URL with your backend endpoint
      await axios.post('http://127.0.0.1:5000/api/contact', form);

      toast.success("✅ Message sent! We'll reply within 24h.");
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error("Email sending failed:", error);
      toast.error("❌ Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-light relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label">Get In Touch</motion.span>
          <motion.h2 variants={fadeUp} className="section-title mb-4">
            Let's Build Something <span className="text-gradient">Amazing</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-gray-500 text-lg max-w-xl mx-auto">
            Tell us about your project and we typically respond within 24 hours.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-5 gap-10"
        >
          {/* LEFT INFO */}
          <motion.div variants={slideLeft} className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h3 className="font-display font-bold text-lg text-brand-dark mb-5">Contact Info</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', value: 'ngounoubrice05@gmail.com' },
                  { icon: Phone, label: 'Phone', value: '+237 690 69 33 21' },
                  { icon: MapPin, label: 'Location', value: 'Yaoundé, Cameroon 🇨🇲' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                      <Icon size={16} className="text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-sm font-medium text-brand-dark">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/237690693321?text=Hi%20Evoltep!%20I'd%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:shadow-lg w-full justify-center"
            >
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>
          </motion.div>

          {/* FORM */}
          <motion.div variants={slideRight} className="lg:col-span-3">
            <div className="card p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 btn-outline text-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <InputField
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                    />
                  </div>

                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+237 600 000 000"
                  />

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Description *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                  >
                    {loading ? "Sending..." : "Start My Project"}
                    <Send size={18} />
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    No spam, ever. We take your privacy seriously.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}