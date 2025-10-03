import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate hero content
    tl.fromTo(titleRef.current,
      { 
        opacity: 0, 
        y: 50, 
        filter: "blur(10px)" 
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out" 
      }
    )
    .fromTo(subtitleRef.current,
      { 
        opacity: 0, 
        y: 30 
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: "power2.out" 
      },
      "-=0.6"
    )
    .fromTo(ctaRef.current,
      { 
        opacity: 0, 
        scale: 0.8 
      },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)" 
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <div className="space-y-8">
            <div ref={titleRef} className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Hi, I'm{" "}
                <span className="text-neon-green text-glow">Yevhen</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-light text-muted-foreground">
                Business Analyst
              </h2>
            </div>
            
            <div ref={subtitleRef}>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                I'm a Business Analyst at <span className="text-neon-green">Statkraft</span> with a passion for turning data into 
                impact. With a background in Finance and FinTech, and recent training 
                from the Oxford Machine Learning Summer School, I explore the edge 
                of AI, machine learning, and generative models.
              </p>
            </div>
            
            <div ref={ctaRef}>
              <Button 
                onClick={scrollToContact}
                className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 text-lg px-8 py-4 pulse-glow"
                size="lg"
              >
                Hire Me
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-neon-green rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neon-green rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;