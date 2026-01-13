import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Home } from './components/Home/Home';
import { CreateGame } from './components/CreateGame/CreateGame';
import { GameScreen } from './components/GameScreen/GameScreen';
import { VotingScreen } from './components/VotingScreen/VotingScreen';
import { ResultsScreen } from './components/ResultsScreen/ResultsScreen';
import { Rules } from './components/Rules/Rules';
import { GameState, Team, Answer } from './types/game.types';
import { wordsList } from './data/words';
import { saveGameState, loadGameState, clearGameState } from './utils/localStorage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00FFEF',
    },
    secondary: {
      main: '#FF8300',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

type Screen = 'home' | 'create' | 'game' | 'voting' | 'results' | 'rules';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    // Carregar estado salvo ao iniciar
    const saved = loadGameState();
    if (saved) {
      setGameState(saved);
      setScreen(saved.gamePhase === 'writing' ? 'game' : saved.gamePhase === 'voting' ? 'voting' : 'results');
    }
  }, []);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    return wordsList[randomIndex];
  };

  const handleCreateGame = () => {
    setScreen('create');
  };

  const handleShowRules = () => {
    setScreen('rules');
  };

  const handleBackFromRules = () => {
    setScreen('home');
  };

  const handleStartGame = (teams: Team[]) => {
    const word = getRandomWord();
    const newGameState: GameState = {
      teams,
      currentRound: 1,
      currentWord: word.word,
      currentWordDefinition: word.definition,
      currentTeamIndex: 0,
      answers: [],
      votes: [],
      gamePhase: 'writing',
    };
    setGameState(newGameState);
    saveGameState(newGameState);
    setScreen('game');
  };

  const handleAnswerSubmit = (answer: string, onComplete?: (updatedState: GameState) => void) => {
    if (!gameState) return;

    const currentTeam = gameState.teams[gameState.currentTeamIndex];

    const newAnswer = {
      teamId: currentTeam.id,
      teamName: currentTeam.name,
      answer,
    };

    const updatedAnswers = [...gameState.answers];
    const existingIndex = updatedAnswers.findIndex(a => a.teamId === currentTeam.id);
    if (existingIndex >= 0) {
      updatedAnswers[existingIndex] = newAnswer;
    } else {
      updatedAnswers.push(newAnswer);
    }

    const nextTeamIndex = (gameState.currentTeamIndex + 1) % gameState.teams.length;
    const updatedState: GameState = {
      ...gameState,
      answers: updatedAnswers,
      currentTeamIndex: nextTeamIndex,
    };

    setGameState(updatedState);
    saveGameState(updatedState);

    if (onComplete) {
      // Passar o estado atualizado para o callback
      onComplete(updatedState);
    }
  };

  const handleStartVoting = (stateWithAllAnswers?: GameState) => {
    // Usar o estado passado como parâmetro ou o estado atual
    const currentState = stateWithAllAnswers || gameState;
    if (!currentState) return;

    // Verificar se todas as respostas foram salvas (uma por time)
    if (currentState.answers.length !== currentState.teams.length) {
      console.warn('Nem todas as respostas foram salvas. Respostas:', currentState.answers.length, 'Times:', currentState.teams.length);
      // Mesmo assim, continuar com a votação com as respostas que temos
    }

    // Adicionar a definição verdadeira como uma resposta adicional
    const trueDefinitionAnswer: Answer = {
      teamId: '__TRUE_DEFINITION__',
      teamName: 'Definição Verdadeira',
      answer: currentState.currentWordDefinition,
      isTrueDefinition: true,
    };

    // Criar array com todas as respostas + definição verdadeira
    const allAnswersForVoting = [...currentState.answers, trueDefinitionAnswer];

    // Embaralhar as respostas para votação
    const shuffled = [...allAnswersForVoting];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Encontrar o índice da definição verdadeira após embaralhar
    const trueDefinitionIndex = shuffled.findIndex(a => a.isTrueDefinition);

    // A resposta do último time já foi salva pelo handleAnswerSubmit
    // Mudamos para a fase de votação, resetamos o índice do time e salvamos as respostas embaralhadas
    const updatedState: GameState = {
      ...currentState,
      answers: shuffled,
      currentTeamIndex: 0,
      gamePhase: 'voting',
      trueDefinitionIndex,
    };

    setGameState(updatedState);
    saveGameState(updatedState);
    setScreen('voting');
  };

  const handleVote = (answerIndex: number) => {
    if (!gameState) return;

    const currentTeam = gameState.teams[gameState.currentTeamIndex];
    const newVote = {
      teamId: currentTeam.id,
      teamName: currentTeam.name,
      answerIndex,
    };

    const updatedVotes = [...gameState.votes];
    const existingIndex = updatedVotes.findIndex(v => v.teamId === currentTeam.id);
    if (existingIndex >= 0) {
      updatedVotes[existingIndex] = newVote;
    } else {
      updatedVotes.push(newVote);
    }

    const allTeamsVoted = updatedVotes.length === gameState.teams.length;

    if (allTeamsVoted) {
      const updatedState: GameState = {
        ...gameState,
        votes: updatedVotes,
        gamePhase: 'results',
      };
      setGameState(updatedState);
      saveGameState(updatedState);
      setScreen('results');
    } else {
      const nextTeamIndex = (gameState.currentTeamIndex + 1) % gameState.teams.length;
      const updatedState: GameState = {
        ...gameState,
        votes: updatedVotes,
        currentTeamIndex: nextTeamIndex,
      };
      setGameState(updatedState);
      saveGameState(updatedState);
    }
  };

  const handleNextRound = () => {
    if (!gameState) return;

    // Calcular e atualizar pontuação
    const roundScores: { [teamId: string]: number } = {};
    gameState.teams.forEach(team => {
      roundScores[team.id] = 0;
    });

    // Encontrar o índice da resposta verdadeira
    const trueDefinitionIndex = gameState.trueDefinitionIndex ?? gameState.answers.findIndex(a => a.isTrueDefinition);

    // Pontos para quem votou na resposta verdadeira
    gameState.votes.forEach(vote => {
      if (vote.answerIndex === trueDefinitionIndex) {
        roundScores[vote.teamId] = (roundScores[vote.teamId] || 0) + 1;
      }
    });

    // Pontos para criadores de respostas votadas (mas não se for a definição verdadeira)
    gameState.votes.forEach(vote => {
      const answer = gameState.answers[vote.answerIndex];
      if (!answer.isTrueDefinition && answer.teamId !== '__TRUE_DEFINITION__') {
        roundScores[answer.teamId] = (roundScores[answer.teamId] || 0) + 1;
      }
    });

    const updatedTeams = gameState.teams.map(team => ({
      ...team,
      score: team.score + (roundScores[team.id] || 0),
    }));

    // Nova palavra
    const word = getRandomWord();

    const newGameState: GameState = {
      teams: updatedTeams,
      currentRound: gameState.currentRound + 1,
      currentWord: word.word,
      currentWordDefinition: word.definition,
      currentTeamIndex: 0,
      answers: [],
      votes: [],
      gamePhase: 'writing',
    };

    setGameState(newGameState);
    saveGameState(newGameState);
    setScreen('game');
  };

  const handleBack = () => {
    setScreen('home');
  };

  const handleResetGame = () => {
    try {
      clearGameState();
      setGameState(null);
      setScreen('create');
    } catch (error) {
      console.error('Erro ao resetar jogo:', error);
      // Mesmo com erro, tenta resetar
      setGameState(null);
      setScreen('create');
    }
  };

  const handleChangeWord = () => {
    if (!gameState) return;

    const word = getRandomWord();
    const updatedState: GameState = {
      ...gameState,
      currentWord: word.word,
      currentWordDefinition: word.definition,
    };

    setGameState(updatedState);
    saveGameState(updatedState);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {screen === 'home' && <Home onCreateGame={handleCreateGame} onShowRules={handleShowRules} />}
      {screen === 'rules' && (
        <Rules onBack={handleBackFromRules} onStartGame={handleCreateGame} />
      )}
      {screen === 'create' && (
        <CreateGame onStartGame={handleStartGame} onBack={handleBack} />
      )}
      {screen === 'game' && gameState && (
        <GameScreen
          gameState={gameState}
          onAnswerSubmit={handleAnswerSubmit}
          onStartVoting={handleStartVoting}
          onChangeWord={handleChangeWord}
        />
      )}
      {screen === 'voting' && gameState && (
        <VotingScreen gameState={gameState} onVote={handleVote} />
      )}
      {screen === 'results' && gameState && (
        <ResultsScreen gameState={gameState} onNextRound={handleNextRound} onResetGame={handleResetGame} />
      )}
    </ThemeProvider>
  );
}

export default App;
