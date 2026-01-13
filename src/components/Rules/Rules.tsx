import { Button, Box, Typography, Paper } from '@mui/material';
import styled from 'styled-components';

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
    padding: 32px;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
`;

const Title = styled(Typography)`
  color: #fff;
  font-weight: 800;
  font-size: 32px;
  margin-bottom: 32px;
  text-align: center;
  letter-spacing: -1px;
`;

const SectionTitle = styled(Typography)`
  color: #FF8300;
  font-weight: 700;
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 12px;
  letter-spacing: -0.3px;
`;

const RuleText = styled(Typography)`
  color: #fff;
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 16px;
`;

const RuleItem = styled(Box)`
  margin-bottom: 16px;
  padding-left: 16px;
  border-left: 3px solid #00FFEF;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  gap: 12px;
  margin-top: 32px;
  flex-direction: column;
`;

const BackButton = styled(Button)`
  && {
    background-color: rgba(255, 255, 255, 0.1) !important;
    color: #fff !important;
    font-size: 16px;
    font-weight: bold;
    padding: 12px 24px;
    border-radius: 12px;
    text-transform: none;
    width: 100%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.15) !important;
      border-color: rgba(255, 255, 255, 0.3);
    }
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
    box-shadow: 0 4px 12px rgba(255, 131, 0, 0.3);
    
    &:hover {
      background-color: #E67400 !important;
      box-shadow: 0 6px 16px rgba(255, 131, 0, 0.4);
    }
  }
`;

interface RulesProps {
  onBack: () => void;
  onStartGame: () => void;
}

export const Rules = ({ onBack, onStartGame }: RulesProps) => {
  return (
    <Container>
      <Card>
        <Title>Regras do Jogo</Title>

        <SectionTitle>Objetivo</SectionTitle>
        <RuleText>
          O Desdicionário é um jogo de criatividade e estratégia onde os times competem criando definições falsas para palavras desconhecidas, tentando enganar os outros jogadores enquanto tentam identificar a definição verdadeira.
        </RuleText>

        <SectionTitle>Como Jogar</SectionTitle>

        <RuleItem>
          <RuleText>
            <strong>1. Criação de Times:</strong> Divida os jogadores em times. Cada time terá a oportunidade de criar uma definição falsa para a palavra sorteada.
          </RuleText>
        </RuleItem>

        <RuleItem>
          <RuleText>
            <strong>2. Escolha da Palavra:</strong> Uma palavra desconhecida é sorteada aleatoriamente. O primeiro time pode optar por sortear uma nova palavra se achar que a palavra atual é muito conhecida pelos jogadores.
          </RuleText>
        </RuleItem>

        <RuleItem>
          <RuleText>
            <strong>3. Criação de Definições:</strong> Cada time cria uma definição falsa e criativa para a palavra. Todos os times criam suas próprias respostas, sem saber qual é a definição verdadeira.
          </RuleText>
        </RuleItem>

        <RuleItem>
          <RuleText>
            <strong>4. Votação:</strong> Após todos os times criarem suas definições, todas as respostas (incluindo a definição verdadeira do dicionário) são apresentadas de forma embaralhada. Cada time vota na definição que acredita ser a verdadeira.
          </RuleText>
        </RuleItem>

        <SectionTitle>Pontuação</SectionTitle>

        <RuleItem>
          <RuleText>
            <strong>• Pontos por Acerto:</strong> Se um time votar na definição verdadeira, ganha 1 ponto.
          </RuleText>
        </RuleItem>

        <RuleItem>
          <RuleText>
            <strong>• Pontos por Engano:</strong> Se outros times votarem na definição falsa criada por um time, esse time ganha 1 ponto para cada voto recebido.
          </RuleText>
        </RuleItem>

        <SectionTitle>Dicas</SectionTitle>

        <RuleItem>
          <RuleText>
            • Seja criativo! Definições muito óbvias ou muito absurdas podem ser facilmente identificadas.
          </RuleText>
        </RuleItem>

        <RuleItem>
          <RuleText>
            • Tente criar definições que pareçam plausíveis e convincentes.
          </RuleText>
        </RuleItem>

        <RuleItem>
          <RuleText>
            • Evite criar definições muito extensas e complexas.
          </RuleText>
        </RuleItem>

        <ButtonContainer>
          <StartButton variant="contained" onClick={onStartGame}>
            Começar a jogar
          </StartButton>
          <BackButton variant="outlined" onClick={onBack}>
            Voltar
          </BackButton>
        </ButtonContainer>
      </Card>
    </Container>
  );
};
