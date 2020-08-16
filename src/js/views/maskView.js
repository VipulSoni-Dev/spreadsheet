import { ACTIVE_CELL_HEIGHT, ACTIVE_CELL_WIDTH, CELLHEIGHT, CELLWIDTH } from "../modules/constants"
import { npx, npxLine } from "../modules/utils"

const { createNewDiv, mainContainer,state } = require("./elements")



const createMaskDiv=()=>{
    const maskContainer = createNewDiv.cloneNode()
    maskContainer.className = "maskContainer"  
    mainContainer.insertAdjacentElement("beforeend",maskContainer)
}

const createHighlightedCellDiv=()=>{
    
    const highlightedCell = createNewDiv.cloneNode()
    highlightedCell.className = "highlightedCell"
               
    highlightedCell.style = `width: ${npx(state.activeCellWidth)}px;
                             height: ${npx(state.activeCellHeight)}px;
                             position: absolute;
                             left: ${(state.colObj.getX(state.activeCellCol))}px;
                             top: ${state.rowObj.getY(state.activeCellRow)}px;`
 
    const corener_dot = createNewDiv.cloneNode()
    corener_dot.className = "corner-dot"
    corener_dot.style = `position: absolute;cursor: crosshair;width: ${npx(5)}px;
                         height: ${npx(5)}px;z-index: 9;background-color: #1a73e8;
                         right: -${npxLine(4)}px;bottom: -${npxLine(4)}px;border: 1px solid #fff;`

    highlightedCell.insertAdjacentElement("beforeend",corener_dot)

    document.querySelector(".maskContainer").insertAdjacentElement("beforeend",highlightedCell)
}

const createInputBox=()=>{
    
}
export const addMaskViewToPage=()=>{
    createMaskDiv()
    createHighlightedCellDiv()
    
}


export const removeMaskView=()=>{
    document.querySelector(".maskContainer").remove()
}

export const updateMaskView=()=>{
    // console.log(state.activeCellRow);
    if(state.activeCellCol <=0 || state.activeCellCol > state.colPerScreen){
        document.querySelector(".maskContainer").style.display = "none"
       
    }else if(state.activeCellRow <=0 || state.activeCellRow > state.rowPerScreen){
        document.querySelector(".maskContainer").style.display = "none"
    }else{
       
        document.querySelector(".maskContainer").style.display = "block"
        removeMaskView()
        addMaskViewToPage()
    }
    
}