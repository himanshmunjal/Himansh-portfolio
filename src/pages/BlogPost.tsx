import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Eye, Calendar, Share2, BookOpen, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { allBlogs } from '@/components/sections/BlogSection';
import { useInView } from '@/hooks/useInView';

// Extended blog data with full content
const blogFullContent: Record<number, { content: string; sections: { title: string; content: string }[] }> = {
  1: {
    content: "Spring Boot has revolutionized the way developers build Java applications. In this comprehensive guide, we'll explore everything you need to know to get started with Spring Boot development.",
    sections: [
      {
        title: "What is Spring Boot?",
        content: "Spring Boot is an opinionated framework built on top of the Spring Framework that simplifies the development of production-ready applications. It removes much of the boilerplate configuration required in traditional Spring applications, allowing developers to focus on writing business logic rather than configuration."
      },
      {
        title: "Setting Up Your First Project",
        content: "Getting started with Spring Boot is incredibly simple. You can use Spring Initializr (start.spring.io) to bootstrap your project with all the necessary dependencies. Simply select your project metadata, choose your dependencies (like Spring Web, Spring Data JPA, etc.), and generate your project.\n\nOnce generated, you'll have a ready-to-run Spring Boot application with a main class annotated with @SpringBootApplication. This single annotation combines @Configuration, @EnableAutoConfiguration, and @ComponentScan."
      },
      {
        title: "Creating Your First REST Endpoint",
        content: "Creating a REST endpoint in Spring Boot is straightforward. Here's a simple example:\n\n```java\n@RestController\n@RequestMapping(\"/api\")\npublic class HelloController {\n    @GetMapping(\"/hello\")\n    public String hello() {\n        return \"Hello, Spring Boot!\";\n    }\n}\n```\n\nThis controller will be automatically detected by Spring Boot's component scanning and will be available at http://localhost:8080/api/hello."
      },
      {
        title: "Understanding Auto-Configuration",
        content: "One of Spring Boot's most powerful features is auto-configuration. Based on the dependencies you've added to your project, Spring Boot automatically configures beans and settings. For example, if you have spring-boot-starter-data-jpa on your classpath, Spring Boot will automatically configure a DataSource, EntityManagerFactory, and TransactionManager."
      },
      {
        title: "Next Steps",
        content: "Now that you understand the basics, you can explore more advanced topics like:\n\n• Spring Data JPA for database operations\n• Spring Security for authentication and authorization\n• Spring Boot Actuator for monitoring and management\n• Creating RESTful APIs with proper exception handling\n• Testing your Spring Boot applications\n\nSpring Boot's ecosystem is vast and continually growing. The best way to learn is to build projects and experiment with different features."
      }
    ]
  },
  2: {
    content: "Clean code is more than just following a style guide—it's about writing code that is maintainable, readable, and collaborative. Let's dive into the principles that every developer should know.",
    sections: [
      {
        title: "Why Clean Code Matters",
        content: "Writing clean code is essential for several reasons. First, code is read far more often than it's written. Your teammates (and your future self) will thank you for writing code that's easy to understand. Second, clean code reduces bugs and makes debugging easier. When code is well-organized and clear, issues become obvious."
      },
      {
        title: "Meaningful Names",
        content: "One of the simplest yet most impactful principles is using meaningful names for variables, functions, and classes. Instead of 'd' or 'temp', use descriptive names like 'elapsedTimeInDays' or 'temporaryUserData'. Your code should read like prose—anyone should be able to understand what it does without extensive comments.\n\nFor example, compare:\n```javascript\nconst d = 86400; // seconds in a day\n```\n\nwith:\n```javascript\nconst SECONDS_IN_A_DAY = 86400;\n```"
      },
      {
        title: "Functions Should Do One Thing",
        content: "Functions should be small and focused on doing one thing well. If you find yourself naming a function with 'and' in it, it's probably doing too much. Break it down into smaller, single-purpose functions. This makes your code more testable, reusable, and easier to understand."
      },
      {
        title: "DRY: Don't Repeat Yourself",
        content: "Duplication is the enemy of maintainability. If you find yourself copying and pasting code, it's time to extract that logic into a reusable function or class. This principle applies not just to code, but to documentation, tests, and configuration as well."
      },
      {
        title: "Comments vs. Clean Code",
        content: "Comments should explain 'why', not 'what'. If your code needs comments to explain what it does, it's probably not clean enough. Refactor it to be self-explanatory. However, comments explaining complex algorithms, business rules, or non-obvious decisions are valuable.\n\nRemember: Good code is self-documenting. Bad code requires comments to explain the mess."
      },
      {
        title: "Error Handling",
        content: "Don't ignore errors. Use exceptions appropriately, provide meaningful error messages, and always clean up resources (use try-with-resources in Java, or similar patterns in other languages). Your error handling code is just as important as your happy path code."
      }
    ]
  },
  3: {
    content: "Machine learning can seem intimidating at first, but by breaking it down into core concepts and relating them to real-world projects, it becomes one of the most exciting fields in technology.",
    sections: [
      {
        title: "What is Machine Learning?",
        content: "At its core, machine learning is about teaching computers to learn patterns from data without being explicitly programmed. Instead of writing specific rules, we provide data and let algorithms discover patterns automatically. This paradigm shift enables solutions to problems that would be impossible to solve with traditional programming."
      },
      {
        title: "The Three Types of Learning",
        content: "Machine learning is typically divided into three categories:\n\n**Supervised Learning**: You provide labeled data (inputs with correct outputs), and the algorithm learns to map inputs to outputs. Examples include image classification, spam detection, and price prediction.\n\n**Unsupervised Learning**: You provide unlabeled data, and the algorithm finds hidden patterns or structures. Examples include customer segmentation, anomaly detection, and recommendation systems.\n\n**Reinforcement Learning**: An agent learns by interacting with an environment and receiving rewards or penalties. Examples include game-playing AI, robotics, and autonomous vehicles."
      },
      {
        title: "From Theory to Practice: A Real Project",
        content: "Let's walk through building a simple house price prediction model:\n\n1. **Data Collection**: Gather data on houses (size, location, age, etc.) and their prices.\n\n2. **Data Preprocessing**: Clean the data, handle missing values, and normalize features.\n\n3. **Feature Engineering**: Create meaningful features from raw data (e.g., price per square foot).\n\n4. **Model Selection**: Start with simple models like linear regression, then try more complex ones like random forests or gradient boosting.\n\n5. **Training**: Feed your data to the model and let it learn patterns.\n\n6. **Evaluation**: Test your model on unseen data to see how well it generalizes.\n\n7. **Iteration**: Refine features, tune hyperparameters, and improve your model."
      },
      {
        title: "Common Algorithms Explained",
        content: "**Linear Regression**: Finds the best straight line through your data points. Great for understanding relationships and simple predictions.\n\n**Decision Trees**: Creates a tree of if-then rules. Easy to interpret but can overfit.\n\n**Random Forests**: Combines many decision trees to make more robust predictions. Excellent for tabular data.\n\n**Neural Networks**: Inspired by the brain, these learn complex patterns through layers of interconnected nodes. Powerful but require more data and computing power.\n\n**K-Means Clustering**: Groups similar data points together. Useful for customer segmentation.\n\n**Support Vector Machines**: Finds the optimal boundary between classes. Great for classification problems."
      },
      {
        title: "Essential Tools and Libraries",
        content: "Python has become the lingua franca of machine learning. Key libraries include:\n\n• **NumPy & Pandas**: Data manipulation and analysis\n• **Scikit-learn**: Traditional ML algorithms and tools\n• **TensorFlow & PyTorch**: Deep learning frameworks\n• **Matplotlib & Seaborn**: Data visualization\n• **Jupyter Notebooks**: Interactive development environment"
      },
      {
        title: "Avoiding Common Pitfalls",
        content: "**Overfitting**: Your model performs great on training data but poorly on new data. Solution: Use cross-validation, regularization, and more data.\n\n**Underfitting**: Your model is too simple to capture patterns. Solution: Use more complex models or better features.\n\n**Data Leakage**: Information from your test set sneaks into training. Solution: Strictly separate training and test data.\n\n**Ignoring Data Quality**: Garbage in, garbage out. Solution: Spend time on data cleaning and exploration.\n\n**Not Establishing a Baseline**: Without a baseline, you don't know if your complex model is actually better than a simple one."
      },
      {
        title: "Your Learning Path",
        content: "1. Start with Python and basic statistics\n2. Learn NumPy, Pandas, and Matplotlib\n3. Study fundamental algorithms with Scikit-learn\n4. Build simple projects (start with Kaggle competitions)\n5. Explore deep learning with TensorFlow or PyTorch\n6. Work on real-world problems in domains you care about\n7. Never stop learning—ML is constantly evolving!\n\nRemember: The best way to learn ML is by doing. Start with simple projects and gradually increase complexity."
      }
    ]
  }
};

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
    }

    const particles: Particle[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.y += particle.speedY;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const blog = allBlogs.find(b => b.id === Number(id));
  const fullContent = blogFullContent[Number(id)];

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Link to="/blogs/all" className="text-primary hover:underline">
            Return to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Background */}
      <div className="fixed inset-0 bg-[image:var(--gradient-mesh)] opacity-30 -z-10" />

      {/* Dynamic Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div 
          className="gradient-orb gradient-orb-primary w-[500px] h-[500px] -top-40 -left-40 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="gradient-orb gradient-orb-pink w-[450px] h-[450px] top-1/2 -right-40 blur-3xl"
          style={{ 
            animationDelay: '3s',
            transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      <Header />

      <main className="pt-32 pb-20 relative z-10" ref={ref}>
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Link */}
          <Link
            to="/blogs/all"
            className={`group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Blogs
          </Link>

          {/* Article Header */}
          <article className={`${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 h-[400px] group">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text-vibrant">
                {blog.title}
              </span>
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>January 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{blog.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                <span>{blog.views} views</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all"
              >
                <Share2 className="w-4 h-4 text-primary" />
                <span>Share</span>
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Article Content */}
            <div className="prose prose-invert max-w-none">
              {/* Introduction */}
              <div className="glass-card rounded-2xl p-8 mb-8 border border-primary/20">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {fullContent?.content || blog.excerpt}
                </p>
              </div>

              {/* Main Content Sections */}
              {fullContent?.sections.map((section, index) => (
                <div
                  key={index}
                  className={`mb-12 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text-vibrant">
                    {section.title}
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-base md:text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 p-8 rounded-2xl glass-card border border-primary/20">
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Want to Read More?</h3>
                  <p className="text-muted-foreground mb-4">
                    Check out my other articles on software development, data science, and technology.
                  </p>
                  <Link
                    to="/blogs/all"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    View All Posts
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;