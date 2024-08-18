import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  CardContent,
  Stack,
  Avatar,
  Typography,
  Chip,
  Grid,
  Tooltip,
  Box,
  alpha,
  styled,
  Skeleton,
} from '@mui/material';
import { IconEye, IconMessage2, IconPoint } from '@tabler/icons';
import { format } from 'date-fns';
import { fetchBlogPost } from 'src/store/apps/blog/BlogSlice';
import BlankCard from '../../shared/BlankCard';

// Styled components
const CoverImgStyle = styled(CardContent)({
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: 1,
  width: '100%',
  height: '100%',
  color: 'white',
});

const CoverBox = styled(Box)({
  top: 0,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
});

const BlogFeaturedCard = ({ post, index }) => {
  const dispatch = useDispatch();
  const { id, coverImg, title, view, comments, category, author, createdAt } = post;
  
  // Create the link using the post ID
  const linkTo = `/apps/blog/detail/${id}`;
  const mainPost = index === 0;

  // Styled components for cover image
  const CoverImgBg = styled(BlankCard)({
    p: 0,
    height: '400px',
    position: 'relative',
    background: `url(${coverImg}) no-repeat center`,
    backgroundSize: 'cover',
  });

  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {post ? (
        <Grid
          item
          xs={12}
          lg={mainPost ? 8 : 4}
          md={12}
          sm={12}
          display="flex"
          alignItems="stretch"
        >
          {isLoading ? (
            <Skeleton
              variant="square"
              animation="wave"
              width="100%"
              height={400}
              sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
            />
          ) : (
            <CoverImgBg className="hoverCard">
              <Typography
                component={Link}
                to={linkTo}
                onClick={() => dispatch(fetchBlogPost(id))} // Fetch post using ID
              >
                <CoverBox
                  sx={{ backgroundColor: (theme) => alpha(theme.palette.grey[900], 0.6) }}
                />
              </Typography>
              <CoverImgStyle>
                <Box
                  height={'100%'}
                  display={'flex'}
                  justifyContent="space-between"
                  flexDirection="column"
                >
                  <Box>
                    <Stack direction="row">
                      <Tooltip title={author.name} placement="top">
                        {/* <Avatar aria-label="recipe" src={author.avatar}></Avatar> */}
                      </Tooltip>
                      <Chip
                        sx={{ marginLeft: 'auto' }}
                        label={category}
                        size="small"
                        color="primary"
                      />
                    </Stack>
                  </Box>
                  <Box>
                    <Box my={3}>
                      <Typography
                        gutterBottom
                        variant="h3"
                        color="inherit"
                        sx={{ textDecoration: 'none' }}
                        component={Link}
                        to={linkTo}
                        onClick={() => dispatch(fetchBlogPost(id))} // Fetch post using ID
                      >
                        {title}
                      </Typography>
                    </Box>
                    <Stack direction="row" gap={3} alignItems="center">
                      <Stack direction="row" gap={1} alignItems="center">
                        <IconEye size="18" /> {view}
                      </Stack>
                      <Stack direction="row" gap={1} alignItems="center">
                        <IconMessage2 size="18" /> {comments.length}
                      </Stack>
                      <Stack direction="row" ml="auto" alignItems="center">
                        <IconPoint size="16" />
                        <small>{format(new Date(createdAt), 'E, MMM d')}</small>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </CoverImgStyle>
            </CoverImgBg>
          )}
        </Grid>
      ) : (
        ''
      )}
    </>
  );
};

export default BlogFeaturedCard;
