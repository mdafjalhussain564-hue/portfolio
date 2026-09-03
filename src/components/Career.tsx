import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Diploma in CSE</h4>
                <h5>MANUU, Hyderabad</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Completed Diploma in Computer Science Engineering from Maulana Azad National Urdu University (CGPA: 7.25). Solid foundation in programming, web technologies, and engineering practices.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Certifications</h4>
                <h5>Udemy & Self Learning</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Completed "React.js – Complete Guide" and "HTML, CSS, JavaScript for Web Development". Mastered modern React concepts, state management, Git/GitHub version control, and Netlify deployment.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Developer Intern</h4>
                <h5>dk infotech solutions</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Built scalable dashboards and admin panels using React.js (Mar 2026 – Sep 2026). Converted Figma designs into reusable, optimized React components and developed responsive e-commerce web applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
