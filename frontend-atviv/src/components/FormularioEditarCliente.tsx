import React, { useState, useEffect } from "react";
import { clienteService, Cliente, Endereco, Telefone } from "../services/clienteService";

interface Props {
  tema: string;
  cliente: Cliente;
  seletorView: (tela: "Lista" | "Cadastro" | "Editar") => void;
}

export default function FormularioEditarCliente({ tema, cliente, seletorView }: Props) {
  const [clienteEdit, setClienteEdit] = useState<Cliente>({
    ...cliente,
    endereco: cliente.endereco || {
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      codigoPostal: "",
      informacoesAdicionais: ""
    },
    telefones: cliente.telefones && cliente.telefones.length > 0
      ? cliente.telefones.map(tel => ({ ...tel }))
      : [{ ddd: "", numero: "" }]
  });
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    setClienteEdit({
      ...cliente,
      endereco: cliente.endereco || {
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: "",
        codigoPostal: "",
        informacoesAdicionais: ""
      },
      telefones: cliente.telefones && cliente.telefones.length > 0
        ? cliente.telefones.map(tel => ({ ...tel }))
        : [{ ddd: "", numero: "" }]
    });
  }, [cliente]);

  const handleCampoChange = (campo: keyof Omit<Cliente, 'id' | 'endereco' | 'telefones'>, valor: string) => {
    setClienteEdit({
      ...clienteEdit,
      [campo]: valor
    });
  };

  const handleEnderecoChange = (campo: keyof Endereco, valor: string) => {
    setClienteEdit({
      ...clienteEdit,
      endereco: {
        ...clienteEdit.endereco,
        [campo]: valor
      }
    });
  };

  const handleTelefoneChange = (index: number, campo: keyof Telefone, valor: string) => {
    const novosTelefones = [...clienteEdit.telefones];
    novosTelefones[index] = {
      ...novosTelefones[index],
      [campo]: valor
    };
    setClienteEdit({
      ...clienteEdit,
      telefones: novosTelefones
    });
  };

  const adicionarTelefone = () => {
    setClienteEdit({
      ...clienteEdit,
      telefones: [...clienteEdit.telefones, { ddd: "", numero: "" }]
    });
  };

  const removerTelefone = (index: number) => {
    if (clienteEdit.telefones.length > 1) {
      const novosTelefones = [...clienteEdit.telefones];
      novosTelefones.splice(index, 1);
      setClienteEdit({
        ...clienteEdit,
        telefones: novosTelefones
      });
    }
  };

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clienteEdit.nome.trim()) {
      alert("Por favor, preencha o nome!");
      return;
    }

    try {
      setEnviando(true);
      await clienteService.atualizarCliente(clienteEdit);
      alert(`Cliente ${clienteEdit.nome} atualizado com sucesso!`);
      seletorView("Lista");
    } catch (error: any) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente: " + (error.message || "Erro desconhecido"));
    } finally {
      setEnviando(false);
    }
  };

  const handleCancelar = () => {
    if (window.confirm("Deseja cancelar a edição? As alterações não salvas serão perdidas.")) {
      seletorView("Lista");
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-4">
        Editar Cliente: <span className="text-muted">{clienteEdit.nome}</span>
      </h3>
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
                  value={clienteEdit.nome}
                  onChange={(e) => handleCampoChange("nome", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Nome Social</label>
                <input
                  type="text"
                  className="form-control"
                  value={clienteEdit.nomeSocial}
                  onChange={(e) => handleCampoChange("nomeSocial", e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={clienteEdit.email || ""}
                onChange={(e) => handleCampoChange("email", e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Endereço */}
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
                  value={clienteEdit.endereco?.estado || ""}
                  onChange={(e) => handleEnderecoChange("estado", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Cidade *</label>
                <input
                  type="text"
                  className="form-control"
                  value={clienteEdit.endereco?.cidade || ""}
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
                  value={clienteEdit.endereco?.bairro || ""}
                  onChange={(e) => handleEnderecoChange("bairro", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Rua *</label>
                <input
                  type="text"
                  className="form-control"
                  value={clienteEdit.endereco?.rua || ""}
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
                  value={clienteEdit.endereco?.numero || ""}
                  onChange={(e) => handleEnderecoChange("numero", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">CEP *</label>
                <input
                  type="text"
                  className="form-control"
                  value={clienteEdit.endereco?.codigoPostal || ""}
                  onChange={(e) => handleEnderecoChange("codigoPostal", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Complemento</label>
                <input
                  type="text"
                  className="form-control"
                  value={clienteEdit.endereco?.informacoesAdicionais || ""}
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
            {clienteEdit.telefones.map((telefone, index) => (
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
                  {clienteEdit.telefones.length > 1 && (
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
        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancelar}
            disabled={enviando}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-warning"
            style={{ background: tema, borderColor: tema }}
            disabled={enviando}
          >
            {enviando ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
