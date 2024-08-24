import React, { useState } from 'react';
import './Search.css';
import { Box, Typography, Button, Paper, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import breadcrumbImg from 'src/assets/images/breadcrumb/search.png';
import config from 'src/config';

const BCrumb = [
  {
    to: '/',
    title: 'Generator',
  },
  {
    title: 'Search Engine',
  },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: 600,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);
    try {
      const response = await fetch(`${config.apiUrl}/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (response.ok) {
        setResults(data || []);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    }
  };

  return (
    <PageContainer title="Search Engine" sx={{ paddingTop: 0 }}>
      <Breadcrumb title="Search Engine" items={BCrumb}>
        <Box>
          <img src={breadcrumbImg} alt="Ultrasound" width="120px" className="image" />
        </Box>
      </Breadcrumb>
      <StyledContainer>
        <StyledPaper>
          <StyledTypography variant="h7" align="center">
            <h2>Semantic Search</h2>
          </StyledTypography>
          <div>
            <TextField
              type="text"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query..."
              fullWidth
            />
            <Button
              onClick={handleSearch}
              className="search-button"
              sx={{ mt: 2 }} // Adds a margin top of 2 spacing units (default is 8px * 2 = 16px)
            >
              Search
            </Button>
            {error && <p className="error-message">{error}</p>}
            <div className="results-container">
              {results.map((result, index) => (
                <StyledTypography variant="h7" align="center" key={index}>
                  <div className="result-item">
                    <h3>{result.pdf_name}</h3>
                    <p>
                      <strong>Page:</strong> {result.page_number}
                    </p>
                    <p>
                      <strong>Content:</strong> {result.content_snippet}...
                    </p>
                    <p>
                      <strong>Score:</strong> {result.score.toFixed(4)}
                    </p>
                  </div>
                </StyledTypography>
              ))}
            </div>
          </div>
        </StyledPaper>
      </StyledContainer>
    </PageContainer>
  );
}

export default Search;
