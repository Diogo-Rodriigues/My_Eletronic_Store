import React from "react";
import { Container, Typography, Box, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LinkedIn, GitHub, Language } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2, 0),
    marginTop: "auto",
    backgroundColor: "#000000",
    borderTop: "1px solid rgba(0, 183, 255, 0.3)",
    position: "relative",
    overflow: "hidden",
  },
  circuitLines: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `
      radial-gradient(circle at 25px 25px, rgba(0, 183, 255, 0.2) 2px, transparent 2px),
      radial-gradient(circle at 75px 75px, rgba(0, 230, 118, 0.2) 2px, transparent 2px)
    `,
    backgroundSize: "100px 100px",
    pointerEvents: "none",
    opacity: 0.3,
  },
  copyright: {
    color: "#f5f5f5",
    opacity: 0.7,
    marginTop: theme.spacing(1),
    fontFamily: "'Roboto', sans-serif",
    fontSize: "0.9rem",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(1),
  },
  socialIcon: {
    color: "#f5f5f5",
    margin: theme.spacing(0, 1.5),
    transition: "all 0.3s ease",
    fontSize: "1.5rem",
    "&:hover": {
      color: "#00e676",
      transform: "translateY(-3px)",
    },
  },
  footerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1, 0),
  },
  iconBox: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: "50%",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(0, 183, 255, 0.2)",
    boxShadow: "0 0 8px rgba(0, 183, 255, 0.2)",
    "&:hover": {
      boxShadow: "0 0 12px rgba(0, 230, 118, 0.4)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  },
}));

function Footer() {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <div className={classes.circuitLines}></div>
      <Container>
        <Box className={classes.footerContent}>
          <Box className={classes.iconContainer}>
            <Link href="https://github.com/Diogo-Rodriigues" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={classes.socialIcon}>
              <Box className={classes.iconBox}>
                <GitHub fontSize="inherit" />
              </Box>
            </Link>
            <Link href="https://www.linkedin.com/in/diogo--rodrigues/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={classes.socialIcon}>
              <Box className={classes.iconBox}>
                <LinkedIn fontSize="inherit" />
              </Box>
            </Link>
            <Link href="https://diogorodrigues.com" target="_blank" rel="noopener noreferrer" aria-label="Personal Website" className={classes.socialIcon}>
              <Box className={classes.iconBox}>
                <Language fontSize="inherit" />
              </Box>
            </Link>
          </Box>
          
          <Typography variant="body2" className={classes.copyright} align="center">
            © {currentYear} ElectronicStore | Project made by Diogo Rodrigues
          </Typography>
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;
