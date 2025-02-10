import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/management/products");
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await api.get(`/management/products/${id}`);
  return response.data;
};

export const createSingleProduct = async (product: any) => {
  const response = await api.post("/management/products/single", product);
  return response.data;
};

export const createProductWithCategoryAndSupplier = async (product: any) => {
  const response = await api.post("/management/products", product);
  return response.data;
};

export const updateProduct = async (id: number, product: any) => {
  const response = await api.put(`/management/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  await api.delete(`/management/products/${id}`);
};

export const updateProductSupplier = async (
  productId: number,
  supplierId: number
) => {
  const response = await api.put(
    `/management/products/${productId}/supplier/${supplierId}`
  );
  return response.data;
};

export const updateProductCategory = async (
  productId: number,
  categoryId: number
) => {
  const response = await api.put(
    `/management/products/${productId}/category/${categoryId}`
  );
  return response.data;
};

export const getSuppliers = async () => {
  const response = await api.get("/management/suppliers");
  return response.data;
};

export const getSupplierById = async (id: number) => {
  const response = await api.get(`/management/suppliers/${id}`);
  return response.data;
};

export const createSupplier = async (supplier: any) => {
  const response = await api.post("/management/suppliers", supplier);
  return response.data;
};

export const updateSupplier = async (id: number, supplier: any) => {
  const response = await api.put(`/management/suppliers/${id}`, supplier);
  return response.data;
};

export const deleteSupplier = async (id: number) => {
  await api.delete(`/management/suppliers/${id}`);
};

export const getCategories = async () => {
  const response = await api.get("/management/categories");
  return response.data;
};

export const getCategoryById = async (id: number) => {
  const response = await api.get(`/management/categories/${id}`);
  return response.data;
};

export const createCategory = async (category: any) => {
  const response = await api.post("/management/categories", category);
  return response.data;
};

export const updateCategory = async (id: number, category: any) => {
  const response = await api.put(`/management/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  await api.delete(`/management/categories/${id}`);
};
