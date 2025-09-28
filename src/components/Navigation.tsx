import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { gsap } from "gsap";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'glass-card border-b' : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-2xl font-bold text-neon-green hover:text-neon-glow transition-colors"
            >
              Yevhen
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground hover:text-neon-green transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Social Links */}
              <div className="flex items-center space-x-4 ml-8">
                <Button variant="ghost" size="icon" className="hover:text-neon-green">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-neon-green">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-neon-green">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
              
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
              >
                Hire Me
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-matrix-darker/95 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 glass-card p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold text-neon-green">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            <div className="space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-xl font-medium text-foreground hover:text-neon-green transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-6 border-t border-border">
                <div className="flex justify-center space-x-6 mb-6">
                  <Button variant="ghost" size="icon" className="hover:text-neon-green">
                    <Github className="w-6 h-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-neon-green">
                    <Linkedin className="w-6 h-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-neon-green">
                    <Mail className="w-6 h-6" />
                  </Button>
                </div>
                
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
                >
                  Hire Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;