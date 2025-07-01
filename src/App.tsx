import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { parse } from 'yaml'
import type { Tool, TagsList, Objective, SelectedItem, ItemType } from './types/Tool'
import { ToolDetail } from './components/ToolDetail'
import { ObjectiveDetail } from './components/ObjectiveDetail'
import Map from './components/Map'
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
  SidebarSubheading,
  HamburgerButton,
  HamburgerLine,
  MobileMenuOverlay,
  MobileMenuBackdrop,
  MobileNavSection,
  MobileNavTitle,
  MobileNavLink,
  Footer,
  FooterLogo,
  FilterExpandButton,
  FilterIcon,
  FilterExpandIcon,
  FilterCategoriesContainer,
  FilterCategory,
  FilterCategoryHeader,
  FilterCategoryTitle,
  FilterCategoryIcon,
  FilterCategoryContent,
  FilterOptionsGrid,
  FilterOption,
  FilterCheckbox,
  FilterOptionText,
  FilterSummary,
  FilterClearAllButton
} from './styles/StyledComponents'

interface ObjectiveGroup {
  group: string;
  objectives: Objective[];
}

// Filter Interface Component
const FilterInterface: React.FC<{
  tagsList: TagsList | null;
  activeFilters: string[];
  onAddFilter: (tag: string) => void;
  onRemoveFilter: (tag: string) => void;
  onClearFilters: () => void;
}> = ({ tagsList, activeFilters, onAddFilter, onRemoveFilter, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleFilterChange = (tag: string, checked: boolean) => {
    if (checked) {
      onAddFilter(tag);
    } else {
      onRemoveFilter(tag);
    }
  };

  if (!tagsList) return null;

  const filterCategories = [
    { key: 'objectives', title: 'Policy Objectives', tags: tagsList.tags.objectives },
    { key: 'innovation_stage', title: 'Innovation Stage', tags: tagsList.tags.innovation_stage },
    { key: 'sectors', title: 'Sectors', tags: tagsList.tags.sectors },
    { key: 'delivery_mechanism', title: 'Delivery Mechanism', tags: tagsList.tags.delivery_mechanism },
    { key: 'targeting', title: 'Targeting', tags: tagsList.tags.targeting },
    { key: 'timeline', title: 'Timeline', tags: tagsList.tags.timeline }
  ];

  const totalActiveFilters = activeFilters.length;

  return (
    <>
      <FilterExpandButton onClick={toggleExpanded}>
        <FilterIcon>≡</FilterIcon>
        Advanced Filters
        <FilterExpandIcon isExpanded={isExpanded}>▼</FilterExpandIcon>
        {totalActiveFilters > 0 && ` (${totalActiveFilters} active)`}
      </FilterExpandButton>

      <FilterCategoriesContainer isExpanded={isExpanded}>
        {filterCategories.map(category => {
          const categoryHasActiveFilters = category.tags.some(tag => activeFilters.includes(tag.tag));
          return (
            <FilterCategory key={category.key}>
              <FilterCategoryHeader onClick={() => toggleCategory(category.key)}>
                <FilterCategoryTitle hasActiveFilters={categoryHasActiveFilters}>
                  {category.title}
                  {categoryHasActiveFilters && ` (${category.tags.filter(tag => activeFilters.includes(tag.tag)).length})`}
                </FilterCategoryTitle>
                <FilterCategoryIcon isExpanded={expandedCategories[category.key] || false}>
                  ▼
                </FilterCategoryIcon>
              </FilterCategoryHeader>
            <FilterCategoryContent isExpanded={expandedCategories[category.key] || false}>
              <FilterOptionsGrid>
                {category.tags.map(tag => (
                  <FilterOption key={tag.tag}>
                    <FilterCheckbox
                      type="checkbox"
                      checked={activeFilters.includes(tag.tag)}
                      onChange={(e) => handleFilterChange(tag.tag, e.target.checked)}
                    />
                    <FilterOptionText>{tag.name}</FilterOptionText>
                  </FilterOption>
                ))}
              </FilterOptionsGrid>
            </FilterCategoryContent>
          </FilterCategory>
        );
        })}
        
        {totalActiveFilters > 0 && (
          <FilterSummary>
            <span>{totalActiveFilters} filter{totalActiveFilters > 1 ? 's' : ''} active</span>
            <FilterClearAllButton onClick={onClearFilters}>
              Clear All
            </FilterClearAllButton>
          </FilterSummary>
        )}
      </FilterCategoriesContainer>
    </>
  );
};

// Component for individual tool view
const ToolView: React.FC<{
  tools: Tool[], 
  objectives: Objective[], 
  tagsList: TagsList | null,
  onAddFilter: (tag: string) => void
}> = ({ tools, objectives, tagsList, onAddFilter }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const tool = tools.find(t => t.tag === id);
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  const handleSelectObjective = (objective: Objective) => {
    navigate(`/objectives/${objective.tag}`);
  };

  return tagsList ? (
    <ToolDetail 
      tool={tool} 
      onSelectObjective={handleSelectObjective} 
      tagsList={tagsList}
      objectives={objectives}
      onAddFilter={onAddFilter}
    />
  ) : <div>Loading...</div>;
};

// Component for individual objective view
const ObjectiveView: React.FC<{
  objectives: Objective[], 
  tools: Tool[]
}> = ({ objectives, tools }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const objective = objectives.find(o => o.tag === id);
  
  if (!objective) {
    return <div>Objective not found</div>;
  }

  const handleSelectTool = (tool: Tool) => {
    navigate(`/tools/${tool.tag}`);
  };

  return (
    <ObjectiveDetail 
      objective={objective} 
      tools={tools} 
      onSelectTool={handleSelectTool}
    />
  );
};

// Component for user guide
const GuideView: React.FC = () => {
  const [guideHtml, setGuideHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGuide = async () => {
      try {
        const guideResponse = await fetch('/guide.html');
        const guideText = await guideResponse.text();
        setGuideHtml(guideText);
      } catch (error) {
        console.error('Error loading guide HTML:', error);
        setGuideHtml('<p>Error loading user guide. Please try again later.</p>');
      } finally {
        setLoading(false);
      }
    };

    loadGuide();
  }, []);

  if (loading) {
    return <div>Loading guide...</div>;
  }

  return (
    <Section>
      <PageTitle>How to use this toolkit</PageTitle>
      <MarkdownText dangerouslySetInnerHTML={{ __html: guideHtml }} />
    </Section>
  );
};

// Component for default/home view
const HomeView: React.FC = () => {
  const navigate = useNavigate();

  // Redirect to guide on home page
  useEffect(() => {
    navigate('/guide', { replace: true });
  }, [navigate]);

  return <div>Loading...</div>;
};

function App() {
  const [tools, setTools] = useState<Tool[]>([])
  const [objectiveGroups, setObjectiveGroups] = useState<ObjectiveGroup[]>([])
  const [allObjectives, setAllObjectives] = useState<Objective[]>([])
  const [tagsList, setTagsList] = useState<TagsList | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [collapsedSections, setCollapsedSections] = useState<{ objectives: boolean; tools: boolean }>({ objectives: true, tools: false });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [toolsResponse, tagsResponse, objectivesGroupedResponse] = await Promise.all([
          fetch('/tools_v5.yaml'),
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

        // Extract all objectives for potential flat list usage
        const currentAllObjectives = objectivesGroupedData.objective_groups.reduce((acc: Objective[], group: ObjectiveGroup) => {
          return acc.concat(group.objectives);
        }, []);
        setAllObjectives(currentAllObjectives);

      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const addFilter = (tag: string) => {
    if (!activeFilters.includes(tag)) {
      setActiveFilters([...activeFilters, tag]);
    }
  };

  const removeFilter = (tagToRemove: string) => {
    setActiveFilters(activeFilters.filter(tag => tag !== tagToRemove));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setActiveFilters([]);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileNavigation = (path: string) => {
    navigate(path);
    closeMobileMenu();
  };

  const handleMobileToolNavigation = (toolTag: string) => {
    if (toolTag) {
      navigate(`/tools/${toolTag}`);
      closeMobileMenu();
    }
  };

  const handleMobileObjectiveNavigation = (objectiveTag: string) => {
    if (objectiveTag) {
      navigate(`/objectives/${objectiveTag}`);
      closeMobileMenu();
    }
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

  const toggleSidebarSection = (section: 'objectives' | 'tools') => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <AppContainer>
      <StickyHeader>
        <HeaderSection>
          <HamburgerButton onClick={toggleMobileMenu}>
            <HamburgerLine isOpen={isMobileMenuOpen} />
            <HamburgerLine isOpen={isMobileMenuOpen} />
            <HamburgerLine isOpen={isMobileMenuOpen} />
          </HamburgerButton>
          <HeaderTitle>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>UK R&D Policy Toolkit</a>
          </HeaderTitle>
        </HeaderSection>
        <HeaderNav>
          <Link to="/guide">
            <HeaderNavLink>How to use this toolkit</HeaderNavLink>
          </Link>
          <Link to="/map">
            <HeaderNavLink>Network Map</HeaderNavLink>
          </Link>
        </HeaderNav>
      </StickyHeader>

      <MobileMenuBackdrop isOpen={isMobileMenuOpen} onClick={closeMobileMenu} />
      <MobileMenuOverlay isOpen={isMobileMenuOpen}>
        <MobileNavSection>
          <MobileNavTitle>Navigation</MobileNavTitle>
          <MobileNavLink onClick={() => handleMobileNavigation('/guide')}>
            How to use this toolkit
          </MobileNavLink>
          <MobileNavLink onClick={() => handleMobileNavigation('/map')}>
            Network Map
          </MobileNavLink>
        </MobileNavSection>

        <MobileNavSection>
          <FilterBarContainer>
            <SearchInput 
              type="text" 
              name="search" 
              id="mobile-search-input" 
              placeholder="Search objectives & tools..." 
              value={searchTerm} 
              onChange={handleSearchChange} 
            />
            <FilterInterface
              tagsList={tagsList}
              activeFilters={activeFilters}
              onAddFilter={addFilter}
              onRemoveFilter={removeFilter}
              onClearFilters={clearAllFilters}
            />
            {activeFilters.length > 0 && (
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
          </FilterBarContainer>
        </MobileNavSection>

        <MobileNavSection>
          <MobileNavTitle onClick={() => toggleSidebarSection('objectives')}>
            Policy Objectives {collapsedSections.objectives ? '►' : '▼'}
          </MobileNavTitle>
          {!collapsedSections.objectives && (
            <>
              {filteredObjectives.map(group => (
                <div key={group.group}>
                  <SidebarSubheading>{group.group}</SidebarSubheading>
                  {group.objectives.map(objective => (
                    <MobileNavLink 
                      key={objective.tag} 
                      onClick={() => handleMobileObjectiveNavigation(objective.tag)}
                    >
                      {objective.name}
                    </MobileNavLink>
                  ))}
                </div>
              ))}
            </>
          )}
        </MobileNavSection>

        <MobileNavSection>
          <MobileNavTitle onClick={() => toggleSidebarSection('tools')}>
            Policy Tools {collapsedSections.tools ? '►' : '▼'}
          </MobileNavTitle>
          {!collapsedSections.tools && (
            <>
              {filteredTools.map((tool) => (
                tool.tag && (
                  <MobileNavLink 
                    key={tool.tag} 
                    onClick={() => handleMobileToolNavigation(tool.tag!)}
                  >
                    {tool.name}
                  </MobileNavLink>
                )
              ))}
            </>
          )}
        </MobileNavSection>
      </MobileMenuOverlay>

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
            <FilterInterface
              tagsList={tagsList}
              activeFilters={activeFilters}
              onAddFilter={addFilter}
              onRemoveFilter={removeFilter}
              onClearFilters={clearAllFilters}
            />
            {activeFilters.length > 0 && (
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
          </FilterBarContainer>
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
                      <Link key={objective.tag} to={`/objectives/${objective.tag}`}>
                        <ToolListItem 
                          itemType="objective"
                          active={location.pathname === `/objectives/${objective.tag}`}
                        >
                          {objective.name}
                        </ToolListItem>
                      </Link>
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
                  tool.tag && (
                    <Link key={tool.tag} to={`/tools/${tool.tag}`}>
                      <ToolListItem active={location.pathname === `/tools/${tool.tag}`}>
                        {tool.name}
                      </ToolListItem>
                    </Link>
                  )
                ))}
              </ToolList>
            )}
          </SidebarSection>
        </Sidebar>
        <MainContent ref={mainContentRef}>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomeView />
              } 
            />
            <Route 
              path="/tools/:id" 
              element={
                <ToolView 
                  tools={tools} 
                  objectives={allObjectives} 
                  tagsList={tagsList}
                  onAddFilter={addFilter}
                />
              } 
            />
            <Route 
              path="/objectives/:id" 
              element={
                <ObjectiveView 
                  objectives={allObjectives} 
                  tools={tools} 
                />
              } 
            />
            <Route path="/guide" element={<GuideView />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </MainContent>
      </ContentRow>

      <Footer>
        <a href="https://britishprogress.org" target="_blank" rel="noopener noreferrer">
          <FooterLogo src="/logo.png" alt="Policy Toolkit Logo" />
        </a>
      </Footer>
    </AppContainer>
  )
}

export default App
