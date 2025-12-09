import React from 'react'
import HeroSection from '../components/home/HeroSection'
import Features from '../components/home/Features'
import Testimonials from '../components/home/Testimonial'
import Promotional from '../components/home/Promotional'
import Footer from '../components/home/Footer'

export default function Home() {
  return (
    <div>
        <HeroSection />
        <Features />
        <Testimonials />
        <Promotional />
        <Footer />
    </div>
  )
}
