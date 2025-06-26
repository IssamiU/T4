import React, { useEffect, useState } from "react";
import { clienteService, Cliente } from "../services/clienteService";

interface Props {
  tema: string;
  seletorView: (tela: "Lista" | "Cadastro" | "Editar", cliente?: Cliente) => void;
}

export default function ListaClientes({ tema, seletorView }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string>("");
  const [clienteExpandido, setClienteExpandido] = useState<number | null>(null);

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    setCarregando(true);
    setErro("");
    try {
      const dados = await clienteService.listarClientes();
      setClientes(dados);
    } catch (error: any) {
      setErro(error.message || "Erro desconhecido");
    } finally {
      setCarregando(false);
    }
  };

  const toggleExpandir = (id: number) => {
    setClienteExpandido(clienteExpandido === id ? null : id);
  };

  const excluirCliente = async (cliente: Cliente) => {
    if (window.confirm(`Excluir ${cliente.nome}?`)) {
      try {
        await clienteService.excluirCliente(cliente);
        alert("Cliente excluído com sucesso!");
        await carregarClientes();
      } catch (error: any) {
        alert("Erro ao excluir: " + error.message);
      }
    }
  };

  if (carregando) {
    return (
      <div className="container-fluid text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p>Carregando clientes...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          <h4>Erro ao carregar clientes:</h4>
          <p>{erro}</p>
          <button className="btn btn-primary" onClick={carregarClientes}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <h3 className="mb-4">Lista de Clientes</h3>
      <button className="btn btn-success mb-3" onClick={carregarClientes}>
        Atualizar Lista
      </button>
      <div className="list-group">
        {clientes.map((cliente) => (
          <div
            key={cliente.id}
            className="list-group-item list-group-item-action"
          >
            <div 
              className="d-flex justify-content-between align-items-center"
              onClick={() => toggleExpandir(cliente.id!)}
              style={{ cursor: "pointer" }}
            >
              <div>
                <strong>{cliente.nome}</strong>
                {cliente.nomeSocial && cliente.nomeSocial !== cliente.nome && (
                  <span> ({cliente.nomeSocial})</span>
                )}
                <br />
                <small className="text-muted">
                  {cliente.email || "Email não informado"}
                </small>
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    seletorView("Editar", cliente);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    excluirCliente(cliente);
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
            
            {clienteExpandido === cliente.id && (
              <div className="mt-3">
                <h5>Detalhes:</h5>
                
                <div className="card mb-3">
                  <div className="card-header bg-light">Endereço</div>
                  <div className="card-body">
                    {cliente.endereco ? (
                      <>
                        <p className="mb-1">
                          <strong>Local:</strong> {cliente.endereco.rua}, {cliente.endereco.numero}
                        </p>
                        <p className="mb-1">
                          <strong>Bairro:</strong> {cliente.endereco.bairro}, {cliente.endereco.cidade} - {cliente.endereco.estado}
                        </p>
                        <p className="mb-1">
                          <strong>CEP:</strong> {cliente.endereco.codigoPostal}
                        </p>
                        <p className="mb-0">
                          <strong>Informações:</strong> {cliente.endereco.informacoesAdicionais}
                        </p>
                      </>
                    ) : (
                      <p>Endereço não cadastrado</p>
                    )}
                  </div>
                </div>
                
                <div className="card">
                  <div className="card-header bg-light">Telefones</div>
                  <div className="card-body">
                    {cliente.telefones && cliente.telefones.length > 0 ? (
                      <ul className="list-unstyled mb-0">
                        {cliente.telefones.map((telefone, index) => (
                          <li key={index}>
                            ({telefone.ddd}) {telefone.numero}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Telefones não cadastrados</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {clientes.length === 0 && (
          <div className="list-group-item text-center text-muted">
            Nenhum cliente encontrado
          </div>
        )}
      </div>
    </div>
  );
}
