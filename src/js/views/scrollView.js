import ScrollController from '../modules/scroll_controller'
import { screenWidth } from '../modules/utils'
import {createNewDiv, state} from './elements'
 

function createScrollBars(){
    state.sb ={}
    const sc = new ScrollController()
    
//vertical scrollbar     
    //Container
    createNewDiv.setAttribute("class","scrollBarContainer")
    state.sb.scrollBar = createNewDiv.cloneNode()
    //vertical scrollbar body 
    createNewDiv.setAttribute("class","myscrollBar")
    const myscrollBar = createNewDiv.cloneNode()
    myscrollBar.setAttribute("style",`height:${sc.getScrollCaseHeight()}px;`)
    state.sb.scrollBar.appendChild(myscrollBar)

    //slider
    createNewDiv.setAttribute("class","slider") 
    const slider = createNewDiv.cloneNode()  
    //slider event callback
    slider.setAttribute("onmousedown","window.vScroll(event)")
    //slider 
    if(sc.getScrollSliderHeight()>= 100){
        myscrollBar.setAttribute("style",`display:none`)
    }else{
        slider.setAttribute("style",`height:${sc.getScrollSliderHeight()}%;`)
    }   
    myscrollBar.appendChild(slider)

    //verical scroll btns
    createNewDiv.setAttribute("class","nav-up")
    const navUpBtn = createNewDiv.cloneNode()
    navUpBtn.setAttribute("onmousedown","window.scrollDown(event)")
    navUpBtn.setAttribute("onmouseout","window.scrollDown(event)")
    navUpBtn.setAttribute("onmouseup","window.scrollDown(event)")
    state.sb.scrollBar.appendChild(navUpBtn)

    createNewDiv.setAttribute("class","nav-down")
    const navDownBtn = createNewDiv.cloneNode()
    navDownBtn.setAttribute("onmousedown","window.scrollUp(event)")
    navDownBtn.setAttribute("onmouseout","window.scrollDown(event)")
    navDownBtn.setAttribute("onmouseup","window.scrollUp(event)")
    state.sb.scrollBar.appendChild(navDownBtn)

//horizontal scrollbar    
    //Container
    createNewDiv.setAttribute("class","scrollBarHorizonatalContainer")
    state.sb.scrollBar_Horizontal = createNewDiv.cloneNode()
    
    //horizontal scrollbar
    createNewDiv.setAttribute("class","myscrollBar-horizontal")
    const myHorizontalScrollbar = createNewDiv.cloneNode()
    myHorizontalScrollbar.setAttribute("style",`width:${sc.getScrollCaseWidth()}px;`)
    state.sb.scrollBar_Horizontal.appendChild(myHorizontalScrollbar)
    
    //slider
    createNewDiv.setAttribute("class","slider-horizontal")
    const slider_Horizontal = createNewDiv.cloneNode()
    slider_Horizontal.setAttribute("onmousedown","window.hScroll(event)")

   //setting width of slider according to col's count of sheet
    if(sc.getScrollSliderWidth()>=100){
        myHorizontalScrollbar.setAttribute("style",`display:none`)
    }else{
        slider_Horizontal.setAttribute("style",`width:${sc.getScrollSliderWidth()}%`)
    }
    myHorizontalScrollbar.appendChild(slider_Horizontal)
    //horizontal scroll btns

    createNewDiv.setAttribute("class","nav-right-horizontal")
    const navRightBtn_Horizontal = createNewDiv.cloneNode()
    navRightBtn_Horizontal.setAttribute("onmousedown","window.scrollRight(event)")
    navRightBtn_Horizontal.setAttribute("onmouseout","window.scrollRight(event)")
    navRightBtn_Horizontal.setAttribute("onmouseup","window.scrollRight(event)")
    state.sb.scrollBar_Horizontal.appendChild(navRightBtn_Horizontal)

    createNewDiv.setAttribute("class","nav-left-horizontal")
    const navLeftBtn_Horizontal = createNewDiv.cloneNode()
    navLeftBtn_Horizontal.setAttribute("onmousedown","window.scrollLeft(event)")
    navLeftBtn_Horizontal.setAttribute("onmouseout","window.scrollLeft(event)")
    navLeftBtn_Horizontal.setAttribute("onmouseup","window.scrollLeft(event)")   
    state.sb.scrollBar_Horizontal.appendChild(navLeftBtn_Horizontal)
    
    
}

export const addScrollBar=()=>{

    createScrollBars()
    // console.log(state.sb.scrollBar);
    document.querySelector("textarea").insertAdjacentElement("afterend",state.sb.scrollBar_Horizontal)
    document.querySelector("textarea").insertAdjacentElement("afterend",state.sb.scrollBar)   
}
export const removeScrollBar=()=>{
    state.sb.scrollBar_Horizontal.remove()
    state.sb.scrollBar.remove()
}