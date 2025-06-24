import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Tool, TagsList, Objective } from '../types/Tool';
import {
  Section,
  SectionTitle,
  SubSection,
  SubSectionTitle,
  TagContainer,
  Tag,
  TargetabilityGrid,
  TargetabilityBox,
  MarkdownText,
  FurtherReadingList,
  FurtherReadingListItem,
  FurtherReadingLink,
  FurtherReadingText,
  TitleContainer,
  ItemTypeIndicator,
  PageTitle,
} from '../styles/StyledComponents';

interface ToolDetailProps {
  tool: Tool;
  tagsList: TagsList;
  objectives: Objective[];
  onSelectObjective: (objective: Objective) => void;
  onAddFilter: (tag: string) => void;
}

// Helper to ensure we always pass a string to ReactMarkdown, preventing runtime errors if the
// source value is accidentally an object/array.
const SafeMarkdown: React.FC<{ value?: unknown }> = ({ value }) => (
  <ReactMarkdown>{typeof value === 'string' ? value : String(value ?? '')}</ReactMarkdown>
);

export const ToolDetail: React.FC<ToolDetailProps> = ({ tool, tagsList, objectives, onSelectObjective, onAddFilter }) => {
  const getTagName = (category: keyof TagsList['tags'], tag: string) => {
    const foundTag = tagsList.tags[category].find(t => t.tag === tag);
    return foundTag ? foundTag.name : tag;
  };

  const getObjectiveByTag = (tag: string): Objective | undefined => {
    return objectives.find(o => o.tag === tag);
  };

  const renderList = (items?: string[]) => {
    if (!items || items.length === 0) return <p>N/A</p>;
    return (
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            <SafeMarkdown value={item} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <TitleContainer>
        <PageTitle>{tool.name}</PageTitle>
        <ItemTypeIndicator itemType="tool">Tool</ItemTypeIndicator>
      </TitleContainer>

      {/* Overall Assessment */}
      {tool.overall_assessment && (
        <Section>
          <SectionTitle itemType="tool">Overall Assessment</SectionTitle>
          <MarkdownText>
            <SafeMarkdown value={tool.overall_assessment} />
          </MarkdownText>
        </Section>
      )}

      {/* How It Works */}
      {tool.how_it_works && (
        <Section>
          <SectionTitle itemType="tool">How It Works</SectionTitle>
          {tool.how_it_works.description && (
            <SubSection>
              <SubSectionTitle itemType="tool">Description</SubSectionTitle>
              <MarkdownText>
                <SafeMarkdown value={tool.how_it_works.description} />
              </MarkdownText>
            </SubSection>
          )}
          {tool.how_it_works.mechanism && (
            <SubSection>
              <SubSectionTitle itemType="tool">Mechanism</SubSectionTitle>
              <MarkdownText>
                <SafeMarkdown value={tool.how_it_works.mechanism} />
              </MarkdownText>
            </SubSection>
          )}
          {(tool.how_it_works.complexity || tool.how_it_works.complexity_details) && (
            <SubSection>
              <SubSectionTitle itemType="tool">Complexity</SubSectionTitle>
              <MarkdownText>
                <SafeMarkdown value={`**${tool.how_it_works.complexity || ''}** – ${tool.how_it_works.complexity_details || ''}`} />
              </MarkdownText>
            </SubSection>
          )}
          {(tool.how_it_works.flexibility || tool.how_it_works.flexibility_details) && (
            <SubSection>
              <SubSectionTitle itemType="tool">Flexibility</SubSectionTitle>
              <MarkdownText>
                <SafeMarkdown value={`**${tool.how_it_works.flexibility || ''}** – ${tool.how_it_works.flexibility_details || ''}`} />
              </MarkdownText>
            </SubSection>
          )}
        </Section>
      )}

      {/* Effectiveness and UK Impact */}
      {tool.effectiveness_and_uk_impact && (
        <Section>
          <SectionTitle itemType="tool">Effectiveness and UK Impact</SectionTitle>
          {tool.effectiveness_and_uk_impact.evidence_summary && (
            <SubSection>
              <SubSectionTitle itemType="tool">Evidence Summary</SubSectionTitle>
              <MarkdownText>
                <SafeMarkdown value={tool.effectiveness_and_uk_impact.evidence_summary} />
              </MarkdownText>
            </SubSection>
          )}
          <SubSection>
            <SubSectionTitle itemType="tool">What Works</SubSectionTitle>
            {renderList(tool.effectiveness_and_uk_impact.what_works)}
          </SubSection>
          <SubSection>
            <SubSectionTitle itemType="tool">What Doesn't Work</SubSectionTitle>
            {renderList(tool.effectiveness_and_uk_impact.what_doesnt_work)}
          </SubSection>
          {tool.effectiveness_and_uk_impact.time_to_impact && (
            <SubSection>
              <SubSectionTitle itemType="tool">Time to Impact</SubSectionTitle>
              <MarkdownText>
                <SafeMarkdown value={tool.effectiveness_and_uk_impact.time_to_impact} />
              </MarkdownText>
            </SubSection>
          )}
        </Section>
      )}

      {/* Targetability */}
      {tool.targetability && (
        <Section>
          <SectionTitle itemType="tool">Targetability</SectionTitle>
          <TargetabilityGrid>
            <TargetabilityBox>
              <SubSectionTitle itemType="tool">Sectoral</SubSectionTitle>
              {tool.targetability.sectoral ? (
                <MarkdownText>
                  <SafeMarkdown value={`**${tool.targetability.sectoral.level || ''}** – ${tool.targetability.sectoral.details || ''}`} />
                </MarkdownText>
              ) : (
                <p>N/A</p>
              )}
            </TargetabilityBox>
            <TargetabilityBox>
              <SubSectionTitle itemType="tool">Technological</SubSectionTitle>
              {tool.targetability.technological ? (
                <MarkdownText>
                  <SafeMarkdown value={`**${tool.targetability.technological.level || ''}** – ${tool.targetability.technological.details || ''}`} />
                </MarkdownText>
              ) : (
                <p>N/A</p>
              )}
            </TargetabilityBox>
            <TargetabilityBox>
              <SubSectionTitle itemType="tool">Regional</SubSectionTitle>
              {tool.targetability.regional ? (
                <MarkdownText>
                  <SafeMarkdown value={`**${tool.targetability.regional.level || ''}** – ${tool.targetability.regional.details || ''}`} />
                </MarkdownText>
              ) : (
                <p>N/A</p>
              )}
            </TargetabilityBox>
            <TargetabilityBox>
              <SubSectionTitle itemType="tool">By Firm Type</SubSectionTitle>
              {tool.targetability.by_firm_type ? (
                <MarkdownText>
                  <SafeMarkdown value={`**${tool.targetability.by_firm_type.level || ''}** – ${tool.targetability.by_firm_type.details || ''}`} />
                </MarkdownText>
              ) : (
                <p>N/A</p>
              )}
            </TargetabilityBox>
          </TargetabilityGrid>
          {tool.targetability.overall_assessment && (
            <SubSection style={{ marginTop: '20px' }}>
              <SubSectionTitle itemType="tool">Overall Assessment</SubSectionTitle>
              <MarkdownText>
                <SafeMarkdown value={tool.targetability.overall_assessment} />
              </MarkdownText>
            </SubSection>
          )}
        </Section>
      )}

      {/* CBP View */}
      {tool.cbp_view_recommendations_for_uk && (
        <Section>
          <SectionTitle itemType="tool">Recommendations for the UK (CBP view)</SectionTitle>
          <MarkdownText>
            <SafeMarkdown value={tool.cbp_view_recommendations_for_uk} />
          </MarkdownText>
        </Section>
      )}

      {/* Further Reading */}
      {tool.further_reading && tool.further_reading.length > 0 && (
        <Section>
          <SectionTitle itemType="tool">Further Reading</SectionTitle>
          <FurtherReadingList>
            {tool.further_reading.map((item, index) => (
              <FurtherReadingListItem key={index}>
                {item.url ? (
                  <FurtherReadingLink href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title} {item.author ? `(${item.author})` : ''}
                  </FurtherReadingLink>
                ) : (
                  <FurtherReadingText>
                    {item.title} {item.author ? `(${item.author})` : ''}
                  </FurtherReadingText>
                )}
              </FurtherReadingListItem>
            ))}
          </FurtherReadingList>
        </Section>
      )}

      {/* Related Policy Objectives */}
      {tool.tags?.objectives && tool.tags.objectives.length > 0 && (
        <Section>
          <SectionTitle itemType="tool">Related Policy Objectives</SectionTitle>
          <TagContainer>
            {tool.tags.objectives.map((tagString, index) => {
              const objective = getObjectiveByTag(tagString);
              const tagName = getTagName('objectives', tagString);
              return (
                <Tag
                  key={index}
                  itemType="tool"
                  onClick={objective ? () => onSelectObjective(objective) : undefined}
                  style={objective ? { cursor: 'pointer' } : {}}
                >
                  {tagName}
                </Tag>
              );
            })}
          </TagContainer>
        </Section>
      )}

      {/* Filter Tags Section (unchanged) */}
      <Section variant="filter">
        <SubSection variant="filter">
          <SubSectionTitle itemType="tool" variant="filter">Innovation Stage</SubSectionTitle>
          <TagContainer variant="filter">
            {(tool.tags.innovation_stage || []).map((tag, index) => {
              const tagName = getTagName('innovation_stage', tag);
              return (
                <Tag key={index} itemType="tool" variant="filter" onClick={() => onAddFilter(tag)}>
                  {tagName}
                </Tag>
              );
            })}
          </TagContainer>
        </SubSection>
        <SubSection variant="filter">
          <SubSectionTitle itemType="tool" variant="filter">Sectors</SubSectionTitle>
          <TagContainer variant="filter">
            {(tool.tags.sectors || []).map((tag, index) => {
              const tagName = getTagName('sectors', tag);
              return (
                <Tag key={index} itemType="tool" variant="filter" onClick={() => onAddFilter(tag)}>
                  {tagName}
                </Tag>
              );
            })}
          </TagContainer>
        </SubSection>
        <SubSection variant="filter">
          <SubSectionTitle itemType="tool" variant="filter">Targeting</SubSectionTitle>
          <TagContainer variant="filter">
            {(tool.tags.targeting || []).map((tag, index) => {
              const tagName = getTagName('targeting', tag);
              return (
                <Tag key={index} itemType="tool" variant="filter" onClick={() => onAddFilter(tag)}>
                  {tagName}
                </Tag>
              );
            })}
          </TagContainer>
        </SubSection>
        <SubSection variant="filter">
          <SubSectionTitle itemType="tool" variant="filter">Timeline</SubSectionTitle>
          <TagContainer variant="filter">
            {(tool.tags.timeline || []).map((tag, index) => {
              const tagName = getTagName('timeline', tag);
              return (
                <Tag key={index} itemType="tool" variant="filter" onClick={() => onAddFilter(tag)}>
                  {tagName}
                </Tag>
              );
            })}
          </TagContainer>
        </SubSection>
      </Section>
    </div>
  );
}; 