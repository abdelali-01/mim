import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Shop</h3>
          <ul className="mt-4 space-y-4">
            <li>
              <Link href="/products" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/deals" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Deals
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
          <ul className="mt-4 space-y-4">
            <li>
              <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Shipping
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
          <ul className="mt-4 space-y-4">
            <li>
              <Link href="/about" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
          <ul className="mt-4 space-y-4">
            <li>
              <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
        <p className="text-base text-gray-400 text-center">
          © {new Date().getFullYear()} Mimstore. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  )
}
