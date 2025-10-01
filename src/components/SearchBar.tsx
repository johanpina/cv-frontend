import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Buscar perfil..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ej: Experto en Deep Learning con Python..."
        disabled={isLoading}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={isLoading || !query.trim()}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
        sx={{ py: 1.5, px: 3 }}
      >
        {isLoading ? 'Buscando' : 'Buscar'}
      </Button>
    </Box>
  );
};

export default SearchBar;
