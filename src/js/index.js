// import CanvasController from './modules/canvas_controller'
// import { headerTextColor } from './modules/constants'
import ScrollController from './modules/scroll_controller'
import sheet from './modules/sheet'
import Spreadsheet from './modules/spreadsheet'
// import { colPerScreen, rowPerScreen } from './modules/utils'
import {state} from './views/elements'
import { addScrollBar } from './views/scrollView'   
import {screenWidth,screenHeight} from './modules/utils'


// state.positionY = 4
// state.positionX = 8


//starting spreadsheet

const workbook = new Spreadsheet("workbook",[new sheet("sheet1",100,26)])
state.ctx = workbook.load(0)

//adding scrollbars
addScrollBar()

//init events.........
const sc = new ScrollController()
//resize event listner
window.addEventListener("resize",(e)=>{
    
    workbook.load(0)
    sc.updateScrollBarOnResize(screenWidth())
  
})

//scroll up callback
window.scrollUp=(e)=>{

    if(e.type === "mousedown"){
        sc.handleScrollUpBtnClick(e)
    }else{
        clearInterval(state.vScroller)
    }
}

//scroll down btn callback
window.scrollDown=(e)=>{
  
    if(e.type === "mousedown"){
        sc.handleScrollDownBtnClick(e)
    }else{
        clearInterval(state.vScroller)
    } 
}

//scroll right btn callback
window.scrollRight=(e)=>{
  
    if(e.type === "mousedown"){
        sc.handleScrollRightClick(e)
    }else{
        clearInterval(state.hScroller)
    } 
}

//scroll left btn callback
window.scrollLeft=(e)=>{
  
    if(e.type === "mousedown"){
        sc.handleScrollLeftClick(e)
    }else{
        clearInterval(state.hScroller)
    } 
}
//scrolling by mouse wheel event.
window.addEventListener("wheel",e=>{   

    sc.handleOnWheelEvent(e)
})


//for scroll slidding
document.addEventListener("mouseup",(e)=>{
    // if(e.target.className == "slider"){
        if(state.verticalSlider){
            state.lastPerc = state.percentage
            sc.verticalSliderInActive()
            state.verticalSlider = false
        }
        if(state.horizontalSlider){
            state.hLastPerc = state.hPercentage
            sc.horizontalSliderInActive()
            state.horizontalSlider = false
        }

})


document.addEventListener("mousemove",(e)=>{
//    if(e.target.className == "slider"){
    if(state.verticalSlider){
        window.vScroll(e)
    }
    if(state.horizontalSlider){
        window.hScroll(e)
    }
   
})

window.vScroll=(e)=>
{
    if(e.type == "mousedown"){
        
        state.initialClickMargin = e.clientY
        state.verticalSlider = true 
    }
    else if(e.type == "mousemove")
    {   
        if(state.verticalSlider){
            sc.handleVerticalSliderMovement(e)
        } 
        
    }
 
}

window.hScroll=(e)=>
{

    if(e.type == "mousedown"){
        
        state.initialClickMargin_h = e.clientX
        state.horizontalSlider = true 
    }
    else if(e.type == "mousemove")
    {   
        if(state.horizontalSlider){
            sc.handleHorizontalSliderMovement(e)
        } 
        
    }
 
}
