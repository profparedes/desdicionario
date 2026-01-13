import { GameState } from '../types/game.types';

const GAME_STATE_KEY = 'desdicionario_game_state';

export const saveGameState = (gameState: GameState): void => {
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
  } catch (error) {
    console.error('Erro ao salvar estado do jogo:', error);
  }
};

export const loadGameState = (): GameState | null => {
  try {
    const saved = localStorage.getItem(GAME_STATE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as GameState;
  } catch (error) {
    console.error('Erro ao carregar estado do jogo:', error);
    return null;
  }
};

export const clearGameState = (): void => {
  try {
    localStorage.removeItem(GAME_STATE_KEY);
  } catch (error) {
    console.error('Erro ao limpar estado do jogo:', error);
  }
};
