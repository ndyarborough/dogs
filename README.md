# Take Home Fetch

This project is a React-based application using NextJS for the UI, TailwindCSS for styling, and ESLint for linting. The app is deployed to GitHub Pages.

## About the App

Take Home Fetch is a dog-finding application that allows users to browse available dogs, apply filters to refine their search, and select a group of favorites. From the selected favorites, the app will match the user with a single dog for adoption.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/ndyarborough/take-home-fetch.git
   cd take-home-fetch
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```
   The application will be available at `http://localhost:5173/` (default Vite port). Check the terminal for the exact URL if it's different.

## Building for Production

To create an optimized build of the project, run:

```sh
npm run build
```

This will generate a `dist/` folder containing the production-ready files.

## Previewing the Production Build

To preview the built app locally, use:

```sh
npm run preview
```

## Linting

To check for linting issues, run:

```sh
npm run lint
```

## Deployment

The project is set up to deploy to GitHub Pages. To deploy, run:

```sh
npm run deploy
```

This will build the project and push the `dist/` folder to the `gh-pages` branch.

## License

This project is licensed under the MIT License.
