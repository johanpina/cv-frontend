import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CardContent, Typography, Paper } from '@mui/material';
import { CHART_COLORS } from '../../theme/colors';

interface ChartData {
  name: string;
  value: number;
}

interface DonutChartProps {
  data: { [key: string]: number };
  title: string;
}

// Tooltip personalizado para mostrar más detalles
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const total = payload[0].payload.total;
    const percentage = ((data.value / total) * 100).toFixed(2);
    return (
      <Paper elevation={3} sx={{ p: 1.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{`${data.name}`}</Typography>
        <Typography variant="body2">{`Perfiles: ${data.value} (${percentage}%)`}</Typography>
      </Paper>
    );
  }
  return null;
};

// Función para renderizar etiquetas personalizadas fuera del gráfico
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, name }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20; // Distancia de la etiqueta al borde del gráfico
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="#8884d8" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      style={{ fontSize: '12px' }}
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const FacultyDonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
  const chartData: ChartData[] = Object.entries(data).map(([name, value]) => ({ name, value }));
  const totalValue = chartData.reduce((acc, entry) => acc + entry.value, 0);

  // Añadir el total a cada elemento para el cálculo del porcentaje en el tooltip y label
  const chartDataWithTotal = chartData.map(d => ({ ...d, total: totalValue }));

  return (
    <CardContent sx={{ height: 400 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={chartDataWithTotal}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
            labelLine={false} // Ocultar la línea que conecta la etiqueta con el centro
            label={renderCustomizedLabel} // Usar la función de renderizado de etiquetas
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  );
};

export default FacultyDonutChart;
