import React, { useState } from 'react';
import { Container, Box, CssBaseline, ThemeProvider, createTheme, IconButton } from '@mui/material';
import { CloudQueue, Brightness7, Brightness4 } from '@mui/icons-material';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { weatherApi } from './services/weatherApi';
import { useTheme } from '@mui/material/styles';

const queryClient = new QueryClient();

function WeatherApp({ mode, setMode }: { mode: 'light' | 'dark'; setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>> }) {
  const theme = useTheme();
  const [location, setLocation] = useState('London');

  const { data } = useQuery(
    ['weather', location],
    () => weatherApi.getCurrentWeather(location),
    {
      refetchOnWindowFocus: false,
      enabled: !!location,
    }
  );

  return (
    <Box sx={{
      minHeight: '100vh',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(120deg, #232526 0%, #414345 100%)'
        : 'linear-gradient(120deg, #e0e0e0 0%, #f5f5f5 100%)',
      position: 'relative',
      py: 6,
      overflow: 'hidden',
    }}>
      {/* Playful theme toggle */}
      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
        <IconButton
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          sx={{
            bgcolor: mode === 'dark' ? 'grey.800' : 'yellow.700',
            color: mode === 'dark' ? 'yellow.500' : 'grey.900',
            '&:hover': {
              transform: 'rotate(30deg)',
              bgcolor: mode === 'dark' ? 'grey.700' : 'yellow.600',
            },
            transition: 'transform 0.3s ease',
            boxShadow: 3,
            width: 48,
            height: 48,
          }}
        >
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      {/* Animated gradient background overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          background: 'radial-gradient(circle at 20% 30%, #6dd5ed55 0%, transparent 60%), radial-gradient(circle at 80% 80%, #2193b055 0%, transparent 60%)',
          pointerEvents: 'none',
          animation: 'moveBg 16s linear infinite alternate',
        }}
      />
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 5, mt: 2, textAlign: 'center' }}>
          <CloudQueue
            sx={{
              fontSize: { xs: 60, md: 80 },
              mb: 1,
              color: theme.palette.mode === 'dark' ? '#00c6fb' : theme.palette.primary.main,
            }}
            aria-label="Weather Logo"
          />
          <Box component="h1" sx={{
            fontWeight: 700,
            fontSize: { xs: '2.2rem', md: '2.8rem' },
            letterSpacing: '0.05em',
            color: theme.palette.text.primary,
            mb: 0.5,
            fontFamily: 'Montserrat, Arial, sans-serif',
          }}>
            Weatherly
          </Box>
          <Box component="h2" sx={{
            fontWeight: 400,
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            color: theme.palette.text.secondary,
            mb: 2,
            letterSpacing: '0.01em',
            fontFamily: 'Montserrat, Arial, sans-serif',
          }}>
            Developed with 💗 by Saurabh
          </Box>
          <SearchBar onLocationSelect={setLocation} />
        </Box>
        {data && <WeatherDisplay data={data} />}
      </Container>
    </Box>
  );
}

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const theme = createTheme({ palette: { mode } });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WeatherApp mode={mode} setMode={setMode} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
