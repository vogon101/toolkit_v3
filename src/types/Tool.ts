export interface Tool {
  name: string;
  /**
   * Primary slug-like identifier used in the new v4 YAML.
   * We also expose a legacy `tag` alias so existing objective files that
   * reference the old value continue to work during the migration.
   */
  id: string;
  /**
   * Temporary alias for compatibility with older code / YAML that still
   * expects `tool.tag`.  Will be removed once everything is migrated.
   */
  tag?: string;
  /** High-level headline judgment of the tool (v4 section 1) */
  overall_assessment?: string;
  /** Legacy grouping from v3 schema – kept optional during migration */
  purpose_and_application?: {
    why: string;
    optimal_conditions: string;
  };
  how_it_works: {
    description?: string;
    mechanism?: string;
    complexity?: string;
    complexity_details?: string;
    flexibility?: string;
    flexibility_details?: string;
  };
  targetability?: {
    overall_assessment?: string;
    sectoral?: {
      level?: string;
      details?: string;
    };
    technological?: {
      level?: string;
      details?: string;
    };
    regional?: {
      level?: string;
      details?: string;
    };
    by_firm_type?: {
      level?: string;
      details?: string;
    };
  };
  effectiveness?: {
    evidence_quality?: string;
    what_works?: string[];
    what_doesnt_work?: string[];
    additionality?: {
      level?: string;
      details?: string;
    };
    time_to_impact?: string;
    fraud_risk?: string;
  };
  /** Legacy field – not present in v4 */
  recommendations?: string[];
  /** Legacy implementation block from v3 schema – not present in v4 */
  implementation?: {
    lead_body: string;
    ease: string;
    flexibility: string;
  };
  /** Consolidated UK-specific experience block (markdown) */
  uk_experience?: string;
  cbp_view?: string;
  further_reading?: Array<{
    title: string;
    url?: string;
    author?: string;
  }>;
  tags: {
    objectives?: string[];
    innovation_stage?: string[];
    sectors?: string[];
    delivery_mechanism?: string[];
    targeting?: string[];
    timeline?: string[];
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