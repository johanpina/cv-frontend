// @ts-nocheck
import React from 'react';
import { TextField, MenuItem, Grid, Box } from '@mui/material';
import SearchBar from './SearchBar'; // Importar SearchBar

interface FiltersProps {
  facultades: string[];
  municipios: string[];
  selectedFacultad: string;
  selectedMunicipio: string;
  onFacultadChange: (value: string) => void;
  onMunicipioChange: (value: string) => void;
  onSearch: (query: string) => void; // Añadir props para la búsqueda
  isSearching: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  facultades,
  municipios,
  selectedFacultad,
  selectedMunicipio,
  onFacultadChange,
  onMunicipioChange,
  onSearch,
  isSearching,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Filtro de Facultad */}
        <Grid xs={12} sm={6} md={6} sx={{ minWidth: 250, bgcolor: 'lightcoral' }}>
          <TextField
            select
            fullWidth
            label="Facultad"
            value={selectedFacultad}
            onChange={(e) => onFacultadChange(e.target.value)}
            variant="outlined"
          >
            <MenuItem value=""><em>Todas</em></MenuItem>
            {facultades.map((facultad) => (
              <MenuItem key={facultad} value={facultad}>{facultad}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Filtro de Municipio */}
        <Grid xs={12} sm={6} md={6} sx={{ minWidth: 250, bgcolor: 'lightcoral' }}>
          <TextField
            select
            fullWidth
            label="Municipio de Residencia"
            value={selectedMunicipio}
            onChange={(e) => onMunicipioChange(e.target.value)}
            variant="outlined"
          >
            <MenuItem value=""><em>Todos</em></MenuItem>
            {municipios.map((municipio) => (
              <MenuItem key={municipio} value={municipio}>{municipio}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Barra de Búsqueda */}
        <Grid xs={12} md={12}>
          <SearchBar onSearch={onSearch} isLoading={isSearching} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;
