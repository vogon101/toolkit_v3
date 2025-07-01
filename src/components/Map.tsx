import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import * as yaml from 'yaml';
import { 
  MapContainer, 
  Section, 
  PageTitle, 
  Subtitle,
  MapLegend, 
  MapLegendItem, 
  MapLegendColor, 
  MapLegendText, 
  MapSvgContainer,
  MobileMapInstructions
} from '../styles/StyledComponents';

interface Tool {
  name: string;
  id: string;
  tags?: {
    objectives?: string[];
  };
}

interface Objective {
  name: string;
  tag: string;
  related_tools?: string[];
}

interface ObjectiveGroup {
  group: string;
  objectives: Objective[];
}

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'tool' | 'objective';
  connections: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
}

const Map: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();
  const [data, setData] = useState<{ tools: Tool[]; objectives: Objective[] }>({ tools: [], objectives: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [toolsResponse, objectivesResponse] = await Promise.all([
          fetch('/tools_v5.yaml'),
          fetch('/objectives_grouped.yaml')
        ]);

        const toolsText = await toolsResponse.text();
        const objectivesText = await objectivesResponse.text();

        const toolsData = yaml.parse(toolsText);
        const objectivesData = yaml.parse(objectivesText);

        // Extract all objectives from the grouped structure
        const allObjectives = objectivesData.objective_groups.reduce((acc: Objective[], group: ObjectiveGroup) => {
          return acc.concat(group.objectives);
        }, []);

        setData({
          tools: toolsData.tools || [],
          objectives: allObjectives
        });
      } catch (err) {
        setError('Failed to load data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Function to wrap text within a circle
  const wrapText = (textElement: any, radius: number) => {
    const originalText = textElement.text();
    const words = originalText.split(/\s+/);
    
    // Clear the text
    textElement.text('');
    
    // If it's a short text, just use one line
    if (originalText.length <= 12) {
      textElement.text(originalText);
      return;
    }
    
    // Calculate available width (diameter with some padding)
    const maxWidth = radius * 1.6;
    const lineHeight = 1.1;
    const lines: string[] = [];
    let currentLine = '';
    
    // Test text element for measuring
    const testText = textElement.append('tspan').style('visibility', 'hidden');
    
    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
      testText.text(testLine);
      
      if (testText.node()!.getComputedTextLength() > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    testText.remove();
    
    // If we still have too many lines, truncate
    if (lines.length > 3) {
      lines.splice(2);
      lines[1] = lines[1].substring(0, 8) + '...';
    }
    
         // Add the lines as tspan elements
     lines.forEach((line, i) => {
       textElement.append('tspan')
         .attr('x', 0)
         .attr('dy', i === 0 ? '0.35em' : `${lineHeight}em`)
         .attr('text-anchor', 'middle')
         .text(line);
     });
  };

  // Function to handle node clicks
  const handleNodeClick = (_event: any, d: Node) => {
    if (d.type === 'tool') {
      // Find the tool to get its tag or id
      const tool = data.tools.find(t => t.id === d.id);
      if (tool) {
        navigate(`/tools/${tool.id}`);
      }
    } else if (d.type === 'objective') {
      navigate(`/objectives/${d.id}`);
    }
  };

  useEffect(() => {
    if (!data.tools.length || !data.objectives.length || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const container = svgRef.current.parentElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    svg.attr('width', width).attr('height', height);

    // Create nodes
    const nodes: Node[] = [
      ...data.tools.map(tool => ({
        id: tool.id,
        name: tool.name,
        type: 'tool' as const,
        connections: 0
      })),
      ...data.objectives.map(objective => ({
        id: objective.tag,
        name: objective.name,
        type: 'objective' as const,
        connections: 0
      }))
    ];

    // Create links
    const links: Link[] = [];
    const linkSet = new Set<string>();

    // Add links from tools to objectives
    data.tools.forEach(tool => {
      if (tool.tags?.objectives) {
        tool.tags.objectives.forEach(objectiveTag => {
          const linkId = `${tool.id}-${objectiveTag}`;
          const reverseLinkId = `${objectiveTag}-${tool.id}`;
          
          if (!linkSet.has(linkId) && !linkSet.has(reverseLinkId)) {
            links.push({
              source: tool.id,
              target: objectiveTag
            });
            linkSet.add(linkId);
          }
        });
      }
    });

    // Add links from objectives to tools
    data.objectives.forEach(objective => {
      if (objective.related_tools) {
        objective.related_tools.forEach(toolTag => {
          const tool = data.tools.find(t => t.id === toolTag || t.name.toLowerCase().replace(/[^a-z0-9]+/g, '_') === toolTag);
          if (tool) {
            const linkId = `${objective.tag}-${tool.id}`;
            const reverseLinkId = `${tool.id}-${objective.tag}`;
            
            if (!linkSet.has(linkId) && !linkSet.has(reverseLinkId)) {
              links.push({
                source: objective.tag,
                target: tool.id
              });
              linkSet.add(linkId);
            }
          }
        });
      }
    });

    // Count connections for each node
    links.forEach(link => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;
      
      const sourceNode = nodes.find(n => n.id === sourceId);
      const targetNode = nodes.find(n => n.id === targetId);
      
      if (sourceNode) sourceNode.connections++;
      if (targetNode) targetNode.connections++;
    });

    // Responsive node sizes and forces
    const isMobile = width < 768;
    const nodeBaseSize = isMobile ? 8 : 12;
    const nodeMaxSize = isMobile ? 30 : 50;
    const linkDistance = isMobile ? 80 : 200;
    const chargeStrength = isMobile ? -50 : -100;

    // Create simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(linkDistance))
      .force('charge', d3.forceManyBody().strength(chargeStrength))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(isMobile ? 20 : 40));

    // Create container for zoom
    const g = svg.append('g');

    // Add zoom behavior with mobile considerations
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#95a5a6')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', isMobile ? 1 : 2);

    // Create nodes
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .style('cursor', 'pointer')
      .on('click', handleNodeClick)
      .call(d3.drag<any, Node>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Add circles to nodes
    node.append('circle')
      .attr('r', (d) => Math.max(nodeBaseSize, Math.min(nodeMaxSize, nodeBaseSize + d.connections * (isMobile ? 3 : 10))))
      .attr('fill', (d) => d.type === 'tool' ? '#27ae60' : '#3498db')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer');

    // Add labels to nodes with text wrapping
    const labels = node.append('text')
      .text((d) => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', isMobile ? '8px' : '10px')
      .attr('font-weight', '600')
      .attr('fill', '#2c3e50')
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    // Apply text wrapping to each label
    labels.each(function(d) {
      const radius = Math.max(nodeBaseSize, Math.min(nodeMaxSize, nodeBaseSize + d.connections * (isMobile ? 3 : 10)));
      wrapText(d3.select(this), radius);
    });

    // Add tooltips
    const tooltip = d3.select('body').append('div')
      .attr('class', 'map-tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('font-size', isMobile ? '11px' : '12px')
      .style('max-width', isMobile ? '150px' : '200px')
      .style('z-index', '1000');

    node
      .on('mouseover', (_event, d) => {
        tooltip.style('visibility', 'visible')
          .html(`<strong>${d.name}</strong><br/>Type: ${d.type}<br/>Connections: ${d.connections}`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', (event.pageY - 10) + 'px')
          .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    // Cleanup function
    return () => {
      tooltip.remove();
    };

  }, [data]);

  if (loading) {
    return (
      <MapContainer>
        <Section>
          <PageTitle>Innovation Policy Network Map</PageTitle>
          <Subtitle>Loading network data...</Subtitle>
        </Section>
      </MapContainer>
    );
  }

  if (error) {
    return (
      <MapContainer>
        <Section>
          <PageTitle>Innovation Policy Network Map</PageTitle>
          <Subtitle>Error: {error}</Subtitle>
        </Section>
      </MapContainer>
    );
  }

  return (
    <MapContainer>
      <Section>
        <PageTitle>Innovation Policy Network Map</PageTitle>
        <Subtitle>
          Interactive visualization showing the relationships between policy tools and innovation objectives. 
          Drag nodes to explore connections, zoom and pan to navigate.
        </Subtitle>
      </Section>
      
      <MobileMapInstructions>
        Pinch to zoom • Drag to explore • Tap nodes for details
      </MobileMapInstructions>
      
      <MapLegend>
        <MapLegendItem>
          <MapLegendColor color="#27ae60" />
          <MapLegendText>Tools ({data.tools.length})</MapLegendText>
        </MapLegendItem>
        <MapLegendItem>
          <MapLegendColor color="#3498db" />
          <MapLegendText>Objectives ({data.objectives.length})</MapLegendText>
        </MapLegendItem>
      </MapLegend>

      <MapSvgContainer>
        <svg ref={svgRef}></svg>
      </MapSvgContainer>
    </MapContainer>
  );
};

export default Map;
