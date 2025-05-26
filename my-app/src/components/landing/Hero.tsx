'use client';
import Button from "@/components/ui/button/Button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 mt-20 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Content */}
          <div className="px-4 sm:px-6 sm:text-center md:mx-auto lg:col-span-6 lg:flex lg:items-center lg:text-left xl:col-span-6">
            <div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-300">
                <span className="flex items-center">
                  <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2" />
                  New Collection
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
                <span className="block">Discover Amazing</span>
                <span className="block text-brand-500">Products & Services</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0 dark:text-gray-400">
                Explore our curated collection of premium products and services. From fashion to electronics, we&apos;ve got everything you need.
              </p>
              <div className="mt-8 sm:mt-12">
                <div className="sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button variant="primary" size="md">
                      Shop Now
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button variant="outline" size="md">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div className="mt-8 sm:mt-12">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="text-center sm:text-left">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">10k+</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Happy Customers</p>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">500+</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Products</p>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">24/7</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Section */}
          <div className="mt-12 lg:mt-0 lg:col-span-6 xl:col-span-6 mx-4">
            <div className="relative">
              {/* Main Image */}
              <div className="relative mx-auto w-full max-w-lg">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                  <Image
                    src="/hero-image.jpg"
                    alt="Store showcase"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 opacity-75 blur"></div>
                    <div className="relative rounded-lg bg-white dark:bg-gray-800 p-4 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
                            <svg className="h-6 w-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Best Quality</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Guaranteed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 opacity-75 blur"></div>
                    <div className="relative rounded-lg bg-white dark:bg-gray-800 p-4 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
                            <svg className="h-6 w-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Fast Delivery</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">24/7 Service</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-brand-600/20 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 