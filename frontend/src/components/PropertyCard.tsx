'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Property } from '@/lib/supabase'
import { formatPrice, formatArea } from '@/lib/utils'
import { Heart, MapPin, Bed, Bath, Square, Eye } from 'lucide-react'
import Image from 'next/image'

interface PropertyCardProps {
  property: Property
  onFavorite?: (id: string) => void
  isFavorited?: boolean
  onView?: (id: string) => void
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onFavorite,
  isFavorited = false,
  onView
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm">
        <div className="relative overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative h-64"
          >
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
          
          {property.featured && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs font-semibold rounded-full shadow-lg"
            >
              FEATURED
            </motion.div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onFavorite?.(property.id)}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200"
          >
            <Heart 
              className={`h-4 w-4 transition-colors duration-200 ${
                isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
              }`} 
            />
          </motion.button>
          
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={() => onView?.(property.id)}
              variant="premium"
              size="sm"
              className="w-full"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <motion.h3 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300"
              >
                {property.title}
              </motion.h3>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center text-gray-600 mt-1"
              >
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between text-sm text-gray-600"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  <span>{formatArea(property.size)}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-2 border-t border-gray-100"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                {formatPrice(property.price)}
              </div>
              <div className="text-xs text-gray-500 mt-1 capitalize">
                {property.type}
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}