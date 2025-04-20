import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormControl
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useTheme } from '@mui/material/styles';

function Home() {
  const [articles, setArticles] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    fetch("/api/articles")
      .then((r) => r.json())
      .then(setArticles)
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
      <CardMedia
        component="img"
        alt={article.title}
        image={article.preview_image}
        sx={{
          aspectRatio: '16 / 9',
          objectFit: 'cover'
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Chip
          label={article.tag}
          size="small"
          sx={{ mb: 1, textTransform: 'capitalize', height: 24, fontSize: '.75rem' }}
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
          src={article.user.avatar} 
          sx={{ width: 32, height: 32, }} 
        />
        <Typography variant="caption" display="block" lineHeight={1.2}>
          {article.user.username}
        </Typography>
        <Typography variant="caption" sx={{ ml: 'auto' }}>
          {new Date(article.date).toLocaleDateString()} • {article.minutes_to_read} min read
        </Typography>
      </Box>
    </Card>
  );

  return (
    <div style={{ 
      marginTop: theme.mixins.toolbar.minHeight + 40,
      padding: theme.spacing(4)
    }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Articulate Blog
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Stay updated with the latest articles from our community
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        mb: { xs: 3, md: 4 },
        alignItems: { md: 'center' }
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: 1,
          flexGrow: 1,
          order: { xs: 2, md: 1 }
        }}>
          <Chip label="All" clickable variant="filled" size="small" />
          {['Engineering', 'Product', 'Design'].map((tag) => (
            <Chip
              key={tag}
              label={tag}
              clickable
              variant="outlined"
              size="small"
            />
          ))}
        </Box>
        
        {/* Desktop Search */}
        <FormControl sx={{ 
          width: { md: 240 },
          order: { xs: 1, md: 2 },
          display: { xs: 'none', md: 'flex' }
        }}>
          <OutlinedInput
            size="small"
            placeholder="Search articles..."
            startAdornment={
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            }
            sx={{
              '& .MuiOutlinedInput-input': {
                py: 1,
              }
            }}
          />
        </FormControl>

        {/* Mobile Search Button */}
        <IconButton sx={{ 
          display: { md: 'none' }, 
          alignSelf: 'flex-start',
          order: 1
        }}>
          <SearchRoundedIcon />
        </IconButton>
      </Box>

      <Grid container spacing={4}>
        {articles.map((article) => (
          <Grid key={article.id}>
            <StyledCard article={article} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;