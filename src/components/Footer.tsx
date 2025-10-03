import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(footerRef.current,
      { 
        opacity: 0, 
        y: 60,
        filter: "blur(5px)"
      },
      { 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out" 
      }
    );

    // Animate floating particles
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      gsap.set(particles, {
        x: () => gsap.utils.random(-50, 50),
        y: () => gsap.utils.random(-50, 50),
        opacity: () => gsap.utils.random(0.1, 0.3),
        scale: () => gsap.utils.random(0.5, 1.5)
      });

      gsap.to(particles, {
        y: "-=20",
        duration: () => gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          each: 0.2,
          repeat: -1
        }
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/YevhenUa-no", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/yevhen-riabtsun/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:evgenii.ryabtsun@gmail.com", label: "Email" }
  ];

  return (
    <footer ref={footerRef} className="relative py-20 mt-20">
      {/* Background Particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-neon-green rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="glass-card p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-neon-green">Yevhen</h3>
              <p className="text-muted-foreground leading-relaxed">
                Business Analyst passionate about transforming data into impactful solutions. 
                Let's build the future together.
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center md:justify-start space-x-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Button
                      key={link.label}
                      variant="ghost"
                      size="icon"
                      className="hover:text-neon-green hover:shadow-neon transition-all duration-300"
                      asChild
                    >
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <Icon className="w-5 h-5" />
                        <span className="sr-only">{link.label}</span>
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-neon-green">Navigation</h4>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block text-muted-foreground hover:text-neon-green transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-neon-green">Get In Touch</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>evgenii.ryabtsun@gmail.com</p>
                <p>+1 (555) 123-4567</p>
                <p>Oslo, Norway</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-glass-border my-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 Yevhen Riabtsun. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-neon-green animate-pulse" />
              <span>using React & GSAP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;