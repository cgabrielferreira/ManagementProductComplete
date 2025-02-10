import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateItem: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .post("/single", { name, price: parseFloat(price) })
      .then(() => navigate("/"))
      .catch((error) => console.error("Erro ao criar produto:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Criar Produto</h1>
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
        Salvar
      </Button>
    </form>
  );
};

export default CreateItem;
