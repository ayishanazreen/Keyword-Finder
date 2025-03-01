import React, { useRef, useState, useEffect } from 'react';
import './TextHighlighter.css'

const TextHighlighter = () => {

    const [search, setSearch] =useState("");
    const readRef=useRef(null);
    const orginalRef=useRef("");
    const inputRef=useRef(null)
    const [matches, setMatches]=useState([]);
    const [currentIndex, setCurrentIndex]=useState(-1);
    const [keyPressed, setKeyPressed]=useState(false)


    const handleClear=()=>{
        setSearch("")

    }
    useEffect(()=>{
               const handleKeyUp=(e)=> {
                    if(e.ctrlKey && (e.keyCode === 70 || e.keyCode === 102))
                    {
                      setKeyPressed(true);
                      setTimeout(() => inputRef.current?.focus(), 0);
                    }
                    if (e.key==="Escape" || e.key ==="Enter"){
                        setKeyPressed(false);
                    }
                
                };
                const handleClickOutside = (e) => {
                    if (e.target.closest(".modal-container") === null) {
                      setKeyPressed(false);
                    }
                  };
                window.addEventListener('keyup', handleKeyUp)
                document.addEventListener("click", handleClickOutside);
    
                return () => {
                    window.removeEventListener('keyup', handleKeyUp);
                    document.removeEventListener("click", handleClickOutside);
                };   
        },[]);




    useEffect(()=>{
        if (readRef.current){
            if (!(orginalRef.current)){
                orginalRef.current=readRef.current.innerHTML;
            }

        }
        if(search !=="") {
             let regex=new RegExp(search,"gi");
             readRef.current.innerHTML= orginalRef.current.replace(regex, (match)=> `<mark class="highlight"> ${match} </mark>`);


             const foundMatches=Array.from(readRef.current.getElementsByClassName("highlight"));
             setMatches(foundMatches);
             setCurrentIndex(foundMatches > 0 ? 0 : -1);
        }
        else
        {
            readRef.current.innerHTML= orginalRef.current;
            setMatches([]);
            setCurrentIndex(-1);
        }
    }, [search]);

    useEffect(()=>{
        if(matches.length > 0 && currentIndex !==-1 && matches[currentIndex]){
            matches.forEach((match) => match.classList.remove("active"));
            matches[currentIndex].classList.add("active");
            matches[currentIndex].scrollIntoView({behavior:"smooth", block:"center"})

    }
}, [currentIndex,matches]);


    const handleNext=()=>{
        if(matches.length>0){
            setCurrentIndex((prevIndex)=> (prevIndex + 1) % matches.length )
            console.log(currentIndex);
        }

    }

    
    const handlePrev=()=>{
        if(matches.length > 0){
            setCurrentIndex((prevIndex)=> (prevIndex -1 + matches.length) % matches.length )
        }
        
    }
  return (
    <>
     {keyPressed &&
     <div className='modal-container'>
     <input type="text" placeholder='search here..' value={search} ref={inputRef} onChange={(event)=> setSearch(event.target.value)} /> 
     <button onClick={handleNext} disabled={matches.length===0}>next</button>
     <button onClick={handlePrev} disabled={matches.length===0}>prev</button>
     <button onClick={handleClear}>x</button>
     </div> 
     } 
     


      <div className='read-container' ref={readRef}>

      <h1> React (software)</h1>

      <p>React (also known as React.js or ReactJS) is a free and open-source 
      front-end JavaScript library that aims to make building user interfaces based on components more "seamless". 
      It is maintained by Meta (formerly Facebook) and a community of individual developers and companies</p>
    
      <p>React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js and Remix. Because React is only concerned with the user interface and 
          rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality. 
          A key advantage of React is that it only re-renders those parts of the page that have changed, avoiding unnecessary re-rendering of unchanged DOM elements.</p>
    
   <h1>Notable features</h1>


   <p> React adheres to the declarative programming paradigm. Developers design views for each state of an application, 
    and React updates and renders components when data changes. This is in contrast with imperative programming</p>


  <p>React code is made of entities called components. These components are modular and reusable React applications typically
     consist of many layers of components. The components are rendered to a root element in the DOM using the React DOM library.
      When rendering a component, values are passed between components through props (short for "properties"). Values internal to a component 
      are called its state. The two primary ways of declaring components in React are through function components and class components</p>


  <p>Function components are declared with a function (using JavaScript function syntax or an arrow function expression) that
     accepts a single "props" argument and returns JSX. From React v16.8 onwards, function components can use state with the useState Hook.</p>


  <p>Although these rules cannot be enforced at runtime, code analysis tools such as linters can be configured to detect many 
        mistakes during development. The rules apply to both usage of Hooks and the implementation of custom Hooks, which may call other Hooks.</p>

    
    </div>
    </>
  )
}

export default TextHighlighter
