import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/${id}`)
      .then((response) => {
        setName(response.data.name);
        setPrice(response.data.price);
      })
      .catch((error) => console.error("Erro ao buscar produto:", error));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .put(`/${id}`, { name, price: parseFloat(price) })
      .then(() => navigate("/"))
      .catch((error) => console.error("Erro ao atualizar produto:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Produto</h1>
      <TextField
        label="Nome"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Preço"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        type="number"
      />
      <Button type="submit" variant="contained" color="primary">
        Atualizar
      </Button>
    </form>
  );
};

export default EditItem;
