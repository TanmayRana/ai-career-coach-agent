"use client";

import React, { useState } from "react";
import { Menu, X, Brain } from "lucide-react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useUserContext } from "@clerk/shared/react/index";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useUser();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">
              AI Career Coach
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#history"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Success Stories
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          {!user ? (
            <SignInButton mode="modal" signUpForceRedirectUrl={"/dashboard"}>
              <div className="hidden md:block">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Get Started
                </button>
              </div>
            </SignInButton>
          ) : (
            // <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
            //   Get Started
            // </button>
            <UserButton />
          )}
          {/* <div className="hidden md:block">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
              Get Started
            </button>
          </div> */}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="#history"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Success Stories
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Contact
              </a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium w-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
