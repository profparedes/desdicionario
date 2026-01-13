import { useState } from 'react';
import { Button, Box, Typography, Paper, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
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
  font-weight: 600 !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const Title = styled(Typography)`
  color: #fff;
  font-weight: 800;
  font-size: 32px;
  margin-bottom: 32px;
  text-align: center;
  letter-spacing: -1px;
`;

const WordCard = styled(Box)`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  text-align: center;
`;

const WordText = styled(Typography)`
  color: #fff;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: -0.5px;
`;

const RevealButton = styled(Button)`
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

const AnswerSection = styled(Box)`
  margin-bottom: 24px;
`;

const AnswerCard = styled(Box) <{ $isCorrect: boolean }>`
  background: ${props => props.$isCorrect ? 'rgba(255, 131, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border: 2px solid ${props => props.$isCorrect ? '#FF8300' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 16px;
`;

const AnswerText = styled(Typography) <{ $color?: string }>`
  color: ${props => props.$color || '#fff'};
  font-size: 10px;
  margin-bottom: 12px;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
`;

const AnswerAuthor = styled(Typography)`
  color: #888;
  font-size: 12px !important;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CorrectBadge = styled(Box)`
  background: #FF8300;
  color: #fff;
  padding: 4px 6px;
  border-radius: 6px;
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const VotersList = styled(Box)`
  margin-top: 8px;
`;

const VoterText = styled(Typography)`
  color: #aaa;
  font-size: 13px;
  margin: 4px 0;
`;

const ScoreSection = styled(Box)`
  margin-top: 24px;
`;

const ScoreTitle = styled(Typography)`
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 16px;
  letter-spacing: -0.3px;
`;

const ScoreItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ScoreTeamName = styled(Typography)`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

const ScoreValue = styled(Typography)`
  color: #FF8300;
  font-size: 20px;
  font-weight: 700;
`;

const NextRoundButton = styled(Button)`
  && {
    background-color: #FF8300 !important;
    color: #fff !important;
    font-size: 16px;
    font-weight: bold;
    padding: 14px 24px;
    border-radius: 12px;
    text-transform: none;
    width: 100%;
    margin-top: 24px;
    box-shadow: 0 4px 12px rgba(255, 131, 0, 0.3);
    
    &:hover {
      background-color: #E67400 !important;
      box-shadow: 0 6px 16px rgba(255, 131, 0, 0.4);
    }
  }
`;

const ResetButton = styled(Button)`
  && {
    background-color: #ff4444 !important;
    color: #fff !important;
    font-size: 16px;
    font-weight: bold;
    padding: 14px 24px;
    border-radius: 12px;
    text-transform: none;
    width: 100%;
    margin-top: 16px;
    box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
    
    &:hover {
      background-color: #cc0000 !important;
      box-shadow: 0 6px 16px rgba(255, 68, 68, 0.4);
    }
  }
`;

interface ResultsScreenProps {
  gameState: GameState;
  onNextRound: () => void;
  onResetGame: () => void;
}

export const ResultsScreen = ({ gameState, onNextRound, onResetGame }: ResultsScreenProps) => {
  const [revealed, setRevealed] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);

  // Calcular pontuação
  const calculateScores = () => {
    const roundScores: { [teamId: string]: number } = {};

    // Inicializar scores da rodada
    gameState.teams.forEach(team => {
      roundScores[team.id] = 0;
    });

    // Encontrar resposta correta (definição verdadeira)
    const correctAnswerIndex = gameState.trueDefinitionIndex ?? gameState.answers.findIndex(a => a.isTrueDefinition);

    // Pontos para quem votou na resposta correta
    gameState.votes.forEach(vote => {
      if (vote.answerIndex === correctAnswerIndex) {
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

    return roundScores;
  };

  const roundScores = revealed ? calculateScores() : {};

  const handleReveal = () => {
    setRevealed(true);
  };

  if (!revealed) {
    return (
      <Container>
        <Card>
          <Title>Resultado</Title>
          <RevealButton variant="contained" onClick={handleReveal}>
            Revelar resultado
          </RevealButton>
        </Card>
      </Container>
    );
  }

  const correctAnswerIndex = gameState.trueDefinitionIndex ?? gameState.answers.findIndex(a => a.isTrueDefinition);

  // Agrupar votos por resposta
  const votesByAnswer: { [answerIndex: number]: string[] } = {};
  gameState.votes.forEach(vote => {
    if (!votesByAnswer[vote.answerIndex]) {
      votesByAnswer[vote.answerIndex] = [];
    }
    votesByAnswer[vote.answerIndex].push(vote.teamName);
  });

  return (
    <Container>
      <Card>
        <Title>Resultado</Title>

        <Label sx={{ mt: 2 }}>Palavra</Label>
        <WordCard>
          <WordText>{gameState.currentWord}</WordText>
        </WordCard>

        <AnswerSection>
          {gameState.answers.map((answer, index) => {
            const isCorrect = index === correctAnswerIndex;
            const voters = votesByAnswer[index] || [];

            return (
              <AnswerCard key={index} $isCorrect={isCorrect}>
                {isCorrect && <CorrectBadge>RESPOSTA CORRETA</CorrectBadge>}
                <AnswerAuthor>
                  {answer.isTrueDefinition ? 'Definição Verdadeira' : `Time: ${answer.teamName}`}
                </AnswerAuthor>
                <AnswerText color={isCorrect ? '#fff' : '#fff'}>
                  {answer.answer}
                </AnswerText>
                {voters.length > 0 && (
                  <VotersList>
                    <VoterText>
                      Votaram: {voters.join(', ')}
                    </VoterText>
                  </VotersList>
                )}
              </AnswerCard>
            );
          })}
        </AnswerSection>

        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <ScoreSection>
          <ScoreTitle>Pontuação Total</ScoreTitle>
          {gameState.teams.map(team => {
            const totalScore = team.score + (roundScores[team.id] || 0);
            return (
              <ScoreItem key={team.id}>
                <ScoreTeamName>{team.name}</ScoreTeamName>
                <ScoreValue>{totalScore}</ScoreValue>
              </ScoreItem>
            );
          })}
        </ScoreSection>

        <NextRoundButton variant="contained" onClick={onNextRound}>
          Iniciar nova rodada
        </NextRoundButton>

        <ResetButton variant="contained" onClick={() => setOpenResetDialog(true)}>
          Resetar jogo
        </ResetButton>
      </Card>

      <Dialog
        open={openResetDialog}
        onClose={() => setOpenResetDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#1a1a1a',
            color: '#fff',
            borderRadius: '16px',
          }
        }}
      >
        <DialogTitle sx={{ color: '#fff', fontWeight: 700 }}>
          Resetar Jogo
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#aaa' }}>
            Tem certeza que deseja resetar o jogo? Todos os dados serão perdidos e você voltará para a tela de criação de times.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenResetDialog(false)}
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
            onClick={() => {
              setOpenResetDialog(false);
              onResetGame();
            }}
            sx={{
              backgroundColor: '#ff4444',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#cc0000'
              }
            }}
            variant="contained"
          >
            Resetar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
