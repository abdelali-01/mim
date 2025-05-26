'use client';
import Hero from "@/components/landing/Hero";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import VideoShowcase from "@/components/landing/VideoShowcase";
import Partners from "@/components/landing/Partners";
import Subscription from "@/components/landing/Subscription";
import Services from "@/components/landing/Services";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar/>

      {/* Main Content */}
      <main>
        <Hero />
        <FeaturedProducts />
        <Services />
        <VideoShowcase />
        {/* <Partners /> */}
        <Subscription />
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
} 