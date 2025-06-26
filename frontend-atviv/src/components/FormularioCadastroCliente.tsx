import React, { useState } from "react";
import { clienteService, Cliente, Endereco, Telefone } from "../services/clienteService";

interface Props {
  tema: string;
  seletorView: (tela: "Lista" | "Cadastro" | "Editar") => void;
}

export default function FormularioCadastroCliente({ tema, seletorView }: Props) {
  const [cliente, setCliente] = useState<Omit<Cliente, 'id'>>({
    nome: "",
    nomeSocial: "",
    email: null,
    endereco: {
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      codigoPostal: "",
      informacoesAdicionais: ""
    },
    telefones: [{ ddd: "", numero: "" }]
  });
  
  const [enviando, setEnviando] = useState(false);


  const handleCampoChange = (campo: keyof Omit<Cliente, 'id' | 'endereco' | 'telefones'>, valor: string) => {
    setCliente({
      ...cliente,
      [campo]: valor
    });
  };

  const handleEnderecoChange = (campo: keyof Endereco, valor: string) => {
    setCliente({
      ...cliente,
      endereco: {
        ...cliente.endereco,
        [campo]: valor
      }
    });
  };

  const handleTelefoneChange = (index: number, campo: keyof Telefone, valor: string) => {
    const novosTelefones = [...cliente.telefones];
    novosTelefones[index] = {
      ...novosTelefones[index],
      [campo]: valor
    };
    
    setCliente({
      ...cliente,
      telefones: novosTelefones
    });
  };

  const adicionarTelefone = () => {
    setCliente({
      ...cliente,
      telefones: [...cliente.telefones, { ddd: "", numero: "" }]
    });
  };

  const removerTelefone = (index: number) => {
    if (cliente.telefones.length > 1) {
      const novosTelefones = [...cliente.telefones];
      novosTelefones.splice(index, 1);
      
      setCliente({
        ...cliente,
        telefones: novosTelefones
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cliente.nome.trim()) {
      alert("Por favor, preencha o nome!");
      return;
    }

    try {
      setEnviando(true);
      await clienteService.cadastrarCliente(cliente);
      alert(`Cliente ${cliente.nome} cadastrado com sucesso!`);
      seletorView("Lista");
    } catch (error: any) {
      console.error("Erro ao cadastrar cliente:", error);
      alert("Erro ao cadastrar cliente: " + (error.message || "Erro desconhecido"));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-4">Cadastro de Cliente</h3>
      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-header" style={{ background: tema }}>
            Dados Pessoais
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Nome Completo *</label>
                <input
                  type="text"
                  className="form-control"
                  value={cliente.nome}
                  onChange={(e) => handleCampoChange("nome", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Nome Social</label>
                <input
                  type="text"
                  className="form-control"
                  value={cliente.nomeSocial}
                  onChange={(e) => handleCampoChange("nomeSocial", e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={cliente.email || ""}
                onChange={(e) => handleCampoChange("email", e.target.value)}
              />
            </div>
          </div>
        </div>

     
        <div className="card mb-4">
          <div className="card-header" style={{ background: tema }}>
            Endereço
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Estado *</label>
                <input
                  type="text"
                  className="form-control"
                  value={cliente.endereco.estado}
                  onChange={(e) => handleEnderecoChange("estado", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Cidade *</label>
                <input
                  type="text"
                  className="form-control"
                  value={cliente.endereco.cidade}
                  onChange={(e) => handleEnderecoChange("cidade", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Bairro *</label>
                <input
                  type="text"
                  className="form-control"
                  value={cliente.endereco.bairro}
                  onChange={(e) => handleEnderecoChange("bairro", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Rua *</label>
                <input
                  type="text"
                  className="form-control"
                  value={cliente.endereco.rua}
                  onChange={(e) => handleEnderecoChange("rua", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Número *</label>
                <input
                  type="text"
                  className="form-control"
                  value={cliente.endereco.numero}
                  onChange={(e) => handleEnderecoChange("numero", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">CEP *</label>
                <input
                  type="text"
                  className="form-control"
                  value={cliente.endereco.codigoPostal}
                  onChange={(e) => handleEnderecoChange("codigoPostal", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Complemento</label>
                <input
                  type="text"
                  className="form-control"
                  value={cliente.endereco.informacoesAdicionais}
                  onChange={(e) => handleEnderecoChange("informacoesAdicionais", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

    
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center" style={{ background: tema }}>
            <span>Telefones</span>
            <button 
              type="button" 
              className="btn btn-sm btn-light"
              onClick={adicionarTelefone}
            >
              + Adicionar Telefone
            </button>
          </div>
          <div className="card-body">
            {cliente.telefones.map((telefone, index) => (
              <div key={index} className="row mb-3 align-items-center">
                <div className="col-md-1">
                  <label className="form-label">DDD</label>
                  <input
                    type="text"
                    className="form-control"
                    value={telefone.ddd}
                    onChange={(e) => handleTelefoneChange(index, "ddd", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Número *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={telefone.numero}
                    onChange={(e) => handleTelefoneChange(index, "numero", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-2">
                  {cliente.telefones.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger mt-4"
                      onClick={() => removerTelefone(index)}
                    >
                      Remover
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      
        <div className="d-flex justify-content-end gap-2 pb-10">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => seletorView("Lista")}
            disabled={enviando}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-success"
            
            disabled={enviando}
          >
            {enviando ? "Cadastrando..." : "Cadastrar Cliente"}
          </button>
        </div>
      </form>
    </div>
  );
}
