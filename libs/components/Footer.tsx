import React from 'react';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Career Tips', href: '#' },
    { name: 'For Employers', href: '#' }
  ];

  const jobCategories = [
    { name: 'Technology', href: '#' },
    { name: 'Healthcare', href: '#' },
    { name: 'Finance', href: '#' },
    { name: 'Marketing', href: '#' },
    { name: 'Education', href: '#' },
    { name: 'Remote Jobs', href: '#' }
  ];

  const forEmployers = [
    { name: 'Post a Job', href: '#' },
    { name: 'Browse Resumes', href: '#' },
    { name: 'Pricing Plans', href: '#' },
    { name: 'Recruitment Solutions', href: '#' }
  ];

  const socialLinks = [
    { icon: Github, href: '#', color: 'text-black-600' },
    { icon: Twitter, href: '#', color: 'text-blue-400' },
    { icon: Linkedin, href: '/linkedin.com', color: 'text-blue-700' },
    { icon: Instagram, href: '/instagram.com', color: 'text-pink-600' }
  ];

  return (
    <footer className="bg-blue-600 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">JobConnect</h2>
            <p className="text-sm">
              Connecting talented professionals with their dream careers. Your next career move starts here.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail size={18} />
                <span className="text-sm">contact@jobconnect.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} />
                <span className="text-sm">123 Job Street, Career City, ST 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Job Categories</h3>
            <ul className="space-y-3">
              {jobCategories.map((category) => (
                <li key={category.name}>
                  <a 
                    href={category.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2" />
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">For Employers</h3>
            <ul className="space-y-3">
              {forEmployers.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Social Icons */}
            <div className="flex space-x-6 justify-center lg:justify-start">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`${social.color} hover:opacity-75 transition-opacity duration-200`}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>

            {/* Newsletter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-blue-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} JobConnect. All rights reserved. 
            Designed with passion for job seekers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;