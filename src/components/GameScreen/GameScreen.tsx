import { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import styled from 'styled-components';
import { GameState } from '../../types/game.types';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background: #00FFEF;
`;

const Card = styled(Paper)`
  && {
    background: #1a1a1a !important;
    border-radius: 20px;
    padding: 28px;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
`;

const Label = styled(Typography)`
  color: #888;
  font-size: 12px !important;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const WordCard = styled(Box)`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  text-align: center;
`;

const WordText = styled(Typography)`
  color: #fff;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: -0.5px;
`;

const TeamName = styled(Typography)`
  color: #fff;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
  letter-spacing: -0.5px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 32px;
  
  .MuiOutlinedInput-root {
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    &.Mui-focused {
      border-color: #00FFEF;
      background: rgba(255, 255, 255, 0.08);
    }
  }
  
  .MuiInputLabel-root {
    color: #888;
    
    &.Mui-focused {
      color: #00FFEF;
    }
  }
  
  .MuiOutlinedInput-input {
    color: #fff;
  }
  
  textarea {
    min-height: auto;
    max-height: none;
  }
`;

const NextButton = styled(Button)`
  && {
    background-color: #FF8300 !important;
    color: #fff !important;
    font-size: 16px;
    font-weight: bold;
    padding: 12px 24px;
    border-radius: 12px;
    text-transform: none;
    width: 100%;
    box-shadow: 0 4px 12px rgba(255, 131, 0, 0.3);
    margin-top: 16px;
    
    &:hover {
      background-color: #E67400 !important;
      box-shadow: 0 6px 16px rgba(255, 131, 0, 0.4);
    }
    
    &:disabled {
      background-color: #666 !important;
      color: #999 !important;
      box-shadow: none;
    }
  }
`;

const PlayButton = styled(Button)`
  && {
    background-color: #FF8300 !important;
    color: #fff !important;
    font-size: 18px;
    font-weight: bold;
    padding: 16px 32px;
    border-radius: 12px;
    text-transform: none;
    width: 100%;
    box-shadow: 0 4px 12px rgba(255, 131, 0, 0.3);
    
    &:hover {
      background-color: #E67400 !important;
      box-shadow: 0 6px 16px rgba(255, 131, 0, 0.4);
    }
  }
`;

const ChangeWordButton = styled(Button)`
  && {
    background-color: rgba(255, 255, 255, 0.1) !important;
    color: #fff !important;
    font-size: 14px;
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 12px;
    text-transform: none;
    width: 100%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    margin-top: 12px;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.15) !important;
      border-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

interface GameScreenProps {
  gameState: GameState;
  onAnswerSubmit: (answer: string, onComplete?: (updatedState: GameState) => void) => void;
  onStartVoting: (stateWithAllAnswers?: GameState) => void;
  onChangeWord: () => void;
}

export const GameScreen = ({ gameState, onAnswerSubmit, onStartVoting, onChangeWord }: GameScreenProps) => {
  const [answer, setAnswer] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [openChangeWordDialog, setOpenChangeWordDialog] = useState(false);
  const currentTeam = gameState.teams[gameState.currentTeamIndex];
  const isFirstTeam = gameState.currentTeamIndex === 0;
  const isLastTeam = gameState.currentTeamIndex === gameState.teams.length - 1;
  const existingAnswer = gameState.answers.find(a => a.teamId === currentTeam.id && !a.isTrueDefinition);

  useEffect(() => {
    // Limpar input quando mudar de time
    setAnswer('');
    setHasStarted(false);

    // Se já existe resposta salva para este time, carregar
    if (existingAnswer) {
      setAnswer(existingAnswer.answer);
      setHasStarted(true);
    }
  }, [gameState.currentTeamIndex, existingAnswer]);

  const handlePlay = () => {
    setHasStarted(true);
  };

  const handleNext = () => {
    if (answer.trim().length > 0) {
      if (isLastTeam) {
        // Para o último time, salva e inicia votação após salvar
        onAnswerSubmit(answer.trim(), (updatedState) => {
          // Passar o estado atualizado para garantir que todas as respostas estejam incluídas
          onStartVoting(updatedState);
        });
      } else {
        // Para outros times, apenas salva e avança
        onAnswerSubmit(answer.trim());
      }
    }
  };

  const handleOpenChangeWordDialog = () => {
    setOpenChangeWordDialog(true);
  };

  const handleCloseChangeWordDialog = () => {
    setOpenChangeWordDialog(false);
  };

  const handleConfirmChangeWord = () => {
    onChangeWord();
    setOpenChangeWordDialog(false);
  };

  if (!hasStarted) {
    return (
      <Container>
        <Card>
          <Label>Time</Label>
          <TeamName variant="h5">{currentTeam.name}</TeamName>
          <Label sx={{ mt: 3 }}>Palavra</Label>
          <WordCard>
            <WordText>{gameState.currentWord}</WordText>
          </WordCard>
          <PlayButton variant="contained" onClick={handlePlay}>
            Jogar
          </PlayButton>
          {isFirstTeam && (
            <ChangeWordButton variant="outlined" onClick={handleOpenChangeWordDialog}>
              Sortear nova palavra
            </ChangeWordButton>
          )}
        </Card>

        <Dialog
          open={openChangeWordDialog}
          onClose={handleCloseChangeWordDialog}
          PaperProps={{
            sx: {
              backgroundColor: '#1a1a1a',
              color: '#fff',
              borderRadius: '16px',
              padding: '8px',
            }
          }}
        >
          <DialogTitle sx={{ color: '#fff', fontWeight: 700 }}>
            Sortear Nova Palavra
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: '#aaa', lineHeight: 1.6 }}>
              Se você acha que essa palavra já é conhecida por algum dos jogadores, você pode alterar essa palavra, mas lembre-se de comunicar a todos sobre a troca e a nova palavra que vai ser usada!
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ padding: '16px 24px' }}>
            <Button
              onClick={handleCloseChangeWordDialog}
              sx={{
                color: '#aaa',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmChangeWord}
              sx={{
                backgroundColor: '#FF8300',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#E67400'
                }
              }}
              variant="contained"
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Label>Time</Label>
        <TeamName variant="h5">{currentTeam.name}</TeamName>

        <Label sx={{ mt: 3 }}>Palavra</Label>
        <WordCard>
          <WordText>{gameState.currentWord}</WordText>
        </WordCard>

        <StyledTextField
          label="Crie um significado falso"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          multiline
          rows={6}
          variant="outlined"
          placeholder="Escreva um significado criativo..."
        />

        <NextButton
          variant="contained"
          onClick={handleNext}
          disabled={answer.trim().length === 0}
        >
          {isLastTeam ? 'Iniciar votação' : 'Próximo time'}
        </NextButton>
      </Card>
    </Container>
  );
};
