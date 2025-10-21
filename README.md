# Products UI - Sistema de Gerenciamento de Produtos

## 📋 Sobre o Projeto

Este é um projeto de teste desenvolvido em Angular 20 que implementa um sistema CRUD (Create, Read, Update, Delete) para gerenciamento de produtos. A aplicação consome a API pública [Fake Store API](https://fakestoreapi.com) para demonstrar operações de produtos em um ambiente de desenvolvimento.

> ⚠️ **Aviso**: Este é um projeto de teste/estudo e não possui fins de produção.

## 🛠️ Tecnologias Utilizadas

- **Angular 20** - Framework principal
- **TypeScript** - Linguagem de programação
- **PrimeNG** - Biblioteca de componentes UI
- **TailwindCSS** - Framework CSS para estilização
- **RxJS** - Programação reativa
- **Fake Store API** - API externa para dados de produtos

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura modular e organizada com os seguintes padrões:

### 📁 Estrutura de Pastas

```
src/app/
├── core/                    # Configurações centrais da aplicação
│   ├── app.config.ts       # Configuração principal do app
│   ├── app.routes.ts       # Roteamento principal
│   └── app.ts              # Componente raiz
├── product/                # Módulo de produtos
│   ├── data-access/        # Serviços de acesso a dados
│   ├── feature-create/     # Funcionalidade de criação/edição
│   ├── feature-list/       # Funcionalidade de listagem
│   ├── model/              # Modelos e DTOs
│   ├── routes/             # Rotas específicas de produtos
│   ├── state/              # Gerenciamento de estado
│   └── ui/                 # Componentes de interface
└── shared/                 # Componentes compartilhados
    └── ui/                 # Componentes UI reutilizáveis
```

### 🔧 Padrões Implementados

- **Facade Pattern**: `ProductFacadeService` para gerenciamento centralizado de estado
- **Feature-based Architecture**: Organização por funcionalidades
- **Smart/Dumb Components**: Separação entre componentes inteligentes e de apresentação
- **Reactive Programming**: Uso de Signals e RxJS

## ⚡ Funcionalidades

### 📊 Lista de Produtos
- Visualização de produtos em tabela organizada
- Exibição de imagem, nome, preço, categoria e avaliações
- Ações de editar e excluir para cada produto
- Loading state durante carregamento dos dados

### ➕ Criar/Editar Produto
- Formulário reativo com validações
- Campos: Nome, Preço, Categoria, Descrição e URL da Imagem
- Validações de campos obrigatórios
- Suporte a modo de criação e edição
- Feedback visual de sucesso/erro

### 🗑️ Excluir Produto
- Confirmação antes da exclusão
- Feedback visual após operação
- Atualização automática da lista

### 🎨 Interface de Usuário
- Design moderno e responsivo
- Componentes PrimeNG com tema customizado
- Estilização com TailwindCSS
- Loading states e feedback de ações
- Mensagens de toast para feedback do usuário

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18+)
- npm ou yarn

### Instalação e Execução

1. **Clone o repositório** (se aplicável):
```bash
git clone <url-do-repositorio>
cd products-ui
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Execute a aplicação**:
```bash
npm start
```

4. **Acesse a aplicação**:
   - Abra o navegador em `http://localhost:4200`

### Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run test` - Executa os testes unitários
- `npm run watch` - Build em modo watch

## 🔗 Endpoints da API

A aplicação consome os seguintes endpoints da Fake Store API:

- `GET /products` - Lista todos os produtos
- `GET /products/{id}` - Busca produto por ID
- `POST /products` - Cria novo produto
- `PUT /products/{id}` - Atualiza produto existente
- `DELETE /products/{id}` - Remove produto

## 📱 Rotas da Aplicação

- `/products` - Lista de produtos (rota principal)
- `/products/create` - Formulário de criação de produto
- `/products/edit/:id` - Formulário de edição de produto

## 🧪 Funcionalidades Técnicas

### Gerenciamento de Estado
- **Signals** para estado reativo
- **Facade Service** para operações centralizadas
- **Loading/Error states** para UX aprimorada

### Validações
- Formulários reativos com validações
- Feedback visual de erros
- Validações de campos obrigatórios

### UI/UX
- Componentes reutilizáveis
- Design system consistente
- Feedback de ações (toasts, confirmações)
- Loading states

## 🚧 Limitações Conhecidas

Como este é um projeto de teste utilizando a Fake Store API:

1. **Persistência**: As operações de CREATE, UPDATE e DELETE não persistem realmente na API
2. **Dados Mock**: Todos os dados são fictícios para fins de demonstração
3. **Autenticação**: Não possui sistema de autenticação implementado
4. **Testes**: Testes unitários básicos (pode ser expandido)

## 📄 Licença

Este projeto é apenas para fins educacionais e de teste. Não possui licença específica.

---

**Desenvolvido como projeto de estudo em Angular 20 com PrimeNG e TailwindCSS** 🚀