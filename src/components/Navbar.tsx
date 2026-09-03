import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

export const smoother = {
  paused: (_state: boolean) => {},
  scrollTop: (_top: number) => {},
  scrollTo: (target: string | null) => {
    if (!target) return;
    const elem = document.querySelector(target);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  },
};

const Navbar = () => {
  useEffect(() => {
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        let elem = e.currentTarget as HTMLAnchorElement;
        let section = elem.getAttribute("data-href");
        if (section) {
          e.preventDefault();
          const target = document.querySelector(section);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh(true);
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          AFJAL
        </a>
        <a
          href="/#"
          className="navbar-connect"
          data-cursor="disable"
        >
          Portfolio
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
            >
              <HoverLinks text="RESUME" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
