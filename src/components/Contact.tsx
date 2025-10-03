import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo([formRef.current, infoRef.current],
      { 
        opacity: 0, 
        y: 50,
        filter: "blur(5px)"
      },
      { 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.3,
        ease: "power3.out" 
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/YevhenUa-no", 
      label: "GitHub",
      username: "@YevhenUa-no"
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/yevhen-riabtsun/", 
      label: "LinkedIn",
      username: "Yevhen Riabtsun"
    },
    { 
      icon: Mail, 
      href: "mailto:evgenii.ryabtsun@gmail.com", 
      label: "Email",
      username: "evgenii.ryabtsun@gmail.com"
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="text-neon-green">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message 
            and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div ref={formRef} className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 text-neon-green">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-input border-glass-border focus:border-neon-green transition-colors glassmorphic"
                />
                
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-input border-glass-border focus:border-neon-green transition-colors glassmorphic"
                />
                
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="bg-input border-glass-border focus:border-neon-green transition-colors glassmorphic resize-none"
                />
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-neon-green">Contact Info</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-muted-foreground mb-2">Email</p>
                  <p className="text-lg font-medium">evgenii.ryabtsun@gmail.com</p>
                </div>
                
                <div>
                  <p className="text-muted-foreground mb-2">Phone</p>
                  <p className="text-lg font-medium">+1 (555) 123-4567</p>
                </div>
                
                <div>
                  <p className="text-muted-foreground mb-2">Location</p>
                  <p className="text-lg font-medium">Oslo, Norway</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-neon-green">Connect With Me</h3>
              
              <div className="space-y-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 rounded-lg border border-glass-border hover:border-neon-green hover:shadow-neon transition-all duration-300 group"
                    >
                      <Icon className="w-6 h-6 text-neon-green group-hover:text-neon-glow transition-colors" />
                      <div>
                        <p className="font-medium group-hover:text-neon-green transition-colors">{link.label}</p>
                        <p className="text-sm text-muted-foreground">{link.username}</p>
                      </div>
                    </a>
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

export default Contact;