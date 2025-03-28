import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const StyledAlert = styled(MuiAlert)(({ theme, variant }) => {
  let bgColor = '#1e1e1e';
  let textColor = '#f5f5f5';
  let borderColor = '#00b7ff';
  let borderStyle = '1px solid';
  
  if (variant === 'success') {
    borderColor = '#00e676';
    textColor = '#00e676';
  } else if (variant === 'error' || variant === 'danger') {
    borderColor = '#ff1744';
    textColor = '#ff1744';
  } else if (variant === 'warning') {
    borderColor = '#ffab00';
    textColor = '#ffab00';
  } else if (variant === 'info') {
    borderColor = '#00b7ff';
    textColor = '#00b7ff';
  }
  
  return {
    backgroundColor: bgColor,
    color: textColor,
    borderLeft: `4px solid ${borderColor}`,
    border: `${borderStyle} rgba(255, 255, 255, 0.1)`,
    borderRadius: '4px',
    boxShadow: `0 0 10px rgba(0, 0, 0, 0.2), 0 0 5px ${borderColor}40`,
    padding: '10px 16px',
    margin: '10px 0',
    '& .MuiAlert-icon': {
      color: textColor,
    },
    '& .MuiAlert-message': {
      padding: '8px 0',
    },
    '.MuiAlert-action': {
      color: textColor,
    },
    transition: 'all 0.3s ease',
    animation: 'fadeIn 0.5s ease-in-out',
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
        transform: 'translateY(-10px)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  };
});

export default function Message({ variant, children }) {
  return (
    <StyledAlert variant={variant} severity={variant}>
      {children}
    </StyledAlert>
  );
}
