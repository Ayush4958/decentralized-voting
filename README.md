# 🗳️ Decentralized College Voting System

A secure, role-based decentralized voting platform built using **React**, **Supabase**, and **OpenAI** to streamline elections in colleges and organizations.

---

## 🚀 Features

- 🔐 **Role-based Authentication** (Admin & Student)
- 📊 **Poll Creation** by Admins
- 🧑‍🎓 **Student Voting Interface**
- 🤖 **AI Manifesto Summarizer** (OpenAI GPT-4o)
- 📈 **AI Vote Result Summary Generator**
- 🔍 **One vote per poll restriction (enforced with constraints)**
- 📚 **Clean UI** with gradient mountain theme using TailwindCSS

---

## 🧠 Tech Stack

- **Frontend:** React, TailwindCSS, React Hook Form, Context API
- **Backend:** Express.js (AI summary endpoints)
- **Database:** Supabase (PostgreSQL + RLS)
- **AI:** OpenAI GPT-4o Mini

---

## 📁 Folder Structure

```
📦 decentralized-voting/
├── backend/
│   ├── controllers/
│   │   └── summarizeController.js
│   ├── routes/
│   │   └── summarizeRoute.js
│   ├── supabaseClient.js
│   └── server.js
├── frontend/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── Voting/
│   │   └── AI/
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── VoteResults.jsx
│   │   └── CreatePoll.jsx
│   ├── App.jsx
│   └── main.jsx
└── README.md
```

---

## 🔒 Role-Based Access (Supabase RLS)

| Table      | Policy Summary |
|------------|----------------|
| `profiles` | Users can only insert and view their own profile |
| `polls`    | Only admins (role=admin) can create polls |
| `candidates` | Only admins can add candidates |
| `votes`    | Students can vote only once per poll |
| `result-summary` | Summarized securely via backend using OpenAI |

---

## 🤖 AI Features

- ### 🧾 Manifesto Summarizer
  Admins can paste lengthy manifestos → AI returns easy-to-understand bullet points.

- ### 📊 Vote Result Summary
  Students can click “Generate Summary” to get a human-readable version of raw vote data.

---

## 🛠️ Challenges Faced

- Role-based access bugs → solved via Supabase RLS + route guards
- Insert permissions blocked → fixed with custom Supabase policies
- AI integration with OpenAI → resolved UUID/data structure issues
- Tailwind gradient theming → used direct HEX codes

---

## 📸 Screenshots

> Login Page with Gradient Theme  
> Vote Results with AI Summary  
> Admin Poll Creation Interface  
> Role-Based Navigation

---

## 🧪 How to Run

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/decentralized-voting.git
cd decentralized-voting
```

### 2. Setup Supabase

- Create a new project at [supabase.io](https://supabase.io)
- Add tables: `profiles`, `polls`, `candidates`, `votes`
- Enable RLS and apply appropriate policies

### 3. Backend

```bash
cd backend
npm install
node server.js
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🙌 Contributions

Contributions, feedback, and ideas are welcome!

---

## 📃 License

MIT License © 2025