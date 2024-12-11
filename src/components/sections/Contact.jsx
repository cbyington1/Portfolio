import React, { useState } from 'react';
import { Mail, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    message: '',
    isError: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the email body with proper line breaks and information
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );

    // Create the mailto link with all form data
    const mailtoLink = `mailto:camden.byington1@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + formData.name)}&body=${emailBody}`;

    // Open the email client
    window.location.href = mailtoLink;

    // Show success message
    setSubmitStatus({
      message: 'Opening your email client...',
      isError: false
    });

    // Clear the form
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSubmitStatus({
        message: '',
        isError: false
      });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 relative z-10 bg-gray-800 bg-opacity-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12">Contact Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-gray-300 text-lg mb-8">
              I'm always open to new opportunities and interesting projects.
              Feel free to reach out either through this form or my email directly if you'd like to collaborate!
            </p>
            <div className="space-y-4">
              <a 
                href="mailto:camden.byington1@gmail.com" 
                className="flex items-center text-blue-400 hover:text-blue-300"
              >
                <Mail className="mr-2" size={20} />
                camden.byington1@gmail.com
              </a>
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 border-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 border-none"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 border-none"
                placeholder="Your message here..."
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transform transition hover:scale-105"
            >
              Send Message
            </button>
            {submitStatus.message && (
              <div className={`mt-4 text-center ${submitStatus.isError ? 'text-red-400' : 'text-green-400'}`}>
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;