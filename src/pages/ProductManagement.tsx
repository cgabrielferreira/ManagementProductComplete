import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  getProducts,
  createProductWithCategoryAndSupplier,
  updateProduct,
  deleteProduct,
} from "../services/managementService";

interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  supplierId: number;
  description: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    const sortedProducts = fetchedProducts.sort(
      (a: Product, b: Product) => a.id - b.id
    ); // Ordenando pelo ID
    setProducts(sortedProducts);
  };

  const handleSave = async (product: Product) => {
    if (product.id) {
      // Atualizando o produto
      await updateProduct(product.id, product);
    } else {
      // Criando um novo produto
      await createProductWithCategoryAndSupplier(product);
    }
    fetchProducts(); // Atualiza a lista de produtos
    setOpen(false); // Fecha o modal
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    fetchProducts(); // Atualiza a lista de produtos após exclusão
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Criar Novo
      </Button>
      <TableContainer component={Paper} style={{ backgroundColor: "#fff" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Fornecedor</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.categoryId}</TableCell>
                <TableCell>{product.supplierId}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setEditingProduct(product);
                      setOpen(true);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(product.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editingProduct ? "Editar Produto" : "Criar Produto"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            margin="dense"
            value={editingProduct?.name || ""}
            onChange={(e) =>
              setEditingProduct((prev) => ({
                ...prev!,
                name: e.target.value,
              }))
            }
          />
          <TextField
            label="Preço"
            type="number"
            fullWidth
            margin="dense"
            value={editingProduct?.price || ""}
            onChange={(e) =>
              setEditingProduct((prev) => ({
                ...prev!,
                price: Number(e.target.value),
              }))
            }
          />
          <TextField
            label="Categoria ID"
            type="number"
            fullWidth
            margin="dense"
            value={editingProduct?.categoryId || ""}
            onChange={(e) =>
              setEditingProduct((prev) => ({
                ...prev!,
                categoryId: Number(e.target.value),
              }))
            }
          />
          <TextField
            label="Fornecedor ID"
            type="number"
            fullWidth
            margin="dense"
            value={editingProduct?.supplierId || ""}
            onChange={(e) =>
              setEditingProduct((prev) => ({
                ...prev!,
                supplierId: Number(e.target.value),
              }))
            }
          />
          <TextField
            label="Descrição"
            fullWidth
            margin="dense"
            value={editingProduct?.description || ""}
            onChange={(e) =>
              setEditingProduct((prev) => ({
                ...prev!,
                description: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => handleSave(editingProduct!)}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
