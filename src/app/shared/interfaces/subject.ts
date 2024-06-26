export interface Subject {
  name: string;
  questions: Question[];
  date: Date;
  id?: string;
}

export interface Question {
  question: string;
  answers: Answers;
  correctAnswer: Choices;
}
export interface Answers {
  'A': string,
  'B': string,
  'C': string,
  'D': string,
}

export type Choices = 'A' | 'B' | 'C' | 'D';
