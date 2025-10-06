
export type PodcastLanguage = 'English' | 'Hindi' | 'Telugu';

export type InputMode = 'text' | 'pdf';

export interface GenerationResult {
  summary: string;
  keyPoints: string[];
}
