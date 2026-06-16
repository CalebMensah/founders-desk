'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Ideas', href: '/category/business-ideas' },
  { label: 'Playbooks', href: '/category/startup-playbooks' },
  { label: 'Make Money', href: '/category/make-money' },
  { label: 'Startups', href: '/category/african-startups' },
  { label: 'Opportunities', href: '/opportunities' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">

      {/* Desktop navbar */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white text-sm font-medium">FD</span>
          </div>
          <span className="text-lg font-medium text-gray-900 tracking-tight">
            Founders<span className="text-blue-600">Desk</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-px h-5 bg-gray-200 mx-2" />
          <Link
            href="/newsletter"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            Newsletter
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile scrollable category strip */}
      <div className="md:hidden flex overflow-x-auto border-t border-gray-100 scrollbar-hide">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-gray-500 px-4 py-2 whitespace-nowrap border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <div className="flex flex-col gap-1 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-3 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/newsletter"
            className="block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-3 rounded-md text-center mt-4 transition-colors"
          >
            Subscribe to newsletter
          </Link>
        </div>
      )}
    </nav>
  )
}