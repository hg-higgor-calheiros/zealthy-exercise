# Zealthy Onboarding Exercise

This project is a monorepo setup consisting of a backend built with **Nest.js** and a frontend built with **Next.js**. It simulates an onboarding tool with a login screen and a sign up form with three steps, an admin panel for component selection, and a data page for displaying user data.

## Table of Contents
- [General Information](#general-information)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Project](#running-the-project)
- [Disclaimer](#disclaimer)

---

## General Information

The purpose of this project is to demonstrate a simple onboarding tool with a login screen, a multi-step sign up form, an admin panel for managing UI components and in which order they are presented, and a data page to display information entered by the user.

### Features:
1. **Login**: A simple login form to validate user credentials.
2. **Onboarding Tool**: A multi-step process where users provide input across 3 steps.
3. **Admin Panel**: Admin users can configure which components appear on each page of the onboarding tool.
4. **Data Page**: Displays user-submitted data.

### Use Cases:
- Simulate a real-world onboarding process where steps are customizable.
- Admin interface to adjust the user interface dynamically.
- Rudimentary login flow
- Data presentation

---

## Project Structure

The project follows a monorepo structure with two main parts:
- `backend`: The Nest.js backend API.
- `frontend`: The Next.js frontend application.

```bash
/monorepo-root
|-- backend/
|-- frontend/
|-- .gitignore
|-- package.json
|-- README.md
```

## Tech Stack

This project utilizes the following technologies:

### Backend
- **Nest.js**: A TypeScript-first framework built for building scalable and maintainable server-side applications.
- **TypeORM**: A popular ORM (Object-Relational Mapper) that works with SQL databases, providing an easy way to interact with the database through entities and repositories.
- **MySQL**: Relational database management for storing user data, configurations, and metadata.

### Frontend
- **Next.js**: A React-based framework for building server-side rendered applications with support for static site generation (SSG) and server-side rendering (SSR).
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs quickly without needing to leave your HTML markup.

## Installation

To set up and run the project locally, follow the steps below.

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (or **yarn**)

### Monorepo setup

This is a simple monorepo implementation but the dependency management and the running commands can be done from the root project.

#### Install dependencies

Open a new terminal and navigate to the root of the project:
   ```bash
    $ npm i
   ```

Configure the environment variables for each project:

Create a .env file based on the .env.example file.
Set up your database connection and any necessary configuration keys.

#### Running the projects

Open a new terminal and navigate to the root of the project:
   ```bash
    $ npm run dev
   ```

By default, the backend will run on http://localhost:5000 and the frontend will run on http://localhost:3000.

### Disclaimer

This project is a **coding exercise** and is not intended for production use. The project was timeboxed within 5 hours so some things were skipped due to time restrictions. The following limitations and assumptions apply:

- **Authentication & Authorization**: User authentication and authorization mechanisms are simplified for demonstration purposes. No complex security measures are implemented, and it is not production-ready.
- **UI Design**: The user interface is minimalistic and should not be considered representative of a production-grade UI. It serves to demonstrate functionality and not design principles.
- **Backend**: The backend is a basic implementation for demonstration purposes and include very basic business logic and validation.
- **Database**: Database handling and data structures are basic, designed to demonstrate data storage and retrieval rather than focusing on optimization or scalability.

This project is **not** suitable for production environments and is intended solely to demonstrate basic functionality and key concepts in modern web development.