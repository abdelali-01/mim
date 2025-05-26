'use client';
import { useState } from 'react';
import Image from 'next/image';
import { products } from '../../../public/data';
import Button from "@/components/ui/button/Button";

export default function FeaturedProducts() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeImages, setActiveImages] = useState<{ [key: number]: number }>({});

  const featuredProducts = products.filter(product => product.featured);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const nextImage = (productId: number) => {
    setActiveImages(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % featuredProducts.find(p => p.id === productId)!.images.length
    }));
  };

  const prevImage = (productId: number) => {
    setActiveImages(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + featuredProducts.find(p => p.id === productId)!.images.length) % 
        featuredProducts.find(p => p.id === productId)!.images.length
    }));
  };

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Check out our latest and most popular products
          </p>
        </div>

        <div className="mt-12 relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProducts.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                    <div className="relative h-64 group bg-white">
                      <Image
                        src={product.images[activeImages[product.id] || 0]}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                      
                      {/* Image Navigation */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 flex items-center justify-between px-4">
                          <button
                            onClick={() => prevImage(product.id)}
                            className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full hover:bg-white dark:hover:bg-gray-800"
                          >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => nextImage(product.id)}
                            className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full hover:bg-white dark:hover:bg-gray-800"
                          >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {product.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              (activeImages[product.id] || 0) === index ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-brand-500">
                          {product.category}
                        </div>
                        {product.discount && (
                          <div className="text-sm font-medium text-red-500">
                            {product.discount}% OFF
                          </div>
                        )}
                      </div>
                      <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                          {product.price}DA
                        </p>
                        <Button variant="primary" size="sm">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? 'bg-brand-500' : 'bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 