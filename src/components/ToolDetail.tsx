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

export const ToolDetail: React.FC<ToolDetailProps> = ({ tool, tagsList, objectives, onSelectObjective, onAddFilter }) => {
  const getTagName = (category: keyof TagsList['tags'], tag: string) => {
    const foundTag = tagsList.tags[category].find(t => t.tag === tag);
    return foundTag ? foundTag.name : tag;
  };

  const getObjectiveByTag = (tag: string): Objective | undefined => {
    return objectives.find(o => o.tag === tag);
  };

  return (
    <div>
      <TitleContainer>
        <PageTitle>{tool.name}</PageTitle>
        <ItemTypeIndicator itemType="tool">Tool</ItemTypeIndicator>
      </TitleContainer>

      <Section>
        <SectionTitle itemType="tool">Purpose & Application</SectionTitle>
        <SubSection>
          <SubSectionTitle itemType="tool">Why Use This Tool</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.purpose_and_application.why}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
        <SubSection>
          <SubSectionTitle itemType="tool">How It Works</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.how_it_works}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
        <SubSection>
          <SubSectionTitle itemType="tool">When To Use This Tool</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.purpose_and_application.optimal_conditions}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle itemType="tool">Targetability</SectionTitle>
        <TargetabilityGrid>
          <TargetabilityBox>
            <SubSectionTitle itemType="tool">Sectoral</SubSectionTitle>
            <MarkdownText>
              <ReactMarkdown>{tool.targetability.sectoral}</ReactMarkdown>
            </MarkdownText>
          </TargetabilityBox>
          <TargetabilityBox>
            <SubSectionTitle itemType="tool">Technological</SubSectionTitle>
            <MarkdownText>
              <ReactMarkdown>{tool.targetability.technological}</ReactMarkdown>
            </MarkdownText>
          </TargetabilityBox>
          <TargetabilityBox>
            <SubSectionTitle itemType="tool">Regional</SubSectionTitle>
            <MarkdownText>
              <ReactMarkdown>{tool.targetability.regional}</ReactMarkdown>
            </MarkdownText>
          </TargetabilityBox>
          <TargetabilityBox>
            <SubSectionTitle itemType="tool">By Firm Type</SubSectionTitle>
            <MarkdownText>
              <ReactMarkdown>{tool.targetability.by_firm_type}</ReactMarkdown>
            </MarkdownText>
          </TargetabilityBox>
        </TargetabilityGrid>
        <SubSection style={{ marginTop: '20px' }}>
          <SubSectionTitle itemType="tool">Overall Assessment</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.targetability.overall_assessment}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle itemType="tool">Effectiveness</SectionTitle>
        <SubSection>
          <SubSectionTitle itemType="tool">What Works</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.effectiveness.what_works}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
        <SubSection>
          <SubSectionTitle itemType="tool">What Doesn't Work</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.effectiveness.what_doesnt}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
        <SubSection>
          <SubSectionTitle itemType="tool">Additionality</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.effectiveness.additionality}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
        <SubSection>
          <SubSectionTitle itemType="tool">Time To Impact</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.effectiveness.timeline}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle itemType="tool">Implementation</SectionTitle>
        <SubSection>
          <SubSectionTitle itemType="tool">Lead Body</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.implementation.lead_body}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
        <SubSection>
          <SubSectionTitle itemType="tool">Complexity</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.implementation.ease}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
        <SubSection>
          <SubSectionTitle itemType="tool">Flexibility</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.implementation.flexibility}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle itemType="tool">Recommendations</SectionTitle>
        <MarkdownText>
          {Array.isArray(tool.recommendations) && tool.recommendations.length > 0 ? (
            <ul>
              {tool.recommendations.map((rec, index) => (
                <li key={index}>
                  <ReactMarkdown>{rec}</ReactMarkdown>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recommendations available.</p>
          )}
        </MarkdownText>
      </Section>

      {/* New Policy Objectives Section */}
      {tool.tags.objectives && tool.tags.objectives.length > 0 && (
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

      {/* Further Reading Section - Moved Here */}
      {tool.further_reading && tool.further_reading.length > 0 && (
        <Section>
          <SectionTitle itemType="tool">Further Reading</SectionTitle>
          <FurtherReadingList>
            {tool.further_reading.map((item, index) => (
              <FurtherReadingListItem key={index}>
                {item.url ? (
                  <FurtherReadingLink href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title} ({item.source})
                  </FurtherReadingLink>
                ) : (
                  <FurtherReadingText>
                    {item.title} ({item.source})
                  </FurtherReadingText>
                )}
              </FurtherReadingListItem>
            ))}
          </FurtherReadingList>
        </Section>
      )}

      <Section variant="filter">
        {/* <SectionTitle itemType="tool">Filter Tags</SectionTitle> */}
        <SubSection variant="filter">
          <SubSectionTitle itemType="tool" variant="filter">Innovation Stage</SubSectionTitle>
          <TagContainer variant="filter">
            {tool.tags.innovation_stage.map((tag, index) => {
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
            {tool.tags.sectors.map((tag, index) => {
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
            {tool.tags.targeting?.map((tag, index) => {
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
            {tool.tags.timeline?.map((tag, index) => {
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