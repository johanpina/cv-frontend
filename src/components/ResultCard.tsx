import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  Grid,
} from '@mui/material';

// Extender la interfaz para incluir los nuevos campos
interface Profile {
  id: string;
  nombre_completo: string;
  profesion?: string;
  cv_path: string;
  municipio_de_residencia?: string;
  departamento_de_residencia?: string;
  correo_electronico?: string;
  número_celular?: string;
  materias_impartidas?: string[];
}

interface ResultCardProps {
  result: {
    score: number;
    profile: Profile;
  };
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { score, profile } = result;
  const relevancePercentage = score * 100;
  // El enlace de descarga ahora apunta al nuevo endpoint del backend
  const cvUrl = `${import.meta.env.VITE_API_BASE_URL}/profile/${profile.id}/cv`;

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6" component="h3" color="primary">
              {profile.nombre_completo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Título:</strong> {profile.profesion || 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Ubicación:</strong> {profile.municipio_de_residencia || 'N/A'}, {profile.departamento_de_residencia || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'right' }}>
            <Typography variant="h5" color="success.main" sx={{ fontWeight: 'bold' }}>
              {relevancePercentage.toFixed(1)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">Relevancia</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 1.5 }} />
        <Box>
            <Typography variant="body2" color="text.secondary"><strong>Email:</strong> {profile.correo_electronico || 'N/A'}</Typography>
            <Typography variant="body2" color="text.secondary"><strong>Celular:</strong> {profile.número_celular || 'N/A'}</Typography>
        </Box>
        {/* Mostrar materias impartidas si existen */}
        {profile.materias_impartidas && profile.materias_impartidas.length > 0 && (
          <Box sx={{ mt: 1.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              Materias que orienta:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
              {profile.materias_impartidas.map((materia) => (
                <Chip key={materia} label={materia} size="small" />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" component={RouterLink} to={`/profile/${profile.id}`}>
          Ver Detalles
        </Button>
        <Button 
          size="small" 
          variant="contained" 
          href={cvUrl} 
          disabled={!profile.cv_path}
        >
          Descargar CV
        </Button>
      </CardActions>
    </Card>
  );
};

export default ResultCard;