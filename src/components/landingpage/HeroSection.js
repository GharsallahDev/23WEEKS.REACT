import { Element, Link as LinkScroll } from 'react-scroll';
import Image from 'src/assets/images/landingpage/test.png';
import zap from 'src/assets/images/landingpage/zap.svg';
import Button from "../Button.js";
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative pt-48 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="hero" id="Home">
        <div className="container">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            {/* Title Animation */}
            <motion.h1
              className="font-poppins mb-6 h2 text-p6 uppercase max-lg:mb- max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12"
              initial={{ opacity: 0, y: 50 }} // Starts faded out and below its position
              animate={{ opacity: 1, y: 0 }} // Moves up and fades in
              transition={{ duration: 1, ease: 'easeOut' }} // Smooth entrance
            >
              AI-Powered Prenatal Care
            </motion.h1>

            {/* Text Animation */}
            <motion.p
              className="max-w-440 mb-14 body-1 max-md:mb-10"
              initial={{ opacity: 0, x: -30 }} // Starts faded out and shifted left
              animate={{ opacity: 1, x: 0 }} // Moves to its correct position
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }} // Slight delay for a staggered effect
            >
              Empowering expectant mothers and gynecologists with personalized support and advanced
              diagnostics.
            </motion.p>

            {/* Button with Hover Animation */}
            <LinkScroll to="features" offset={-100} spy smooth>
              <motion.div
                whileHover={{ scale: 1.1 }} // Scales up slightly on hover
                whileTap={{ scale: 0.95 }} // Scales down slightly on click
                transition={{ duration: 0.2 }}
              >
                <Button icon={zap}>Try it now</Button>
              </motion.div>
            </LinkScroll>
          </div>

          {/* Floating Image with Animation */}
          <motion.div
            className="absolute top-28 left-[calc(50%)] w-[550px] pointer-events-none hero-img_res"
            animate={{
              y: [0, -15, 0], // Floating motion: moves up and down
              rotate: [-13, 0, -13], // Smooth rotation: rotates left to right and back to left
            }}
            transition={{
              duration: 5, // Longer duration for a smoother effect
              ease: 'easeInOut', // Smooth easing function
              repeat: Infinity, // Repeats the animation infinitely
              repeatType: 'loop', // Loops the animation
            }}
          >
            <img src={Image} className="size-620 max-lg:h-auto" alt="AI Care" />
          </motion.div>
        </div>
      </Element>
    </section>
  );
};

export default HeroSection;
