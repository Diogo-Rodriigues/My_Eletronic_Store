import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, InputBase, IconButton } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(20, 20, 20, 0.7)",
    boxShadow: "0 0 10px rgba(0, 183, 255, 0.2)",
    width: "100%",
    border: "1px solid rgba(0, 183, 255, 0.2)",
    transition: "all 0.3s ease",
    '&:hover': {
      boxShadow: "0 0 15px rgba(0, 183, 255, 0.4)",
      border: "1px solid rgba(0, 183, 255, 0.4)",
    },
    '&:focus-within': {
      boxShadow: "0 0 15px rgba(0, 183, 255, 0.6)",
      border: "1px solid rgba(0, 183, 255, 0.6)",
    },
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: "1rem",
    color: "#f5f5f5",
    '&::placeholder': {
      color: 'rgba(245, 245, 245, 0.5)',
    },
  },
  iconButton: {
    padding: theme.spacing(1),
    backgroundColor: "#00b7ff",
    color: "#000",
    borderRadius: "0 4px 4px 0",
    "&:hover": {
      backgroundColor: "#00e676",
    },
    transition: "all 0.3s ease",
  },
  searchGlow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    borderRadius: theme.shape.borderRadius,
    opacity: 0,
    boxShadow: "0 0 20px rgba(0, 183, 255, 0.8)",
    transition: "opacity 0.3s ease",
  },
  glowing: {
    opacity: 1,
  }
}));

function SearchBox() {
  const classes = useStyles();
  const [keyword, setKeyword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/?keyword=${keyword}&page=1`);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={submitHandler} 
      className={classes.root}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <div className={`${classes.searchGlow} ${isActive ? classes.glowing : ''}`} />
      <InputBase
        placeholder="Search for tech products..."
        className={classes.input}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        inputProps={{ 'aria-label': 'search electronics' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}

export default SearchBox;
