import React, { useEffect, useState , useRef} from 'react'
import './KeywordFinder.css';

const KeywordFinder = () => {
    const [keyPressed, setKeyPressed]=useState(false); 
    const [searchInput, setSearchInput]=useState("");
    const [highlightCount, setHighlightCount]=useState(0);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [highlightedText, setHighlightedText] = useState("");
    const htmlref=useRef();
    const inputRef=useRef();


    const handleSearchInput=(event)=>{
        setSearchInput(event.target.value);
        if(event.target.value=== "")
            setSearchInput(event.target.value);
    }
   //handling key press
    useEffect(()=>{
           const handleKeyUp=(e)=> {
                if(e.ctrlKey && (e.keyCode === 70 || e.keyCode === 102))
                {
                  setKeyPressed(true);
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
    if(searchInput.trim()=== "") {
        setHighlightedText(orginalContent);
        setHighlightCount(0);
        setCurrentIndex(-1);
        return;
    }
        
             const regex=new RegExp(searchInput, "gi");
             const highlightedContent = orginalContent.replace(regex, (match) => { return `<span class="highlight">${match}</span>`})
             setHighlightedText(highlightedContent);
    
        setTimeout(()=> {
            const AllHighlighted=htmlref.current?.querySelectorAll(".highlight");
            setHighlightCount(AllHighlighted.length);
            setCurrentIndex(AllHighlighted.length > 0 ? 0 : -1);

        }, 50);
    }, [searchInput]);

    useEffect(()=>
        {
        const AllHighlighted=htmlref.current?.querySelectorAll(".highlight");
        if(AllHighlighted.length > 0 && currentIndex !== -1)
        {
            AllHighlighted.forEach(el => el.classList.remove("active-highlight"));
 
            let currentElement=AllHighlighted[currentIndex];
            currentElement.classList.add("active-highlight");
            currentElement.scrollIntoView({behaviour:"smooth", block:"center"})
         
       } }, [currentIndex]);



    useEffect(() => {
        if (keyPressed && inputRef.current) {
            inputRef.current.focus();
        }
    }, [keyPressed]);

    // useEffect(()=> {
    //     const indexes=[];
    //     if(htmlref.current)
    //         {
    //         htmlref.current.querySelectorAll('p').forEach((p, idx)=>{
    //             const match=p.textContent.match(new RegExp(searchInput,'gi'))
    //             if(match) 
    //                 {
    //                     indexes.push(...Array(match.length) .fill(idx));
    //                 }
    //         });
    //     }
    //     setHighlightCount(indexes.length);
    //     setHighlightedIndices(indexes);
    //     highlightedPartsRef.current = [];

    // },[searchInput]);



    // const highlightedtext = (text) => {
    //     if (!searchInput.trim()) return text;

    //     const regex = new RegExp(`(${searchInput})`, 'gi');
    //     const parts = text.split(regex);

    //     const highlightedText = parts.map((part, index) => {
    //         if (part.toLowerCase() === searchInput.toLowerCase()) 
    //         {
    //             const isActive=index===currentIndex;

    //             return (
    //             <span key={index} 
    //             className={`highlight ${isActive ? "active-highlight" : ""}`}
    //             id={`higlight= ${index}`} ref={(el) => (highlightedPartsRef.current[index] = el)}>
    //                 {part} </span> 
    //             );
    //         }
    //         return part;
    //     });
    //     return highlightedText;
    // };

    // const highlightChildren = (children)=>{

    //     return React.Children.map(children, child=>{
    //         if(typeof child === "string"){
    //             return highlightedtext(child);   
    //         }

    //         if(React.isValidElement(child)){
    //           return React.cloneElement(child, {
    //                 children :highlightChildren(child.props.children)
    //             });  
    //         }
    //         return child;
    //     });
    // };


// const scrollToHiglighted=(index)=>{
//     const element=highlightedPartsRef.current[index];
//     if (element)
//     {
//        element.scrollIntoView({behavior:"smooth", block:"center"})
//     }}



 const orginalContent = 

   `<h1> React (software)</h1>
<p>React (also known as React.js or ReactJS) is a free and open-source 
    front-end JavaScript library that aims to make building user interfaces based on components more "seamless". 
    It is maintained by Meta (formerly Facebook) and a community of individual developers and companies</p>
    
<p>  React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js and Remix. Because React is only concerned with the user interface and 
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

        
    <p>There are two rules of hooks which describe the characteristic code patterns that hooks rely on:    </p>`;


//handling buttons div

    const handleUpClick=()=>
        {
       
        setCurrentIndex((prevIndex) => (prevIndex+1)% highlightCount);       
       };

    const handleDownClick=()=>
        {
       
         setCurrentIndex((prevIndex)=>  prevIndex === 0 ? highlightCount - 1 :prevIndex-1)
         }

    const handleClear=()=>
        {
            setSearchInput("")
            if(inputRef.current)
           inputRef.current.value="";
        }
    
  return (
    <>
   {keyPressed && 
       <div className='modal-container'>
              <div className='modal-content'>
                <div className='input-container'>
                <input type="text" placeholder='search here...'
                 onChange={handleSearchInput} 
                 onKeyUp={(e)=> e.key==="Enter" && searchValue()} 
                 ref={inputRef}/>
               <div className='btn-div'>
                {searchInput.length > 0 &&
                 ( <p> {currentIndex === -1 ? 1 : currentIndex+1}/{highlightCount}</p> )}
               
                <button className='btn' onClick={handleUpClick} >next</button>
                <button className='btn' onClick={handleDownClick} >prev</button>
                <button className='btn' onClick={handleClear}>x</button>
                </div>
              </div>   
              </div>
            </div>}
    
      <div className='desc-container' ref={htmlref} dangerouslySetInnerHTML={{__html: highlightedText}} >

</div>
</>
)}

export default KeywordFinder
