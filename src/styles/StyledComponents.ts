import styled from '@emotion/styled';

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const Sidebar = styled.nav`
  width: 250px;
  background-color: #F5FAF8;
  padding: 20px;
  border-right: 1px solid #D9E8E2;
  overflow-y: auto;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    width: 100%;
    max-width: 850px;
  }
`;

export const ToolList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ToolListItem = styled.li<{ active: boolean }>`
  padding: 12px 16px;
  margin: 8px 0;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-weight: ${props => props.active ? '600' : '400'};
  background-color: ${props => props.active ? '#E6F0ED' : 'transparent'};
  color: ${props => props.active ? '#0B4938' : '#333'};
  
  &:hover {
    background-color: ${props => props.active ? '#D9E8E2' : '#F0F5F3'};
  }
`;

export const Section = styled.section`
  margin-bottom: 32px;
  border: 1px solid #D9E8E2;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const SectionTitle = styled.h2`
  color: #0B4938;
  margin-bottom: 24px;
  font-size: 1.6rem;
  font-weight: 600;
  padding-bottom: 16px;
  border-bottom: 2px solid #E6F0ED;
`;

export const SubSection = styled.div`
  margin-bottom: 24px;
  padding: 20px;
  border: 1px solid #E6F0ED;
  border-radius: 8px;
  background-color: #F5FAF8;
  transition: all 0.2s ease;

  &:hover {
    background-color: #E6F0ED;
  }
`;

export const SubSectionTitle = styled.h3`
  color: #0B4938;
  margin-bottom: 16px;
  font-size: 1.25rem;
  font-weight: 500;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

export const Tag = styled.span`
  background-color: #E6F0ED;
  color: #0B4938;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #D9E8E2;
  }
`;

export const TargetabilityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
`;

export const TargetabilityBox = styled.div`
  padding: 20px;
  border: 1px solid #E6F0ED;
  border-radius: 8px;
  background-color: #F5FAF8;
  transition: all 0.2s ease;

  &:hover {
    border-color: #D9E8E2;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  strong {
    display: inline;
    color: #0B4938;
    margin-right: 6px;
    font-weight: 600;
  }

  p {
    margin: 0;
    display: inline;
    color: #4a4a4a;
    line-height: 1.5;
  }
`;

export const MarkdownText = styled.div`
  p {
    margin-bottom: 1.2em;
    line-height: 1.7;
    color: #4a4a4a;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    font-weight: 600;
    color: #0B4938;
  }

  em {
    font-style: italic;
    color: #5c6b7a;
  }

  p > code {
    background-color: #F5FAF8;
    padding: 3px 6px;
    border-radius: 4px;
    font-family: 'SF Mono', Menlo, Monaco, Consolas, monospace;
    font-size: 0.9em;
    color: #0B4938;
  }
`;

export const FurtherReadingList = styled.ul`
  list-style-type: disc;
  padding-left: 25px; /* Add some padding for the bullets */
  margin-top: 16px;
`;

export const FurtherReadingListItem = styled.li`
  margin-bottom: 12px;
  line-height: 1.6;
`;

export const FurtherReadingLink = styled.a`
  color: #093D77; /* Dark Blue */
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease, text-decoration 0.2s ease;

  &:hover,
  &:focus {
    color: #80B7F4; /* Light Blue */
    text-decoration: underline;
  }
`;

export const FurtherReadingText = styled.span`
  color: #283131; /* Charcoal */
  font-weight: 500;
`; 