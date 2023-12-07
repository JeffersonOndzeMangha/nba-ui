import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CircularProgressWithLabel(
  props: CircularProgressProps & { label: string },
) {
  return (
    <Box sx={{ position: 'relative'}}>
      <CircularProgress variant="indeterminate" {...props} />
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{props.label}</Typography>
      </Box>
    </Box>
  );
}