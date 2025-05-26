import styled from '@emotion/styled';

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const Sidebar = styled.nav`
  width: 250px;
  background-color: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
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
  font-weight: ${props => props.active ? '500' : '400'};
  background-color: ${props => props.active ? '#e8f0fe' : 'transparent'};
  color: ${props => props.active ? '#1a73e8' : '#333'};
  
  &:hover {
    background-color: ${props => props.active ? '#e8f0fe' : '#f5f5f5'};
  }
`;

export const Section = styled.section`
  margin-bottom: 32px;
  border: 1px solid #e0e0e0;
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
  color: #1a1a1a;
  margin-bottom: 24px;
  font-size: 1.6rem;
  font-weight: 600;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
`;

export const SubSection = styled.div`
  margin-bottom: 24px;
  padding: 20px;
  border: 1px solid #eef2f6;
  border-radius: 8px;
  background-color: #fafbfc;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const SubSectionTitle = styled.h3`
  color: #2c3e50;
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
  background-color: #f1f5fd;
  color: #1a73e8;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e8f0fe;
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
  border: 1px solid #eef2f6;
  border-radius: 8px;
  background-color: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    border-color: #e0e0e0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  strong {
    display: inline;
    color: #2c3e50;
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
    color: #2c3e50;
  }

  em {
    font-style: italic;
    color: #5c6b7a;
  }

  p > code {
    background-color: #f8f9fa;
    padding: 3px 6px;
    border-radius: 4px;
    font-family: 'SF Mono', Menlo, Monaco, Consolas, monospace;
    font-size: 0.9em;
    color: #2c3e50;
  }
`; 