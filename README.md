````markdown
# 📋 Google Forms Lite Clone

**Simplified Google Forms clone** built as a monorepo. This project uses **React** with **Redux Toolkit** for the frontend and **GraphQL** (Apollo Server) for the backend.

---

## 🚀 Key Features

- **Custom Form Builder**: Create forms with titles and descriptions.
- **Question Types**: Text, Multiple Choice, Checkbox, and Date.
- **Submission System**: Users can fill out forms and submit answers.
- **Response Dashboard**: View all submitted data for each form.
- **In-memory Storage**: Data is stored in runtime (no database setup required).

---

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Redux Toolkit (RTK Query), React Router.
- **Backend**: Node.js, GraphQL, Apollo Server.
- **Architecture**: Monorepo with shared TypeScript types.

---

## ⚙️ Quick Start

### 1. Setup

```bash
git clone <your-repo-url>
cd forms-clone
npm install
```
````

### 2. Launch

Run both client and server with one command:

```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend (GraphQL)**: http://localhost:4000/graphql

---

## 🧠 Architecture Highlights

- **Shared Types**: Common interfaces are stored in the `/shared` folder to ensure type safety across the entire stack.
- **State Management**: Uses **RTK Query** for efficient GraphQL data fetching and caching.
- **No Persistence**: Perfect for **testing and demos** (data resets when the server restarts).

---

## 📌 Important

- **No Authentication**: Access is open for all features.
- **Development Mode**: Designed for educational purposes and quick prototyping.

```

```
