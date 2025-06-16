import styled from '@emotion/styled';

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
  flex-direction: column; // Changed for header layout
  height: 100vh;
  width: 100vw;
  margin: 0;
`;

// New component to wrap Sidebar and MainContent, enabling them to scroll independently under a sticky header
export const ContentRow = styled.div`
  display: flex;
  flex: 1; // Takes remaining height after header
  overflow: hidden; // Children will handle their own scroll
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
  z-index: 1000; // Ensure header stays on top
  width: 100%;
  box-sizing: border-box;
`;

export const HeaderLogo = styled.img`
  height: 70px; // Changed from 40px to fill header
  margin-right: 15px;
`;

export const HeaderTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${brandColors.beige};
  margin: 0;
  position: absolute; // Centering trick
  left: 50%;
  transform: translateX(-50%);
`;

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 25px;
`;

export const HeaderNavLink = styled.a`
  color: ${brandColors.beige};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #C5C0B0; // Slightly lighter beige or a different hover effect
    text-decoration: underline;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
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
  height: 100%; // Ensure sidebar can scroll within ContentRow
`;

export const SidebarSection = styled.div<{ itemType?: 'tool' | 'objective' }>`
  padding: 15px;
  border-radius: 8px;
  background-color: ${props => 
    props.itemType === 'objective' 
      ? objectiveColors.inactiveHoverBg // Light blue for objectives section
      : toolColors.inactiveHoverBg}; // Light green for tools section
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%; // Ensure main content can scroll within ContentRow

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
`;

// variant prop type for components that can have a 'filter' style
type ComponentVariant = 'filter';

export const Section = styled.section<{ variant?: ComponentVariant }>`
  margin-bottom: ${props => props.variant === 'filter' ? '20px' : '32px'};
  border: 1px solid ${props => props.variant === 'filter' ? '#E0E0E0' : '#D9E8E2'}; // Lighter border for filter
  border-radius: ${props => props.variant === 'filter' ? '8px' : '12px'};
  padding: ${props => props.variant === 'filter' ? '10px' : '28px'}; // Changed filter padding from 20px to 10px
  box-shadow: ${props => props.variant === 'filter' ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.05)'}; // No shadow for filter
  background-color: ${props => props.variant === 'filter' ? '#F9F9F9' : '#ffffff'}; // Different bg for filter
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${props => props.variant === 'filter' ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.08)'};
    border-color: ${props => props.variant === 'filter' ? '#CCCCCC' : '#D9E8E2'};
  }
`;

export const SectionTitle = styled.h2<{ itemType?: 'tool' | 'objective'; variant?: ComponentVariant }>`
  color: ${props => props.itemType === 'objective' ? objectiveColors.primary : toolColors.primary};
  margin-bottom: ${props => props.variant === 'filter' ? '16px' : '24px'};
  font-size: ${props => props.variant === 'filter' ? '1.1rem' : '1.6rem'}; // Smaller for filter
  font-weight: ${props => props.variant === 'filter' ? '500' : '600'};
  padding-bottom: ${props => props.variant === 'filter' ? '8px' : '16px'};
  border-bottom: 1px solid ${props => props.variant === 'filter' ? '#E0E0E0' : '#E6F0ED'}; // Lighter for filter
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
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
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  color: #283131;
`;

export const SidebarTitle = styled.h2<{ itemType?: 'tool' | 'objective' }>`
  font-size: 1.2em;
  margin-top: 0;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
  color: ${(props) => (props.itemType === 'tool' ? toolColors.primary : objectiveColors.primary)};
  cursor: pointer;
`;

export const SidebarSubheading = styled.h3`
  font-size: 0.9em;
  font-weight: 800;
  margin-top: 10px;
  margin-bottom: 5px;
  padding-left: 8px; // Reduced from 12px to nudge left
  color: ${objectiveColors.primary}; // Changed to dark blue
`;

export const SubSection = styled.div<{ variant?: ComponentVariant }>`
  margin-bottom: ${props => props.variant === 'filter' ? '4px' : '24px'}; // Changed filter margin-bottom from 8px to 4px
  padding: ${props => props.variant === 'filter' ? '0px' : '20px'};
  border: ${props => props.variant === 'filter' ? 'none' : '1px solid #E6F0ED'};
  border-radius: ${props => props.variant === 'filter' ? '4px' : '8px'};
  background-color: ${props => props.variant === 'filter' ? 'transparent' : '#F5FAF8'};
  transition: all 0.2s ease;

  ${props => props.variant === 'filter' && `
    display: flex;
    align-items: baseline; // Align title text with the first line of tags
  `}

  &:hover {
    background-color: ${props => props.variant === 'filter' ? 'transparent' : '#E6F0ED'};
  }
`;

export const SubSectionTitle = styled.h3<{ itemType?: 'tool' | 'objective'; variant?: ComponentVariant }>`
  color: ${props => props.itemType === 'objective' ? objectiveColors.primary : toolColors.primary};
  margin-bottom: ${props => props.variant === 'filter' ? '0' : '16px'}; // Removed bottom margin for filter variant
  font-size: ${props => props.variant === 'filter' ? '0.9rem' : '1.25rem'};
  font-weight: ${props => props.variant === 'filter' ? '500' : '500'};

  ${props => props.variant === 'filter' && `
    margin-right: 8px; // Add right margin to separate title from tags
    flex-shrink: 0; // Prevent title from shrinking
  `}
`;

export const TagContainer = styled.div<{ variant?: ComponentVariant }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.variant === 'filter' ? '4px' : '8px'};
  margin-top: ${props => props.variant === 'filter' ? '0' : '12px'}; // Removed top margin for filter variant

  ${props => props.variant === 'filter' && `
    align-items: baseline; // Align tags with the title, especially if they wrap
  `}
`;

export const Tag = styled.span<{ itemType?: 'tool' | 'objective'; variant?: ComponentVariant; onClick?: () => void }>`
  background-color: ${props => 
    props.itemType === 'objective' && props.variant !== 'filter' // Objective context tags (not filter tags) are blue
      ? objectiveColors.tagBackground 
      : toolColors.tagBackground}; // Default to tool color (green)
  color: ${props => 
    props.itemType === 'objective' && props.variant !== 'filter'
      ? objectiveColors.primary 
      : toolColors.primary};
  padding: ${props => props.variant === 'filter' ? '3px 7px' : '6px 12px'}; // Smaller padding for filter
  border-radius: ${props => props.variant === 'filter' ? '4px' : '16px'}; // Less rounded for filter
  font-size: ${props => props.variant === 'filter' ? '0.75rem' : '0.9rem'}; // Smaller font for filter
  font-weight: ${props => props.variant === 'filter' ? '400' : '500'};
  transition: all 0.2s ease;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};

  &:hover {
    background-color: ${props => 
      props.onClick 
        ? (props.itemType === 'objective' && props.variant !== 'filter' ? objectiveColors.activeHoverBg : toolColors.activeHoverBg) 
        : (props.itemType === 'objective' && props.variant !== 'filter' ? objectiveColors.tagBackground : toolColors.tagBackground)};
    // Only change background on hover if it's clickable
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
    color: #0B4938; /* Default to tool color, can be overridden by context */
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
  padding-left: 25px;
  margin-top: 16px;
`;

export const FurtherReadingListItem = styled.li`
  margin-bottom: 12px;
  line-height: 1.6;
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
  padding: 10px 0; // Padding for the container itself
  margin-bottom: 10px; // Space below the filter bar
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #D9E8E2;
  font-size: 0.9rem;
  box-sizing: border-box; // Ensures padding doesn't add to width

  &:focus {
    outline: none;
    border-color: ${toolColors.primary};
    box-shadow: 0 0 0 2px ${toolColors.activeBg};
  }
`;

export const FilterChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 0; // Padding above and below chips, but not on sides if search input is 100%
`;

export const FilterChip = styled.span`
  display: inline-flex; // To align text and button
  align-items: center;
  background-color: ${toolColors.primary}; // Using tool primary color for chips
  color: #FFFFFF;
  padding: 4px 8px;
  border-radius: 4px; // Changed from 12px to 4px
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1;
`;

export const RemoveChipButton = styled.button`
  background: none;
  border: none;
  color: #FFFFFF;
  margin-left: 6px;
  padding: 0;
  cursor: pointer;
  font-size: 1rem; // Make X slightly larger for easier clicking
  line-height: 1; // Ensure it aligns well
  font-weight: 700;

  &:hover {
    color: #F0F5F3; // A lighter shade on hover
  }
`;

export const ClearFiltersButton = styled.button`
  background-color: transparent;
  border: none; // Remove border
  color: ${toolColors.primary}; // Use primary color for text
  padding: 4px; // Reduce padding
  font-size: 0.75rem; // Smaller font
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline; // Add underline to look like a link
  transition: color 0.2s ease;
  margin-top: 8px;
  display: inline-block; // To allow margin-top and ensure it doesn't take full width

  &:hover {
    color: ${objectiveColors.primary}; // Change to a different color on hover, e.g., objective blue
    background-color: transparent; // Ensure no background on hover
  }
`; 