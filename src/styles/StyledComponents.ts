import styled from '@emotion/styled';

// Responsive breakpoints
const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px'
};

// Define color variables for better maintainability
const toolColors = {
  primary: '#0B4938', // Dark Green
  activeBg: '#E6F0ED',
  activeHoverBg: '#D9E8E2',
  inactiveHoverBg: '#F0F5F3',
  tagBackground: '#E6F0ED', // Keep tool tags green
};

const objectiveColors = {
  primary: '#093D77', // Dark Blue
  activeBg: '#E7EFF9', // Light Blue
  activeHoverBg: '#D0E0F3',
  inactiveHoverBg: '#F0F7FC',
  tagBackground: '#E7EFF9', // Objective related tags blue
};

const brandColors = {
  darkGreen: '#0B4938',
  beige: '#FDF9E9',
  charcoal: '#283131',
};

const headerHeight = '70px';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  margin: 0;
  
  @media (max-width: ${breakpoints.mobile}) {
    height: 100dvh;
  }
`;

// New component to wrap Sidebar and MainContent, enabling them to scroll independently under a sticky header
export const ContentRow = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const StickyHeader = styled.header`
  background-color: ${brandColors.darkGreen};
  color: ${brandColors.beige};
  padding: 0 25px;
  height: ${headerHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 15px;
    height: 60px;
    flex-wrap: wrap;
    min-height: 60px;
  }
  
  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

export const HeaderLogo = styled.img`
  height: 70px;
  margin-right: 15px;
  
  @media (max-width: ${breakpoints.mobile}) {
    display: none; // Hide logo in header on mobile
  }
  
  @media (max-width: 480px) {
    height: 40px;
    margin-right: 8px;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${brandColors.beige};
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.3rem;
    position: static;
    transform: none;
    flex: 1;
    text-align: left;
    margin-left: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-left: 5px;
  }
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 25px;
  
  @media (max-width: ${breakpoints.mobile}) {
    display: none; // Hide regular nav on mobile
  }
  
  @media (max-width: 480px) {
    gap: 10px;
    flex-wrap: wrap;
  }
`;

export const HeaderNavLink = styled.a`
  color: ${brandColors.beige};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: #C5C0B0;
    text-decoration: underline;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${breakpoints.mobile}) {
    flex: 1;
    min-width: 0; // Allow shrinking
  }
`;

export const Sidebar = styled.nav`
  width: 300px;
  background-color: #FFFFFF;
  padding: 10px;
  border-right: 1px solid #D9E8E2;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  
  @media (max-width: ${breakpoints.mobile}) {
    display: none; // Hide sidebar on mobile - replaced with hamburger menu
  }
  
  @media (max-width: 480px) {
    height: 200px;
    padding: 8px;
  }
`;

export const SidebarSection = styled.div<{ itemType?: 'tool' | 'objective' }>`
  padding: 15px;
  border-radius: 8px;
  background-color: ${props => 
    props.itemType === 'objective' 
      ? objectiveColors.inactiveHoverBg
      : toolColors.inactiveHoverBg};
      
  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  > * {
    width: 100%;
    max-width: 850px;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px 20px 80px 20px; // Add bottom padding for footer
  }
  
  @media (max-width: 480px) {
    padding: 15px 15px 80px 15px;
  }
`;

export const ToolList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ToolListItem = styled.li<{ active: boolean; itemType?: 'tool' | 'objective' }>`
  padding: 8px 12px;
  margin: 4px 0;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-weight: ${props => props.active ? '600' : '400'};
  
  background-color: ${props => 
    props.active 
      ? (props.itemType === 'objective' ? objectiveColors.activeBg : toolColors.activeBg) 
      : 'transparent'};
  color: ${props => 
    props.active 
      ? (props.itemType === 'objective' ? objectiveColors.primary : toolColors.primary) 
      : '#333'};
  
  &:hover {
    background-color: ${props => 
      props.active 
        ? (props.itemType === 'objective' ? objectiveColors.activeHoverBg : toolColors.activeHoverBg) 
        : (props.itemType === 'objective' ? objectiveColors.inactiveHoverBg : toolColors.inactiveHoverBg)};
    transform: scale(1.01);
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 0.85rem;
  }
`;

// variant prop type for components that can have a 'filter' style
type ComponentVariant = 'filter';

export const Section = styled.section<{ variant?: ComponentVariant }>`
  margin-bottom: ${props => props.variant === 'filter' ? '20px' : '32px'};
  border: 1px solid ${props => props.variant === 'filter' ? '#E0E0E0' : '#D9E8E2'};
  border-radius: ${props => props.variant === 'filter' ? '8px' : '12px'};
  padding: ${props => props.variant === 'filter' ? '10px' : '28px'};
  box-shadow: ${props => props.variant === 'filter' ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  background-color: ${props => props.variant === 'filter' ? '#F9F9F9' : '#ffffff'};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${props => props.variant === 'filter' ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.08)'};
    border-color: ${props => props.variant === 'filter' ? '#CCCCCC' : '#D9E8E2'};
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${props => props.variant === 'filter' ? '8px' : '20px'};
    margin-bottom: ${props => props.variant === 'filter' ? '15px' : '24px'};
  }
  
  @media (max-width: 480px) {
    padding: ${props => props.variant === 'filter' ? '6px' : '15px'};
    margin-bottom: ${props => props.variant === 'filter' ? '12px' : '20px'};
  }
`;

export const SectionTitle = styled.h2<{ itemType?: 'tool' | 'objective'; variant?: ComponentVariant }>`
  color: ${props => props.itemType === 'objective' ? objectiveColors.primary : toolColors.primary};
  margin-bottom: ${props => props.variant === 'filter' ? '16px' : '24px'};
  font-size: ${props => props.variant === 'filter' ? '1.1rem' : '1.6rem'};
  font-weight: ${props => props.variant === 'filter' ? '500' : '600'};
  padding-bottom: ${props => props.variant === 'filter' ? '8px' : '16px'};
  border-bottom: 1px solid ${props => props.variant === 'filter' ? '#E0E0E0' : '#E6F0ED'};
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${props => props.variant === 'filter' ? '1rem' : '1.4rem'};
    margin-bottom: ${props => props.variant === 'filter' ? '12px' : '20px'};
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.variant === 'filter' ? '0.9rem' : '1.2rem'};
    margin-bottom: ${props => props.variant === 'filter' ? '10px' : '16px'};
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  
  @media (max-width: ${breakpoints.mobile}) {
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  @media (max-width: 480px) {
    gap: 6px;
    margin-bottom: 16px;
  }
`;

export const ItemTypeIndicator = styled.span<{ itemType?: 'tool' | 'objective' }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #FFFFFF;
  background-color: ${props => 
    props.itemType === 'objective' ? objectiveColors.primary : toolColors.primary};
    
  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px 8px;
    font-size: 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 2px 6px;
    font-size: 0.7rem;
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  color: #283131;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  margin: 8px 0 0 0;
  color: #7f8c8d;
  font-size: 16px;
  line-height: 1.5;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    margin: 6px 0 0 0;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const SidebarTitle = styled.h2<{ itemType?: 'tool' | 'objective' }>`
  font-size: 1.2em;
  margin-top: 0;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
  color: ${(props) => (props.itemType === 'tool' ? toolColors.primary : objectiveColors.primary)};
  cursor: pointer;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1em;
  }
  
  @media (max-width: 480px) {
    font-size: 1em;
  }
`;

export const SidebarSubheading = styled.h3`
  font-size: 0.9em;
  font-weight: 800;
  margin-top: 10px;
  margin-bottom: 5px;
  padding-left: 8px;
  color: ${objectiveColors.primary};
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.85em;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8em;
    padding-left: 6px;
  }
`;

export const SubSection = styled.div<{ variant?: ComponentVariant }>`
  margin-bottom: ${props => props.variant === 'filter' ? '4px' : '24px'};
  padding: ${props => props.variant === 'filter' ? '0px' : '20px'};
  border: ${props => props.variant === 'filter' ? 'none' : '1px solid #E6F0ED'};
  border-radius: ${props => props.variant === 'filter' ? '4px' : '8px'};
  background-color: ${props => props.variant === 'filter' ? 'transparent' : '#F5FAF8'};
  transition: all 0.2s ease;

  ${props => props.variant === 'filter' && `
    display: flex;
    align-items: baseline;
  `}

  &:hover {
    background-color: ${props => props.variant === 'filter' ? 'transparent' : '#E6F0ED'};
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${props => props.variant === 'filter' ? '0px' : '15px'};
    margin-bottom: ${props => props.variant === 'filter' ? '3px' : '20px'};
    
    ${props => props.variant === 'filter' && `
      flex-direction: column;
      align-items: flex-start;
    `}
  }
  
  @media (max-width: 480px) {
    padding: ${props => props.variant === 'filter' ? '0px' : '12px'};
    margin-bottom: ${props => props.variant === 'filter' ? '2px' : '16px'};
  }
`;

export const SubSectionTitle = styled.h3<{ itemType?: 'tool' | 'objective'; variant?: ComponentVariant }>`
  color: ${props => props.itemType === 'objective' ? objectiveColors.primary : toolColors.primary};
  margin-bottom: ${props => props.variant === 'filter' ? '0' : '16px'};
  font-size: ${props => props.variant === 'filter' ? '0.9rem' : '1.25rem'};
  font-weight: ${props => props.variant === 'filter' ? '500' : '500'};

  ${props => props.variant === 'filter' && `
    margin-right: 8px;
    flex-shrink: 0;
  `}
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${props => props.variant === 'filter' ? '0.85rem' : '1.1rem'};
    
    ${props => props.variant === 'filter' && `
      margin-right: 0;
      margin-bottom: 4px;
    `}
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.variant === 'filter' ? '0.8rem' : '1rem'};
  }
`;

export const TagContainer = styled.div<{ variant?: ComponentVariant }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.variant === 'filter' ? '4px' : '8px'};
  margin-top: ${props => props.variant === 'filter' ? '0' : '12px'};

  ${props => props.variant === 'filter' && `
    align-items: baseline;
  `}
  
  @media (max-width: ${breakpoints.mobile}) {
    gap: ${props => props.variant === 'filter' ? '3px' : '6px'};
  }
  
  @media (max-width: 480px) {
    gap: ${props => props.variant === 'filter' ? '2px' : '4px'};
  }
`;

export const Tag = styled.span<{ itemType?: 'tool' | 'objective'; variant?: ComponentVariant; onClick?: () => void }>`
  background-color: ${props => 
    props.itemType === 'objective' && props.variant !== 'filter'
      ? objectiveColors.tagBackground 
      : toolColors.tagBackground};
  color: ${props => 
    props.itemType === 'objective' && props.variant !== 'filter'
      ? objectiveColors.primary 
      : toolColors.primary};
  padding: ${props => props.variant === 'filter' ? '3px 7px' : '6px 12px'};
  border-radius: ${props => props.variant === 'filter' ? '4px' : '16px'};
  font-size: ${props => props.variant === 'filter' ? '0.75rem' : '0.9rem'};
  font-weight: ${props => props.variant === 'filter' ? '400' : '500'};
  transition: all 0.2s ease;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};

  &:hover {
    background-color: ${props => 
      props.onClick 
        ? (props.itemType === 'objective' && props.variant !== 'filter' ? objectiveColors.activeHoverBg : toolColors.activeHoverBg) 
        : (props.itemType === 'objective' && props.variant !== 'filter' ? objectiveColors.tagBackground : toolColors.tagBackground)};
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${props => props.variant === 'filter' ? '2px 6px' : '5px 10px'};
    font-size: ${props => props.variant === 'filter' ? '0.7rem' : '0.85rem'};
  }
  
  @media (max-width: 480px) {
    padding: ${props => props.variant === 'filter' ? '2px 5px' : '4px 8px'};
    font-size: ${props => props.variant === 'filter' ? '0.65rem' : '0.8rem'};
  }
`;

export const TargetabilityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
  
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-top: 15px;
  }
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
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
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
  
  @media (max-width: ${breakpoints.mobile}) {
    p {
      line-height: 1.6;
      margin-bottom: 1em;
    }
  }
`;

export const FurtherReadingList = styled.ul`
  list-style-type: disc;
  padding-left: 25px;
  margin-top: 16px;
  
  @media (max-width: ${breakpoints.mobile}) {
    padding-left: 20px;
  }
  
  @media (max-width: 480px) {
    padding-left: 18px;
  }
`;

export const FurtherReadingListItem = styled.li`
  margin-bottom: 12px;
  line-height: 1.6;
  
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 10px;
  }
`;

export const FurtherReadingLink = styled.a`
  color: #093D77;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease, text-decoration 0.2s ease;

  &:hover,
  &:focus {
    color: #80B7F4;
    text-decoration: underline;
  }
`;

export const FurtherReadingText = styled.span`
  color: #283131;
  font-weight: 500;
`;

export const ToolLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
`;

export const ToolLinkListItem = styled.li`
  margin-bottom: 8px;
`;

export const ToolLink = styled.span`
  color: #0B4938; 
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: #1a7d5f; 
  }
`;

export const FilterBarContainer = styled.div`
  padding: 10px 0;
  margin-bottom: 10px;
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 0;
    margin-bottom: 8px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #D9E8E2;
  font-size: 0.9rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${toolColors.primary};
    box-shadow: 0 0 0 2px ${toolColors.activeBg};
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 10px;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 6px 8px;
    font-size: 0.8rem;
  }
`;

export const FilterChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 0;
  
  @media (max-width: ${breakpoints.mobile}) {
    gap: 4px;
    padding: 6px 0;
  }
  
  @media (max-width: 480px) {
    gap: 3px;
    padding: 4px 0;
  }
`;

export const FilterChip = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: ${toolColors.primary};
  color: #FFFFFF;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1;
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px 6px;
    font-size: 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 2px 5px;
    font-size: 0.7rem;
  }
`;

export const RemoveChipButton = styled.button`
  background: none;
  border: none;
  color: #FFFFFF;
  margin-left: 6px;
  padding: 0;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  font-weight: 700;

  &:hover {
    color: #F0F5F3;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 4px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    margin-left: 3px;
    font-size: 0.8rem;
  }
`;

export const ClearFiltersButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${toolColors.primary};
  padding: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;
  margin-top: 8px;
  display: inline-block;

  &:hover {
    color: ${objectiveColors.primary};
    background-color: transparent;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.7rem;
    margin-top: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
    margin-top: 4px;
  }
`;

// Map-specific components that don't duplicate existing functionality
export const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  
  @media (max-width: ${breakpoints.mobile}) {
    height: calc(100vh - 60px - 60px); // Subtract header and footer heights
  }
`;

export const MapLegend = styled.div`
  position: absolute;
  top: 120px;
  right: 20px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e0e0e0;
  z-index: 10;
  
  @media (max-width: ${breakpoints.mobile}) {
    position: fixed;
    top: auto;
    bottom: 20px;
    right: 15px;
    left: 15px;
    padding: 12px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 25px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  }
  
  @media (max-width: 480px) {
    bottom: 10px;
    right: 10px;
    left: 10px;
    padding: 10px;
  }
`;

export const MapLegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 0;
    flex: 1;
    justify-content: center;
    
    &:first-child {
      border-right: 1px solid #e0e0e0;
      margin-right: 10px;
      padding-right: 10px;
    }
  }
`;

export const MapLegendColor = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background-color: ${props => props.color};
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
  
  @media (max-width: ${breakpoints.mobile}) {
    width: 14px;
    height: 14px;
    margin-right: 6px;
  }
`;

export const MapLegendText = styled.span`
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const MapSvgContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  touch-action: manipulation;
  
  svg {
    width: 100%;
    height: 100%;
    cursor: grab;
    
    &:active {
      cursor: grabbing;
    }
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding-bottom: 80px;
  }
  
  @media (max-width: 480px) {
    padding-bottom: 70px;
  }
`;

export const MobileMapInstructions = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  text-align: center;
  z-index: 20;
  opacity: 0.9;
  pointer-events: none;
  
  @media (min-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

// Add hamburger menu components
export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const HamburgerLine = styled.div<{ isOpen: boolean }>`
  width: 24px;
  height: 3px;
  background-color: ${brandColors.beige};
  margin: 2px 0;
  transition: all 0.3s ease;
  border-radius: 2px;
  
  &:nth-of-type(1) {
    transform: ${props => props.isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'};
  }
  
  &:nth-of-type(2) {
    opacity: ${props => props.isOpen ? '0' : '1'};
  }
  
  &:nth-of-type(3) {
    transform: ${props => props.isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'};
  }
`;

export const MobileMenuOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 60px; // Leave space for footer
  background-color: #FFFFFF;
  z-index: 999;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  overflow-y: auto;
  padding: 20px;
  border-top: 1px solid #D9E8E2;
  
  @media (min-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

export const MobileMenuBackdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  
  @media (min-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

export const MobileNavSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const MobileNavTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${brandColors.darkGreen};
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid ${brandColors.darkGreen};
  cursor: pointer;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    color: ${objectiveColors.primary};
  }
`;

export const MobileNavLink = styled.div`
  padding: 12px 0;
  font-size: 1rem;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

// Footer components
export const Footer = styled.footer`
  background-color: ${brandColors.darkGreen};
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #D9E8E2;
  position: relative;
  z-index: 1001;
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 15px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${brandColors.darkGreen};
  }
`;

export const FooterLogo = styled.img`
  height: 40px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    height: 32px;
  }
`;

// Advanced filter components
export const FilterExpandButton = styled.button`
  background: none;
  border: none;
  color: ${toolColors.primary};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${objectiveColors.primary};
    transform: translateY(-1px);
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8rem;
    padding: 6px 0;
  }
`;

export const FilterIcon = styled.span`
  font-size: 1rem;
  display: flex;
  align-items: center;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

export const FilterExpandIcon = styled.span<{ isExpanded: boolean }>`
  transition: transform 0.2s ease;
  transform: rotate(${props => props.isExpanded ? '180deg' : '0deg'});
  font-size: 0.8rem;
`;

export const FilterCategoriesContainer = styled.div<{ isExpanded: boolean }>`
  max-height: ${props => props.isExpanded ? '400px' : '0'};
  overflow: ${props => props.isExpanded ? 'auto' : 'hidden'};
  transition: max-height 0.3s ease;
  border: ${props => props.isExpanded ? '1px solid #E0E0E0' : 'none'};
  border-radius: 8px;
  background-color: #f8f9fa;
  margin-top: ${props => props.isExpanded ? '8px' : '0'};
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
    
    &:hover {
      background: #a8a8a8;
    }
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    max-height: ${props => props.isExpanded ? '300px' : '0'};
  }
`;

export const FilterCategory = styled.div`
  border-bottom: 1px solid #E8E8E8;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const FilterCategoryHeader = styled.div`
  padding: 12px 16px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #E0E0E0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #e8e8e8;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 12px;
  }
`;

export const FilterCategoryTitle = styled.h4<{ hasActiveFilters?: boolean }>`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.hasActiveFilters ? toolColors.primary : brandColors.charcoal};
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.85rem;
  }
`;

export const FilterCategoryIcon = styled.span<{ isExpanded: boolean }>`
  font-size: 0.8rem;
  color: #666;
  transition: transform 0.2s ease;
  transform: rotate(${props => props.isExpanded ? '180deg' : '0deg'});
`;

export const FilterCategoryContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${props => props.isExpanded ? '200px' : '0'};
  overflow-y: auto;
  transition: max-height 0.3s ease;
  background-color: white;
`;

export const FilterOptionsGrid = styled.div`
  padding: 12px 16px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 12px;
    gap: 6px;
  }
`;

export const FilterOption = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.85rem;
  color: #333;
  padding: 4px 0;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${toolColors.primary};
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8rem;
    padding: 3px 0;
  }
`;

export const FilterCheckbox = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  accent-color: ${toolColors.primary};
  cursor: pointer;
  
  @media (max-width: ${breakpoints.mobile}) {
    width: 14px;
    height: 14px;
    margin-right: 6px;
  }
`;

export const FilterOptionText = styled.span`
  line-height: 1.4;
`;

export const FilterSummary = styled.div`
  font-size: 0.8rem;
  color: #666;
  padding: 12px 16px;
  border-top: 1px solid #E8E8E8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.75rem;
    padding: 10px 12px;
  }
`;

export const FilterClearAllButton = styled.button`
  background: none;
  border: none;
  color: ${toolColors.primary};
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;
  padding: 0;

  &:hover {
    color: ${objectiveColors.primary};
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.7rem;
  }
`; 