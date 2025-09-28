import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import MatrixBackground from "@/components/MatrixBackground";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure body has the dark class for consistent theming
    document.body.classList.add('dark');
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Reveal main content with animation
    document.body.classList.remove('preloader-hidden');
  };

  if (isLoading) {
    return <Loading onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Matrix Background Effect */}
      <MatrixBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
