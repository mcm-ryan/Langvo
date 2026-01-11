# Langvo

A conversation-first language learning platform that pairs learners with real bilingual humans for spontaneous, on-demand language practice.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js Server Actions, Prisma ORM
- **Database:** PostgreSQL
- **Real-time:** Redis for presence, WebRTC (Daily.co or LiveKit) for calls
- **Auth:** Auth.js (NextAuth v5) with Google OAuth
- **Infrastructure:** Docker & Docker Compose

## Getting Started

### Prerequisites

- Node.js 20+
- Docker and Docker Compose
- npm or pnpm

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Langvo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration (database URL, auth secrets, etc.)

4. **Start the database and Redis with Docker**
   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

6. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Management

- **Create a new migration:**
  ```bash
  npx prisma migrate dev --name your_migration_name
  ```

- **Open Prisma Studio (database GUI):**
  ```bash
  npx prisma studio
  ```

- **Reset database:**
  ```bash
  npx prisma migrate reset
  ```

### Docker Production Build

To run the full application stack (app + database + redis):

```bash
docker compose up --build
```

### Project Structure

```
Langvo/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Learner dashboard
│   ├── tutor/             # Tutor dashboard
│   ├── practice/          # Practice session pages
│   └── generated/         # Generated Prisma client
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Auth components
│   ├── dashboard/        # Dashboard components
│   ├── tutor/            # Tutor components
│   ├── practice/         # Practice components
│   └── shared/           # Shared components
├── lib/                   # Utilities and helpers
│   ├── actions/          # Server actions
│   ├── hooks/            # React hooks
│   └── utils/            # Utility functions
├── prisma/               # Database schema and migrations
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## MVP Features

- Audio-only calls between learners and tutors
- On-demand matching (no scheduling)
- Weekly expiring points system
- Learner tips for tutors
- Random tutor selection
- Manual tutor approval
- Call duration limits (10-15 minutes)

## Development Workflow

1. Create feature branch from `main`
2. Make changes
3. Test locally
4. Create pull request
5. Merge after review

## License

Proprietary
