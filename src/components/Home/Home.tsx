import { Button, Box, Typography } from '@mui/material';
import styled from 'styled-components';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: #00FFEF;
`;

const StyledButton = styled(Button)`
  background-color: #FF8300;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 16px 32px;
  border-radius: 12px;
  text-transform: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &:hover {
    background-color: #E67400;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const RulesButton = styled(Button)`
  && {
    background-color: transparent !important;
    color: rgba(26, 26, 26, 0.6) !important;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    text-transform: none;
    margin-top: 24px;
    text-decoration: underline;
    text-decoration-color: rgba(26, 26, 26, 0.3);
    text-underline-offset: 4px;
    
    &:hover {
      background-color: rgba(26, 26, 26, 0.05) !important;
      color: rgba(26, 26, 26, 0.8) !important;
      text-decoration-color: rgba(26, 26, 26, 0.5);
    }
  }
`;

const Title = styled(Typography)`
  color: #1a1a1a;
  font-weight: 800;
  margin-bottom: 40px;
  text-align: center;
  font-size: 42px;
  letter-spacing: -1px;
`;

interface HomeProps {
  onCreateGame: () => void;
  onShowRules: () => void;
}

export const Home = ({ onCreateGame, onShowRules }: HomeProps) => {
  return (
    <Container>
      <Title variant="h3">Desdicionário</Title>
      <StyledButton variant="contained" onClick={onCreateGame} size="large">
        Criar novo jogo
      </StyledButton>
      <RulesButton onClick={onShowRules}>
        Regras do jogo
      </RulesButton>
    </Container>
  );
};
