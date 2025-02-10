import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  getProducts,
  getCategories,
  getSuppliers,
} from "../services/managementService"; // Certifique-se de ajustar para os seus serviços
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  supplierId: number;
}

interface Category {
  id: number;
  name: string;
}

interface Supplier {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Buscar produtos, categorias e fornecedores
    const fetchData = async () => {
      try {
        const productResponse = await getProducts();
        const categoryResponse = await getCategories();
        const supplierResponse = await getSuppliers();

        setProducts(productResponse);
        setCategories(categoryResponse);
        setSuppliers(supplierResponse);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    // Chama a API para excluir o produto
    api
      .delete(`/management/products/${id}`)
      .then(() => setProducts(products.filter((product) => product.id !== id)))
      .catch((error) => console.error("Erro ao deletar produto:", error));
  };

  // Função para pegar o nome da categoria e fornecedor com base no ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : "Desconhecida";
  };

  const getSupplierName = (supplierId: number) => {
    const supplier = suppliers.find((supplier) => supplier.id === supplierId);
    return supplier ? supplier.name : "Desconhecido";
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>
      {/*      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/create")}
      >
        Criar Produto
      </Button> */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Fornecedor</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{getCategoryName(product.categoryId)}</TableCell>
              <TableCell>{getSupplierName(product.supplierId)}</TableCell>
              <TableCell>
                <Button
                  color="secondary"
                  onClick={() => navigate(`/edit/${product.id}`)}
                >
                  Editar
                </Button>
                <Button color="error" onClick={() => handleDelete(product.id)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home;
