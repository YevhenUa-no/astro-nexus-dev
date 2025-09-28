import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.png";
import project4 from "@/assets/project-4.png";
import project5 from "@/assets/project-5.png";
import project6 from "@/assets/project-6.png";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "3D Interactive Web",
      description: "Create stunning 3D interactive web experiences with modern tools and frameworks.",
      image: project1,
      tech: ["React", "Three.js", "GSAP", "WebGL"],
      github: "#",
      live: "#"
    },
    {
      id: 2,
      title: "Next-Level Gaming UI",
      description: "Advanced gaming interface design with smooth animations and user-centric layouts.",
      image: project2,
      tech: ["Vue.js", "CSS3", "Animation", "UI/UX"],
      github: "#",
      live: "#"
    },
    {
      id: 3,
      title: "3D Portfolio",
      description: "Modern portfolio website featuring 3D elements and interactive components.",
      image: project3,
      tech: ["React", "Spline", "Tailwind", "Framer"],
      github: "#",
      live: "#"
    },
    {
      id: 4,
      title: "Gaming Website",
      description: "Complete gaming platform with character management and interactive features.",
      image: project4,
      tech: ["HTML5", "CSS3", "JavaScript", "Animation"],
      github: "#",
      live: "#"
    },
    {
      id: 5,
      title: "Web Animation Tools",
      description: "Comprehensive guide and tools for modern web animations and interactions.",
      image: project5,
      tech: ["GSAP", "Lottie", "CSS", "JavaScript"],
      github: "#",
      live: "#"
    },
    {
      id: 6,
      title: "Portfolio Tutorial",
      description: "Step-by-step animated portfolio creation tutorial with modern design principles.",
      image: project6,
      tech: ["React", "Next.js", "Tailwind", "GSAP"],
      github: "#",
      live: "#"
    }
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

    tl.fromTo(titleRef.current,
      { 
        opacity: 0, 
        y: 50 
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: "power2.out" 
      }
    )
    .fromTo(containerRef.current?.children || [],
      { 
        opacity: 0, 
        y: 60,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out" 
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-neon-green">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of projects showcasing modern web development, 3D integration, 
            and cutting-edge animation techniques.
          </p>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          <div 
            ref={containerRef}
            className="flex gap-8 overflow-x-auto pb-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neon-green"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {projects.map((project) => (
              <div 
                key={project.id}
                className="flex-none w-80 glass-card hover:shadow-glow transition-all duration-500 group"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-matrix-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="bg-matrix-dark/80 backdrop-blur-sm border-neon-green/50 hover:border-neon-green"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-gradient-primary text-primary-foreground hover:shadow-neon"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live
                    </Button>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-neon-green transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full border border-neon-green/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <div 
                key={index} 
                className="w-2 h-2 rounded-full bg-muted-foreground/30"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;