import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CVUploader: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
      setStatus('idle');
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setStatus('uploading');
    setMessage('');

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cv/upload-batch`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Error al subir los archivos.');
      }

      setStatus('success');
      setMessage(data.message || 'Lote procesado.');
      setFiles([]); // Limpiar los archivos después de subir
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Ocurrió un error desconocido.');
    }
  };

  return (
    <Box>
      <Box
        sx={{
          border: '2px dashed',
          borderColor: 'grey.400',
          borderRadius: 2,
          p: 2,
          textAlign: 'center',
        }}
      >
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<UploadFileIcon />}
        >
          Seleccionar Archivos
          <VisuallyHiddenInput type="file" onChange={handleFileChange} accept=".pdf,.docx" multiple />
        </Button>
        {files.length > 0 && (
          <List dense>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <DescriptionIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={file.name} primaryTypographyProps={{ variant: 'body2' }} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Button
        onClick={handleUpload}
        disabled={files.length === 0 || status === 'uploading'}
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        endIcon={status === 'uploading' ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {status === 'uploading' ? `Subiendo ${files.length} archivos...` : `Subir ${files.length} archivos`}
      </Button>

      {message && (
        <Alert severity={status === 'idle' ? 'info' : status} sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default CVUploader;
