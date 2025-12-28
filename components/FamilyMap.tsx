import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';

// Fix: Explicitly define d3 simulation properties on the Node interface to resolve type errors.
interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  emotion: number; // 0-100
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
}

const FamilyMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'me', name: '我', fx: 400, fy: 200, emotion: 70 },
    { id: 'partner', name: '伴侶', fx: 400, fy: 400, emotion: 50 },
  ]);
  const [links, setLinks] = useState<Link[]>([
    { source: 'me', target: 'partner' },
  ]);
  const [newNodeName, setNewNodeName] = useState('');
  
  const width = 800;
  const height = 600;

  const runSimulation = useCallback(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(drag(simulation) as any);

    const emotionColor = d3.scaleSequential(d3.interpolateRdYlGn).domain([0, 100]);

    node.append('circle')
      .attr('r', 30)
      .attr('fill', d => emotionColor(d.emotion))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .text(d => d.name)
      .style('fill', 'white')
      .style('font-weight', 'bold');

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });
    
    function drag(simulation: d3.Simulation<Node, undefined>) {
        function dragstarted(event: any, d: Node) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            // Fix: Handle potentially undefined x/y properties and assign to fx/fy.
            d.fx = d.x ?? null;
            d.fy = d.y ?? null;
        }

        function dragged(event: any, d: Node) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event: any, d: Node) {
            if (!event.active) simulation.alphaTarget(0);
            // Keep position fixed after drag
            // d.fx = null;
            // d.fy = null;
        }

        return d3.drag<SVGGElement, Node>()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    }
  }, [nodes, links]);

  useEffect(() => {
    runSimulation();
  }, [runSimulation]);

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNodeName.trim() === '') return;
    const newNodeId = Date.now().toString();
    const newNode: Node = {
      id: newNodeId,
      name: newNodeName,
      emotion: Math.floor(Math.random() * 101)
    };
    const newLink: Link = {
        source: newNodeId,
        target: nodes[Math.floor(Math.random()*nodes.length)].id
    }
    setNodes([...nodes, newNode]);
    setLinks([...links, newLink]);
    setNewNodeName('');
  };


  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">家庭關係指導地圖</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
        <div className="mb-4">
            <form onSubmit={handleAddNode} className="flex items-center space-x-2">
                <input
                    type="text"
                    value={newNodeName}
                    onChange={(e) => setNewNodeName(e.target.value)}
                    placeholder="新增家庭成員"
                    className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-teal-500 focus:border-teal-500"
                />
                <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                    新增
                </button>
            </form>
        </div>
        <div className="w-full overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900 border dark:border-gray-700">
          <svg ref={svgRef} width={width} height={height}></svg>
        </div>
         <div className="mt-4 p-2 text-sm text-gray-600 dark:text-gray-400">
            提示：你可以拖曳圓點來重新排列家庭成員的位置。顏色代表情緒狀態（綠色=正面, 紅色=負面）。
        </div>
      </div>
    </div>
  );
};

export default FamilyMap;
