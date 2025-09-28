import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Database, BarChart, Zap, Brain, TrendingUp } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Database, name: "Data Analysis", level: 95 },
    { icon: BarChart, name: "Business Intelligence", level: 90 },
    { icon: Brain, name: "Machine Learning", level: 85 },
    { icon: Code, name: "Python & R", level: 88 },
    { icon: TrendingUp, name: "Financial Modeling", level: 92 },
    { icon: Zap, name: "Process Optimization", level: 87 }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(imageRef.current,
      { 
        opacity: 0, 
        x: -100,
        rotationY: -15
      },
      { 
        opacity: 1, 
        x: 0,
        rotationY: 0,
        duration: 1,
        ease: "power3.out" 
      }
    )
    .fromTo(contentRef.current,
      { 
        opacity: 0, 
        y: 50 
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: "power2.out" 
      },
      "-=0.6"
    )
    .fromTo(skillsRef.current?.children || [],
      { 
        opacity: 0, 
        y: 30,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)" 
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 blur-xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden glass-card border-2 border-neon-green/30 hover:border-neon-green/60 transition-all duration-500">
                <img 
                  src={profileImage} 
                  alt="Yevhen Riabtsun - Business Analyst" 
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-green rounded-full pulse-glow" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-neon-glow rounded-full pulse-glow" style={{animationDelay: '1s'}} />
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                About <span className="text-neon-green">Me</span>
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I specialize in bridging the gap between complex data and actionable business insights. 
                  At Statkraft, I work with renewable energy data to drive strategic decisions that shape 
                  a sustainable future.
                </p>
                
                <p>
                  My journey spans Finance, FinTech, and cutting-edge AI research. Recent training from 
                  the Oxford Machine Learning Summer School has equipped me with advanced knowledge in 
                  generative models and machine learning applications.
                </p>
                
                <p>
                  I'm passionate about transforming raw data into compelling narratives that drive innovation 
                  and business growth. This space showcases hobby projects born from curiosity—where data 
                  meets creativity and innovation.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-neon-green">Core Skills</h3>
              <div ref={skillsRef} className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div key={skill.name} className="glass-card p-4 hover:shadow-neon transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <Icon className="w-6 h-6 text-neon-green" />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 delay-300"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;