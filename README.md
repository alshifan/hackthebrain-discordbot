# Discord Bot — Slash Command Enabled 🚀

This bot is built using **Node.js** and **discord.js v14**, and supports full **slash command interaction** with MongoDB integration for persistent content.

---

## ✅ Features

- `/ping` — Responds with "Pong!"
- `/userinfo` — Shows or creates a MongoDB user profile
- `/rules` — Fetches and displays rules from the database
- `/embed` — Sends a basic embedded message
- `/getcontent` — Admin-only: Display content from the database
- `/announce` — Send plain text announcements
- `/eannounce` — Send embedded announcements
- `/sendimage` — Sends images inline (if direct URL)
- `/moderation` — Kick or ban users with subcommands

---

## 📦 Installation

```bash
npm install
```

---

## ⚙️ Setup `.env`

Create a `.env` file in the root directory:

```
DISCORD_TOKEN=your-bot-token
CLIENT_ID=your-application-id
```

---

## 🚀 Deploy Slash Commands

```bash
node deploy-commands.js
```

---

## 🟢 Start Bot

```bash
node index.js
```

---

## 🧠 Slash Command Deployment Notes

- Commands are deployed **globally** and may take up to 1 hour to appear.
- For quicker testing, you can register commands to a **specific guild** by using:
  `Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)`

---

## 📁 Folder Structure

```
.
├── commands/         # Slash commands
├── events/           # Bot events like "ready"
├── models/           # MongoDB models (Mongoose)
├── utils/            # Helpers (embed builder, permission check)
├── scripts/          # Content/rules inserter
├── deploy-commands.js
├── index.js
└── .env              # Your secrets (not included here)
```

---

Made for **Hack the Brain** 🧠
