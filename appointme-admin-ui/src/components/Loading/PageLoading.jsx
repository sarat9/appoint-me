import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function PageLoading() {
  return (
    <div style={{position: 'absolute', top: '50%', left: '50%'}}>
      <CircularProgress size={70} />
    </div>
  );
}