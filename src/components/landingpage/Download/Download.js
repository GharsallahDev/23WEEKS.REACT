import { Element, Link as LinkScroll } from 'react-scroll';
import { links, logos } from '../../../constants/index';
import { Marker } from '../../Marker.js';
import Logo from 'src/layouts/full/shared/logo/Logo';
import clsx from 'clsx';

const Download = () => {
  return (
    <section>
      <Element name="download" className="relative pb-32 pt-24 max-lg:pb-24 max-md:py-16">
        <div className="container">
          <div className="flex items-center">
            <div className="relative mr-6 flex-540 max-xl:flex-280 max-lg:flex256 max-md:flex-100">
              <li className="nav-logo">
                <LinkScroll
                  to="hero"
                  offset={-250}
                  spy
                  smooth
                  className={clsx('max-lg:hidden transition-transform duration-500 cursor-pointer')}
                >
                  <Logo />
                </LinkScroll>
              </li>

              <p className="body-1 mb-10 max-w-md">
                Explore our website for free – whether you're an expecting mother or a gynecologist,
                we have everything you need.
              </p>

              <ul className="flex flex-wrap items-center gap-6">
                {links.map(({ id, url, icon }) => (
                  <li
                    key={id}
                    className="download_tech-link download_tech-link_last-before download_tech-link_last-after"
                  >
                    <a
                      href={url}
                      className="size-22 download_tech-icon_before relative flex items-center justify-center rounded-full border-2 border-s7 bg-s8/50 transition-borderColor duration-500"
                    >
                      <span className="absolute -top-2 rotate-90">
                        <Marker />
                      </span>
                      <span className="download_tech-icon">{icon}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-10 max-md:hidden">
              <div className="download_preview-before download_preview-after rounded-40 relative w-[955px] border-2 border-s8 p-6">
                <div className="relative rounded-3xl bg-s9 px-6 pb-6 pt-14">
                  <span className="download_preview-dot left-6 bg-red-500" />
                  <span className="download_preview-dot left-11 bg-orange-400" />
                  <span className="download_preview-dot left-16 bg-green-500" />

                  <img
                    src="/images/screenshot.png"
                    width={855}
                    height={655}
                    alt="screen"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Infinite Scrolling Logos */}
          <div className="mt-24 overflow-hidden">
            <ul className="flex w-[200%] animate-scroll-seamless">
              {logos.concat(logos).map(({ id, url, width, height, title }, index) => (
                <li
                  key={`${id}-${index}`}
                  className="mx-10 flex-shrink-0 hover:scale-110 transition-transform duration-300"
                >
                  <img className="w-32 h-32" src={url} width={width} height={height} alt={title} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Element>

      {/* Custom Styles for Seamless Infinite Scroll */}
      <style jsx>{`
        @keyframes scroll-seamless {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-seamless {
          animation: scroll-seamless 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Download;
