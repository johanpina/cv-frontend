import React from 'react';
import WordCloud from 'react-d3-cloud';
import { CardContent, Typography, Box } from '@mui/material';
import { CHART_COLORS } from '../../theme/colors';
import { useTheme } from '@mui/material/styles';

interface WordCloudProps {
  data: { [key: string]: number };
  title: string;
}

const SkillsWordCloud: React.FC<WordCloudProps> = ({ data, title }) => {
  const theme = useTheme();
  const chartData = Object.entries(data).map(([text, value]) => ({ text, value }));

  // Usar una función de llenado para ciclar a través de nuestra paleta de colores
  const fillColor = (_: any, i: number) => CHART_COLORS[i % CHART_COLORS.length];

  return (
    <CardContent sx={{ height: 400 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Box sx={{ height: '90%', width: '100%' }}>
        <WordCloud
          data={chartData}
          width={500} // El componente necesita un ancho/alto inicial
          height={350}
          font={theme.typography.fontFamily}
          fontWeight="bold"
          fontSize={(word) => Math.log2(word.value) * 12} // Escala de fuente mejorada
          spiral="archimedean"
          rotate={() => 0} // Dejar todas las palabras horizontales para mejor legibilidad
          padding={5}
          fill={fillColor} // Aplicar nuestra paleta de colores
        />
      </Box>
    </CardContent>
  );
};

export default SkillsWordCloud;
