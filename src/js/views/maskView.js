import { ACTIVE_CELL_HEIGHT, ACTIVE_CELL_WIDTH, CELLHEIGHT, CELLWIDTH } from "../modules/constants"
import { npx, npxLine } from "../modules/utils"

const { createNewDiv, mainContainer,state } = require("./elements")



const createMaskDiv=()=>{
    const maskContainer = createNewDiv.cloneNode()
    maskContainer.className = "maskContainer"  
    mainContainer.insertAdjacentElement("beforeend",maskContainer)
}

const createHighlightedCellDiv=(endRow,endCol)=>{
    
    const highlightedCell = createNewDiv.cloneNode()
    highlightedCell.className = "highlightedCell"
               
    highlightedCell.style = `width: ${npx(state.activeCellWidth)}px;
                             height: ${npx(state.activeCellHeight)}px;
                             position: absolute;
                             left: ${npx(state.rowObj.getY(state.activeCellCol))}px;
                             top: ${npx(state.colObj.getX(state.activeCellRow))}px;`
 
    const corener_dot = createNewDiv.cloneNode()
    corener_dot.className = "corner-dot"
    corener_dot.style = `position: absolute;cursor: crosshair;width: ${npx(5)}px;
                         height: ${npx(5)}px;z-index: 9;background-color: #1a73e8;
                         right: -${npxLine(4)}px;bottom: -${npxLine(4)}px;border: 1px solid #fff;`

    highlightedCell.insertAdjacentElement("beforeend",corener_dot)

    document.querySelector(".maskContainer").insertAdjacentElement("beforeend",highlightedCell)
}


export const addMaskViewToPage=(endRow=false,endCol=false)=>{
    createMaskDiv()

    createHighlightedCellDiv(endRow,endCol)
    
    
}


export const removeMaskView=()=>{
    document.querySelector(".maskContainer").remove()
}
