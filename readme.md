# Título do Projeto

## Visão Geral

Este projeto é uma aplicação TypeScript React que integra o Firebase para armazenamento de dados e autenticação, o Cloudinary para uploads de mídias e inclui recursos para criar, ler, atualizar e deletar relatórios e artigos.

## Funcionalidades

- **Configuração de Roteamento**: Configurada usando `react-router-dom` para navegação entre diferentes componentes.
- **Integração com Firebase**: Funções para criar, ler, atualizar e deletar relatórios e artigos.
- **API do Cloudinary**: Upload de arquivos de mídia para o Cloudinary e gerenciamento eficaz dos mesmos.
- **Autenticação de Usuário**: Inclui componentes para login, registro e redefinição de senha.
- **Gerenciamento de Relatórios**: Funcionalidades para buscar, deletar e atualizar relatórios com paginação.
- **Gerenciamento de Artigos**: Criar e salvar artigos com título, conteúdo e categoria.

## Componentes

### Roteamento

A aplicação configura o roteamento usando `react-router-dom` para navegar entre diferentes componentes.

### Operações com Firebase

Funções para gerenciar relatórios e artigos em um banco de dados Firebase:

- **Criar Relatório**
- **Ler Relatório**
- **Atualizar Relatório**
- **Deletar Relatório**
- **Criar Artigo**
- **Ler Artigo**
- **Atualizar Artigo**
- **Deletar Artigo**

### Upload de Mídia

Integração com a API do Cloudinary para facilitar o upload de arquivos de mídia.

### Autenticação de Usuário

- **Componente de Login**: Lida com a autenticação de usuários, incluindo login, logout e registro.
- **Rotas Protegidas**: Garante que certas rotas sejam acessíveis apenas para usuários autenticados.

### Gerenciamento de Relatórios

O componente `Reports` gerencia a lista de relatórios, permitindo que os usuários:

- Busquem relatórios
- Deletam relatórios
- Atualizem detalhes dos relatórios

### Gerenciamento de Artigos

O componente `CreateArticle` permite que os usuários:

- Insiram título e conteúdo do artigo
- Selecione uma categoria
- Salvem artigos com notificações de sucesso ou erro.

### Modais

- **Modal de Registro**: Para registro de usuário.
- **Modal de Redefinição de Senha**: Permite que os usuários redefinam suas senhas.

### Componente de Editor

Um editor personalizável para criar e editar conteúdo com várias opções de formatação e capacidade de embutir mídias.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/alexfferro/plussoft.reports.git
   cd plussoft.reports
   npm install
   npm run dev
   use o ip no seu navegador para acessar : http://localhost:5173/
   ```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para enviar um pull request ou abrir uma issue.
