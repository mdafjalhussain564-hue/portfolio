import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    name: "Lufers",
    category: "E-Commerce",
    tools: "React.js, JavaScript, Tailwind CSS",
    image: "/images/project-lufers.jpg",
    link: "https://github.com/mdafjalhussain564-hue",
  },
  {
    name: "Ultras",
    category: "Web Application",
    tools: "React.js, JavaScript, CSS3",
    image: "/images/project-ultras.jpg",
    link: "https://github.com/mdafjalhussain564-hue",
  },
  {
    name: "Za Mart",
    category: "Full-Stack Store",
    tools: "Next.js, Tailwind CSS, Node.js",
    image: "/images/project-zamart.jpg",
    link: "https://github.com/mdafjalhussain564-hue",
  },
  {
    name: "Admin Panel",
    category: "Dashboard & Admin",
    tools: "React.js, API Integration, Clean UI",
    image: "/images/project-ultras.jpg",
    link: "https://github.com/mdafjalhussain564-hue",
  },
  {
    name: "Lufers App",
    category: "Responsive Storefront",
    tools: "React.js, Component Design, Netlify",
    image: "/images/project-lufers.jpg",
    link: "https://github.com/mdafjalhussain564-hue",
  },
  {
    name: "Za Mart Web",
    category: "Modern E-Commerce",
    tools: "Next.js, JavaScript, Tailwind CSS",
    image: "/images/project-zamart.jpg",
    link: "https://github.com/mdafjalhussain564-hue",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (!box || box.length === 0) return;
      const workContainer = document.querySelector(".work-container");
      if (!workContainer || !box[0].parentElement) return;
      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2 || 0;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
