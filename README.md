# 🧠 ai-todo — Terminal Task Manager with AI Superpowers

An experimental CLI tool to manage your to-do tasks using **AI-powered interactions**. This project leverages **ChatGPT** and **Google Generative AI** to fetch, create, update, and manage tasks stored in a database using **Drizzle ORM** — all inside your terminal.

> ⚡️ Built as a live-coding experiment combining LLMs with practical database workflows.

---

## 🧪 What is this?

- A minimal, terminal-based todo manager
- Interacts with a database (PostgreSQL, SQLite, etc. — based on Drizzle config)
- AI-powered interactions using:
  - 🤖 **ChatGPT** (OpenAI)
  - 🤖 **Google Generative AI**
- Uses **Docker** to containerize and run
- Structured with **Drizzle ORM** for database abstraction
- Script-style — meant for exploration, not production (yet)

---

## 🛠️ Tech Stack

- **Node.js**
- **Drizzle ORM**
- **Docker & docker-compose**
- **ChatGPT (OpenAI API)**
- **Google Generative AI**
- **Terminal-based interaction**

---

## 📂 Project Structure

```bash
ai-todo/
├── db/
│   ├── index.js          # DB connection setup
│   └── schema.js         # Drizzle ORM schema
├── drizzle.config.js     # Drizzle setup
├── docker-compose.yaml   # Docker setup
├── index.js              # Main CLI logic
├── .gitignore
├── package.json
└── README.md             # (You’re reading it!)
```

---

## 🚀 How It Works

- Run the app using Docker or locally
- AI (via ChatGPT or Google GenAI) understands natural language like:
  - `"Show me tasks due today"`
  - `"Add a task to call the dentist tomorrow"`
  - `"Mark my project as done"`
- Tasks are stored/retrieved in a structured DB using Drizzle ORM

---

## 🐳 Running with Docker

```bash
docker-compose up
```

Or run locally:

```bash
npm install
node index.js
```

---

## 🧠 Sample Prompts

| Prompt                     | Result                        |
| -------------------------- | ----------------------------- |
| `Add "Buy groceries"`      | Creates a new task            |
| `What are my tasks today?` | Lists today’s tasks           |
| `Update project status`    | Updates a task using AI logic |

---

## 🤝 Contributions

Not really production-ready, but if you’re curious or want to try experimental AI-driven DB tools, feel free to fork, tweak, or open issues.

---

## ⚠️ Disclaimer

> This is an **experimental project** created for fun and exploration. It’s not production-optimized, and the AI behaviors may vary based on context and input. Use at your own risk — or fork it and make it better!

---

## 📌 License

MIT — use it, break it, improve it. Just credit where credit’s due. 😄

---

## 👤 Author

Maintained by [Bhawesh Panwar](https://github.com/bhaweshpanwar)

```

```
