import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Box,
  Card,
  Alert
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MapIcon from '@mui/icons-material/Map';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import StatCard from '../components/StatCard';
import SkillsWordCloud from '../components/charts/SkillsWordCloud';
import ExperienceBarChart from '../components/charts/ExperienceBarChart';
import DashboardSkeleton from '../components/DashboardSkeleton';
import FacultyDonutChart from '../components/charts/FacultyDonutChart'; // Re-usamos este componente

interface StatsData {
  total_profiles?: number;
  profiles_by_location?: { [key: string]: number };
  profiles_by_municipio?: { [key: string]: number };
  profiles_by_availability?: { [key: string]: number };
  profiles_by_prior_experience?: { [key: string]: number };
  top_skills?: { [key: string]: number };
  experience_distribution?: { [key: string]: number };
}

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        await new Promise(res => setTimeout(res, 800));
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/statistics`);
        if (!response.ok) {
          throw new Error('Error al cargar las estadísticas');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error || !stats) {
    return <Alert severity="error">Error: {error || 'No se pudieron cargar los datos'}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard de Estadísticas
      </Typography>
      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Total de Perfiles" value={stats.total_profiles || 0} icon={<PeopleIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Lugares de Enseñanza" value={Object.keys(stats.profiles_by_location || {}).length} icon={<MapIcon />} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <StatCard title="Municipios de Origen" value={Object.keys(stats.profiles_by_municipio || {}).length} icon={<LocationCityIcon />} />
        </Grid>

        {/* Charts en Cards */}
        <Grid item xs={12}>
          <Card>
            {stats.experience_distribution && <ExperienceBarChart data={stats.experience_distribution} title="Distribución por Años de Experiencia" />}
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card>
            {stats.top_skills && <SkillsWordCloud data={stats.top_skills} title="Top 10 Skills más Comunes" />}
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card>
            {stats.profiles_by_location && <ExperienceBarChart data={stats.profiles_by_location} title="Disponibilidad por Municipio (Top 20)" />}
          </Card>
        </Grid>

        {/* Nuevos Gráficos de Dona */}
        <Grid item xs={12} md={6}>
          <Card>
            {stats.profiles_by_availability && <FacultyDonutChart data={stats.profiles_by_availability} title="Disponibilidad para Clases" />}
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            {stats.profiles_by_prior_experience && <FacultyDonutChart data={stats.profiles_by_prior_experience} title="Experiencia Docente Previa" />}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
