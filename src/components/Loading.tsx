import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoadingProps {
  onComplete: () => void;
}

const Loading = ({ onComplete }: LoadingProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress bar from 0 to 100%
    tl.to(progressRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
    })
    // Animate text appearance
    .fromTo(textRef.current, 
      { 
        opacity: 0, 
        y: 20,
        scale: 0.9 
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)" 
      },
      0.5
    )
    // Fade out and scale down the entire preloader
    .to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      delay: 0.5,
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-matrix-darker"
    >
      <div className="text-center space-y-8">
        {/* Animated Name */}
        <div 
          ref={textRef}
          className="text-6xl md:text-8xl font-bold text-neon-green text-glow"
        >
          Yevhen
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-80 h-1 bg-secondary/20 rounded-full mx-auto overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full w-0 progress-bar"
          />
        </div>
        
        {/* Loading Text */}
        <div className="text-muted-foreground text-lg font-light tracking-wider">
          Loading Experience...
        </div>
      </div>
      
      {/* Matrix Background Effect */}
      <div className="absolute inset-0 matrix-rain opacity-30" />
    </div>
  );
};

export default Loading;