import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link as LinkScroll, scroller } from 'react-scroll';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from 'src/layouts/full/shared/logo/Logo';

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 32);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollTarget && location.pathname === '/') {
      scroller.scrollTo(scrollTarget, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: scrollTarget === 'Home' ? -200 : -100,
      });
      setScrollTarget(null);
    }
  }, [location, scrollTarget]);

  const handleNavClick = (section) => {
    if (location.pathname !== '/') {
      setScrollTarget(section); 
      navigate('/');
    } else {
      scroller.scrollTo(section, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: section === 'Home' ? -200 : -100,
      });
    }
  };

  const NavLink = ({ title, section }) => (
    <div
      onClick={() => {
        setIsOpen(false);
        handleNavClick(section);
      }}
      className="base-bold text-black-100 uppercase transition-colors duration-500 cursor-pointer hover:text-p6 max-lg:my-4 max-lg:h5"
    >
      {title}
    </div>
  );

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 z-50 w-full py-10 transition-all duration-500 max-lg:py-4',
        hasScrolled && 'py-2 bg-white backdrop-blur-[8px]',
      )}
    >
      <div className="container flex h-14 items-center max-lg:px-5">
        <a className="lg:hidden flex-1 cursor-pointer z-2">
          <Logo />
        </a>

        <div
          className={clsx(
            'w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-s8 max-lg:opacity-0',
            isOpen ? 'max-lg:opacity-100' : 'max-lg:pointer-events-none',
          )}
        >
          <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:overflow-hidden sidebar-before max-md:px-4">
            <nav className="max-lg:relative max-lg:z-2 max-lg:my-auto">
              <ul className="flex max-lg:block max-lg:px-12">
                <li className="nav-li">
                  <NavLink title="Home" section="Home" />
                  <div className="dot" />
                  <NavLink title="Features" section="Features" />
                </li>

                <li className="nav-logo">
                  <LinkScroll
                    to="hero"
                    offset={-250}
                    spy
                    smooth
                    className={clsx(
                      'max-lg:hidden transition-transform duration-500 cursor-pointer px-28',
                    )}
                  >
                    <Logo />
                  </LinkScroll>
                </li>

                <li className="nav-li">
                  <NavLink title="Pricing" section="Pricing" />
                  <div className="dot" />
                  <Link
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className="base-bold text-black-100 uppercase transition-colors duration-500 cursor-pointer hover:text-p6 max-lg:my-4 max-lg:h5"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="lg:hidden block absolute top-1/2 left-0 w-[960px] h-[380px] translate-x-[-290px] -translate-y-1/2 rotate-90">
              <img
                src="/images/bg-outlines.svg"
                width={960}
                height={380}
                alt="outline"
                className="relative z-2"
              />
              <img
                src="/images/bg-outlines-fill.png"
                width={960}
                height={380}
                alt="outline"
                className="absolute inset-0 mix-blend-soft-light opacity-5"
              />
            </div>
          </div>
        </div>

        <button
          className="lg:hidden z-2 size-10 border-2 border-s4/25 rounded-full flex justify-center items-center"
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <img
            src={`/images/${isOpen ? 'close' : 'magic'}.svg`}
            alt="magic"
            className="size-1/2 object-contain"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
