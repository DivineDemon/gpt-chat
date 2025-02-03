# GPT-Chat

GPT-Chat is a modern, feature-rich chat application powered by AI. It leverages cutting-edge technologies like Next.js, Prisma, Tailwind CSS, and OpenAI to deliver a seamless and intelligent chat experience. This project is designed to be extensible, developer-friendly, and highly customizable.

## Features

The following features have been implemented in the project:

- **Chat Persistence in DB**: Chats are stored in a database for future retrieval.
- **Chat Listing with Timeline**: View a list of chats organized by a timeline.
- **File Parsing**: Upload and parse files for extracting meaningful content.
- **Previous Chat as Input for LLM**: Use context from previous chats to enhance AI responses.
- **Web Search**: Integrate web search results into the chat for enriched responses.
- **Code Formatting in AI Response**: AI responses include properly formatted code snippets.
- **User Persistence in DB**: User data is stored securely in the database.
- **Message Copy**: Easily copy messages from the chat interface.
- **Chat CRUD**: Create, read, update, and delete chat sessions.
- **Generating Chat Title**: Automatically generate titles for chat sessions.

## Tech Stack

This project uses the following technologies:

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
- **Backend**: [Prisma](https://www.prisma.io/), [tRPC](https://trpc.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [OpenAI](https://openai.com/), [LangChain](https://www.langchain.com/)
- **Authentication**: [Kinde](https://kinde.com/)
- **Database**: PostgreSQL (via Prisma)
- **Utilities**: TypeScript, ESLint, Prettier

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd gpt-chat
Install dependencies:

npm install
Set up environment variables:

Copy the .env.example file to .env:
cp .env.example .env
Fill in the required values for API keys, database URL, and authentication settings.
Set up the database:

Push the Prisma schema to the database:
npm run db:push
Optionally, open Prisma Studio to inspect the database:
npm run db:studio
Start the development server:

npm run dev
Open the app in your browser at http://localhost:3000.

Scripts
The project includes several npm scripts for common tasks:

Development: npm run dev - Start the development server.
Build: npm run build - Build the application for production.
Linting: npm run lint - Run ESLint to check for code quality issues.
Type Checking: npm run typecheck - Run TypeScript type checks.
Formatting: npm run format:write - Format code using Prettier.
Database Management:
npm run db:push - Push the Prisma schema to the database.
npm run db:migrate - Apply database migrations.
npm run db:studio - Open Prisma Studio for database inspection.
File Structure
The project follows a modular and organized file structure:

gpt-chat/
├── src/
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions and libraries
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Next.js pages
│   ├── assets/           # Static assets (CSS, images, etc.)
│   └── prisma/           # Prisma schema and migrations
├── .env.example          # Environment variable template
├── .eslintrc.mjs         # ESLint configuration
├── .gitignore            # Git ignore rules
├── package.json          # Project metadata and dependencies
├── prettier.config.mjs   # Prettier configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
Configuration
Environment Variables
The project relies on several environment variables for configuration. Below is a list of the required variables:

IMGBB_KEY=
SERPER_KEY=
OPENAI_KEY=
DATABASE_URL=

KINDE_SITE_URL=
KINDE_ISSUER_URL=
KINDE_CLIENT_ID=
KINDE_POST_LOGOUT_REDIRECT_URL=
KINDE_POST_LOGIN_REDIRECT_URL=
KINDE_CLIENT_SECRET=
NEXT_PUBLIC_KINDE_EMAIL_CONNECTION_ID=
NEXT_PUBLIC_KINDE_GITHUB_CONNECTION_ID=
NEXT_PUBLIC_KINDE_GOOGLE_CONNECTION_ID=
Refer to the .env.example file for guidance on setting these variables.

Tailwind CSS
The tailwind.config.ts file customizes the Tailwind CSS setup, including theme extensions for colors, border radii, and animations. It also integrates the tailwindcss-animate plugin for additional animation utilities.

ESLint and Prettier
The project enforces code quality and formatting standards using ESLint and Prettier. Custom rules are defined in .eslintrc.mjs and prettier.config.mjs.

License
This project is licensed under the MIT License. You are free to use, modify, and distribute the software, provided you include the original copyright notice and license in any copies or substantial portions of the software.

Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch for your feature or bug fix:
git checkout -b feature-name
Make your changes and commit them:
git commit -m "Add feature-name"
Push your branch to your fork:
git push origin feature-name
Open a pull request to the main repository.
Acknowledgments
This project uses several open-source libraries and tools. Special thanks to the developers of:

Next.js
Prisma
Tailwind CSS
OpenAI
LangChain

---

Feel free to reach out if you have any questions or need assistance!
