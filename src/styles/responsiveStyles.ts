import { makeStyles } from '@mui/styles';

const useResponsiveStyles = makeStyles({
  root: {
    // Example media query for devices with width less than 600px
    '@media (max-width:600px)': {
      padding: '8px',
    },
    // Additional responsive styles can be added here
  },
  // Define other responsive styles as needed
});

export default useResponsiveStyles;