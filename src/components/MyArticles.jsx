import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Box,
  Chip,
  Avatar,
  Grid
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import { useTheme } from '@mui/material/styles';

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const theme = useTheme();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${baseUrl}/my-articles`, {
          credentials: 'include'
        });
        
        if (!response.ok) throw new Error('Failed to fetch articles');
        
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const StyledCard = ({ article }) => (
    <Card
      component={Link}
      to={`/articles/${article.id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        '&:hover': {
          boxShadow: theme.shadows[4],
          backgroundColor: 'action.hover'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Chip
          label={article.tag}
          size="small"
          sx={{ 
            mb: 1, 
            textTransform: 'capitalize', 
            height: 24, 
            fontSize: '.75rem' 
          }}
        />
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem'}}>
          {article.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '0.875rem'
          }}
        >
          {article.preview_text}
        </Typography>
      </CardContent>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2, 
        gap: 1.5,
        borderTop: `1px solid ${theme.palette.divider}` 
      }}>
        <Avatar 
          src={article.user?.avatar} 
          sx={{ width: 32, height: 32 }} 
        />
        <Typography variant="caption" display="block" lineHeight={1.2}>
          {article.user?.username}
        </Typography>
        <Typography variant="caption" sx={{ ml: 'auto' }}>
          {new Date(article.created_at).toLocaleDateString()} • {article.minutes_to_read} min read
        </Typography>
      </Box>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 8 }} style={{ 
        marginTop: theme.mixins.toolbar.minHeight + 40,
        padding: theme.spacing(4)
      }}>
      <Typography variant="h3" gutterBottom >
        My Articles 
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item key={article.id} xs={12} sm={6} md={4}>
              <StyledCard article={article} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyArticles;