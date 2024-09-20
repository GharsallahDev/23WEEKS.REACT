import React from 'react';
import Slider from 'react-slick';
import { Typography, Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import week3 from 'src/assets/images/fruits/week 3.png';
import week4 from 'src/assets/images/fruits/week 4.png';
import week5 from 'src/assets/images/fruits/week 5.png';

const weeksData = [
  {
    week: 3,
    name: 'Poppy Seeds',
    imgSrc: week3,
    description:
      'At week 3, the fertilized egg has become a tiny ball of cells, rapidly multiplying!',
  },
  {
    week: 4,
    name: 'Sunflower Seeds',
    imgSrc: week4,
    description:
      'The embryo starts implanting into the uterine lining, starting a new phase of development.',
  },
  {
    week: 5,
    name: 'Peas',
    imgSrc: week5,
    description:
      'Major changes are happening as the embryo starts forming the brain, spinal cord, and heart.',
  },
];

function WeekFruit() {
  const currentWeek = 4;

  const settings = {
    centerMode: true,
    centerPadding: '60px',
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

  return (
    <Box sx={{ textAlign: 'center', py: 6 }}>
      <Typography
        variant="h2"
        gutterBottom
        sx={{ color: '#dd1367', fontWeight: 'bold', mb: 6, mt: 4, mr: 10 }}
      >
        {`Week ${currentWeek}: Your baby is about the size of ${weeksData
          .find((w) => w.week === currentWeek)
          ?.name.toLowerCase()}`}
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <Slider {...settings}>
          {weeksData.map((week, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '460px', // Set a fixed height for all slides
                py: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: week.week !== currentWeek ? 'scale(1.1)' : 'none',
                  zIndex: week.week !== currentWeek ? 10 : 1,
                },
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
    </Box>
  );
}

export default WeekFruit;