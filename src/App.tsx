import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import theme from "./theme/theme";
import Home from "./pages/Home";
import CreateItem from "./pages/CreateItem";
import EditItem from "./pages/EditItem";
import SupplierManagement from "./pages/SupplierManagement";
import CategoryManagement from "./pages/CategoryManagement";
import Navbar from "./components/Navbar";
import ProductManagement from "./pages/ProductManagement";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateItem />} />
            <Route path="/edit/:id" element={<EditItem />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/suppliers" element={<SupplierManagement />} />
            <Route path="/categories" element={<CategoryManagement />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
