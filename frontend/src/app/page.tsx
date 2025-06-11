'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { SearchFilters, FilterState } from '@/components/SearchFilters'
import { PropertyCard } from '@/components/PropertyCard'
import { AuthModal } from '@/components/AuthModal'
import { mockProperties } from '@/data/mockProperties'
import { supabase, Property } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { ArrowUp, Sparkles, TrendingUp, Filter } from 'lucide-react'

// Create a client
const queryClient = new QueryClient()

function DubaiRealEstate() {
  const [user, setUser] = useState<any>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [properties, setProperties] = useState<Property[]>(mockProperties)
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties)
  const [favorites, setFavorites] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    propertyType: [],
    priceRange: [0, 0],
    bedrooms: '',
    bathrooms: '',
    area: '',
    minSize: '',
    maxSize: ''
  })

  // Check user authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Filter properties based on search and filters
  const filteredResults = useMemo(() => {
    let filtered = properties

    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.type.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query)
      )
    }

    // Property type filter
    if (filters.propertyType.length > 0) {
      filtered = filtered.filter(property => 
        filters.propertyType.includes(property.type)
      )
    }

    // Price range filter
    if (filters.priceRange[0] > 0 || filters.priceRange[1] > 0) {
      filtered = filtered.filter(property => {
        const price = property.price
        const min = filters.priceRange[0] || 0
        const max = filters.priceRange[1] || Infinity
        return price >= min && price <= max
      })
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      const bedrooms = filters.bedrooms === '5+' ? 5 : parseInt(filters.bedrooms)
      filtered = filtered.filter(property => {
        if (filters.bedrooms === 'Studio') return property.bedrooms === 0
        if (filters.bedrooms === '5+') return property.bedrooms >= 5
        return property.bedrooms === bedrooms
      })
    }

    // Bathrooms filter
    if (filters.bathrooms) {
      const bathrooms = filters.bathrooms === '5+' ? 5 : parseInt(filters.bathrooms)
      filtered = filtered.filter(property => {
        if (filters.bathrooms === '5+') return property.bathrooms >= 5
        return property.bathrooms === bathrooms
      })
    }

    // Area filter
    if (filters.area) {
      filtered = filtered.filter(property => 
        property.location.includes(filters.area)
      )
    }

    // Size filter
    if (filters.minSize || filters.maxSize) {
      filtered = filtered.filter(property => {
        const size = property.size
        const min = parseInt(filters.minSize) || 0
        const max = parseInt(filters.maxSize) || Infinity
        return size >= min && size <= max
      })
    }

    return filtered
  }, [properties, searchQuery, filters])

  const handleLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const handleRegister = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { name }
      }
    })
    if (error) throw error
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`
      }
    })
    if (error) throw error
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Logout error:', error)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Scroll to properties section
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleFavorite = (propertyId: string) => {
    if (!user) {
      setIsAuthModalOpen(true)
      return
    }
    
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const handleViewProperty = (propertyId: string) => {
    // In a real app, this would navigate to property detail page
    console.log('View property:', propertyId)
  }

  const handleApplyFilters = () => {
    setFilteredProperties(filteredResults)
    // Scroll to results
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleClearFilters = () => {
    setFilters({
      propertyType: [],
      priceRange: [0, 0],
      bedrooms: '',
      bathrooms: '',
      area: '',
      minSize: '',
      maxSize: ''
    })
    setSearchQuery('')
    setFilteredProperties(properties)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      {/* Header */}
      <Header
        onSearch={handleSearch}
        user={user}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <Hero onSearch={handleSearch} />

      {/* Featured Badge */}
      <motion.div
        className="relative z-10 -mt-20 mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-lg border border-amber-400/30 rounded-full text-amber-800">
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="font-semibold">Explore {filteredResults.length} Premium Properties</span>
          </div>
        </div>
      </motion.div>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 mb-16">
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      </section>

      {/* Properties Section */}
      <section id="properties" className="max-w-7xl mx-auto px-4 lg:px-8 pb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-amber-800 to-yellow-800 bg-clip-text text-transparent">
              Luxury Properties
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover exceptional homes in Dubai's most prestigious locations
          </p>
          
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="flex items-center text-gray-600">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span>Market Leaders</span>
            </div>
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="flex items-center text-gray-600">
              <Filter className="h-5 w-5 mr-2" />
              <span>{filteredResults.length} Properties Found</span>
            </div>
          </div>
        </motion.div>

        {/* Properties Grid */}
        <AnimatePresence mode="wait">
          {filteredResults.length > 0 ? (
            <motion.div
              key="properties-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredResults.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <PropertyCard
                    property={property}
                    onFavorite={handleFavorite}
                    isFavorited={favorites.includes(property.id)}
                    onView={handleViewProperty}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="h-10 w-10 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Properties Found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button onClick={handleClearFilters} variant="premium">
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onGoogleLogin={handleGoogleLogin}
      />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-full shadow-lg hover:shadow-xl z-40"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-gradient-to-br from-amber-200/10 to-yellow-200/10 rounded-full blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <DubaiRealEstate />
    </QueryClientProvider>
  )
}