export interface Team {
  id: string;
  name: string;
  score: number;
}

export interface Word {
  word: string;
  definition: string;
}

export interface Answer {
  teamId: string;
  teamName: string;
  answer: string;
  isTrueDefinition?: boolean; // Indica se é a definição verdadeira do dicionário
}

export interface Vote {
  teamId: string;
  teamName: string;
  answerIndex: number;
}

export type GamePhase = 'writing' | 'voting' | 'results';

export interface GameState {
  teams: Team[];
  currentRound: number;
  currentWord: string;
  currentWordDefinition: string;
  currentTeamIndex: number;
  answers: Answer[];
  votes: Vote[];
  gamePhase: GamePhase;
  trueDefinitionIndex?: number; // Índice da definição verdadeira no array de respostas para votação
}
