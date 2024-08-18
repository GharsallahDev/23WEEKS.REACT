import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBlogPost, addComment } from 'src/store/apps/blog/BlogSlice';
import {
  Box,
  Typography,
  CardMedia,
  CardContent,
  Stack,
  Avatar,
  Chip,
  Tooltip,
  Divider,
  TextField,
  Button,
  Skeleton,
} from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { IconEye, IconMessage2, IconPoint, IconQuote } from '@tabler/icons';
import { format } from 'date-fns';
import BlogComment from './BlogComment';
import { uniqueId } from 'lodash';
import BlankCard from '../../../shared/BlankCard';

const BlogDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [replyTxt, setReplyTxt] = useState('');
  const [isLoading, setLoading] = useState(true);

  const { selectedPost: post, loading, error } = useSelector((state) => state.blogReducer);

  useEffect(() => {
    dispatch(fetchBlogPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/apps/blog/posts', title: 'Blog' },
    { title: 'Blog post' },
  ];

  const onSubmit = async (postId, reply) => {
    if (!postId || !reply) return;
    const newReply = {
      id: uniqueId('#comm_'),
      profile: {
        id: uniqueId('#REPLY_'),
        avatar: post?.author?.avatar,
        name: post?.author?.name || 'Anonymous',
        time: new Date().toISOString(),
      },
      comment: reply,
      replies: [],
    };
    await dispatch(addComment(postId, newReply));
    dispatch(fetchBlogPost(id));
    setReplyTxt('');
  };

  if (loading || isLoading) {
    return (
      <Box>
        <Breadcrumb title="Blog Detail" items={BCrumb} />
        <BlankCard>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={440}
            sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
          />
          <CardContent>
            <Skeleton animation="wave" height={40} width="80%" />
            <Skeleton animation="wave" height={20} width="60%" />
          </CardContent>
        </BlankCard>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Breadcrumb title="Blog Detail" items={BCrumb} />
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!post) {
    return (
      <Box>
        <Breadcrumb title="Blog Detail" items={BCrumb} />
        <Typography>No post found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Breadcrumb title="Blog Detail" items={BCrumb} />
      <Stack spacing={5}>
        {' '}
        {/* Added Stack with spacing */}
        <BlankCard>
          {post.coverImg && (
            <CardMedia component="img" height="440" image={post.coverImg} alt={post.title} />
          )}
          <CardContent>
            <Box my={3}>
              <Typography gutterBottom variant="h1" fontWeight={600}>
                {post.title || 'Untitled Post'}
              </Typography>
            </Box>
            <Stack direction="row" gap={3} alignItems="center">
              <Stack direction="row" gap={1} alignItems="center">
                <IconEye size="18" /> {post.view || 0}
              </Stack>
              <Stack direction="row" gap={1} alignItems="center">
                <IconMessage2 size="18" /> {post.comments?.length || 0}
              </Stack>
              <Stack direction="row" ml="auto" alignItems="center">
                <IconPoint size="16" />
                <small>
                  {post.createdAt ? format(new Date(post.createdAt), 'E, MMM d') : 'Unknown date'}
                </small>
              </Stack>
            </Stack>
          </CardContent>
          <Divider />
          <CardContent>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: post.content || 'No content available' }}
            />
            <Box my={4}>
              <Divider />
            </Box>
          </CardContent>
        </BlankCard>
        {/* <BlankCard>
          <CardContent>
            <Typography variant="h4" fontWeight={600}>
              Post Comments
            </Typography>
            <br />
            <TextField
              rows={4}
              multiline
              fullWidth
              value={replyTxt}
              onChange={(e) => setReplyTxt(e.target.value)}
            />
            <br />
            <br />
            <Button color="primary" variant="contained" onClick={() => onSubmit(post.id, replyTxt)}>
              Post Comment
            </Button>

            <Stack direction="row" gap={2} alignItems="center" mb={3} mt={5}>
              <Typography variant="h4" fontWeight={600}>
                Comments
              </Typography>
              <Box px={1.5} py={1} color="primary.main" bgcolor="primary.light">
                <Typography variant="h6" fontWeight={600}>
                  {post.comments?.length || 0}
                </Typography>
              </Box>
            </Stack>
            <Box>
              {post.comments?.map((comment) => (
                <BlogComment comment={comment} key={comment.id} />
              )) || <Typography>No comments yet</Typography>}
            </Box>
          </CardContent>
        </BlankCard> */}
      </Stack>
    </Box>
  );
};

export default BlogDetail;