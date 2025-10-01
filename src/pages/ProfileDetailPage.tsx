import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Divider,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card, 
  CardContent
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

// Usamos un tipo 'any' por ahora para flexibilidad con los datos fusionados
type Profile = any;

// Lista de campos a excluir de la visualización genérica
const EXCLUDED_FIELDS = new Set([
  'id', 'cv_path', 'nombre_completo', 'profesion', 'resumen_profesional',
  'lista_de_skills', 'publicaciones_relevantes', 'materias_impartidas',
  // Estos campos ya se muestran en secciones específicas
  '¿para_que_facultad_y_programa_desea_postularse_como_docente_catedrático_de_la_universidad_de_caldas?',
  '¿cuál_es_su_disponibilidad_para_dictar_clases?',
  'señala_los_municipios_donde_puedes_ofrecer__actividades_académicas',
  '¿ha_tenido_experiencia_previa_como_docente_universitario?',
  'en_caso_afirmativo,_indique_en_qué_instituciones,_en_qué_programas_y_cuántos_semestres'
]);

const ProfileDetailPage: React.FC = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [otherFields, setOtherFields] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profile/${profileId}`);
        if (!response.ok) {
          throw new Error('Perfil no encontrado');
        }
        const data = await response.json();
        setProfile(data);

        // Filtrar campos adicionales para mostrar dinámicamente
        const additionalFields: Record<string, any> = {};
        for (const key in data) {
          if (!EXCLUDED_FIELDS.has(key) && data[key]) {
            additionalFields[key] = data[key];
          }
        }
        setOtherFields(additionalFields);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido');
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error || !profile) {
    return <Typography color="error" align="center">Error: {error || 'No se pudo cargar el perfil'}</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom color="primary">
        {profile.nombre_completo}
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        {profile.profesion}
      </Typography>
      <Divider sx={{ my: 2 }} />

      {/* Postulación y Disponibilidad */}
      <Box sx={{ my: 3 }}>
        <Typography variant="h6" gutterBottom>Postulación y Disponibilidad</Typography>
        <List dense>
          <ListItem>
            <ListItemText 
              primary={profile['¿para_que_facultad_y_programa_desea_postularse_como_docente_catedrático_de_la_universidad_de_caldas?']}
              secondary="Facultad y Programa de Interés"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={profile['¿cuál_es_su_disponibilidad_para_dictar_clases?']}
              secondary="Disponibilidad para Clases"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={profile['señala_los_municipios_donde_puedes_ofrecer__actividades_académicas']}
              secondary="Otros Municipios para Actividades"
            />
          </ListItem>
        </List>
      </Box>

      {/* Experiencia Docente */}
      {profile['¿ha_tenido_experiencia_previa_como_docente_universitario?'] === 'Sí' && (
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>Experiencia Docente Previa</Typography>
          <Typography variant="body1" paragraph>
            {profile['en_caso_afirmativo,_indique_en_qué_instituciones,_en_qué_programas_y_cuántos_semestres']}
          </Typography>
        </Box>
      )}

      <Box sx={{ my: 3 }}>
        <Typography variant="h6" gutterBottom>Resumen Profesional</Typography>
        <Typography variant="body1" paragraph>{profile.resumen_profesional}</Typography>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h6" gutterBottom>Skills</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {profile.lista_de_skills?.map((skill: string) => <Chip key={skill} label={skill} color="secondary" />)}
        </Box>
      </Box>

      {profile.publicaciones_relevantes?.length > 0 && (
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>Publicaciones Relevantes</Typography>
          <List>{profile.publicaciones_relevantes.map((pub: string) => <ListItem key={pub}><ListItemText primary={`• ${pub}`} /></ListItem>)}</List>
        </Box>
      )}

      {profile.materias_impartidas?.length > 0 && (
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>Materias Impartidas</Typography>
          <List>{profile.materias_impartidas.map((mat: string) => <ListItem key={mat}><ListItemText primary={`• ${mat}`} /></ListItem>)}</List>
        </Box>
      )}

      {/* Sección para otros campos del CSV */}
      {Object.keys(otherFields).length > 0 && (
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>Información Adicional</Typography>
          <Card variant="outlined">
            <CardContent>
              <List dense>
                {Object.entries(otherFields).map(([key, value]) => (
                  <ListItem key={key}>
                    <ListItemText 
                      primary={value}
                      secondary={key.replace(/_/g, ' ').replace(/¿|\?/g, '').trim() // Limpiar el nombre de la clave
                        .replace(/^\w/, c => c.toUpperCase())}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      )}
    </Paper>
  );
};

export default ProfileDetailPage;
