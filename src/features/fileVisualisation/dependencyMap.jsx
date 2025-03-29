import { useEffect, useState,useRef } from "react";
import { useGlobalVariables } from "../../context/global";
import Spinner from '../../component/spinner/spinner';
import API from '../../api/api';



import * as d3 from "d3";

 

const DependencyGraph = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) {
      console.error("Data is not provided.");
      return;
    }

    console.log("Data received:", data);

    const svg = d3.select(svgRef.current);
    if (!svg) {
      console.error("SVG container not found.");
      return;
    }

    console.log("SVG container found:", svg);

    const width = 1200; // Large width to accommodate the graph
    const height = 700; // Large height to accommodate the graph

    // Clear previous graph
    svg.selectAll("*").remove();

    // Dynamic sizing based on the number of nodes
    const numNodes = data.nodes.length;
    const nodeRadius = Math.max(4, 10 - numNodes * 0.1); // Adjust node radius
    const fontSize = Math.max(8, 15 - numNodes * 0.1); // Adjust font size

    // Set up force simulation
    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3.forceLink().id((d) => d.id).distance(350) // Increase link distance
      )
      .force("charge", d3.forceManyBody().strength(-1500)) // Increase repulsion
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "radial",
        d3
          .forceRadial(
            (d) => (d.id === "src/api/api.js" ? 0 : 400), // Increase radial distance
            width / 2,
            height / 2
          )
          .strength(0.2) // Adjust radial strength
      )
      .force("collision", d3.forceCollide().radius(nodeRadius + 5)); // Add collision detection

    // Create links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6);

    // Create nodes
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("g")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Add circles
    node
      .append("circle")
      .attr("class", "node")
      .attr("r", nodeRadius) // Use dynamic node radius
      .attr("fill", (d) =>
        d.id === "src/api/api.js" ? "rgba(246,150,54,1)" : "#530DF6"
      );

    // Add labels
    node
      .append("text")
      .text((d) => d.name)
      .attr("dx", 12)
      .attr("dy", ".35em")
      .attr("fill", "#333")
      .style("font-size", `${fontSize}px`); // Use dynamic font size

    // Set initial positions
    simulation.nodes(data.nodes).on("tick", ticked);
    simulation.force("link").links(data.links);

    // Position the target node at the top
    data.nodes.forEach((d) => {
      if (d.id === "src/api/api.js") {
        d.x = width / 2;
        d.y = 100;
        d.fx = width / 2;
        d.fy = 100;
      }
    });

    // Restart simulation with higher alpha
    simulation.alpha(1).restart();

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup simulation on unmount
    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <div style={{ width: "100%", height: "500px", overflow: "auto" }}>
      <svg
        ref={svgRef}
        width={1200} // Large width to accommodate the graph
        height={700} // Large height to accommodate the graph
        style={{ border: "1px solid #ccc" }}
      ></svg>
    </div>
  );
};



const DependencyMap = ({ owner = "Nounbiep-stephane-jordan",fileName = "api.js", repo = "rideon-frontend", filePath = "src/api/api.js", token = "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" }) => {

  

const {setSelectedIcon} = useGlobalVariables()
const [loading, setLoading] = useState(false);
const [data,setData] = useState(null)
     const fetchDependencies = async () => {
       try {
         setLoading(true);
          await API.post('/dependencies', {
           owner,
           repo,
           file:{name:fileName,src:filePath},
           token,
         }).then((res) => {
          console.log(res.data)
          setData(res.data)
          setLoading(false)

         }).catch((err) => {
          console.log(err,"in catch bllock")
         })

 
  
       } catch (error) {
     console.log(error)
       } finally {
         setLoading(false);
       }
     };
     useEffect(() => {
          setSelectedIcon("fileVisualisation")
     },[])

     useEffect(() => {
      fetchDependencies()
     },[owner,repo,filePath,token])
     
     return (
          <div className="p-[20px] flex flex-col justify-center">
               <div className="grid grid-rows-1 gap-5 items-center shadow-sm w-1/2"> 
                    <div  className={`py-5 pl-5 cursor-pointer  rounded-lg bg-[#530DF6] text-white font-semibold`}><h1>{`Import Export relationships for ${fileName}`}</h1></div>
               </div>
               <h1 className="mt-5 font-[25px]">{`Relationships are determine by checking what are imported from ${fileName}`}</h1>
               {/* <p className="mt-5">Helpfull notes: This feature, the Dependency Graph Visualization, is a powerful tool designed to help developers quickly understand the structure and relationships within a codebase.
                For new developers onboarding onto an ongoing project, it provides a clear, visual representation of how different files and components are interconnected, 
                making it easier to grasp the overall architecture and identify key dependencies. Instead of manually tracing through imports and exports, 
                they can see at a glance which files rely on others, accelerating their learning curve and reducing the time needed to become productive.</p>

<p className="mt-5">For experienced developers returning to a project after a long time, 
the dependency graph serves as a refresher, helping them recall the project's structure and pinpoint areas they need to focus on. 
It also aids in identifying potential bottlenecks or tightly coupled components that might need refactoring. 
Overall, this feature enhances collaboration, reduces onboarding time, and improves codebase maintainability, making it an invaluable asset for any development team.</p> */}
               {loading && <Spinner text="laoding" />}
               {data && <DependencyGraph data={data}/>}
             
          </div>
     )
}


export default DependencyMap;






 


 


 