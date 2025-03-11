// import { useEffect, useState } from "react";
// import { useGlobalVariables } from "../../context/global";


// const DependencyMap = () => {
// const {setSelectedIcon} = useGlobalVariables()
// const [active,setActive] = useState("func")

//      useEffect(() => {
//           setSelectedIcon("fileVisualisation")
//      },[])
     
//      return (
//           <div className="p-[20px] flex flex-col justify-center">
//                <div className="grid grid-cols-2 grid-rows-1 gap-5 items-center shadow-sm w-1/2">
//                     <div onClick={()=> setActive("func")} className={`py-5 pl-5 cursor-pointer rounded-l-lg ${active == "func" ? 'bg-[#530DF6] text-white font-semibold':'bg-white text-black'}`}><h1>Function calls</h1></div>
//                     <div onClick={()=> setActive("import")} className={`py-5 pl-5 cursor-pointer  rounded-r-lg ${active == "import" ? 'bg-[#530DF6] text-white font-semibold':'bg-white text-black'}`}><h1>Import Export relationships</h1></div>
//                </div>
//                <h1 className="mt-5 font-[25px]">Example if index.js calls the function geuser  writen in the file getuser.js</h1>

//           </div>
//      )
// }


// export default DependencyMap;

let repodata = {
     owner:'Nounbiep-stephane-jordan',
     repo: 'rideon-frontend',
     token: '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',
     filePath:"src/api/api.js"
   }

 


   import React, { useState, useEffect } from 'react';
import Spinner from '../../component/spinner/spinner';
import API from '../../api/api';
   
   
   const DependencyMap = () => {
     let { owner, repo, filePath, token } = repodata
      
     const [loading, setLoading] = useState(true);
     const [depth, setDepth] = useState(1);
     // const handleError = useErrorHandler();
   
     const fetchDependencies = async () => {
       try {
         setLoading(true);
          await API.post('/dependencies', {
           owner,
           repo,
           file:{name:"api.js",src:filePath},
           token,
         }).then((res) => {
          console.log(res.data)
         }).catch((err) => {
          console.log(err,"in catch bllock")
         })

     
   
     //     const nodes = new Set(graph.nodes.map(n => n.id));
     //     const edges = new Set(graph.edges.map(e => `${e.from}-${e.to}`));
   
     //     response.data.data.forEach(({ source, target }) => {
     //       if (!nodes.has(source)) nodes.add({ id: source, label: source });
     //       if (!nodes.has(target)) nodes.add({ id: target, label: target, color: '#FFA500' });
     //       if (!edges.has(`${source}-${target}`)) edges.add({ from: source, to: target });
     //     });
   
     //     setGraph({
     //       nodes: Array.from(nodes),
     //       edges: Array.from(edges)
     //     });
       } catch (error) {
     //     handleError(error);
     console.log(error)
       } finally {
         setLoading(false);
       }
     };
   
     useEffect(() => {
       fetchDependencies(depth);
     }, []);
   
     const handleLoadMore = () => setDepth(prev => prev + 1);
   
    
   
     return (
       <div className="dependency-container">
         {loading && <Spinner text="laoding" />}
         
         <div className="graph-wrapper">
           {/* <Graph
             graph={graph}
             options={graphOptions}
             style={{ height: '600px' }}
             getNetwork={network => {
               network.on('doubleClick', ({ nodes }) => {
                 if (nodes.length) handleLoadMore();
               });
             }}
           /> */}
         </div>
   
         <div className="controls">
           <button 
             onClick={handleLoadMore}
             disabled={loading}
             className="load-more"
           >
             Load Deeper Dependencies
           </button>
         </div>
   
         <button onClick={() => fetchDependencies(depth)}>retry</button>
       </div>
     );
   };
   
   export default DependencyMap;
 