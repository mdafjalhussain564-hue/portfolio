import { MdArrowOutward } from "react-icons/md";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I'm Afjal, a passionate Frontend Developer with hands-on experience building responsive, production web applications using React.js, JavaScript, HTML5, and CSS3. Experienced converting UI designs into reusable components and integrating APIs to deliver seamless user experiences.
        </p>
        <div className="about-resume-wrap">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="about-resume-btn"
            data-cursor="disable"
          >
            Check Resume <MdArrowOutward />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
