'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin, TrendingUp, Users, Award } from 'lucide-react'

interface HeroProps {
  onSearch?: (query: string) => void
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const backgroundImages = [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1920&h=1080&fit=crop'
  ]

  const stats = [
    { icon: Home, value: '2,500+', label: 'Premium Properties' },
    { icon: Users, value: '15,000+', label: 'Happy Clients' },
    { icon: TrendingUp, value: '98%', label: 'Success Rate' },
    { icon: Award, value: '25+', label: 'Years Experience' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Parallax */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        
        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-transparent to-yellow-900/30"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(245, 158, 11, 0.3) 0%, transparent 50%, rgba(217, 119, 6, 0.3) 100%)',
              'linear-gradient(135deg, rgba(217, 119, 6, 0.3) 0%, transparent 50%, rgba(245, 158, 11, 0.3) 100%)',
              'linear-gradient(225deg, rgba(245, 158, 11, 0.3) 0%, transparent 50%, rgba(217, 119, 6, 0.3) 100%)',
              'linear-gradient(315deg, rgba(217, 119, 6, 0.3) 0%, transparent 50%, rgba(245, 158, 11, 0.3) 100%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full text-amber-300 text-sm font-medium mb-8"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Dubai's Premier Real Estate Platform
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-white via-amber-100 to-yellow-200 bg-clip-text text-transparent">
              Find Your
            </span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Dream Home
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Discover luxury properties in Dubai's most prestigious neighborhoods. 
            From stunning penthouses to elegant villas, your perfect home awaits.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl blur-xl" />
              <div className="relative flex flex-col sm:flex-row gap-4 p-2 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by location, property type, or price range..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg border-0 bg-transparent focus:ring-0 focus:outline-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="premium"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold"
                >
                  Search Properties
                </Button>
              </div>
            </div>
          </motion.form>

          {/* Quick Actions */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {['Apartments', 'Villas', 'Townhouses', 'Penthouses'].map((type, index) => (
              <motion.button
                key={type}
                onClick={() => onSearch?.(type.toLowerCase())}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
              >
                {type}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl mb-3 group-hover:shadow-lg transition-shadow duration-300">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Fix the missing import
import { Home } from 'lucide-react'