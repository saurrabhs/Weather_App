import React, { useState, useEffect } from 'react';
import {
  TextField,
  Autocomplete,
  Paper,
  styled,
} from '@mui/material';
import { LocationSuggestion } from '../types/weather';
import { weatherApi } from '../services/weatherApi';

const StyledSearchBar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.25, 2.25),
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: 600,
  borderRadius: 20,
  background:
    theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.18)'
      : 'rgba(255,255,255,0.8)',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 8px 32px 0 rgba(31, 38, 135, 0.18)'
      : theme.shadows[1],
  backdropFilter: 'blur(12px)',
  border:
    theme.palette.mode === 'dark'
      ? '1px solid rgba(255,255,255,0.18)'
      : `1px solid ${theme.palette.divider}`,
  transition: 'box-shadow 0.2s, border 0.2s',
  '&:hover, &:focus-within': {
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 12px 32px 0 rgba(0,198,251,0.15)'
        : theme.shadows[4],
    border:
      theme.palette.mode === 'dark'
        ? '1.5px solid #00c6fb'
        : `1px solid ${theme.palette.primary.main}`,
  },
  '& .MuiInputBase-root': {
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: '1.1rem',
    letterSpacing: '0.01em',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiAutocomplete-paper': {
    background:
      theme.palette.mode === 'dark'
        ? 'rgba(36, 198, 220, 0.13)'
        : 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(10px)',
    color: theme.palette.text.primary,
    borderRadius: 16,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 4px 24px 0 rgba(36,198,220,0.13)'
        : theme.shadows[2],
  },
}));

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        const data = await weatherApi.getLocationSuggestions(query);
        setSuggestions(data);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <StyledSearchBar elevation={3}>
      <Autocomplete
        fullWidth
        freeSolo
        options={suggestions}
        getOptionLabel={(option) => 
          typeof option === 'string' 
            ? option 
            : `${option.name}, ${option.region}, ${option.country}`
        }
        onInputChange={(_, newValue) => setQuery(newValue)}
        onChange={(_, value) => {
          if (value) {
            const location = typeof value === 'string' 
              ? value 
              : `${value.name}`;
            onLocationSelect(location);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for a city..."
            variant="outlined"
            fullWidth
          />
        )}
      />
    </StyledSearchBar>
  );
};
