import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CardContent, Typography, Paper } from '@mui/material';
import { PRIMARY_COLOR } from '../../theme/colors';

interface ChartData {
  name: string;
  value: number;
}

interface BarChartProps {
  data: { [key: string]: number };
  title: string;
}

// Tooltip personalizado
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Paper elevation={3} sx={{ p: 1.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{label}</Typography>
        <Typography variant="body2">{`Nº de Perfiles: ${payload[0].value}`}</Typography>
      </Paper>
    );
  }
  return null;
};

const ExperienceBarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const chartData: ChartData[] = Object.entries(data).map(([name, value]) => ({ name, value }));

  return (
    <CardContent sx={{ height: 400 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
          <Legend wrapperStyle={{ fontSize: '14px' }} />
          <Bar dataKey="value" name="Perfiles" fill={PRIMARY_COLOR} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  );
};

export default ExperienceBarChart;
