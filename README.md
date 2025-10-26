# Tido - Task Management Application

A modern, full-stack task management application built with Next.js 15, TypeScript, and PostgreSQL. Tido helps you organize your daily tasks, set priorities, track progress, and stay productive with an intuitive and responsive interface.

## Features

- **Task Management**: Create, update, and delete tasks with ease
- **Priority System**: Set task priorities (Low, Medium, High)
- **Status Tracking**: Track task status (Pending, In Progress, Completed)
- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Responsive Design**: Modern UI that works on desktop, tablet, and mobile
- **Real-time Updates**: See changes as they happen
- **Drag & Drop**: Intuitive task organization with @dnd-kit
- **Data Visualization**: Task analytics with Recharts
- **Type Safety**: Full TypeScript support with Zod validation
- **Dark Mode**: Built-in theme switching support

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons

### Backend

- **Next.js Server Actions** - Server-side API logic
- **PostgreSQL** - Robust relational database
- **Drizzle ORM** - Type-safe database operations
- **JWT** - Secure authentication
- **bcrypt** - Password hashing
- **Zod** - Runtime type validation

### Development

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Drizzle Kit** - Database migrations

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+
- npm, yarn, pnpm, or bun
- PostgreSQL database
- Git

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/task-manager-v2.git
   cd task-manager-v2
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/task_manager"
   JWT_SECRET="your-super-secret-jwt-key"
   NODE_ENV="development"
   ```

4. **Set up the database**

   ```bash
   npm run db:push
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
task-manager-v2/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (marketing)/       # Marketing pages
│   ├── actions/           # Server actions
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── tasks/             # Task management pages
│   └── data/              # Database operations
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── db/                   # Database schema and connection
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Usage

### Creating Tasks

1. Sign up or log in to your account
2. Navigate to the dashboard
3. Click "Create Task" or use the quick create button
4. Fill in task details (title, description, priority, status)
5. Save your task

### Managing Tasks

- **View Tasks**: All tasks are displayed on the dashboard
- **Edit Tasks**: Click on any task to edit its details
- **Delete Tasks**: Remove tasks you no longer need
- **Filter & Sort**: Organize tasks by status, priority, or date

### User Authentication

- **Sign Up**: Create a new account with email and password
- **Sign In**: Access your account with your credentials
- **Sign Out**: Securely log out of your account

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass before submitting

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
