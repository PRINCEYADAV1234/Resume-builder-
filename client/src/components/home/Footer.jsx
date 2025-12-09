import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <div className="flex items-center space-x-2">

              <img
          src="../../../logo.svg"
          className="h-9 w-full"
          alt="hero section showcase"
        />
          </div>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            Making every customer feel valued—no matter the size of your audience.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Company
          </h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/" className="hover:text-blue-600">About</a></li>
            <li><a href="/" className="hover:text-blue-600">Features</a></li>
            <li><a href="/" className="hover:text-blue-600">Career <span className="text-xs text-white bg-blue-600 rounded-md ml-2 px-2 py-1">We're hiring!</span></a></li>
            <li><a href="/" className="hover:text-blue-600">Works</a></li>
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Help
          </h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/" className="hover:text-blue-600">Customer Support</a></li>
            <li><a href="/" className="hover:text-blue-600">Delivery Details</a></li>
            <li><a href="/" className="hover:text-blue-600">Terms & Conditions</a></li>
            <li><a href="/" className="hover:text-blue-600">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Newsletter
          </h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Copyright */}
      <div className="text-center py-6 text-sm text-gray-500">
        © Copyright 2025, All Rights Reserved by Resume Builder
      </div>
    </footer>
  );
}
