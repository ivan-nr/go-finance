# GoFinance - Personal Finance Management Application

GoFinance is a modern, responsive web application for managing personal finances. It provides users with the ability to track their transactions, manage their profile, and maintain a secure account.

## Features

- **User Authentication**: Register and login
- **Transaction Management**: Create, read, update, and delete financial transactions
- **User Profile**: Manage personal information and account details
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Modern UI**: Clean and intuitive user interface built with shadcn/ui

## Tech Stack

- **Frontend**:

  - Next.js 15 with App Router
  - React 18
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components

- **State Management**:

  - React Context API
  - React Hook Form with Zod validation

- **API Integration**:
  - Integration with Fake REST API (reqres.in)
  - Simulated transaction data

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm, npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/ivan-nr/go-finance.git
   cd go-finance

   ```

2. Install dependencies:

   ```bash
   pnpm install

   ```

3. Create a .env.local file in the root directory and configure the necessary environment variables:

   ```bash
   NEXT_PUBLIC_API_URL=https://reqres.in/api

   ```

4. Start the development server:

   ```bash
   pnpm dev

   ```

5. Open your browser and visit:

   ```bash
   http://localhost:3000
   ```

## 📝 How to Register on Reqres.in

Since reqres.in is a fake API, it provides a fixed set of users for authentication. The API does not store new users, so registration will always return a static response.

- Registering a User

Make a POST request to <https://reqres.in/api/register> with the following payload:

```bash
{
    "email": "eve.holt@reqres.in",
    "password": "pistol"
}
```

- Logging In

Make a POST request to <https://reqres.in/api/login> with the same credentials:

```bash
{
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
}
```

Use this token to authenticate requests for profile and transactions.
