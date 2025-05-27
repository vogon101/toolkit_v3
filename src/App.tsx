import { useState, useEffect, useRef } from 'react'
import { parse } from 'yaml'
import type { Tool, TagsList, Objective, SelectedItem, ItemType } from './types/Tool'
import { ToolDetail } from './components/ToolDetail'
import { ObjectiveDetail } from './components/ObjectiveDetail'
import {
  AppContainer,
  ContentRow,
  StickyHeader,
  HeaderLogo,
  HeaderTitle,
  HeaderNav,
  HeaderNavLink,
  HeaderSection,
  Sidebar,
  MainContent,
  ToolList,
  ToolListItem,
  SidebarTitle,
  SidebarSection,
  FilterBarContainer,
  SearchInput,
  FilterChipContainer,
  FilterChip,
  RemoveChipButton,
  ClearFiltersButton,
  PageTitle,
  Section,
  MarkdownText,
} from './styles/StyledComponents'

function App() {
  const [tools, setTools] = useState<Tool[]>([])
  const [objectives, setObjectives] = useState<Objective[]>([])
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null)
  const [selectedItemType, setSelectedItemType] = useState<ItemType>(null)
  const [tagsList, setTagsList] = useState<TagsList | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showUserGuide, setShowUserGuide] = useState(false)
  const mainContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [toolsResponse, tagsResponse, objectivesResponse] = await Promise.all([
          fetch('/tools.yaml'),
          fetch('/tags_list.yaml'),
          fetch('/objectives.yaml'),
        ]);
        
        const [toolsYaml, tagsYaml, objectivesYaml] = await Promise.all([
          toolsResponse.text(),
          tagsResponse.text(),
          objectivesResponse.text(),
        ]);

        const toolsData = parse(toolsYaml);
        const tagsData = parse(tagsYaml);
        const objectivesData = parse(objectivesYaml);

        setTools(toolsData.tools);
        setTagsList(tagsData);
        setObjectives(objectivesData.objectives);

        // Handle initial selection from URL hash
        const hash = window.location.hash.substring(1);
        if (hash) {
          if (hash === 'guide') {
            setShowUserGuide(true);
            setSelectedItem(null);
            setSelectedItemType(null);
            return;
          }
          const [type, tag] = hash.split(':');
          if (type === 'tool' && toolsData.tools) {
            const toolFromHash = toolsData.tools.find((t: Tool) => t.tag === tag);
            if (toolFromHash) {
              setSelectedItem(toolFromHash);
              setSelectedItemType('tool');
              setShowUserGuide(false);
              return; // Exit after setting from hash
            }
          } else if (type === 'objective' && objectivesData.objectives) {
            const objectiveFromHash = objectivesData.objectives.find((o: Objective) => o.tag === tag);
            if (objectiveFromHash) {
              setSelectedItem(objectiveFromHash);
              setSelectedItemType('objective');
              setShowUserGuide(false);
              return; // Exit after setting from hash
            }
          }
        }

        // Fallback to default selection if no valid hash and not showing guide
        if (toolsData.tools.length > 0) {
          setSelectedItem(toolsData.tools[0]);
          setSelectedItemType('tool');
          setShowUserGuide(false);
        } else if (objectivesData.objectives.length > 0) {
          setSelectedItem(objectivesData.objectives[0]);
          setSelectedItemType('objective');
          setShowUserGuide(false);
        } else {
          // If no tools or objectives, show guide by default or a message
          setShowUserGuide(true);
        }

      } catch (error) {
        console.error('Error loading data:', error);
        setShowUserGuide(true); // Show guide on error as a fallback
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, [selectedItem, selectedItemType, showUserGuide]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const addFilter = (tag: string) => {
    if (!activeFilters.includes(tag)) {
      setActiveFilters([...activeFilters, tag]);
      setShowUserGuide(false); // Hide guide when filters are applied
    }
  };

  const removeFilter = (tagToRemove: string) => {
    setActiveFilters(activeFilters.filter(tag => tag !== tagToRemove));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setActiveFilters([]);
  };

  const filteredTools = tools
    .filter(tool => {
      if (activeFilters.length === 0) return true;
      const toolTags = [
        ...(tool.tags.objectives || []),
        ...(tool.tags.innovation_stage || []),
        ...(tool.tags.sectors || []),
        ...(tool.tags.targeting || []),
        ...(tool.tags.timeline || []),
      ];
      return activeFilters.every(filterTag => toolTags.includes(filterTag));
    })
    .filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredObjectives = objectives.filter(objective => 
    objective.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTool = (tool: Tool) => {
    setSelectedItem(tool);
    setSelectedItemType('tool');
    setShowUserGuide(false);
    window.location.hash = `tool:${tool.tag}`;
  };

  const handleSelectObjective = (objective: Objective) => {
    setSelectedItem(objective);
    setSelectedItemType('objective');
    setShowUserGuide(false);
    window.location.hash = `objective:${objective.tag}`;
  };

  const handleShowUserGuide = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent default anchor behavior
    setSelectedItem(null);
    setSelectedItemType(null);
    setShowUserGuide(true);
    setActiveFilters([]); // Clear filters when showing guide
    setSearchTerm(''); // Clear search when showing guide
    window.location.hash = 'guide';
  };

  return (
    <AppContainer>
      <StickyHeader>
        <HeaderSection>
          <HeaderLogo src="/logo.png" alt="Logo" />
        </HeaderSection>
        <HeaderTitle>R&D Policy Toolkit</HeaderTitle>
        <HeaderSection>
          <HeaderNav>
            <HeaderNavLink href="#guide" onClick={handleShowUserGuide}>How to use this toolkit</HeaderNavLink>
            <HeaderNavLink href="https://britishprogress.org" target="_blank" rel="noopener noreferrer">Go to main website</HeaderNavLink>
          </HeaderNav>
        </HeaderSection>
      </StickyHeader>
      <ContentRow>
        <Sidebar>
          <FilterBarContainer>
            <SearchInput 
              type="text"
              placeholder="Search tools & objectives..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {activeFilters.length > 0 && (
              <FilterChipContainer>
                {activeFilters.map(filterTag => {
                  let displayTagName = filterTag;
                  if (tagsList) {
                    for (const category of Object.values(tagsList.tags)) {
                      const found = category.find(t => t.tag === filterTag);
                      if (found) {
                        displayTagName = found.name;
                        break;
                      }
                    }
                  }
                  return (
                    <FilterChip key={filterTag}>
                      {displayTagName}
                      <RemoveChipButton onClick={() => removeFilter(filterTag)}>
                        &times;
                      </RemoveChipButton>
                    </FilterChip>
                  );
                })}
              </FilterChipContainer>
            )}
            {(searchTerm || activeFilters.length > 0) && (
              <ClearFiltersButton onClick={clearAllFilters}>
                Clear all filters
              </ClearFiltersButton>
            )}
          </FilterBarContainer>

          <SidebarSection itemType="tool">
            <SidebarTitle itemType="tool">Tools</SidebarTitle>
            <ToolList>
              {filteredTools.map((tool) => (
                <ToolListItem
                  key={tool.tag}
                  active={!showUserGuide && selectedItemType === 'tool' && selectedItem?.tag === tool.tag}
                  onClick={() => handleSelectTool(tool)}
                >
                  {tool.name}
                </ToolListItem>
              ))}
            </ToolList>
          </SidebarSection>

          <SidebarSection itemType="objective">
            <SidebarTitle itemType="objective">Objectives</SidebarTitle>
            <ToolList>
              {filteredObjectives.map((objective) => (
                <ToolListItem
                  key={objective.tag}
                  active={!showUserGuide && selectedItemType === 'objective' && selectedItem?.tag === objective.tag}
                  onClick={() => handleSelectObjective(objective)}
                  itemType="objective"
                >
                  {objective.name}
                </ToolListItem>
              ))}
            </ToolList>
          </SidebarSection>
        </Sidebar>
        <MainContent ref={mainContentRef}>
          {showUserGuide ? (
            <Section>
              <PageTitle>How to Use This Toolkit</PageTitle>
              <MarkdownText>
                <p>This is a placeholder for the user guide. Content will be added here soon.</p>
                <p>In the meantime, explore the tools and objectives using the sidebar and filters!</p>
              </MarkdownText>
            </Section>
          ) : selectedItem && tagsList && selectedItemType === 'tool' ? (
            <ToolDetail 
              tool={selectedItem as Tool} 
              tagsList={tagsList} 
              objectives={objectives}
              onSelectObjective={handleSelectObjective}
              onAddFilter={addFilter}
            />
          ) : selectedItem && selectedItemType === 'objective' ? (
            <ObjectiveDetail 
                objective={selectedItem as Objective} 
                tools={tools} 
                onSelectTool={handleSelectTool} 
            />
          ) : (
            <Section>
                <PageTitle>Welcome!</PageTitle>
                 <MarkdownText>
                    <p>Select a tool or objective from the sidebar to get started, or use the search and filter options.</p>
                    <p>If you need help, click on the "How to use this toolkit" link in the header.</p>
                </MarkdownText>
            </Section>
          )}
        </MainContent>
      </ContentRow>
    </AppContainer>
  )
}

export default App
