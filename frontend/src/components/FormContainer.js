import { Grid, Container, Box } from "@mui/material";
import { styled } from '@mui/material/styles';

const TechFormContainer = styled(Box)(({ theme }) => ({
  padding: '25px',
  backgroundColor: 'rgba(12, 12, 20, 0.85)',
  borderRadius: '8px',
  boxShadow: '0 0 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 183, 255, 0.3)',
  border: '1px solid rgba(0, 183, 255, 0.4)',
  position: 'relative',
  overflow: 'hidden',
  backdropFilter: 'blur(10px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '3px',
    background: 'linear-gradient(90deg, transparent, #00b7ff, transparent)',
    animation: 'glow 2s linear infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(0, 183, 255, 0.05) 25%, transparent 25%, transparent 50%, rgba(0, 183, 255, 0.05) 50%, rgba(0, 183, 255, 0.05) 75%, transparent 75%, transparent)',
    backgroundSize: '20px 20px',
    opacity: 0.1,
    zIndex: -1,
  },
  '@keyframes glow': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },
}));

function FormContainer({ children }) {
  return (
    <Container>
      <Grid container justifyContent="center" sx={{ py: 3 }}>
        <Grid item xs={12} md={6}>
          <TechFormContainer className="circuit-border">
            {children}
          </TechFormContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FormContainer;
