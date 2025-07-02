import React from 'react'
import { Heart, Flower, Sparkles, Users, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 via-pink-100/30 to-white/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              Flower & Bloom
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-5 max-w-3xl mx-auto leading-relaxed">
              Where artificial artistry meets natural beauty to create unforgettable moments for every celebration
            </p>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-rose-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/80 via-white/70 to-rose-50/30 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20">
              <Heart className="w-12 h-12 text-rose-500 mb-6" />
              <h2 className="text-3xl font-bold text-gray-700 mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 transition-all duration-300">
                Our Story
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded with a passion for creating magical moments, our flower shop has been transforming events into extraordinary experiences for over a decade. We believe that every celebration deserves the perfect floral touch.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From intimate gatherings to grand celebrations, we craft each arrangement with love, attention to detail, and an understanding that flowers speak the language of the heart.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/80 via-white/70 to-rose-50/30 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20">
              <Sparkles className="w-12 h-12 text-pink-500 mb-6" />
              <h2 className="text-3xl font-bold text-gray-700 mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 transition-all duration-300">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We envision a world where every event blooms with beauty, whether through the timeless elegance of fresh flowers or the lasting charm of premium artificial arrangements.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our commitment is to make your special moments unforgettable, combining traditional floral artistry with modern innovation to exceed your expectations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 transition-all duration-300">
            What Makes Us Special
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the perfect blend of natural beauty and artificial artistry
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="bg-gradient-to-br from-white/80 via-white/70 to-rose-50/30 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-white/20">
              <Flower className="w-10 h-10 text-rose-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-3">Natural Flowers</h3>
              <p className="text-gray-600">Fresh, vibrant blooms sourced from the finest growers, perfect for those special moments that deserve nature's pure beauty.</p>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-gradient-to-br from-white/80 via-white/70 to-rose-50/30 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-white/20">
              <Sparkles className="w-10 h-10 text-pink-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-3">Artificial Arrangements</h3>
              <p className="text-gray-600">Premium silk and synthetic flowers that capture nature's beauty with lasting elegance, perfect for long-term displays.</p>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-gradient-to-br from-white/80 via-white/70 to-rose-50/30 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-white/20">
              <Users className="w-10 h-10 text-rose-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-3">Event Specialists</h3>
              <p className="text-gray-600">Weddings, corporate events, parties, and celebrations - we bring your floral vision to life with expert design.</p>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-gradient-to-br from-white/80 via-white/70 to-rose-50/30 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-white/20">
              <Award className="w-10 h-10 text-pink-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600">Every arrangement meets our high standards for beauty, freshness, and craftsmanship, ensuring your complete satisfaction.</p>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-gradient-to-br from-white/80 via-white/70 to-rose-50/30 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-white/20">
              <Clock className="w-10 h-10 text-rose-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-3">Timely Delivery</h3>
              <p className="text-gray-600">Reliable, punctual service ensures your flowers arrive fresh and beautiful exactly when you need them.</p>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-gradient-to-br from-white/80 via-white/70 to-rose-50/30 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-white/20">
              <Heart className="w-10 h-10 text-pink-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-3">Personal Touch</h3>
              <p className="text-gray-600">Custom designs tailored to your unique style, preferences, and the special meaning behind every occasion.</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-rose-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-gradient-to-br from-white/80 via-white/70 to-rose-50/30 backdrop-blur-lg rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 text-center">
            <h2 className="text-4xl font-bold text-gray-700 mb-6 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 transition-all duration-300">
              Let's Create Something Beautiful Together
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're planning an intimate gathering or a grand celebration, we're here to make your floral dreams bloom into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              onClick={() => navigate('/allItems')}>
                Browse Our Collection
              </button>
              <button className="bg-white/50 hover:bg-white/80 border-2 border-rose-300 text-gray-700 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 backdrop-blur-sm"
              onClick={() => navigate('/contactUs')}>
                Contact Us Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center py-16">
        <blockquote className="text-2xl font-medium text-gray-600 italic max-w-3xl mx-auto">
          "In every arrangement, we don't just create bouquets – we craft memories that last a lifetime"
        </blockquote>
        <div className="flex justify-center mt-6">
          <div className="w-32 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs