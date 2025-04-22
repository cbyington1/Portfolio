# Camden's Portfolio

A portfolio website built with React and Vite, featuring a dynamic particle background and showcasing my projects and skills.

## Live Demo

Visit my portfolio at: [https://cbyington1.github.io/Portfolio/](https://cbyington1.github.io/Portfolio/)

## Features

- Interactive particle background with customizable themes
- Responsive design for all devices
- Project showcase with carousel navigation
- Skills section with categorized abilities
- Contact form
- Smooth scrolling navigation

## Technologies Used

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React (for icons)

## Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/cbyington1/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
Portfolio/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and other assets
│   ├── components/
│   │   ├── layout/     # Layout components like Navigation and ParticleBackground
│   │   ├── sections/   # Main page sections (About, Skills, Projects, etc.)
│   │   └── ui/         # Reusable UI components
│   ├── data/           # Data files for projects, skills, etc.
│   ├── pages/          # Page components
│   └── styles/         # Global styles
├── App.jsx             # Main app component
└── main.jsx           # Entry point
```

## Deployment

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch. The changes will be visible on your GitHub Pages site typically within 5-30 minutes.

### Manually Build for Production

```bash
npm run build
```

This will generate a production build in the `dist` directory.
