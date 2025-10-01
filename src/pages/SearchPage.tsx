import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';

import ResultsList from '../components/ResultsList';
import Filters from '../components/Filters';

// Definición de tipos
interface Profile {
  id: string;
  nombre_completo: string;
  // ... otros campos del perfil
}

interface SearchResult {
  score: number;
  profile: Profile;
}

const SearchPage: React.FC = () => {
  // Estados de la búsqueda y resultados
  const [allProfiles, setAllProfiles] = useState<SearchResult[]>([]); // Almacena todos los perfiles
  const [results, setResults] = useState<SearchResult[]>([]); // Almacena los perfiles mostrados (buscados/filtrados)
  const [isLoading, setIsLoading] = useState(true); // Inicia en true para la carga inicial
  const [isSearching, setIsSearching] = useState(false); // Para la carga de la búsqueda

  // Estados para los filtros
  const [facultades, setFacultades] = useState<string[]>([]);
  const [municipios, setMunicipios] = useState<string[]>([]);
  const [selectedFacultad, setSelectedFacultad] = useState('');
  const [selectedMunicipio, setSelectedMunicipio] = useState('');

  // Cargar datos iniciales (perfiles y filtros)
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [facultadesRes, municipiosRes, profilesRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/facultades`),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/municipios`),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/profiles`),
        ]);
        setFacultades(await facultadesRes.json());
        setMunicipios(await municipiosRes.json());
        const profilesData = await profilesRes.json();
        // Mapear perfiles a la estructura de SearchResult con score por defecto
        const initialResults = profilesData.map((profile: Profile) => ({ profile, score: 1.0 }));
        setAllProfiles(initialResults);
        setResults(initialResults);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Función de búsqueda
  const handleSearch = async (query: string) => {
    // Si la búsqueda está vacía, mostramos todos los perfiles filtrados
    if (!query.trim()) {
      let filteredProfiles = allProfiles;
      if (selectedFacultad) {
        filteredProfiles = filteredProfiles.filter(r => r.profile['¿para_que_facultad_y_programa_desea_postularse_como_docente_catedrático_de_la_universidad_de_caldas?'] === selectedFacultad);
      }
      if (selectedMunicipio) {
        filteredProfiles = filteredProfiles.filter(r => r.profile['municipio_de_residencia'] === selectedMunicipio);
      }
      setResults(filteredProfiles);
      return;
    }

    setIsSearching(true);
    const params = new URLSearchParams({ q: query, limit: '50' });
    if (selectedFacultad) params.append('facultad', selectedFacultad);
    if (selectedMunicipio) params.append('municipio', selectedMunicipio);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/search?${params.toString()}`);
      if (!response.ok) throw new Error('Error en la búsqueda');
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error al buscar:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Explorador de Perfiles
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Filtros y Búsqueda</Typography>
        <Filters 
          facultades={facultades}
          municipios={municipios}
          selectedFacultad={selectedFacultad}
          selectedMunicipio={selectedMunicipio}
          onFacultadChange={setSelectedFacultad}
          onMunicipioChange={setSelectedMunicipio}
          onSearch={handleSearch}
          isSearching={isSearching}
        />
      </Paper>
      
      <Typography variant="h5" component="h2" gutterBottom>
        Resultados
      </Typography>
      {isLoading ? <CircularProgress /> : <ResultsList results={results} isLoading={isSearching} />}
    </Box>
  );
};

export default SearchPage;
