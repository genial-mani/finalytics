
# 🪙 Finalytics – AI-Powered Finance Management

Finalytics is a smart finance management web application featuring an intelligent assistant **FinAI 🐼**, who helps you understand your financial habits, gives spending insights, and even chats with you using Gemini AI. With an intuitive dashboard and smart recommendations, Finalytics is your friendly personal finance expert!

## 🔮 Features

- 💡 AI-powered financial insights
- 📊 Interactive and insightful dashboard
- 🐼 Chat with FinAI for financial suggestions & summaries
- 💰 Track transactions and spending behavior
- 💵 Set monthly budgets
- 🌙 Dark mode 
- 📈 Charts-based analytics
- 📦 Zustand + Prisma for efficient state & DB management
- 🔐 Secured with environment variables
## 📦 Tech Stack

**Client:** React 19, Next.js 15 (Turbopack), TypeScript, TailwindCSS, Zustand, ShadcnUI  
**Server:** Node.js, TypeScript, Prisma, MongoDB  
**AI:** Google Generative AI (Gemini)  
**UI Enhancements:** Lucide Icons, Sonner Toasts, Motion Animations  
## 🌐 Demo

### 🎥 Video

[![Watch the demo](https://res.cloudinary.com/diumsbsrb/image/upload/v1753285945/23bf9742-c154-4962-959b-21e7fa5cbd77.png)](https://player.cloudinary.com/embed/?cloud_name=diumsbsrb&public_id=Finalytics_ie4udj&profile=cld-default)

[🔗 Live Demo](https://finalytics-dun.vercel.app/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/genial-mani/finalytics.git

```

Go to the project directory

```bash
  cd finalytics
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL=your_postgres_database_url`

`GEMINI_API_KEY=your_gemini_api_key`


## Optimizations

- Used **zustand** for lightweight global state management

- Debounced inputs for performance in **AI** chat

- **Lazy-loaded** routes and components

- **Tailwind-merge** and **clsx** for optimized styling

- **Gemini AI** handled via efficient POST request caching

## Light House Screenshots

- Homepage 

![App Screenshot](https://res.cloudinary.com/diumsbsrb/image/upload/v1753284929/Screenshot_2025-07-23_121714_untcu6.png)

- Transactions Page

![App Screenshot](https://res.cloudinary.com/diumsbsrb/image/upload/v1753284929/Screenshot_2025-07-23_121908_kdjpqq.png)

- Dashboard Page

![App Screenshot](https://res.cloudinary.com/diumsbsrb/image/upload/v1753284929/Screenshot_2025-07-23_121804_q8pkbp.png)


## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

