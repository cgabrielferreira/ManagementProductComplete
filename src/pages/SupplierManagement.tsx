import React, { useEffect, useState } from "react";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
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

interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
}

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [open, setOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Partial<Supplier>>({});

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const data = await getSuppliers();
    setSuppliers(data);
  };

  const handleOpen = (supplier?: Supplier) => {
    setCurrentSupplier(supplier || {}); // Se não tiver fornecedor, limpa o formulário
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentSupplier({}); // Limpa o fornecedor atual ao fechar
  };

  const handleSave = async () => {
    // Se o fornecedor tiver ID, realiza a atualização
    if (currentSupplier.id) {
      await updateSupplier(currentSupplier.id, currentSupplier);
    } else {
      // Se não tiver ID, cria um novo fornecedor
      await createSupplier(currentSupplier);
    }
    fetchSuppliers(); // Atualiza a lista de fornecedores
    handleClose(); // Fecha o modal
  };

  const handleDelete = async (id: number) => {
    await deleteSupplier(id); // Deleta o fornecedor
    fetchSuppliers(); // Atualiza a lista após a exclusão
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
            <TableCell>Email</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Cidade</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.id}</TableCell>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{supplier.city}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleOpen(supplier)}>
                  Editar
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleDelete(supplier.id)}
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
          {currentSupplier.id ? "Editar Fornecedor" : "Criar Fornecedor"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            value={currentSupplier.name || ""}
            onChange={(e) =>
              setCurrentSupplier({ ...currentSupplier, name: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            value={currentSupplier.email || ""}
            onChange={(e) =>
              setCurrentSupplier({ ...currentSupplier, email: e.target.value })
            }
          />
          <TextField
            label="Telefone"
            fullWidth
            value={currentSupplier.phone || ""}
            onChange={(e) =>
              setCurrentSupplier({ ...currentSupplier, phone: e.target.value })
            }
          />
          <TextField
            label="Cidade"
            fullWidth
            value={currentSupplier.city || ""}
            onChange={(e) =>
              setCurrentSupplier({ ...currentSupplier, city: e.target.value })
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

export default SupplierManagement;
