export interface ScenarioItem {
  id: string;
  time: string;
  scenario: string;
  tag: string;
  accentColor: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  rotationClass: string;
  city: string;
  savedHours: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ExperienceFeature {
  id: string;
  title: string;
  subtitle: string;
  screenType: 'left' | 'center' | 'right';
  badge: string;
}
