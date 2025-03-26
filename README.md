# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# CriticsWorld Frontend

This project is a React-based frontend application built with Vite. It provides a modern development environment with features like Hot Module Replacement (HMR), ESLint integration, and Tailwind CSS for styling.

## Features

- **React + Vite**: Fast development environment with HMR.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: Dynamic routing for navigation.
- **Protected Routes**: Includes `Protected` and `AdminProtected` components for route protection.
- **Reusable Components**: Modular components like `Header`, `Footer`, `MoviesList`, and more.
- **Custom Styling**: Includes global styles in `src/index.css` with custom utilities like `.no-scrollbar`.
- **Axios Configuration**: Pre-configured Axios instance for API calls with dynamic base URL and token handling.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/criticsworld-frontend.git
   cd criticsworld-frontend


2. Install dependencies:
   ```sh
   npm install

3. Start the development server:
    ```sh
   npm run dev

4. Open the app in your browser at http://localhost:5173

5. Axios Configuration
    The Axios instance is pre-configured in src/main.jsx to dynamically set the base URL based on the protocol and include the token from local storage:
    import axios from "axios";

6. Routing
   ```
    The application uses React Router for navigation. Below are the main routes:
        /signin: Login page.
        /signup: Registration page.
        /forgotPassword: Forgot Password page.
        /resetPassword/:token/:id: Reset Password page.
        /: Protected route for the home page.
        /details/:id/:title: Movie details page.
        /profile: User profile page.
        /search/:keyword: Search results page.
        /addmovie: Admin-only route to add a movie.
        /editMovie/:id: Admin-only route to edit a movie.
        *: 404 page.
   ```

8. Project Structure
   ```
    .gitignore
    Dockerfile
    [index.html](http://_vscodecontentref_/0)
    [package.json](http://_vscodecontentref_/1)
    [postcss.config.js](http://_vscodecontentref_/2)
    [README.md](http://_vscodecontentref_/3)
    [schema.sql](http://_vscodecontentref_/4)
    [tailwind.config.js](http://_vscodecontentref_/5)
    [vite.config.js](http://_vscodecontentref_/6)
    public/
    vite.svg
    assets/
        data.json
        css/
        images/
    src/
    App.css
    App.jsx
    index.css
    main.jsx
    components/
        AdminProtected.jsx
        ContextAPI.jsx
        Footer.jsx
        GoToTop.jsx
        Header.jsx
        Loader.jsx
        MoviesList.jsx
        PopUp.jsx
    pages/
        Home.jsx
        Details.jsx
        Login.jsx
        Register.jsx
        Profile.jsx
        AddMovie.jsx
        EditMovie.jsx
        ResetPassword.jsx
        ForgotPassword.jsx
        Search.jsx
        Page404.jsx
   ```

10. Scripts
    ```
    npm run dev: Start the development server.
    npm run build: Build the project for production.
    npm run preview: Preview the production build.
    npm run lint: Run ESLint to check for code quality.
    ```

##**Deployment**##

1. Build the project:
    ```sh
    npm run build

2. Deploy the dist/ folder to your hosting provider.

# CriticsWorld Frontend

CriticsWorld is an interactive platform where users can post, edit, and delete movie reviews, and admins have special privileges to manage the movie database and moderate reviews.

## Live Demo

You can check out the deployed version of the project here:  
[https://critics-world-frontend.vercel.app/](https://critics-world-frontend.vercel.app/)

## Features

### User Features:
- Post Reviews: Users can write reviews for movies they have watched.
- Edit Reviews: Users can edit their previously posted reviews.
- Delete Reviews: Users can delete their reviews if necessary.
- Profile Edit: Users can edit their profile information.

### Admin Features:
- Manage Movies: Admins can add or delete movies from the database.
- Moderate Reviews: Admins can delete any inappropriate reviews posted by users.

## Credentials

### User Login:
- Email: `user@gmail.com`
- Password: `123456`

### Admin Login:
- Email: `admin@gmail.com`
- Password: `123456`

## Technologies Used:
- React: A JavaScript library for building user interfaces.
- Vite: A fast build tool that offers fast refresh and an optimized development experience.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
   
## Author 
    Vinay Billa
