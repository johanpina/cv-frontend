// @ts-nocheck
import React from 'react';
import { Card, CardContent, Typography, Box, alpha } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
          </Box>
          <Box sx={{
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            borderRadius: '50%',
            width: 72,
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.main'
          }}>
            {React.cloneElement(icon, { sx: { fontSize: 'large' } })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
