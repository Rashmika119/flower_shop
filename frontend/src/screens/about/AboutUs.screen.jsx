import React from "react";
import { Heart, Flower, Sparkles, Users, Award, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5"></div>

        {/* Floating decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-2xl sm:text-4xl opacity-20 animate-pulse delay-1000">
            🌸
          </div>
          <div className="absolute top-20 right-16 text-xl sm:text-3xl opacity-30 animate-bounce delay-500">
            🌺
          </div>
          <div className="absolute bottom-32 left-20 text-lg sm:text-2xl opacity-25 animate-pulse delay-1500">
            🌷
          </div>
          <div className="absolute bottom-20 right-10 text-2xl sm:text-4xl opacity-20 animate-bounce delay-700">
            🌹
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
              Flower & Bloom
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-main mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed px-4">
              Where artificial artistry meets natural beauty to create
              unforgettable moments for every celebration
            </p>
            <div className="flex justify-center">
              <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="relative group order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-primary/10">
              <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-primary mb-4 sm:mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:via-secondary hover:to-primary transition-all duration-300">
                Our Story
              </h2>
              <p className="text-main/70 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                Founded with a passion for creating magical moments, our flower
                shop has been transforming events into extraordinary experiences
                for over a decade. We believe that every celebration deserves
                the perfect floral touch.
              </p>
              <p className="text-main/70 leading-relaxed text-sm sm:text-base">
                From intimate gatherings to grand celebrations, we craft each
                arrangement with love, attention to detail, and an understanding
                that flowers speak the language of the heart.
              </p>
            </div>
          </div>

          <div className="relative group order-1 lg:order-2">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-primary/20 to-secondary/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-primary/10">
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-secondary mb-4 sm:mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:via-secondary hover:to-primary transition-all duration-300">
                Our Vision
              </h2>
              <p className="text-main/70 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                We envision a world where every event blooms with beauty,
                whether through the timeless elegance of fresh flowers or the
                lasting charm of premium artificial arrangements.
              </p>
              <p className="text-main/70 leading-relaxed text-sm sm:text-base">
                Our commitment is to make your special moments unforgettable,
                combining traditional floral artistry with modern innovation to
                exceed your expectations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-main mb-3 sm:mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:via-secondary hover:to-primary transition-all duration-300">
            What Makes Us Special
          </h2>
          <p className="text-base sm:text-xl text-main max-w-2xl mx-auto px-4">
            Discover the perfect blend of natural beauty and artificial artistry
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="group relative">
            <div className="bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-primary/10 hover:border-primary/20">
              <Flower className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">
                Natural Flowers
              </h3>
              <p className="text-main/70 text-sm sm:text-base leading-relaxed">
                Fresh, vibrant blooms sourced from the finest growers, perfect
                for those special moments that deserve nature's pure beauty.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-primary/10 hover:border-primary/20">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-secondary mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">
                Artificial Arrangements
              </h3>
              <p className="text-main/70 text-sm sm:text-base leading-relaxed">
                Premium silk and synthetic flowers that capture nature's beauty
                with lasting elegance, perfect for long-term displays.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-primary/10 hover:border-primary/20">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">
                Event Specialists
              </h3>
              <p className="text-main/70 text-sm sm:text-base leading-relaxed">
                Weddings, corporate events, parties, and celebrations - we bring
                your floral vision to life with expert design.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-primary/10 hover:border-primary/20">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 text-secondary mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">
                Quality Guaranteed
              </h3>
              <p className="text-main/70 text-sm sm:text-base leading-relaxed">
                Every arrangement meets our high standards for beauty,
                freshness, and craftsmanship, ensuring your complete
                satisfaction.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-primary/10 hover:border-primary/20">
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">
                Timely Delivery
              </h3>
              <p className="text-main/70 text-sm sm:text-base leading-relaxed">
                Reliable, punctual service ensures your flowers arrive fresh and
                beautiful exactly when you need them.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-primary/10 hover:border-primary/20">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-secondary mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">
                Personal Touch
              </h3>
              <p className="text-main/70 text-sm sm:text-base leading-relaxed">
                Custom designs tailored to your unique style, preferences, and
                the special meaning behind every occasion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-surface/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-primary/10 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:via-secondary hover:to-primary transition-all duration-300">
              Let's Create Something Beautiful Together
            </h2>
            <p className="text-base sm:text-xl text-main/70 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              Whether you're planning an intimate gathering or a grand
              celebration, we're here to make your floral dreams bloom into
              reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto">
              <button
                className="w-full sm:w-auto bg-gradient-to-r from-primary via-secondary to-primary hover:from-primary/90 hover:via-secondary/90 hover:to-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 min-w-[160px]"
                onClick={() => navigate("/allItems")}
              >
                Browse Collection
              </button>
              <button
                className="w-full sm:w-auto bg-surface hover:bg-surface/80 border-2 border-primary/30 hover:border-primary/50 text-main px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 backdrop-blur-sm min-w-[160px]"
                onClick={() => navigate("/contactUs")}
              >
                Contact Us Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <blockquote className="text-main text-lg sm:text-xl md:text-2xl font-medium text-main/70 italic leading-relaxed">
            "In every arrangement, we don't just create bouquets — we craft
            memories that last a lifetime"
          </blockquote>
          <div className="flex justify-center mt-4 sm:mt-6">
            <div className="w-20 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
