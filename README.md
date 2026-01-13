# Desdicionário

A creative word game built with React and TypeScript where teams compete by creating fake definitions for unknown words, trying to fool other players while attempting to identify the true definition.

## 🎮 About the Game

Desdicionário (Dictionary Game) is an interactive party game that combines creativity, strategy, and deception. Players are divided into teams, and each team creates a fake definition for a randomly selected obscure word. During voting, all definitions (including the true one) are shuffled) are presented, and teams vote on which they believe is the real definition.

### Game Mechanics

- **Word Selection**: A random word is selected from a curated list of obscure Portuguese words
- **Definition Creation**: Each team creates their own fake definition
- **Voting Phase**: All definitions (including the true one) are shuffled and presented for voting
- **Scoring**: 
  - Teams earn 1 point for voting on the correct definition
  - Teams earn 1 point for each vote their fake definition receives

## 🚀 Technologies Used

- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type safety
- **Vite 5.0.8** - Build tool and dev server
- **Material-UI (MUI) 5.15.0** - Component library
- **Styled Components 6.1.1** - CSS-in-JS styling
- **ESLint** - Code linting

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone git@github.com:profparedes/desdicionario.git
```

2. Navigate to the project directory:
```bash
cd desdicionario
```

3. Install dependencies:
```bash
npm install
```

or if using yarn:
```bash
yarn install
```

## 🎯 Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

or with yarn:
```bash
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build for Production

Create a production build:
```bash
npm run build
```

The build files will be generated in the `dist` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```
desdicionario/
├── src/
│   ├── components/
│   │   ├── CreateGame/      # Team creation screen
│   │   ├── GameScreen/       # Definition writing screen
│   │   ├── Home/            # Home screen
│   │   ├── ResultsScreen/    # Results and scoring screen
│   │   ├── Rules/            # Game rules screen
│   │   └── VotingScreen/     # Voting phase screen
│   ├── data/
│   │   └── words.ts          # Word database
│   ├── types/
│   │   └── game.types.ts      # TypeScript type definitions
│   ├── utils/
│   │   └── localStorage.ts   # Local storage utilities
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎲 Features

- **Team Management**: Create and manage multiple teams
- **Word Database**: 400+ obscure Portuguese words with definitions
- **Random Word Selection**: First team can request a new word if needed
- **Shuffled Voting**: True definition is randomly mixed with fake ones
- **Score Tracking**: Automatic score calculation and tracking
- **Game State Persistence**: Game state saved in browser localStorage
- **Responsive Design**: Works on desktop and mobile devices
- **Rules Screen**: Comprehensive game rules and instructions

## 🎨 Game Flow

1. **Home Screen**: Start a new game or view rules
2. **Create Teams**: Add teams to participate
3. **Writing Phase**: Each team creates a fake definition
4. **Voting Phase**: Teams vote on which definition they think is real
5. **Results**: See scores and correct answers
6. **Next Round**: Continue with a new word

## 🧪 Development

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## 📝 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👤 Author

**Prof. Paredes**

- GitHub: [@profparedes](https://github.com/profparedes)

## 🙏 Acknowledgments

- Word database curated with obscure Portuguese words
- Built with modern React and TypeScript best practices
