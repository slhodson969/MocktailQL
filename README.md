# MocktailQL

**MocktailQL** is a hybrid GraphQL server that seamlessly integrates mock and live GraphQL schemas. It enables developers to mix and match mock data with live APIs for testing, prototyping, and development.

## Features

-   **Schema Stitching**: Combines live GraphQL schemas with mock schemas.
-   **Mock Data Support**: Easily define and use mock resolvers for development.
-   **Live API Proxying**: Fetch data from live GraphQL APIs through a single endpoint.
-   **Flexible and Scalable**: Ideal for testing, prototyping, or bridging incomplete APIs.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or later)
-   npm (comes with Node.js)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mocktailql.git
cd mocktailql
```

#### Setup

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Edit `.env` and fill in the correct values for your environment.

#### Install dependencies:

```bash
npm install
```

#### Running the Server

Start the server:

```bash
npm start
```

Access the GraphQL playground at:

```bash
http://localhost:4000
```

## Examples

### Query mock categories

```bash
curl -X POST http://localhost:4000/graphql \
 -H "Content-Type: application/json" \
 -d '{"query": "query { mock_categories { id name } }"}'
```

### Query mock shopping lists

```bash
curl -X POST http://localhost:4000/graphql \
 -H "Content-Type: application/json" \
 -d '{"query": "query { mock_shoppingLists { id name items { id name quantity } } }"}'
```

### Query mock user profile

```bash
curl -X POST http://localhost:4000/graphql \
 -H "Content-Type: application/json" \
 -d '{"query": "query { mock_userProfile { id name email } }"}'
```

### Mutation to add a favorite shopping list

```bash
curl -X POST http://localhost:4000/graphql \
 -H "Content-Type: application/json" \
 -d '{"query": "mutation mock_favoritesAddList($name: String!) { mock_favoritesAddList(name: $name) { id } }", "variables": { "name": "Groceries" }}'
```

### Mutation to update a shopping list

```bash
curl -X POST http://localhost:4000/graphql \
 -H "Content-Type: application/json" \
 -d '{"query": "mutation mock_updateShoppingList($id: ID!, $name: String!) { mock_updateShoppingList(id: $id, name: $name) { id name items { id name quantity } } }", "variables": { "id": "1", "name": "Updated Groceries" }}'
```

### Mutation to delete a shopping list

```bash
curl -X POST http://localhost:4000/graphql \
 -H "Content-Type: application/json" \
 -d '{"query": "mutation mock_deleteShoppingList($id: ID!) { mock_deleteShoppingList(id: $id) }", "variables": { "id": "1" }}'
```

### Live examples

```bash
curl -X POST http://localhost:4000/graphql \
 -H "Content-Type: application/json" \
 -d '{"query": "query CatsAndPaths { categories { name path } }"}'
```
