import { useState, useMemo, useEffect } from 'react';
import { Button, Box, Typography, Paper, List, ListItem, ListItemButton } from '@mui/material';
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
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const TeamName = styled(Typography)`
  color: #fff;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
  letter-spacing: -0.5px;
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

const InstructionText = styled(Typography)`
  color: #aaa;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
`;

const StyledListItem = styled(ListItem)`
  padding: 0;
  margin-bottom: 8px;
`;

const AnswerButton = styled(ListItemButton)<{ $selected: boolean }>`
  && {
    background: ${props => props.$selected ? '#00FFEF' : 'rgba(255, 255, 255, 0.05)'};
    border: ${props => props.$selected ? '3px solid #00FFEF' : '2px solid rgba(255, 255, 255, 0.1)'};
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    transition: all 0.2s ease;
    box-shadow: ${props => props.$selected ? '0 4px 12px rgba(0, 255, 239, 0.4)' : 'none'};
    width: 100%;
    display: block;
  }
  
  &&:hover {
    background: ${props => props.$selected ? '#00E6D6' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${props => props.$selected ? '#00E6D6' : 'rgba(255, 255, 255, 0.2)'};
    box-shadow: ${props => props.$selected ? '0 6px 16px rgba(0, 255, 239, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  }
  
  &&:active {
    transform: ${props => props.$selected ? 'scale(0.98)' : 'scale(0.97)'};
  }
`;

const AnswerText = styled(Typography)<{ $selected: boolean }>`
  && {
    color: ${props => props.$selected ? '#00FFEF' : '#fff'};
    font-size: 16px;
    font-weight: ${props => props.$selected ? '700' : '400'};
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.5;
  }
`;

const VoteButton = styled(Button)`
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
    
    &:hover {
      background-color: #E67400 !important;
    }
    
    &:disabled {
      background-color: #666 !important;
      color: #999 !important;
    }
  }
`;

interface VotingScreenProps {
  gameState: GameState;
  onVote: (answerIndex: number) => void;
}

export const VotingScreen = ({ gameState, onVote }: VotingScreenProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const currentTeam = gameState.teams[gameState.currentTeamIndex];
  const hasVoted = gameState.votes.some(v => v.teamId === currentTeam.id);

  // As respostas já vêm embaralhadas do App.tsx (incluindo a definição verdadeira)
  // Usar diretamente as respostas do gameState
  const votingAnswers = useMemo(() => {
    return gameState.answers;
  }, [gameState.answers.length, gameState.currentWord]);

  // Resetar seleção quando mudar de time
  useEffect(() => {
    setSelectedIndex(null);
  }, [gameState.currentTeamIndex]);

  const handleVote = () => {
    if (selectedIndex !== null && votingAnswers[selectedIndex]) {
      // Usar o índice diretamente, pois as respostas já estão embaralhadas
      onVote(selectedIndex);
      setSelectedIndex(null); // Limpar seleção após votar
    }
  };

  if (hasVoted) {
    return (
      <Container>
        <Card>
          <Label>Time</Label>
          <TeamName variant="h5">{currentTeam.name}</TeamName>
          <InstructionText>
            Você já votou! Aguarde os outros times...
          </InstructionText>
        </Card>
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

        <InstructionText>
          Escolha qual você acha que é o significado correto:
        </InstructionText>

        <List>
          {votingAnswers.length === 0 ? (
            <Typography sx={{ color: '#fff', textAlign: 'center', py: 2 }}>
              Nenhuma resposta disponível ainda. Aguarde...
            </Typography>
          ) : (
            <>
              {votingAnswers.map((answer, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <StyledListItem key={`${answer.teamId}-${index}`}>
                    <AnswerButton
                      $selected={isSelected}
                      onClick={() => setSelectedIndex(index)}
                      selected={isSelected}
                    >
                      <AnswerText $selected={isSelected}>
                        {answer.answer}
                      </AnswerText>
                    </AnswerButton>
                  </StyledListItem>
                );
              })}
            </>
          )}
        </List>

        <VoteButton
          variant="contained"
          onClick={handleVote}
          disabled={selectedIndex === null}
        >
          Votar
        </VoteButton>
      </Card>
    </Container>
  );
};
