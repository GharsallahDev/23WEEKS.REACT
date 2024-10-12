import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Container, Paper, List, ListItem, ListItemText,Card, Grid, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb'; 
import breadcrumbImg from 'src/assets/images/breadcrumb/fetus.png';
import config from 'src/config';
import PageContainer from '../../components/container/PageContainer';

import axios from 'axios';

const BCrumb = [
  {
    to: '/',
    title: 'Disease Search',
  },
  {
    title: 'Find Informations Here',
  },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: 800,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
}));

const OmimSearch = () => {
  const [disease, setDisease] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchOmim = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${config.apiUrl}/api/search_omim`, { params: { disease } });
      setResults(response.data.results);
    } catch (error) {
      setError('Disease Not Found.');
      console.error('Error fetching data from OMIM:', error);
    } finally {
      setLoading(false);
    }
  };
  const InformationCard = styled(Card)({
    marginTop: 24,
    backgroundColor: 'primary.light',
  });
  return (
    <PageContainer title="Disease Search">
      <Breadcrumb title="Disease Search" items={BCrumb}>
        <Box sx={{ marginTop: '10px' }}>
          <img src={breadcrumbImg} alt="OMIM Disease Search" width="155px" />
        </Box>
      </Breadcrumb>
      <Grid item xs={12}>
  <InformationCard>
    <CardContent>
      <Typography sx={{ color: '#dd1367' }} variant="h6" gutterBottom>
        Disease Search and Information Retrieval
      </Typography>
      <Typography variant="body1" paragraph>
        The disease search feature allows doctors to quickly look up specific conditions by typing the disease name. The system then provides relevant links to medical resources and research, helping healthcare professionals stay informed about the latest findings and treatment options, ultimately enhancing patient care and clinical decision-making.
      </Typography>
    </CardContent>
  </InformationCard>
</Grid>

      <StyledContainer>
        <StyledPaper>
          <Typography variant="h5" align="center" gutterBottom>
            Disease Search
          </Typography>
          <TextField
            label="Disease"
            variant="outlined"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={searchOmim}
            disabled={loading}
            fullWidth
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
          {error && <Typography color="error" align="center" style={{ marginTop: '20px' }}>{error}</Typography>}
          {results.length > 0 ? (
            <List>
              {results.map((result) => (
                <ListItem key={result.mim_number} component={Paper} style={{ marginBottom: '10px' }}>
                  <ListItemText
                    primary={
                      <Typography variant="h6">
                        <a href={`https://omim.org/entry/${result.mim_number}`} target="_blank" rel="noopener noreferrer">
                          {result.title}
                        </a>
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2">
                          <strong>MIM Number:</strong> {result.mim_number}
                        </Typography>
                        <Typography variant="body2">
                          <strong>References:</strong> {result.references}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Gene Map:</strong> {result.geneMap}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Phenotype Map:</strong> {result.phenotypeMap}
                        </Typography>
                        <Typography variant="body2">
                          <strong>MIM Type:</strong> {result.mim_type}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Entrez Gene ID:</strong> {result.entrez_gene_id}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Ensembl Gene ID:</strong> {result.ensembl_gene_id}
                        </Typography>
                        <Typography variant="body2">
                          <strong>HGNC Gene Symbol:</strong> {result.hgnc_gene_symbol}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Generated:</strong> {new Date(result.generated).toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" align="center" style={{ marginTop: '20px' }}></Typography>
          )}
        </StyledPaper>
      </StyledContainer>
    </PageContainer>
  );
};

export default OmimSearch;
