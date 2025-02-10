import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Product Management
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Início
        </Button>
        <Button color="inherit" component={Link} to="/products">
          Produtos
        </Button>
        <Button color="inherit" component={Link} to="/suppliers">
          Fornecedores
        </Button>
        <Button color="inherit" component={Link} to="/categories">
          Categorias
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
