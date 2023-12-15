import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * CircularProgressWithLabel is a React component that combines a circular progress indicator (spinner)
 * with a label to display progress information.
 *
 * @param {object} props - Props for the CircularProgressWithLabel component.
 * @param {string} props.label - The label text to be displayed.
 * @param {CircularProgressProps} props - Additional props for the CircularProgress component.
 * @returns {React.Element} A React element that renders the circular progress indicator with a label.
 *
 * @example
 * // Example usage of CircularProgressWithLabel:
 * <CircularProgressWithLabel label="Loading..." color="primary" size={50} />
 */
function CircularProgressWithLabel(props: CircularProgressProps & { label: string }) {
  return (
    <Box sx={{ position: 'relative' }}>
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
        >
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;
