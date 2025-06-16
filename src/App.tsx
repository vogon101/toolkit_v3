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
  SidebarSubheading
} from './styles/StyledComponents'

interface ObjectiveGroup {
  group: string;
  objectives: Objective[];
}

function App() {
  const [tools, setTools] = useState<Tool[]>([])
  const [objectiveGroups, setObjectiveGroups] = useState<ObjectiveGroup[]>([])
  const [allObjectives, setAllObjectives] = useState<Objective[]>([])
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null)
  const [selectedItemType, setSelectedItemType] = useState<ItemType>(null)
  const [tagsList, setTagsList] = useState<TagsList | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showUserGuide, setShowUserGuide] = useState(false)
  const [guideHtml, setGuideHtml] = useState<string>('')
  const [collapsedSections, setCollapsedSections] = useState<{ objectives: boolean; tools: boolean }>({ objectives: true, tools: false });
  const mainContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [toolsResponse, tagsResponse, objectivesGroupedResponse] = await Promise.all([
          fetch('/tools_v4.yaml'),
          fetch('/tags_list.yaml'),
          fetch('/objectives_grouped.yaml'),
        ]);
        
        const [toolsYaml, tagsYaml, objectivesGroupedYaml] = await Promise.all([
          toolsResponse.text(),
          tagsResponse.text(),
          objectivesGroupedResponse.text(),
        ]);

        const toolsData = parse(toolsYaml);
        const tagsData = parse(tagsYaml);
        const objectivesGroupedData = parse(objectivesGroupedYaml);

        const slugify = (str: string) =>
          str
            .toLowerCase()
            .replace(/&/g, 'and') // Replace ampersands with 'and'
            .replace(/[^a-z0-9]+/g, '_') // Non-alphanumeric to underscores
            .replace(/^_+|_+$/g, ''); // Trim leading/trailing underscores

        const toolsWithTag = toolsData.tools.map((t: any) => ({
          ...t,
          tag: t.tag || slugify(t.name),
        }));

        setTools(toolsWithTag);
        setTagsList(tagsData);
        setObjectiveGroups(objectivesGroupedData.objective_groups);

        // Extract all objectives for potential flat list usage if needed elsewhere (e.g., initial selection)
        const currentAllObjectives = objectivesGroupedData.objective_groups.reduce((acc: Objective[], group: ObjectiveGroup) => {
          return acc.concat(group.objectives);
        }, []);
        setAllObjectives(currentAllObjectives);

        // Handle initial selection from URL hash
        const hash = window.location.hash.substring(1);
        if (hash) {
          if (hash === 'guide') {
            setShowUserGuide(true);
            setSelectedItem(null);
            setSelectedItemType(null);
            // Fetch guide HTML
            const guideResponse = await fetch('/guide.html');
            const guideText = await guideResponse.text();
            setGuideHtml(guideText);
            return;
          }
          const [type, tag] = hash.split(':');
          if (type === 'tool' && toolsWithTag) {
            const toolFromHash = toolsWithTag.find((t: Tool) => t.tag === tag);
            if (toolFromHash) {
              setSelectedItem(toolFromHash);
              setSelectedItemType('tool');
              setShowUserGuide(false);
              setCollapsedSections(prev => ({ ...prev, tools: false })); // Expand tools section
              return; // Exit after setting from hash
            }
          } else if (type === 'objective' && currentAllObjectives) {
            const objectiveFromHash = currentAllObjectives.find((o: Objective) => o.tag === tag);
            if (objectiveFromHash) {
              setSelectedItem(objectiveFromHash);
              setSelectedItemType('objective');
              setShowUserGuide(false);
              setCollapsedSections(prev => ({ ...prev, objectives: false })); // Expand objectives section
              return; // Exit after setting from hash
            }
          }
        }

        // Fallback to default selection if no valid hash and not showing guide
        if (toolsWithTag.length > 0) {
          setSelectedItem(toolsWithTag[0]);
          setSelectedItemType('tool');
          setShowUserGuide(false);
          setCollapsedSections(prev => ({ ...prev, tools: false })); // Expand tools section
        } else if (currentAllObjectives.length > 0) {
          setSelectedItem(currentAllObjectives[0]);
          setSelectedItemType('objective');
          setShowUserGuide(false);
          setCollapsedSections(prev => ({ ...prev, objectives: false })); // Expand objectives section
        } else {
          // If no tools or objectives, show guide by default or a message
          setShowUserGuide(true);
          // Fetch guide HTML
          const guideResponse = await fetch('/guide.html');
          const guideText = await guideResponse.text();
          setGuideHtml(guideText);
        }

      } catch (error) {
        console.error('Error loading data:', error);
        setShowUserGuide(true); // Show guide on error as a fallback
        // Fetch guide HTML on error as well
        try {
            const guideResponse = await fetch('/guide.html');
            const guideText = await guideResponse.text();
            setGuideHtml(guideText);
        } catch (guideError) {
            console.error('Error loading guide HTML:', guideError);
            setGuideHtml('<p>Error loading user guide. Please try again later.</p>');
        }
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

  const filteredObjectives = objectiveGroups.map(group => ({
    ...group,
    objectives: group.objectives.filter(objective => 
      objective.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(group => group.objectives.length > 0);

  const handleSelectTool = (tool: Tool) => {
    setSelectedItem(tool);
    setSelectedItemType('tool');
    setShowUserGuide(false);
    window.location.hash = `tool:${tool.tag}`;
    setCollapsedSections(prev => ({ ...prev, tools: false })); // Expand tools section
  };

  const handleSelectObjective = (objective: Objective) => {
    setSelectedItem(objective);
    setSelectedItemType('objective');
    setShowUserGuide(false);
    window.location.hash = `objective:${objective.tag}`;
    setCollapsedSections(prev => ({ ...prev, objectives: false })); // Expand objectives section
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

  const toggleSidebarSection = (section: 'objectives' | 'tools') => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <AppContainer>
      <StickyHeader>
        <HeaderSection>
          <a href="https://britishprogress.org" target="_blank" rel="noopener noreferrer">
            <HeaderLogo src="/logo.png" alt="Policy Toolkit Logo" />
          </a>
          <HeaderTitle>UK R&D Policy Toolkit</HeaderTitle>
        </HeaderSection>
        <HeaderNav>
          <HeaderNavLink href="#guide" onClick={handleShowUserGuide}>How to use this toolkit</HeaderNavLink>
        </HeaderNav>
      </StickyHeader>
      <ContentRow>
        <Sidebar>
          <FilterBarContainer>
            <SearchInput 
              type="text" 
              name="search" 
              id="search-input" 
              placeholder="Search objectives & tools..." 
              value={searchTerm} 
              onChange={handleSearchChange} 
            />
            {activeFilters.length > 0 && (
              <ClearFiltersButton onClick={clearAllFilters}>Clear All Filters</ClearFiltersButton>
            )}
          </FilterBarContainer>
          {(searchTerm || activeFilters.length > 0) && (
            <FilterChipContainer>
              {activeFilters.map(filter => (
                <FilterChip key={filter}>
                  {tagsList?.tags.objectives.find(t => t.tag === filter)?.name || 
                   tagsList?.tags.innovation_stage.find(t => t.tag === filter)?.name || 
                   tagsList?.tags.sectors.find(t => t.tag === filter)?.name || 
                   tagsList?.tags.delivery_mechanism.find(t => t.tag === filter)?.name ||
                   tagsList?.tags.targeting.find(t => t.tag === filter)?.name ||
                   tagsList?.tags.timeline.find(t => t.tag === filter)?.name || 
                   filter}
                  <RemoveChipButton onClick={() => removeFilter(filter)}>x</RemoveChipButton>
                </FilterChip>
              ))}
            </FilterChipContainer>
          )}
          <SidebarSection itemType="objective">
            <SidebarTitle itemType="objective" onClick={() => toggleSidebarSection('objectives')}>
              Policy Objectives {collapsedSections.objectives ? '►' : '▼'}
            </SidebarTitle>
            {!collapsedSections.objectives && (
              <ToolList>
                {filteredObjectives.map(group => (
                  <div key={group.group}>
                    <SidebarSubheading>{group.group}</SidebarSubheading>
                    {group.objectives.map(objective => (
                      <ToolListItem 
                        key={objective.tag} 
                        active={!showUserGuide && selectedItemType === 'objective' && selectedItem?.tag === objective.tag}
                        onClick={() => handleSelectObjective(objective)}
                        className={selectedItem === objective ? 'selected' : ''}
                        itemType="objective"
                      >
                        {objective.name}
                      </ToolListItem>
                    ))}
                  </div>
                ))}
              </ToolList>
            )}
          </SidebarSection>
          <SidebarSection itemType="tool">
            <SidebarTitle itemType="tool" onClick={() => toggleSidebarSection('tools')}>
              Policy Tools {collapsedSections.tools ? '►' : '▼'}
            </SidebarTitle>
            {!collapsedSections.tools && (
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
            )}
          </SidebarSection>
        </Sidebar>
        <MainContent ref={mainContentRef}>
          {showUserGuide && guideHtml && (
            <Section>
              <PageTitle>How to use this toolkit</PageTitle>
              <MarkdownText dangerouslySetInnerHTML={{ __html: guideHtml }} />
            </Section>
          )}
          {!showUserGuide && selectedItem && selectedItemType === 'tool' && tagsList && (
            <ToolDetail 
              tool={selectedItem as Tool} 
              onSelectObjective={handleSelectObjective} 
              tagsList={tagsList}
              objectives={allObjectives}
              onAddFilter={addFilter}
            />
          )}
          {!showUserGuide && selectedItem && selectedItemType === 'objective' && (
            <ObjectiveDetail objective={selectedItem as Objective} tools={tools} onSelectTool={handleSelectTool}/>
          )}
        </MainContent>
      </ContentRow>
    </AppContainer>
  )
}

export default App
