import React from 'react';
import ResultCard from './ResultCard';
import { Box, CircularProgress, Typography } from '@mui/material';

// Reutilizamos la definición de tipo del perfil
interface Profile {
  id: string;
  nombre_completo: string;
  profesion: string;
  nivel_academico_maximo: string;
  años_de_experiencia: number;
  lista_de_skills: string[];
  resumen_profesional: string;
  cv_path: string;
}

interface SearchResult {
  score: number;
  profile: Profile;
}

interface ResultsListProps {
  results: SearchResult[];
  isLoading: boolean;
}

const ResultsList: React.FC<ResultsListProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Buscando perfiles...</Typography>
      </Box>
    );
  }

  if (results.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">No se encontraron resultados. Intenta con otra búsqueda.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {results.map((result) => (
        <ResultCard key={result.profile.id} result={result} />
      ))}
    </Box>
  );
};

export default ResultsList;
