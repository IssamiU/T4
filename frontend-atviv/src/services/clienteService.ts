import axios from "axios";

const API_BASE_URL = "http://localhost:32831";

export interface Telefone {
  id?: number;
  ddd: string;
  numero: string;
}

export interface Endereco {
  id?: number;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais: string;
}

export interface Cliente {
  id?: number;
  nome: string;
  nomeSocial: string;
  email: string | null;
  endereco: Endereco;
  telefones: Telefone[];
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000
});

export const clienteService = {
  listarClientes: async (): Promise<Cliente[]> => {
  try {
    const response = await fetch("http://localhost:32831/cliente/clientes");
    
    const data = await response.json();
    
    console.log("Clientes carregados:", data.length);
    return data;
    
  } catch (error: any) {
    console.error("Erro:", error);
    throw new Error("Erro ao carregar clientes");
  }
},


  cadastrarCliente: async (cliente: Omit<Cliente, 'id'>): Promise<void> => {
    try {
      await api.post("/cliente/cadastrar", cliente);
    } catch (error: any) {
      console.error("Erro ao cadastrar cliente:", error);
      throw new Error("Erro ao cadastrar cliente");
    }
  },

  atualizarCliente: async (cliente: Cliente): Promise<void> => {
    try {
      await api.put("/cliente/atualizar", cliente);
    } catch (error: any) {
      console.error("Erro ao atualizar cliente:", error);
      throw new Error("Erro ao atualizar cliente");
    }
  },

  excluirCliente: async (cliente: Cliente): Promise<void> => {
    try {
      await api.delete("/cliente/excluir", { 
        data: cliente
      });
    } catch (error: any) {
      console.error("Erro ao excluir cliente:", error);
      throw new Error("Erro ao excluir cliente");
    }
  }
};
