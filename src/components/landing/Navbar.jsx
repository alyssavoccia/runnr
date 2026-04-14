import { useState, useEffect } from "react";
import logo from "@/assets/images/logo.svg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 transition-all border-b ${
        scrolled ? "bg-white/90 border-app-border backdrop-blur-sm shadow-sm" : "border-transparent"
      }`}
    >
      <a href="#" className="flex items-center gap-2">
        <img src={logo} alt="Runnr logo" className="w-8 h-8 drop-shadow drop-shadow-brand-600/40" />
        <span className="font-heading font-bold text-lg tracking-tighter">Runnr</span>
      </a>
      <div className="flex items-center gap-3">
        <button className="cursor-pointer text-brand-muted text-xs hover:text-brand-dark transition duration-150 ease-in">
          Try live demo
        </button>
        <a href="#" className="btn btn-primary py-2 drop-shadow drop-shadow-brand-600/40">
          Sign In
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
