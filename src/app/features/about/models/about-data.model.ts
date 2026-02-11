export interface AboutIntro {
  title: string;
  description: string;
}

export interface AboutSkillGroup {
  title: string;
  slug: string;
  skills: string[];
}

export interface AboutData {
  intro: AboutIntro;
  skillGroups: AboutSkillGroup[];
}
