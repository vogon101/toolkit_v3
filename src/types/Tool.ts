export interface Tool {
  name: string;
  tag: string;
  purpose_and_application: {
    why: string;
    optimal_conditions: string;
  };
  how_it_works: string;
  targetability: {
    sectoral: string;
    technological: string;
    regional: string;
    by_firm_type: string;
    overall_assessment: string;
  };
  effectiveness: {
    what_works: string;
    what_doesnt: string;
    additionality: string;
    timeline: string;
  };
  recommendations: string[];
  implementation: {
    lead_body: string;
    ease: string;
    flexibility: string;
  };
  further_reading: Array<{
    title?: string;
    source?: string;
    url?: string;
  }>;
  tags: {
    objectives: string[];
    innovation_stage: string[];
    sectors: string[];
    delivery_mechanism: string[];
    targeting: string[];
    timeline: string[];
  };
}

export interface Objective {
  name: string;
  tag: string;
  description: string;
  notes?: string;
  related_tools: string[];
}

export interface TagItem {
  tag: string;
  name: string;
}

export interface TagsList {
  tags: {
    objectives: TagItem[];
    innovation_stage: TagItem[];
    sectors: TagItem[];
    delivery_mechanism: TagItem[];
    targeting: TagItem[];
    timeline: TagItem[];
  };
}

export type SelectedItem = Tool | Objective | null;
export type ItemType = 'tool' | 'objective' | null; 