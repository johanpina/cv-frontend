import React from 'react';
import { Paper, Typography } from '@mui/material';
import CVUploader from '../components/CVUploader';

const UploadPage: React.FC = () => {
  return (
    <Paper elevation={2} sx={{ p: 2, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cargar Hojas de Vida
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Selecciona uno o varios archivos en formato PDF o DOCX para subirlos al sistema. Los perfiles serán procesados y añadidos a la base de datos para que puedan ser encontrados en la búsqueda.
      </Typography>
      <CVUploader />
    </Paper>
  );
};

export default UploadPage;
