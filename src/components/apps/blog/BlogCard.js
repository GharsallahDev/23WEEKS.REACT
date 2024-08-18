import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  CardContent,
  Stack,
  Avatar,
  Typography,
  CardMedia,
  Chip,
  Grid,
  Tooltip,
  Box,
  Skeleton,
} from '@mui/material';
import { IconEye, IconMessage2, IconPoint } from '@tabler/icons';
import { fetchBlogPost } from 'src/store/apps/blog/BlogSlice';
import BlankCard from '../../shared/BlankCard';

const BlogCard = ({ post }) => {
  const dispatch = useDispatch();
  const { id, coverImg, title, view, comments, createdAt } = post;

  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handlePostClick = () => {
    dispatch(fetchBlogPost(id));
  };

  return (
    <Grid item xs={12} lg={4} md={4} sm={6} display="flex" alignItems="stretch">
      {isLoading ? (
        <Skeleton
          animation="wave"
          variant="square"
          width="100%"
          height={400}
          sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
        />
      ) : (
        <BlankCard className="hoverCard">
          <Link to={`/apps/blog/detail/${id}`} onClick={handlePostClick}>
            <CardMedia component="img" height="240" image={coverImg} alt={title} />
          </Link>
          <CardContent>
            <Box my={3}>
              <Typography
                gutterBottom
                variant="h5"
                color="inherit"
                sx={{ textDecoration: 'none' }}
                component={Link}
                to={`/apps/blog/detail/${id}`}
                onClick={handlePostClick}
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
          </CardContent>
        </BlankCard>
      )}
    </Grid>
  );
};

BlogCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default BlogCard;