import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BarraNavegacao from "./components/BarraNavegacao";
import ListaClientes from "./components/ListaClientes";
import FormularioCadastroCliente from "./components/FormularioCadastroCliente";
import FormularioEditarCliente from "./components/FormularioEditarCliente";
import { Cliente } from "./services/clienteService";

function App() {
  const [tela, setTela] = useState<"Lista" | "Cadastro" | "Editar">("Lista");
  const [clienteParaEditar, setClienteParaEditar] = useState<Cliente | null>(null);

  const selecionarView = (novaTela: "Lista" | "Cadastro" | "Editar", cliente?: Cliente) => {
    setTela(novaTela);
    setClienteParaEditar(cliente || null);
  };

  const botoes = ["Lista", "Cadastro"];

  return (
    <div className="App">
      <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={botoes} />
      {tela === "Lista" && (
        <ListaClientes tema="#e3f2fd" seletorView={selecionarView} />
      )}
      {tela === "Cadastro" && (
        <FormularioCadastroCliente tema="#e3f2fd" seletorView={selecionarView} />
      )}
      {tela === "Editar" && clienteParaEditar && (
        <FormularioEditarCliente
          tema="#e3f2fd"
          cliente={clienteParaEditar}
          seletorView={selecionarView}
        />
      )}
    </div>
  );
}

export default App;
