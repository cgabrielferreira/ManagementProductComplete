import React, { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/managementService";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface Category {
  id: number;
  name: string;
}

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<Category>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleOpen = (category?: Category) => {
    setCurrentCategory(category || {}); // Se não tiver categoria, limpa o formulário
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCategory({}); // Limpa a categoria atual ao fechar
  };

  const handleSave = async () => {
    // Se a categoria tiver ID, realiza a atualização
    if (currentCategory.id) {
      await updateCategory(currentCategory.id, currentCategory);
    } else {
      // Se não tiver ID, cria uma nova categoria
      await createCategory(currentCategory);
    }
    fetchCategories(); // Atualiza a lista de categorias
    handleClose(); // Fecha o modal
  };

  const handleDelete = async (id: number) => {
    await deleteCategory(id); // Deleta a categoria
    fetchCategories(); // Atualiza a lista após a exclusão
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={() => handleOpen()}>
        Criar Novo
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleOpen(category)}>
                  Editar
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleDelete(category.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {currentCategory.id ? "Editar Categoria" : "Criar Categoria"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            value={currentCategory.name || ""}
            onChange={(e) =>
              setCurrentCategory({ ...currentCategory, name: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button color="primary" onClick={handleSave}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;
