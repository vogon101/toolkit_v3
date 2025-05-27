import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Objective, Tool } from '../types/Tool';
import {
  Section,
  SectionTitle,
  MarkdownText,
  TagContainer,
  Tag,
  TitleContainer,
  ItemTypeIndicator,
  PageTitle,
} from '../styles/StyledComponents';

interface ObjectiveDetailProps {
  objective: Objective;
  tools: Tool[]; 
  onSelectTool: (tool: Tool) => void;
}

export const ObjectiveDetail: React.FC<ObjectiveDetailProps> = ({ objective, tools, onSelectTool }) => {
  const getToolByTag = (tag: string): Tool | undefined => {
    return tools.find(t => t.tag === tag);
  };

  return (
    <div>
      <TitleContainer>
        <PageTitle>{objective.name}</PageTitle>
        <ItemTypeIndicator itemType="objective">Objective</ItemTypeIndicator>
      </TitleContainer>

      <Section>
        <SectionTitle itemType="objective">Description</SectionTitle>
        <MarkdownText>
          <ReactMarkdown>{objective.description}</ReactMarkdown>
        </MarkdownText>
      </Section>

      {objective.notes && (
        <Section>
          <SectionTitle itemType="objective">Notes</SectionTitle>
          <MarkdownText>
            <ReactMarkdown>{objective.notes}</ReactMarkdown>
          </MarkdownText>
        </Section>
      )}

      {objective.related_tools && objective.related_tools.length > 0 && (
        <Section>
          <SectionTitle itemType="objective">Related Tools</SectionTitle>
          <TagContainer>
            {objective.related_tools.map((toolTag, index) => {
              const tool = getToolByTag(toolTag);
              return tool ? (
                <Tag key={index} onClick={() => onSelectTool(tool)} style={{ cursor: 'pointer' }} itemType="objective">
                  {tool.name}
                </Tag>
              ) : null;
            })}
          </TagContainer>
        </Section>
      )}
    </div>
  );
}; 