'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Menu, X, User, Heart, History, LogOut } from 'lucide-react'
import Image from 'next/image'

interface HeaderProps {
  onSearch?: (query: string) => void
  user?: any
  onLogin?: () => void
  onLogout?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  user,
  onLogin,
  onLogout
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <>
      {/* Animated background gradient */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-lg z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Dubai Elite
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Luxury Real Estate</p>
              </div>
            </motion.div>

            {/* Search Bar - Desktop */}
            <motion.form 
              onSubmit={handleSearch}
              className="hidden md:flex items-center max-w-md mx-8 flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search properties in Dubai..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:bg-white/20 transition-all duration-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
              </div>
              <Button 
                type="submit" 
                variant="premium" 
                className="ml-2 px-6"
              >
                Search
              </Button>
            </motion.form>

            {/* Navigation & User */}
            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-6">
                <motion.a 
                  href="#properties" 
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200 font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Properties
                </motion.a>
                <motion.a 
                  href="#about" 
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200 font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  About
                </motion.a>
                <motion.a 
                  href="#contact" 
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200 font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Contact
                </motion.a>
              </nav>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white text-sm hidden sm:block">{user.name}</span>
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50"
                      >
                        <a href="#favorites" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                          <Heart className="h-4 w-4 mr-3" />
                          Favorites
                        </a>
                        <a href="#history" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                          <History className="h-4 w-4 mr-3" />
                          Browsing History
                        </a>
                        <hr className="my-2" />
                        <button 
                          onClick={onLogout}
                          className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Button onClick={onLogin} variant="premium" size="sm">
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-gray-900/95 backdrop-blur-lg border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                  />
                  <Button type="submit" variant="premium" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  <a href="#properties" className="block py-2 text-gray-300 hover:text-amber-400 transition-colors">
                    Properties
                  </a>
                  <a href="#about" className="block py-2 text-gray-300 hover:text-amber-400 transition-colors">
                    About
                  </a>
                  <a href="#contact" className="block py-2 text-gray-300 hover:text-amber-400 transition-colors">
                    Contact
                  </a>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}