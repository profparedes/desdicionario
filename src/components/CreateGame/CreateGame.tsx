import { useState } from 'react';
import { Button, TextField, Box, Typography, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import styled from 'styled-components';
import { Team } from '../../types/game.types';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: #00FFEF;
`;

const FormContainer = styled(Box)`
  && {
    background: #1a1a1a !important;
    border-radius: 20px;
    padding: 28px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
`;

const Title = styled(Typography)`
  color: #fff;
  font-weight: 800;
  margin-bottom: 32px;
  text-align: center;
  font-size: 28px;
  letter-spacing: -0.5px;
`;

const TeamInputContainer = styled(Box)`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  flex: 1;
  
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
`;

const AddButton = styled(IconButton)`
  background-color: #00FFEF !important;
  color: #000 !important;
  width: 48px;
  height: 48px;
  border-radius: 50% !important;
  
  &:hover {
    background-color: #00E6D6 !important;
  }
`;

const DeleteButton = styled(IconButton)`
  background-color: #ff4444 !important;
  color: #fff !important;
  width: 40px;
  height: 40px;
  
  &:hover {
    background-color: #cc0000 !important;
  }
`;

const StartButton = styled(Button)`
  && {
    background-color: #FF8300 !important;
    color: #fff !important;
    font-size: 16px;
    font-weight: bold;
    padding: 12px 24px;
    border-radius: 12px;
    text-transform: none;
    width: 100%;
    margin-top: 16px;
    box-shadow: 0 4px 12px rgba(255, 131, 0, 0.3);
    
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

interface CreateGameProps {
  onStartGame: (teams: Team[]) => void;
  onBack: () => void;
}

export const CreateGame = ({ onStartGame, onBack }: CreateGameProps) => {
  const [teamNames, setTeamNames] = useState<string[]>(['', '']);

  const handleAddTeam = () => {
    setTeamNames([...teamNames, '']);
  };

  const handleRemoveTeam = (index: number) => {
    if (teamNames.length > 2) {
      const newTeamNames = teamNames.filter((_, i) => i !== index);
      setTeamNames(newTeamNames);
    }
  };

  const handleTeamNameChange = (index: number, value: string) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = value;
    setTeamNames(newTeamNames);
  };

  const handleStartGame = () => {
    const validTeams = teamNames
      .map((name, index) => ({ name: name.trim(), index }))
      .filter(({ name }) => name.length > 0);

    if (validTeams.length >= 2) {
      const teams: Team[] = validTeams.map(({ name, index }) => ({
        id: `team-${index}`,
        name,
        score: 0,
      }));
      onStartGame(teams);
    }
  };

  const canStart = teamNames.filter(name => name.trim().length > 0).length >= 2;

  return (
    <Container>
      <FormContainer>
        <Title variant="h5">Criar Novo Jogo</Title>
        
        {teamNames.map((name, index) => (
          <TeamInputContainer key={index}>
            <StyledTextField
              label={`Time ${index + 1}`}
              value={name}
              onChange={(e) => handleTeamNameChange(index, e.target.value)}
              variant="outlined"
              fullWidth
            />
            {teamNames.length > 2 && (
              <DeleteButton onClick={() => handleRemoveTeam(index)}>
                <Delete />
              </DeleteButton>
            )}
          </TeamInputContainer>
        ))}
        
        <Box display="flex" justifyContent="center" marginTop="16px">
          <AddButton onClick={handleAddTeam}>
            <Add />
          </AddButton>
        </Box>
        
        <StartButton
          variant="contained"
          onClick={handleStartGame}
          disabled={!canStart}
        >
          Iniciar jogo
        </StartButton>
        
        <Button
          variant="contained"
          onClick={onBack}
          fullWidth
          sx={{ 
            marginTop: '12px', 
            backgroundColor: '#e0e0e0',
            color: '#333',
            '&:hover': {
              backgroundColor: '#d0d0d0'
            }
          }}
        >
          Voltar
        </Button>
      </FormContainer>
    </Container>
  );
};
