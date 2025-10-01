import React from 'react';
import { Grid, Skeleton, Box } from '@mui/material';

const DashboardSkeleton: React.FC = () => {
  return (
    <Box>
      <Skeleton variant="text" width={400} height={60} sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {/* Stat Cards Skeletons */}
        {[...Array(3)].map((_, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
        ))}

        {/* Charts Skeletons */}
        <Grid item xs={12} md={7}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardSkeleton;
