import { createSlice } from '@reduxjs/toolkit';
import axios from 'src/utils/axios';

const initialState = {
  blogposts: [],
  recentPosts: [],
  blogSearch: '',
  sortBy: 'newest',
  selectedPost: null,
  loading: false,
  error: null,
};

export const BlogSlice = createSlice({
  name: 'Blog',
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.blogposts = action.payload;
    },
    getPost: (state, action) => {
      state.selectedPost = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getPosts, getPost, setLoading, setError } = BlogSlice.actions;

export const fetchBlogPosts = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get('/api/data/blog/BlogPosts');
    dispatch(getPosts(response.data));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const addComment = (postId, comment) => async (dispatch) => {
  try {
    const response = await axios.post('/api/data/blog/post/add', { postId, comment });
    dispatch(getPosts(response.data.posts));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const fetchBlogPost = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`/api/data/blog/post/${id}`);
    dispatch(getPost(response.data.post));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export default BlogSlice.reducer;