'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { dubaiAreas } from '@/data/mockProperties'
import { Filter, X, ChevronDown, Home, Building, Castle } from 'lucide-react'

export interface FilterState {
  propertyType: string[]
  priceRange: [number, number]
  bedrooms: string
  bathrooms: string
  area: string
  minSize: string
  maxSize: string
}

interface SearchFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onApplyFilters: () => void
  onClearFilters: () => void
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const propertyTypes = [
    { value: 'apartment', label: 'Apartments', icon: Building },
    { value: 'townhouse', label: 'Townhouses', icon: Home },
    { value: 'villa', label: 'Villas', icon: Castle }
  ]

  const bedroomOptions = ['Studio', '1', '2', '3', '4', '5+']
  const bathroomOptions = ['1', '2', '3', '4', '5+']

  const handlePropertyTypeChange = (type: string) => {
    const newTypes = filters.propertyType.includes(type)
      ? filters.propertyType.filter(t => t !== type)
      : [...filters.propertyType, type]
    
    onFiltersChange({ ...filters, propertyType: newTypes })
  }

  const handlePriceRangeChange = (index: number, value: string) => {
    const newRange: [number, number] = [...filters.priceRange]
    newRange[index] = parseInt(value) || 0
    onFiltersChange({ ...filters, priceRange: newRange })
  }

  return (
    <>
      {/* Filter Toggle Button */}
      <motion.div 
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg"
        >
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4 ml-2" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-12 overflow-hidden"
          >
            <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                
                {/* Property Type */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="font-semibold text-gray-900 text-lg">Property Type</h3>
                  <div className="space-y-3">
                    {propertyTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <motion.label
                          key={type.value}
                          className="flex items-center space-x-3 cursor-pointer group"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <input
                            type="checkbox"
                            checked={filters.propertyType.includes(type.value)}
                            onChange={() => handlePropertyTypeChange(type.value)}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                            filters.propertyType.includes(type.value)
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-600 border-amber-500'
                              : 'border-gray-300 group-hover:border-amber-400'
                          }`}>
                            {filters.propertyType.includes(type.value) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 bg-white rounded-sm"
                              />
                            )}
                          </div>
                          <Icon className="h-5 w-5 text-gray-600 group-hover:text-amber-600 transition-colors" />
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                            {type.label}
                          </span>
                        </motion.label>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Price Range */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-semibold text-gray-900 text-lg">Price Range (AED)</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Minimum Price</label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={filters.priceRange[0] || ''}
                        onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                        className="bg-white/50 border-gray-200 focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Maximum Price</label>
                      <Input
                        type="number"
                        placeholder="No limit"
                        value={filters.priceRange[1] || ''}
                        onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                        className="bg-white/50 border-gray-200 focus:border-amber-400"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Bedrooms & Bathrooms */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-semibold text-gray-900 text-lg">Bedrooms</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {bedroomOptions.map((option) => (
                      <motion.button
                        key={option}
                        onClick={() => onFiltersChange({ ...filters, bedrooms: filters.bedrooms === option ? '' : option })}
                        className={`p-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          filters.bedrooms === option
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-amber-500 shadow-lg'
                            : 'bg-white/50 text-gray-700 border-gray-200 hover:border-amber-400 hover:bg-amber-50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 text-lg mt-6">Bathrooms</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {bathroomOptions.map((option) => (
                      <motion.button
                        key={option}
                        onClick={() => onFiltersChange({ ...filters, bathrooms: filters.bathrooms === option ? '' : option })}
                        className={`p-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          filters.bathrooms === option
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-amber-500 shadow-lg'
                            : 'bg-white/50 text-gray-700 border-gray-200 hover:border-amber-400 hover:bg-amber-50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Area & Size */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="font-semibold text-gray-900 text-lg">Location</h3>
                  <select
                    value={filters.area}
                    onChange={(e) => onFiltersChange({ ...filters, area: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white/50 focus:border-amber-400 focus:outline-none transition-colors"
                  >
                    <option value="">All Areas</option>
                    {dubaiAreas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>

                  <h3 className="font-semibold text-gray-900 text-lg mt-6">Size (sq ft)</h3>
                  <div className="space-y-3">
                    <Input
                      type="number"
                      placeholder="Min size"
                      value={filters.minSize}
                      onChange={(e) => onFiltersChange({ ...filters, minSize: e.target.value })}
                      className="bg-white/50 border-gray-200 focus:border-amber-400"
                    />
                    <Input
                      type="number"
                      placeholder="Max size"
                      value={filters.maxSize}
                      onChange={(e) => onFiltersChange({ ...filters, maxSize: e.target.value })}
                      className="bg-white/50 border-gray-200 focus:border-amber-400"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={onApplyFilters}
                  variant="premium"
                  className="flex-1 py-3"
                >
                  Apply Filters
                </Button>
                <Button
                  onClick={onClearFilters}
                  variant="outline"
                  className="flex-1 py-3 bg-white/50 hover:bg-white"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}