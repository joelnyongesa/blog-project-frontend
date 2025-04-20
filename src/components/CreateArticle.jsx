import { useState } from 'react';
import { 
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  LinearProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTheme } from '@mui/material/styles';

const CreateArticle = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    tag: 'Engineering',
    preview_text: '',
    content: '',
    preview_image: '',
    minutes_to_read: 5
  });
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleImageUpload = async (file) => {
    setError('');
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await fetch(`${baseUrl}/upload-image`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Image upload failed');
      }
  
      const data = await response.json();
      setFormData(prev => ({ 
        ...prev, 
        preview_image: data.secure_url 
      }));
    } catch (err) {
      setError(err.message);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.preview_image) {
        throw new Error('Preview image is required');
      }

      const response = await fetch(`${baseUrl}/articles/create`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create article');
      }

      navigate(`/articles/${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        marginTop: theme.mixins.toolbar.minHeight,
        padding: theme.spacing(4),
        paddingTop: theme.spacing(2),
        minHeight: '100vh'
      }}
    >
      <Typography 
        variant="h3" 
        gutterBottom 
        sx={{ 
          fontWeight: 700, 
          mb: 4,
          color: 'text.primary'
        }}
      >
        Create New Article
      </Typography>

      <Card sx={{ 
        maxWidth: 800,
        mx: 'auto',
        mt: 0,
        p: { xs: 2, md: 4 },
        boxShadow: theme.shadows[2],
        borderRadius: 2
      }}>
        <Box component="form" onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <InputLabel>Tag</InputLabel>
            <Select
              name="tag"
              value={formData.tag}
              label="Tag"
              onChange={handleChange}
              required
              variant="outlined"
            >
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Product">Product</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Preview Text"
            name="preview_text"
            value={formData.preview_text}
            onChange={handleChange}
            required
            margin="normal"
            multiline
            minRows={3}
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Content (Markdown)"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            margin="normal"
            multiline
            minRows={10}
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <input
              type="file"
              id="preview-image-upload"
              accept="image/*"
              onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
              style={{ display: 'none' }}
            />
            <label htmlFor="preview-image-upload">
              <Button
                component="span"
                variant="outlined"
                color="primary"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Upload Preview Image
                {uploadProgress > 0 && ` (${uploadProgress}%)`}
              </Button>
            </label>
            {uploadProgress > 0 && (
              <LinearProgress 
                variant="determinate" 
                value={uploadProgress} 
                sx={{ mt: 1 }}
              />
            )}
            {formData.preview_image && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <img 
                  src={formData.preview_image} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: 200, 
                    borderRadius: theme.shape.borderRadius,
                    objectFit: 'cover'
                  }} 
                />
              </Box>
            )}
          </FormControl>

          <TextField
            fullWidth
            label="Minutes to Read"
            name="minutes_to_read"
            type="number"
            value={formData.minutes_to_read}
            onChange={handleChange}
            required
            margin="normal"
            inputProps={{ min: 1 }}
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ 
              mt: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem'
            }}
            disabled={loading || uploadProgress > 0}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Publish Article'}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default CreateArticle;