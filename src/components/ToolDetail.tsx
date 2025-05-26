import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Tool, TagsList } from '../types/Tool';
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
} from '../styles/StyledComponents';

interface ToolDetailProps {
  tool: Tool;
  tagsList: TagsList;
}

export const ToolDetail: React.FC<ToolDetailProps> = ({ tool, tagsList }) => {
  const getTagName = (category: keyof TagsList['tags'], tag: string) => {
    const foundTag = tagsList.tags[category].find(t => t.tag === tag);
    return foundTag ? foundTag.name : tag;
  };

  return (
    <div>
      <h1>{tool.name}</h1>

      <Section>
        <SectionTitle>Purpose & Application</SectionTitle>
        <SubSection>
          <SubSectionTitle>Why Use This Tool</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.purpose_and_application.why}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
        <SubSection>
          <SubSectionTitle>When To Use This Tool</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.purpose_and_application.optimal_conditions}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>How It Works</SectionTitle>
        <MarkdownText>
          <ReactMarkdown>{tool.how_it_works}</ReactMarkdown>
        </MarkdownText>
      </Section>

      <Section>
        <SectionTitle>Targetability</SectionTitle>
        <TargetabilityGrid>
          <TargetabilityBox>
            <SubSectionTitle>Sectoral</SubSectionTitle>
            <MarkdownText>
              <ReactMarkdown>{tool.targetability.sectoral}</ReactMarkdown>
            </MarkdownText>
          </TargetabilityBox>
          <TargetabilityBox>
            <SubSectionTitle>Technological</SubSectionTitle>
            <MarkdownText>
              <ReactMarkdown>{tool.targetability.technological}</ReactMarkdown>
            </MarkdownText>
          </TargetabilityBox>
          <TargetabilityBox>
            <SubSectionTitle>Regional</SubSectionTitle>
            <MarkdownText>
              <ReactMarkdown>{tool.targetability.regional}</ReactMarkdown>
            </MarkdownText>
          </TargetabilityBox>
          <TargetabilityBox>
            <SubSectionTitle>By Firm Type</SubSectionTitle>
            <MarkdownText>
              <ReactMarkdown>{tool.targetability.by_firm_type}</ReactMarkdown>
            </MarkdownText>
          </TargetabilityBox>
        </TargetabilityGrid>
        <SubSection style={{ marginTop: '20px' }}>
          <SubSectionTitle>Overall Assessment</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.targetability.overall_assessment}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Effectiveness</SectionTitle>
        <SubSection>
          <SubSectionTitle>What Works</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.effectiveness.what_works}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
        <SubSection>
          <SubSectionTitle>What Doesn't Work</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.effectiveness.what_doesnt}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
        <SubSection>
          <SubSectionTitle>Additionality</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.effectiveness.additionality}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
        <SubSection>
          <SubSectionTitle>Time To Impact</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.effectiveness.timeline}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Implementation</SectionTitle>
        <SubSection>
          <SubSectionTitle>Lead Body</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.implementation.lead_body}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
        <SubSection>
          <SubSectionTitle>Complexity</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.implementation.ease}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
        <SubSection>
          <SubSectionTitle>Flexibility</SubSectionTitle>
          <MarkdownText>
            <ReactMarkdown>{tool.implementation.flexibility}</ReactMarkdown>
          </MarkdownText>
        </SubSection>
      </Section>

      <Section>
        <SectionTitle>Recommendations</SectionTitle>
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

      <Section>
        <SectionTitle>Tags</SectionTitle>
        <SubSection>
          <SubSectionTitle>Innovation Stage</SubSectionTitle>
          <TagContainer>
            {tool.tags.innovation_stage.map((tag, index) => (
              <Tag key={index}>{getTagName('innovation_stage', tag)}</Tag>
            ))}
          </TagContainer>
        </SubSection>
        <SubSection>
          <SubSectionTitle>Sectors</SubSectionTitle>
          <TagContainer>
            {tool.tags.sectors.map((tag, index) => (
              <Tag key={index}>{getTagName('sectors', tag)}</Tag>
            ))}
          </TagContainer>
        </SubSection>
        <SubSection>
          <SubSectionTitle>Delivery Mechanism</SubSectionTitle>
          <TagContainer>
            {tool.tags.delivery_mechanism.map((tag, index) => (
              <Tag key={index}>{getTagName('delivery_mechanism', tag)}</Tag>
            ))}
          </TagContainer>
        </SubSection>
        <SubSection>
          <SubSectionTitle>Targeting</SubSectionTitle>
          <TagContainer>
            {tool.tags.targeting?.map((tag, index) => (
              <Tag key={index}>{getTagName('targeting', tag)}</Tag>
            ))}
          </TagContainer>
        </SubSection>
        <SubSection>
          <SubSectionTitle>Timeline</SubSectionTitle>
          <TagContainer>
            {tool.tags.timeline?.map((tag, index) => (
              <Tag key={index}>{getTagName('timeline', tag)}</Tag>
            ))}
          </TagContainer>
        </SubSection>
      </Section>

      {tool.further_reading.length > 0 && (
        <Section>
          <SectionTitle>Further Reading</SectionTitle>
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
    </div>
  );
}; 