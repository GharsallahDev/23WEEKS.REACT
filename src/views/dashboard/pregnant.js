// Pregnant.js

import React from "react";
import Slider from "react-slick";

import week3 from "src/assets/images/fruits/week 3.png"; // Import the image
import week4 from "src/assets/images/fruits/week 4.png"; // Import the image
import week5 from "src/assets/images/fruits/week 5.png"; // Import the image
import week6 from "src/assets/images/fruits/week 6.png"; // Import the image
import week7 from "src/assets/images/fruits/week 7.png"; // Import the image
import week8 from "src/assets/images/fruits/week 8.png"; // Import the image
import week9 from "src/assets/images/fruits/week 9.png"; // Import the image
import week10 from "src/assets/images/fruits/week 10.png"; // Import the image
import week11 from "src/assets/images/fruits/week 11.png"; // Import the image
import week12 from "src/assets/images/fruits/week 12.png"; // Import the image
import week13 from "src/assets/images/fruits/week 13.png"; // Import the image
import week14 from "src/assets/images/fruits/week 14.png"; // Import the image
import week15 from "src/assets/images/fruits/week 15.png"; // Import the image
import week16 from "src/assets/images/fruits/week 16.png"; // Import the image
import week17 from "src/assets/images/fruits/week 17.png"; // Import the image
import week18 from "src/assets/images/fruits/week 18.png"; // Import the image
import week19 from "src/assets/images/fruits/week 19.png"; // Import the image
import week20 from "src/assets/images/fruits/week 20.png"; // Import the image
import week21 from "src/assets/images/fruits/week 21.png"; // Import the image
import week22 from "src/assets/images/fruits/week 22.png"; // Import the image
import week23 from "src/assets/images/fruits/week 23.png"; // Import the image
import week24 from "src/assets/images/fruits/week 24.png"; // Import the image
import week25 from "src/assets/images/fruits/week 25.png"; // Import the image
import week26 from "src/assets/images/fruits/week 26.png"; // Import the image
import week27 from "src/assets/images/fruits/week 27.png"; // Import the image
import week28 from "src/assets/images/fruits/week 28.png"; // Import the image
import week29 from "src/assets/images/fruits/week 29.png"; // Import the image
import week30 from "src/assets/images/fruits/week 30.png"; // Import the image
import week31 from "src/assets/images/fruits/week 31.png"; // Import the image
import week32 from "src/assets/images/fruits/week 32.png"; // Import the image
import week33 from "src/assets/images/fruits/week 33.png"; // Import the image
import week34 from "src/assets/images/fruits/week 34.png"; // Import the image
import week35 from "src/assets/images/fruits/week 35.png"; // Import the image
import week36 from "src/assets/images/fruits/week 36.png"; // Import the image
import week37 from "src/assets/images/fruits/week 36.png"; // Import the image
import week38 from "src/assets/images/fruits/week 39.png"; // Import the image
import week39 from "src/assets/images/fruits/week 39.png"; // Import the image
import week40 from "src/assets/images/fruits/week 40.png"; // Import the image
import week41 from "src/assets/images/fruits/week 41.png"; // Import the image


import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./Search.css";
import { Typography } from "@mui/material";

// Sample data for weeks
const weeksData = [
  {
    week: 3,

    name: 'Poppy Seeds',

    imgSrc: week3,

    title: 'Week 3',

    description:
      'At week 3, the fertilized egg has become a tiny ball of cells, rapidly multiplying!',
  },

  {
    week: 4,

    name: 'Sunflower Seeds',

    imgSrc: week4,

    title: 'Week 4',

    description:
      'The embryo starts implanting into the uterine lining, starting a new phase of development.',
  },

  {
    week: 5,

    name: 'Peas',

    imgSrc: week5,

    title: 'Week 5',

    description:
      'Major changes are happening as the embryo starts forming the brain, spinal cord, and heart.',
  },

  {
    week: 6,

    name: 'Blueberry',

    imgSrc: week6,

    title: 'Week 6',

    description:
      "Your baby's heart is now beating, and tiny buds are starting to form into arms and legs.",
  },

  {
    week: 7,

    name: 'Rasberry',

    imgSrc: week7,

    title: 'Week 7',

    description:
      'Facial features are beginning to develop, along with essential organs like the lungs.',
  },

  {
    week: 8,

    name: 'Olive',

    imgSrc: week8,

    title: 'Week 8',

    description:
      'The embryo has now grown significantly, and fingers and toes are starting to form!',
  },

  {
    week: 9,

    name: 'Cherry',

    imgSrc: week9,

    title: 'Week 9',

    description:
      'Your baby is looking more human! The organs are developing rapidly, and the heart has divided into four chambers.',
  },

  {
    week: 10,

    name: 'Lime',

    imgSrc: week10,

    title: 'Week 10',

    description:
      'The vital organs are nearly fully formed, and your baby is now officially considered a fetus.',
  },

  {
    week: 11,

    name: 'Plum',

    imgSrc: week11,

    title: 'Week 11',

    description: 'Bones are hardening, and tiny tooth buds are forming under the gums!',
  },

  {
    week: 12,

    name: 'Lemon',

    imgSrc: week12,

    title: 'Week 12',

    description:
      'Your baby’s reflexes are developing, and the intestines are moving into the abdominal cavity.',
  },

  {
    week: 13,

    name: 'Nectarine',

    imgSrc: week13,

    title: 'Week 13',

    description: 'The second trimester begins! Your baby is growing quickly and has fingerprints!',
  },

  {
    week: 14,

    name: 'Apple',

    imgSrc: week14,

    title: 'Week 14',

    description:
      'Your baby’s body is lengthening, and the facial features are becoming more defined.',
  },

  {
    week: 15,

    name: 'Avocado',

    imgSrc: week15,

    title: 'Week 15',

    description:
      'Your baby is practicing breathing motions and can now sense light even with eyes closed.',
  },

  {
    week: 16,

    name: 'Pear',

    imgSrc: week16,

    title: 'Week 16',

    description: 'The muscles are developing, and your baby may be able to make tiny movements!',
  },

  {
    week: 17,

    name: 'Bell Pepper',

    imgSrc: week17,

    title: 'Week 17',

    description: 'Your baby is gaining more body fat, and sweat glands are starting to form.',
  },

  {
    week: 18,

    name: 'Carrot',

    imgSrc: week18,

    title: 'Week 18',

    description: 'The baby’s hearing is developing, and they can now hear your heartbeat!',
  },

  {
    week: 19,

    name: 'Artichoke',

    imgSrc: week19,

    title: 'Week 19',

    description:
      'The senses are becoming sharper, and your baby may start to recognize your voice.',
  },

  {
    week: 20,

    name: 'Sweet Potato',

    imgSrc: week20,

    title: 'Week 20',

    description: 'You’re halfway there! Your baby is now covered in fine hair called lanugo.',
  },

  {
    week: 21,

    name: 'Papaya',

    imgSrc: week21,

    title: 'Week 21',

    description: 'Your baby is growing more coordinated and can now grasp the umbilical cord!',
  },

  {
    week: 22,

    name: 'Grapefruit',

    imgSrc: week22,

    title: 'Week 22',

    description: 'The baby’s eyes are starting to form, and eyebrows and hair are growing.',
  },

  {
    week: 23,

    name: 'Corn',

    imgSrc: week23,

    title: 'Week 23',

    description:
      'Your baby is practicing swallowing and will soon start to gain more weight rapidly.',
  },

  {
    week: 24,

    name: 'Eggplant',

    imgSrc: week24,

    title: 'Week 24',

    description: 'Lungs are developing more, and your baby is preparing for the outside world!',
  },

  {
    week: 25,

    name: 'Lettuce',

    imgSrc: week25,

    title: 'Week 25',

    description: 'Your baby’s sense of touch is improving, and they can now respond to touch!',
  },

  {
    week: 26,

    name: 'Cauliflower',

    imgSrc: week26,

    title: 'Week 26',

    description: 'Your baby’s eyes are now open, and they can blink and respond to light.',
  },

  {
    week: 27,

    name: 'Cucumber',

    imgSrc: week27,

    title: 'Week 27',

    description:
      'The third trimester begins! Your baby is getting ready for the final growth stage.',
  },

  {
    week: 28,

    name: 'Red Cabbage',

    imgSrc: week28,

    title: 'Week 28',

    description: 'Brain development is accelerating, and your baby is starting to dream.',
  },

  {
    week: 29,

    name: 'White cabbage',

    imgSrc: week29,

    title: 'Week 29',

    description: 'Your baby’s bones are getting stronger, and the skin is becoming smoother.',
  },

  {
    week: 30,

    name: 'Conconut',

    imgSrc: week30,

    title: 'Week 30',

    description: 'Your baby’s movements are stronger, and they’re gaining more weight each day.',
  },

  {
    week: 31,

    name: 'Celeriac',

    imgSrc: week31,

    title: 'Week 31',

    description: 'Your baby can now regulate body temperature and continues to grow rapidly.',
  },

  {
    week: 32,

    name: 'Pineapple',

    imgSrc: week32,

    title: 'Week 32',

    description:
      'Your baby’s lungs are nearly fully developed, and they’re getting ready for life outside.',
  },

  {
    week: 33,

    name: 'Buternu Squach',

    imgSrc: week33,

    title: 'Week 33',

    description:
      'Your baby is growing larger, and their brain is developing more complex connections.',
  },

  {
    week: 34,

    name: 'Honey Melon',

    imgSrc: week34,

    title: 'Week 34',

    description:
      'The immune system is getting stronger, and your baby is practicing breathing movements.',
  },

  {
    week: 35,

    name: 'Swiss Chard',

    imgSrc: week35,

    title: 'Week 35',

    description:
      'Your baby is putting on more weight, preparing for birth, and the skin is becoming smoother.',
  },

  {
    week: 36,

    name: 'Winter Melon',

    imgSrc: week36,

    title: 'Week 36',

    description: 'Your baby is dropping into the birth position, getting ready for delivery.',
  },

  {
    week: 37,

    name: 'Winter Melon',

    imgSrc: week37,

    title: 'Week 37',

    description: 'Your baby is considered full-term now, and they’re getting ready to meet you!',
  },

  {
    week: 38,

    name: 'Watermelon',

    imgSrc: week38,

    title: 'Week 38',

    description:
      'All systems are almost ready! Your baby is gaining more weight and preparing for life outside.',
  },

  {
    week: 39,

    name: 'Watermelon',

    imgSrc: week39,

    title: 'Week 39',

    description:
      'Your baby is finishing final preparations, and delivery could happen any day now!',
  },

  {
    week: 40,

    name: 'Pumpkin',

    imgSrc: week40,

    title: 'Week 40',

    description: 'It’s the big week! Your baby is ready to be born any day now.',
  },

  {
    week: 41,

    name: 'Jackfruit',

    imgSrc: week41,

    title: 'Week 41',

    description:
      'If your baby hasn’t arrived yet, they’re taking their time but still healthy and growing.',
  },
];

// Slider settings for react-slick

const settings = {
  centerMode: true,
  centerPadding: '0',
  slidesToShow: 3,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  infinite: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
  ],
};

function Pregnant() {
  return (
    <div className="app">
      <Typography
        variant="h2"
        gutterBottom
        sx={{ color: '#dd1367', fontWeight: 'bold', mb: 6, mt: 4 }}
      >
        Your fetus is about the size of
      </Typography>

      <div className="week-slider">
        <Slider
          {...{
            ...settings, // Spread the current settings
            dots: false, // Disable dots
          }}
        >
          {weeksData.map((week, index) => (
            <div className="slider-item" key={index}>
              <div className="week-card">
                <h2>{week.name}</h2>
                <img src={week.imgSrc} alt={`Week ${week.week} Fruit`} />
                <h2>{week.title}</h2>
                <p>{week.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Pregnant;