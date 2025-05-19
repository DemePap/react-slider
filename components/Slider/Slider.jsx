import { useState, useEffect } from "react"
import leftChevron from "../../src/assets/left-arrow.svg"
import rightChevron from "../../src/assets/right-arrow.svg"
import sliderData from "../../src/data/sliderData"
import "./Slider.css"


export default function Slider() {
    const [sliderIndex, setSliderIndex] = useState(1)
    
    function toggleImage(indexPayload){

        //Méthode 1, mais pas optimisable
        // let newState
        // if(indexPayload + sliderIndex > sliderData.length){
        //     newState = 1
        // } else if(indexPayload + sliderIndex < 1){
        //     newState = sliderData.length
        // } else {
        //     newState = sliderIndex + indexPayload
        // }
        // setSliderIndex(newState)

        //Méthode 2, optimisable
        // setSliderIndex(prevState => prevState + indexPayload)
        // if(sliderIndex + indexPayload > sliderData.length){
        //     setSliderIndex(1)
        // } else if(sliderIndex + indexPayload < 1){
        //     setSliderIndex(sliderData.length)
        // }

        //Méthode 3, optimisable
        setSliderIndex(state => {
            if(indexPayload + state > sliderData.length){
                return 1
            } else if(indexPayload + state < 1){
                return sliderData.length
            } else {
                return state + indexPayload
            }
        })

    }

    useEffect(() => {
        const intervalId = setInterval(() => toggleImage(1), 2000)
        return () => clearInterval(intervalId)
        
    }, [])
  return (
    <>
       <p className="index-info"> {sliderIndex} / {sliderData.length} </p> 
       <div className="slider">
        <p className="image-info">
        {sliderData.find(obj => obj.id === sliderIndex).description}
        </p>
        <img src={`/images/img-${sliderIndex}.jpg`} 
        alt="estate's rooms"
         className="slider-img"/>

         <button
         onClick={() => toggleImage (-1)}
         className="navigation-button 
         prev-button">
           <img src={leftChevron} alt="previous image"/>        
         </button>
         <button
         onClick={() => toggleImage (1)}
         className="navigation-button 
         next-button">
           <img src={rightChevron} alt="next image"/>        
         </button>
         
       </div>


    </>
  )
}