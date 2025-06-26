import React from "react";

interface Props {
  tema: string;
  botoes: string[];
  seletorView: (tela: "Lista" | "Cadastro" | "Editar") => void;
}

export default function BarraNavegacao({ tema, botoes, seletorView }: Props) {
  const gerarListaBotoes = () => {
    if (botoes.length <= 0) {
      return <></>;
    } else {
      const lista = botoes.map((valor) => (
        <li key={valor} className="nav-item">
          <a
            className="nav-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              seletorView(valor as "Lista" | "Cadastro" | "Editar");
            }}
          >
            {valor}
          </a>
        </li>
      ));
      return lista;
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      data-bs-theme="light"
      style={{ backgroundColor: tema, marginBottom: 10 }}
    >
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">PetLovers - Clientes</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">{gerarListaBotoes()}</ul>
        </div>
      </div>
    </nav>
  );
}
