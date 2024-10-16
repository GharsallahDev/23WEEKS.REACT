import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import { Typography, Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import week1 from 'src/assets/images/fruits/week 1.png';
import week2 from 'src/assets/images/fruits/week 2.png';
import week3 from 'src/assets/images/fruits/week 3.png';
import week4 from 'src/assets/images/fruits/week 4.png';
import week5 from 'src/assets/images/fruits/week 5.png';
import week6 from 'src/assets/images/fruits/week 6.png';
import week7 from 'src/assets/images/fruits/week 7.png';
import week8 from 'src/assets/images/fruits/week 8.png';
import week9 from 'src/assets/images/fruits/week 9.png';
import week10 from 'src/assets/images/fruits/week 10.png';
import week11 from 'src/assets/images/fruits/week 11.png';
import week12 from 'src/assets/images/fruits/week 12.png';
import week13 from 'src/assets/images/fruits/week 13.png';
import week14 from 'src/assets/images/fruits/week 14.png';
import week15 from 'src/assets/images/fruits/week 15.png';
import week16 from 'src/assets/images/fruits/week 16.png';
import week17 from 'src/assets/images/fruits/week 17.png';
import week18 from 'src/assets/images/fruits/week 18.png';
import week19 from 'src/assets/images/fruits/week 19.png';
import week20 from 'src/assets/images/fruits/week 20.png';
import week21 from 'src/assets/images/fruits/week 21.png';
import week22 from 'src/assets/images/fruits/week 22.png';
import week23 from 'src/assets/images/fruits/week 23.png';
import week24 from 'src/assets/images/fruits/week 24.png';
import week25 from 'src/assets/images/fruits/week 25.png';
import week26 from 'src/assets/images/fruits/week 26.png';
import week27 from 'src/assets/images/fruits/week 27.png';
import week28 from 'src/assets/images/fruits/week 28.png';
import week29 from 'src/assets/images/fruits/week 29.png';
import week30 from 'src/assets/images/fruits/week 30.png';
import week31 from 'src/assets/images/fruits/week 31.png';
import week32 from 'src/assets/images/fruits/week 32.png';
import week33 from 'src/assets/images/fruits/week 33.png';
import week34 from 'src/assets/images/fruits/week 34.png';
import week35 from 'src/assets/images/fruits/week 35.png';
import week36 from 'src/assets/images/fruits/week 36.png';
import week37 from 'src/assets/images/fruits/week 36.png';
import week38 from 'src/assets/images/fruits/week 39.png';
import week39 from 'src/assets/images/fruits/week 39.png';
import week40 from 'src/assets/images/fruits/week 40.png';
import week41 from 'src/assets/images/fruits/week 41.png';

const weeksData = [
  {
    week: 1,

    name: 'baby is forming',

    imgSrc: week1,

    title: 'Week 1',

    description:
      'At week 1, your body is preparing for pregnancy. Though you are not technically pregnant yet, your body is laying the groundwork, including ovulation and hormonal changes.',
  },
  {
    week: 2,

    name: 'baby is forming',

    imgSrc: week2,

    title: 'Week 2',

    description:
      'At week 2, ovulation occurs, and the egg is ready to be fertilized. This is the critical moment where conception may happen.',
  },
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

function WeekFruit() {
  const { t } = useTranslation();
  const sliderRef = useRef(null);

  const currentWeek = useSelector((state) => state.auth.user?.current_pregnancy_week) || 1;

  const size = weeksData.find((w) => w.week === currentWeek)?.name.toLowerCase();

  const settings = {
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    infinite: false,
    initialSlide: weeksData.findIndex((w) => w.week === currentWeek),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };

  const goToCurrentWeek = () => {
    const currentWeekIndex = weeksData.findIndex((w) => w.week === currentWeek);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentWeekIndex);
    }
  };

  useEffect(() => {
    goToCurrentWeek();
  }, [currentWeek]);

  if (!currentWeek) {
    return <div>Loading pregnancy information...</div>;
  }

  return (
    <Box sx={{ textAlign: 'center', py: 6 }}>
      <Typography
        variant="h2"
        gutterBottom
        sx={{ color: '#dd1367', fontWeight: 'bold', mb: 6, mt: 4 }}
      >
        {t('week_info', { week: currentWeek, size })}
      </Typography>

      <Box sx={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
        <Slider ref={sliderRef} {...settings}>
          {weeksData.map((week, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '460px',
                py: 4,
                px: 2,
                transition: 'all 0.3s ease',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: week.week === currentWeek ? '280px' : '260px',
                  height: week.week === currentWeek ? '420px' : '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 3,
                  border: week.week === currentWeek ? '3px solid #dd1367' : '1px solid #ddd',
                  borderRadius: '10px',
                  bgcolor: 'background.paper',
                  boxShadow: week.week === currentWeek ? '0 0 15px rgba(221, 19, 103, 0.5)' : 3,
                  transform: week.week === currentWeek ? 'translateY(-10px)' : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: week.week !== currentWeek ? 'scale(1.05)' : 'translateY(-10px)',
                    zIndex: week.week !== currentWeek ? 10 : 1,
                  },
                }}
              >
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {week.name}
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: '200px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={week.imgSrc}
                    alt={`Week ${week.week} Fruit`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
                <Typography variant="h5" sx={{ my: 2, fontWeight: 'bold' }}>
                  Week {week.week}
                </Typography>
                <Typography variant="body2">{week.description}</Typography>
                {week.week === currentWeek && (
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      bgcolor: '#dd1367',
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: '4px',
                      zIndex: 3,
                    }}
                  >
                    Current Week
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      <Button variant="contained" color="primary" onClick={goToCurrentWeek} sx={{ mt: 4 }}>
        {t('Go to Current Week')}
      </Button>

      <style jsx="true">{`
        .slick-slide {
          transition: all 0.3s ease;
        }
        .slick-center {
          transform: scale(1.05);
        }
        .slick-prev,
        .slick-next {
          z-index: 1;
          width: 40px;
          height: 40px;
          background: #dd1367;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .slick-prev:hover,
        .slick-next:hover {
          background-color: #b51055;
        }
        .slick-prev {
          left: -50px;
        }
        .slick-next {
          right: -50px;
        }
        .slick-prev:before,
        .slick-next:before {
          padding-top: 5px;
          font-size: 30px;
          line-height: 1;
          opacity: 1;
          color: white;
          display: block;
          text-align: center;
        }
        .slick-list {
          margin: 0 -10px;
        }
        .slick-slide > div {
          padding: 0 10px;
        }
      `}</style>
    </Box>
  );
}

export default WeekFruit;