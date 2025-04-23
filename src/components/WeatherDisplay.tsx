import React from 'react';
import { Box, Typography, Paper, styled } from '@mui/material';
import { WeatherData } from '../types/weather';
import {
  WbSunny,
  Opacity,
  Air,
  Thermostat,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 24,
  background:
    theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.22)'
      : theme.palette.background.paper,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 8px 32px 0 rgba(31, 38, 135, 0.18)'
      : theme.shadows[1],
  backdropFilter: theme.palette.mode === 'dark' ? 'blur(18px)' : undefined,
  color: theme.palette.text.primary,
  border:
    theme.palette.mode === 'dark'
      ? '1.5px solid rgba(255,255,255,0.22)'
      : `1px solid ${theme.palette.divider}`,
  transition: 'box-shadow 0.2s, border 0.2s, transform 0.15s',
  '&:hover': {
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 12px 32px 0 rgba(0,198,251,0.18)'
        : theme.shadows[4],
    border:
      theme.palette.mode === 'dark'
        ? '2px solid #00c6fb'
        : `1px solid ${theme.palette.primary.main}`,
    transform: 'scale(1.02)',
  },
}));

const WeatherIcon = styled('img')({
  width: 100,
  height: 100,
});

interface WeatherDisplayProps {
  data: WeatherData;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  const MotionPaper = motion(StyledPaper);

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      <Box>
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h4">{data.location.name}</Typography>
              <Typography variant="subtitle1">
                {data.location.region}, {data.location.country}
              </Typography>
              <Typography variant="h2" sx={{ mt: 2 }}>
                {Math.round(data.current.temp_c)}°C
              </Typography>
              <Typography variant="h6">{data.current.condition.text}</Typography>
            </Box>
            <WeatherIcon
              src={`https:${data.current.condition.icon}`}
              alt={data.current.condition.text}
            />
          </Box>
        </MotionPaper>
      </Box>

      <Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          {[
            {
              icon: <Thermostat />,
              label: 'Feels Like',
              value: `${Math.round(data.current.feelslike_c)}°C`,
            },
            {
              icon: <Opacity />,
              label: 'Humidity',
              value: `${data.current.humidity}%`,
            },
            {
              icon: <Air />,
              label: 'Wind',
              value: `${data.current.wind_kph} km/h ${data.current.wind_dir}`,
            },
            {
              icon: <WbSunny />,
              label: 'UV Index',
              value: data.current.uv.toString(),
            },
          ].map((item, index) => (
            <Box key={index}>
              <MotionPaper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  p={2}
                >
                  {item.icon}
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="h6">{item.value}</Typography>
                </Box>
              </MotionPaper>
            </Box>
          ))}
        </Box>
      </Box>

      {data.forecast && (
        <Box>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>7-Day Forecast</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 2 }}>
              {data.forecast.forecastday.map((day, index) => (
                <Box key={index}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="body2">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </Typography>
                    <img
                      src={`https:${day.day.condition.icon}`}
                      alt={day.day.condition.text}
                      style={{ width: 50, height: 50 }}
                    />
                    <Typography variant="body2">
                      {Math.round(day.day.maxtemp_c)}°/{Math.round(day.day.mintemp_c)}°
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </MotionPaper>
        </Box>
      )}
    </Box>
  );
};
