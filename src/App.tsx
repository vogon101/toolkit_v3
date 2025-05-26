import { useState, useEffect } from 'react'
import { parse } from 'yaml'
import type { Tool, TagsList } from './types/Tool'
import { ToolDetail } from './components/ToolDetail'
import {
  AppContainer,
  Sidebar,
  MainContent,
  ToolList,
  ToolListItem,
} from './styles/StyledComponents'

function App() {
  const [tools, setTools] = useState<Tool[]>([])
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [tagsList, setTagsList] = useState<TagsList | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [toolsResponse, tagsResponse] = await Promise.all([
          fetch('/tools.yaml'),
          fetch('/tags_list.yaml')
        ]);
        
        const [toolsYaml, tagsYaml] = await Promise.all([
          toolsResponse.text(),
          tagsResponse.text()
        ]);

        const toolsData = parse(toolsYaml);
        const tagsData = parse(tagsYaml);

        setTools(toolsData.tools);
        setTagsList(tagsData);

        if (toolsData.tools.length > 0) {
          setSelectedTool(toolsData.tools[0]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <AppContainer>
      <Sidebar>
        <ToolList>
          {tools.map((tool) => (
            <ToolListItem
              key={tool.tag}
              active={selectedTool?.tag === tool.tag}
              onClick={() => setSelectedTool(tool)}
            >
              {tool.name}
            </ToolListItem>
          ))}
        </ToolList>
      </Sidebar>
      <MainContent>
        {selectedTool && tagsList ? (
          <ToolDetail tool={selectedTool} tagsList={tagsList} />
        ) : (
          <p>Loading...</p>
        )}
      </MainContent>
    </AppContainer>
  )
}

export default App
