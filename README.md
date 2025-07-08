# T4

## Descrição do Projeto

Este projeto é composto por dois módulos principais: um **frontend** desenvolvido em React e um **backend** Java distribuído como um arquivo `.jar`. O frontend utiliza TypeScript, Bootstrap e bibliotecas modernas de testes, enquanto o backend deve ser executado separadamente para garantir o funcionamento completo da aplicação.

## Estrutura do Repositório

/
├── executavel/
│   └── pl.jar
├── frontend-atviv/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── README.md
└── ...

## Versões Importantes Utilizadas

### Frontend

| Dependência                    | Versão             |
|--------------------------------|--------------------|
| Node.js                        | 16.x (recomendado) |
| React                          | ^19.1.0            |
| React DOM                      | ^19.1.0            |
| React Scripts                  | 5.0.1              |
| TypeScript                     | ^4.9.5             |
| Bootstrap                      | ^5.3.7             |
| @testing-library/react         | ^16.3.0            |
| @testing-library/jest-dom      | ^6.6.3             |
| @testing-library/user-event    | ^13.5.0            |
| @testing-library/dom           | ^10.4.0            |
| @types/react                   | ^19.1.8            |
| @types/react-dom               | ^19.1.6            |
| @types/jest                    | ^27.5.2            |
| @types/node                    | ^16.18.126         |
| web-vitals                     | ^2.1.4             |

### Backend

- **Java:** Recomendado Java 17 ou superior (verifique a versão utilizada no desenvolvimento do `.jar`)
- **Arquivo:** `pl.jar` (localizado em `/executavel`)

> **Atenção:** O frontend foi desenvolvido e testado com Node.js na versão 16.x. Versões superiores podem causar incompatibilidades, especialmente com dependências do React Scripts.

## Pré-requisitos

- **Node.js:** Versão 16.x (obrigatório para o frontend)
- **npm:** Compatível com Node 16.x
- **Java:** Versão 17 ou superior (para executar o backend `.jar`)

## Instalação

### 1. Clone o repositório:
git clone <URL-do-repositório>


### 2. Instale as dependências do frontend:
cd frontend-atviv
npm install


## Como Rodar o Projeto

### 1. Inicie o backend

Abra um terminal na pasta `executavel` e execute:

cd executavel
java -jar pl.jar


O backend estará rodando e aguardando as requisições do frontend.

### 2. Inicie o frontend

Abra outro terminal na pasta `frontend-atviv` e execute:

cd frontend-atviv
npm start


## Observações Importantes

- Certifique-se de que o backend esteja rodando antes de iniciar o frontend, pois a comunicação entre ambos é essencial para o funcionamento da aplicação.
- Caso utilize uma versão diferente da 16.x do Node.js, podem ocorrer erros de incompatibilidade.








