import * as React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Divider, 
  IconButton, 
  InputLabel, 
  Link, 
  Stack, 
  TextField, 
  Typography 
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="/">
        Articulate
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <>
      <Divider sx={{ marginTop: 5,}}/>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 6, sm: 8 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
            gap: 4
          }}
        >
          {/* Newsletter Section */}
          <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
            <Typography variant="h6" gutterBottom>
              Articulate Blog
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Stay updated with the latest articles and insights
            </Typography>
            <InputLabel htmlFor="email-newsletter" sx={{ mb: 1 }}>
              Email Newsletter
            </InputLabel>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="email-newsletter"
                size="small"
                variant="outlined"
                fullWidth
                placeholder="Your email address"
                sx={{ flexGrow: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ flexShrink: 0 }}
              >
                Subscribe
              </Button>
            </Stack>
          </Box>

          {/* Links Sections */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 6
            }}
          >
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                Categories
              </Typography>
              <Link color="text.secondary" variant="body2" href="#">
                Engineering
              </Link>
              <Link color="text.secondary" variant="body2" href="#">
                Product
              </Link>
              <Link color="text.secondary" variant="body2" href="#">
                Design
              </Link>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                Company
              </Typography>
              <Link color="text.secondary" variant="body2" href="#">
                About
              </Link>
              <Link color="text.secondary" variant="body2" href="#">
                Contact
              </Link>
              <Link color="text.secondary" variant="body2" href="#">
                Contributors
              </Link>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                Legal
              </Typography>
              <Link color="text.secondary" variant="body2" href="#">
                Privacy
              </Link>
              <Link color="text.secondary" variant="body2" href="#">
                Terms
              </Link>
              <Link color="text.secondary" variant="body2" href="#">
                License
              </Link>
            </Stack>
          </Box>
        </Box>

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            pt: { xs: 4, sm: 6 },
            borderTop: '1px solid',
            borderColor: 'divider',
            gap: 2
          }}
        >
          <Box>
            <Link color="text.secondary" variant="body2" href="/privacy">
              Privacy Policy
            </Link>
            <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
              •
            </Typography>
            <Link color="text.secondary" variant="body2" href="/terms">
              Terms of Service
            </Link>
            <Copyright />
          </Box>

          {/* Social Links */}
          <Stack direction="row" spacing={1}>
            <IconButton
              color="inherit"
              size="small"
              href="https://github.com/joelnyongesa"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://twitter.com/jknyongesa"
              aria-label="X"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://linkedin.com/in/jknyongesa"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </>
  );
}