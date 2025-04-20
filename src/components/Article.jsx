import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container,
  Typography,
  Avatar,
  Chip,
  Divider,
  styled,
  useTheme,
  Box
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ReactMarkdown from 'react-markdown';
import Paywall from './Paywall';

const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const BackLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(4),
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary,
  }
}));

const MarkdownWrapper = styled('div')(({ theme }) => ({
    '& h1, & h2, & h3': {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(2),
    },
    '& p': {
      lineHeight: 1.6,
      marginBottom: theme.spacing(2),
    },
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& code': {
      backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
      padding: '2px 4px',
      borderRadius: 4,
    },
    '& pre': {
      backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f8f8f8',
      padding: theme.spacing(2),
      borderRadius: 4,
      overflowX: 'auto',
      margin: `${theme.spacing(2)} 0`,
    },
    '& img': {
      maxWidth: '100%',
      height: 'auto',
      margin: `${theme.spacing(2)} 0`,
    },
  }));
  

function Article() {
  const [{ article, error, status }, setState] = useState({
    article: null,
    error: null,
    status: "pending",
  });
  const { id } = useParams();
  const theme = useTheme();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    setState({ article: null, error: null, status: "pending" });
    fetch(`${baseUrl}/articles/${id}`)
      .then(r => {
        if (r.ok) return r.json().then(data => ({ data, error: null }));
        return r.json().then(error => ({ data: null, error }));
      })
      .then(({ data, error }) => {
        setState({ 
          article: data, 
          error: error?.error || null, 
          status: data ? "resolved" : "rejected" 
        });
      });
  }, [id]);

  if (status === "pending") return <MainContainer>Loading...</MainContainer>;
  if (status === "rejected") {
    return error === "Maximum pageview limit reached" ? (
      <Paywall />
    ) : (
      <MainContainer>
        <Typography variant="h4" color="error">{error}</Typography>
      </MainContainer>
    );
  }

  const { title, author, date, content, minutes_to_read, tag } = article;

  return (
    <MainContainer maxWidth="md">
      <BackLink to="/">
        <ArrowBackRoundedIcon fontSize="small" />
        <Typography variant="body2">Back to blog</Typography>
      </BackLink>

      <Typography 
        variant="caption" 
        component="time" 
        display="block" 
        gutterBottom
        sx={{ color: 'text.secondary' }}
      >
        {new Date(date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </Typography>

      <Typography variant="h1" gutterBottom sx={{ fontSize: '2.5rem', fontWeight: 700 }}>
        {title}
      </Typography>

      <Chip 
        label={tag} 
        size="small" 
        sx={{ 
          mb: 4,
          textTransform: 'capitalize',
          fontSize: '0.75rem',
          height: 24,
          bgcolor: 'action.selected'
        }}
      />

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        mb: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        py: 2
      }}>
        <Avatar 
          src={article.user?.avatar} 
          sx={{ width: 48, height: 48 }}
        />
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {author}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {minutes_to_read} min read
          </Typography>
        </Box>
      </Box>

        <MarkdownWrapper>
            <ReactMarkdown>{content}</ReactMarkdown>
        </MarkdownWrapper>


      <Divider sx={{ my: 8 }} />

      <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="caption" color="text.secondary" sx={{ marginBottom: "2rem"}}>
          Originally published on {new Date(date).toLocaleDateString()}
        </Typography>
        <BackLink to="/">
          <ArrowBackRoundedIcon fontSize="small" />
          <Typography variant="body2">Back to blog</Typography>
        </BackLink>
      </Box>
    </MainContainer>
  );
}

export default Article;