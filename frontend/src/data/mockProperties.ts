import { Property } from '@/lib/supabase'

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Penthouse in Dubai Marina',
    type: 'apartment',
    price: 4500000,
    bedrooms: 3,
    bathrooms: 4,
    size: 2800,
    location: 'Dubai Marina',
    area: 'Marina',
    description: 'Stunning penthouse with panoramic views of Dubai Marina and the Arabian Gulf. Features premium finishes, private elevator access, and expansive terraces.',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    ],
    amenities: ['Swimming Pool', 'Gym', 'Concierge', 'Valet Parking', 'Private Beach', 'Spa'],
    featured: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Modern Villa in Emirates Hills',
    type: 'villa',
    price: 12000000,
    bedrooms: 5,
    bathrooms: 6,
    size: 6500,
    location: 'Emirates Hills',
    area: 'Emirates Hills',
    description: 'Spectacular contemporary villa with golf course views. Features smart home technology, infinity pool, and meticulously landscaped gardens.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop'
    ],
    amenities: ['Private Pool', 'Golf Course View', 'Smart Home', 'Maid Room', 'Garden', 'Garage'],
    featured: true,
    created_at: '2024-01-14T10:00:00Z',
    updated_at: '2024-01-14T10:00:00Z'
  },
  {
    id: '3',
    title: 'Elegant Townhouse in Jumeirah Village Circle',
    type: 'townhouse',
    price: 2800000,
    bedrooms: 4,
    bathrooms: 3,
    size: 3200,
    location: 'Jumeirah Village Circle',
    area: 'JVC',
    description: 'Beautiful townhouse in a family-friendly community. Features modern design, private garden, and close proximity to schools and parks.',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop'
    ],
    amenities: ['Private Garden', 'Community Pool', 'Playground', 'Parking', 'Storage Room'],
    featured: false,
    created_at: '2024-01-13T10:00:00Z',
    updated_at: '2024-01-13T10:00:00Z'
  },
  {
    id: '4',
    title: 'Contemporary Apartment in Downtown Dubai',
    type: 'apartment',
    price: 3200000,
    bedrooms: 2,
    bathrooms: 3,
    size: 1800,
    location: 'Downtown Dubai',
    area: 'Downtown',
    description: 'Stylish apartment with Burj Khalifa views. Located in the heart of Dubai with access to world-class dining, shopping, and entertainment.',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop'
    ],
    amenities: ['Burj Khalifa View', 'Gym', 'Swimming Pool', 'Concierge', 'Metro Access'],
    featured: true,
    created_at: '2024-01-12T10:00:00Z',
    updated_at: '2024-01-12T10:00:00Z'
  },
  {
    id: '5',
    title: 'Luxury Villa in Palm Jumeirah',
    type: 'villa',
    price: 15000000,
    bedrooms: 6,
    bathrooms: 7,
    size: 8000,
    location: 'Palm Jumeirah',
    area: 'Palm',
    description: 'Exclusive beachfront villa on the iconic Palm Jumeirah. Features private beach access, infinity pool, and unobstructed sea views.',
    images: [
      'https://images.unsplash.com/photo-1600047508788-786a5629b57c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
    ],
    amenities: ['Private Beach', 'Infinity Pool', 'Cinema Room', 'Wine Cellar', 'Elevator', 'Staff Quarters'],
    featured: true,
    created_at: '2024-01-11T10:00:00Z',
    updated_at: '2024-01-11T10:00:00Z'
  },
  {
    id: '6',
    title: 'Modern Townhouse in Arabian Ranches',
    type: 'townhouse',
    price: 3500000,
    bedrooms: 4,
    bathrooms: 4,
    size: 3800,
    location: 'Arabian Ranches',
    area: 'Arabian Ranches',
    description: 'Spacious family townhouse in prestigious gated community. Features landscaped garden, community amenities, and golf course proximity.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566752734-eb6fc8958bdd?w=800&h=600&fit=crop'
    ],
    amenities: ['Golf Course Access', 'Community Pool', 'Tennis Courts', 'Kids Play Area', 'BBQ Area'],
    featured: false,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  }
]

export const dubaiAreas = [
  'Dubai Marina',
  'Downtown Dubai',
  'Palm Jumeirah',
  'Emirates Hills',
  'Jumeirah Beach Residence',
  'Arabian Ranches',
  'Jumeirah Village Circle',
  'Business Bay',
  'Dubai Hills Estate',
  'DIFC',
  'Jumeirah Lakes Towers',
  'The Greens'
]