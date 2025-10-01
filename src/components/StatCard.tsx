import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
}

// Versión de diagnóstico con estilos simplificados
const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card style={{ border: '2px solid red' }}>
      <CardContent style={{ backgroundColor: '#e0f7fa' }}> {/* Celeste claro para prueba */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ color: 'primary.main' }}>
            {React.cloneElement(icon, { style: { fontSize: 40 } })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
