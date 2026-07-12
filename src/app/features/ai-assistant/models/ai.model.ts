import { AiState } from './ai.enum';

export interface AiRecommendation {

  state: AiState;

  message: string;

}