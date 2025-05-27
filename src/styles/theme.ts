export const lightTheme = {
  body: '#FFF',
  text: '#363537',
  toggleBorder: '#FFF',
  background: '#F0F2F5', // Light grey background for the app
  sidebarBackground: '#FFFFFF', // White sidebar
  sidebarText: '#363537',
  sidebarHighlight: '#E6F7FF', // Light blue for active items
  mainContentBackground: '#FFFFFF', // White main content area
  cardBackground: '#FFFFFF', // White for cards or detailed sections
  borderColor: '#E8E8E8', // Light grey for borders
  accentColor: '#1890ff', // Blue accent
  accentColorObjective: '#52c41a', // Green accent for objectives
  filterChipBackground: '#E6F7FF',
  filterChipText: '#1890ff',
  filterChipRemoveBackground: '#D9D9D9',
  buttonBackground: '#1890ff',
  buttonText: '#FFF',
  clearButtonBackground: 'transparent',
  clearButtonText: '#8c8c8c',
  clearButtonHoverBackground: '#f0f0f0',
  searchInputBackground: '#FFF',
  searchInputText: '#363537',
  searchInputBorder: '#D9D9D9',
};

export const darkTheme = {
  body: '#1A202C', // Dark background for the app
  text: '#E2E8F0', // Light grey text
  toggleBorder: '#6B8096',
  background: '#1A202C', // Dark overall background
  sidebarBackground: '#2D3748', // Darker sidebar
  sidebarText: '#E2E8F0',
  sidebarHighlight: '#4A5568', // Darker highlight for active items
  mainContentBackground: '#2D3748', // Darker main content area
  cardBackground: '#4A5568', // Darker cards
  borderColor: '#4A5568', // Darker borders
  accentColor: '#63B3ED', // Lighter blue accent for dark mode
  accentColorObjective: '#68D391', // Lighter green accent for objectives
  filterChipBackground: '#3182CE', // Darker blue for filter chips
  filterChipText: '#E2E8F0',
  filterChipRemoveBackground: '#4A5568',
  buttonBackground: '#63B3ED',
  buttonText: '#1A202C',
  clearButtonBackground: 'transparent',
  clearButtonText: '#A0AEC0',
  clearButtonHoverBackground: '#2D3748',
  searchInputBackground: '#2D3748',
  searchInputText: '#E2E8F0',
  searchInputBorder: '#4A5568',
};

export type ThemeType = typeof lightTheme; 