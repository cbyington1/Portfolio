import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import GradientText from './GradientText'
import emailjs from '@emailjs/browser'
import { Send } from 'lucide-react'

function Contact() {
  const { mode, primaryColor, customTheme } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('') // 'sending', 'success', 'error', ''

  const buttonClasses = {
    red: 'bg-red-600 hover:bg-red-700',
    orange: 'bg-orange-500 hover:bg-orange-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    green: 'bg-green-500 hover:bg-green-600',
    cyan: 'bg-cyan-500 hover:bg-cyan-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    pink: 'bg-pink-500 hover:bg-pink-600',
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        'service_0arv0db',      // Your Service ID
        'template_5jnzzxp',     // Your Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'M-Tfjvgk-lF1-OrMF'     // Your Public Key
      )
      
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Clear success message after 5 seconds
      setTimeout(() => setStatus(''), 5000)
    } catch (error) {
      console.error('Email send failed:', error)
      setStatus('error')
      
      // Clear error message after 5 seconds
      setTimeout(() => setStatus(''), 5000)
    }
  }

  return (
    <section 
      id="contact" 
      className={`relative py-12 sm:py-20 px-4 sm:px-6 pb-8 sm:pb-20 ${
        mode === 'light' ? 'bg-[rgb(252,250,247)]' : 'bg-slate-900'
      }`}
    >
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Section Header */}
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center ${
          mode === 'light' ? 'text-slate-900' : 'text-white'
        }`}>
          <GradientText>Get In Touch</GradientText>
        </h2>
        <p className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-center ${
          mode === 'light' ? 'text-slate-600' : 'text-slate-400'
        }`}>
          Have a question or want to work together? Drop me a message!
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Name Field */}
          <div>
            <label 
              htmlFor="name" 
              className={`block text-sm font-medium mb-2 ${
                mode === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                mode === 'light'
                  ? 'bg-white border-slate-200 text-slate-900 focus:border-slate-400'
                  : 'bg-slate-800 border-slate-700 text-white focus:border-slate-500'
              } focus:outline-none`}
              placeholder="Your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label 
              htmlFor="email" 
              className={`block text-sm font-medium mb-2 ${
                mode === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                mode === 'light'
                  ? 'bg-white border-slate-200 text-slate-900 focus:border-slate-400'
                  : 'bg-slate-800 border-slate-700 text-white focus:border-slate-500'
              } focus:outline-none`}
              placeholder="your.email@example.com"
            />
          </div>

          {/* Message Field */}
          <div>
            <label 
              htmlFor="message" 
              className={`block text-sm font-medium mb-2 ${
                mode === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors resize-none ${
                mode === 'light'
                  ? 'bg-white border-slate-200 text-slate-900 focus:border-slate-400'
                  : 'bg-slate-800 border-slate-700 text-white focus:border-slate-500'
              } focus:outline-none`}
              placeholder="Your message..."
            />
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="p-4 rounded-lg bg-green-100 border border-green-300 text-green-800 text-sm sm:text-base">
              ✓ Message sent successfully! I'll get back to you soon.
            </div>
          )}
          
          {status === 'error' && (
            <div className="p-4 rounded-lg bg-red-100 border border-red-300 text-red-800 text-sm sm:text-base">
              ✗ Failed to send message. Please try again or email me directly.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'sending'}
            className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-colors font-medium text-base sm:text-lg ${
              status === 'sending'
                ? 'bg-slate-400 cursor-not-allowed'
                : customTheme === 'monochrome'
                  ? 'bg-slate-600 hover:bg-slate-700'
                  : customTheme === 'rainbow'
                    ? 'bg-cyan-500 hover:bg-cyan-600'
                    : customTheme === 'temperature'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : customTheme === 'pastel'
                        ? 'bg-blue-300 hover:bg-blue-400'
                        : buttonClasses[primaryColor]
            }`}
          >
            <Send size={20} />
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact