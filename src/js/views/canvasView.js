import { state, ctx, screenHeight } from './elements'
import {
    BLACK, GRID_HEADER_COLOR, HEADER_TEXT_COLOR, yOffset,xOffset,GRID_HEADER_LINE_COLOR,
    GRID_fONTS, GRID_LINE_COLOR, GRID_LINE_WIDTH, CELLHEIGHT, CELLWIDTH, MAXLEN, PAD_FIRST_COLUMN
} from '../modules/constants'
import { colPerScreen, npxLine,npx, numToAlph, rowPerScreen } from '../modules/utils'

const save = () => {
    ctx.save()
    ctx.beginPath()
}

const restore = () => {
    ctx.restore()
}


const fillText = (str, x, y, maxLen = MAXLEN,
    style = BLACK,
    font = GRID_fONTS) => {
    x = npxLine(x)
    y = npxLine(y)
    ctx.font = font
    ctx.fillStyle = style
    ctx.fillText(str, x, y, maxLen)
}

const renderGrid = (x, y, nx, ny, lineWidth = GRID_LINE_WIDTH, style = GRID_LINE_COLOR, xOffset = 0, yOffset = 0) => {
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = style;
    ctx.moveTo(npxLine(x + xOffset), npxLine(y + yOffset));
    ctx.lineTo(npxLine(nx + xOffset), npxLine(ny + yOffset))
    ctx.closePath()
    ctx.stroke()
}
const fillRect = (x, y, w, h,xOff=xOffset,yOff=yOffset, style) => {
    
   
    ctx.fillStyle = style
    ctx.fillRect(npx(x+xOff), npx(y+yOff), npx(w+xOff), npx(h+yOff))
}

export const testScrollAndStaticHeader = () => {

}
const renderHeader =(sR,eR,sC,eC,)=>{
    // rendering header grid
     renderGridCol(sC,eC,(eR-sR),xOffset,0,true)
     renderGridRow(sR,eR,(eC-sC),0,yOffset,true)
    
}


const renderGridRow=(start,end,col,xOff = xOffset,yOff = yOffset,isHeader=false)=>{

    const TotalRowLen = (col * CELLWIDTH)   

    for (let row = 0; row <= (end-start); row++) {
       
  
        const ny = CELLHEIGHT * row
        if(isHeader){
            // Row:fill rectangle with color and draw line for headers
            if(row == 0){
                fillRect(0,ny,xOffset-.5,CELLHEIGHT,0,0,GRID_HEADER_COLOR)            
                renderGrid(0,ny,TotalRowLen+xOffset,ny, GRID_LINE_WIDTH, GRID_HEADER_LINE_COLOR, xOff,yOff)
            }else{
                //dynamic padding calculation                
                let Row = row.toString().length
                const padding =(xOffset/2) - (PAD_FIRST_COLUMN*(row+start).toString().length)
               
                fillRect(0,ny,xOffset-.5,CELLHEIGHT,0,0,GRID_HEADER_COLOR)    
                fillText(row+start,padding,(ny+CELLHEIGHT/1.5),140,HEADER_TEXT_COLOR)        
                renderGrid(0,ny,xOffset,ny, GRID_LINE_WIDTH, GRID_HEADER_LINE_COLOR, xOff,yOff)
            }
        }else{
            //grid(Row):draw grid with grid color first grid line should not be rendered
            if(row == 0){

            }else{
                 renderGrid(0,ny,TotalRowLen,ny, GRID_LINE_WIDTH, GRID_LINE_COLOR, xOff,yOff)
            }
         
        }
    }
}
const renderGridCol =(start,end,row,xOff = xOffset,yOff = yOffset,isHeader=false)=>{

    const totalColLen = row * CELLHEIGHT

    for (let col = 0; col <= (end-start); col++) {
        const nx = CELLWIDTH * col
        
        if(isHeader){
            // Col:fill rectangle with color and draw line for headers
            if(col == 0){
                fillRect(nx,0,xOffset-.5,CELLHEIGHT,0,0,GRID_HEADER_COLOR)
                renderGrid(nx,0,nx,totalColLen+yOffset, GRID_LINE_WIDTH,GRID_HEADER_LINE_COLOR,xOff,yOff)
            }else{
                
                fillRect(nx-(CELLWIDTH-xOffset),0,CELLWIDTH,CELLHEIGHT,0,0,GRID_HEADER_COLOR) 
                fillText(numToAlph(col+start-1),nx-(CELLWIDTH-xOffset)/15,CELLHEIGHT/1.5,MAXLEN,HEADER_TEXT_COLOR)
                renderGrid(nx,0,nx,CELLHEIGHT, GRID_LINE_WIDTH,GRID_HEADER_LINE_COLOR,xOff,yOff)
            }
             
        }else{
            //grid(Col):draw grid with grid color first grid line should not be rendered
            if(col == 0){

            }else{
                renderGrid(nx,0,nx,totalColLen, GRID_LINE_WIDTH, GRID_LINE_COLOR,xOff,yOff)
            }
            
        }
        

        
    }
}


export const drawGrid = () => {
    
    save()
    
        // **remember always end digit of row or col should be added by 1

        // console.log(state.currentRow,state.toRow,state.currentCol,state.toCol);
        renderHeader(state.currentRow,state.toRow,state.currentCol,state.toCol)

        //rendering row and cols
        renderGridRow(state.currentRow,state.toRow,state.colPerScreen,xOffset,yOffset)
        renderGridCol(state.currentCol,state.toCol,state.rowPerScreen,xOffset,yOffset) 
            
    //    console.log(state.end);
    restore()

}

// export const drawGridEnd = () =>{
//     console.log("called");
//     save()
//          ctx.fillRect(0,(rowPerScreen()-2)*CELLHEIGHT,colPerScreen()*CELLWIDTH+50,CELLHEIGHT*3)
//         // **remember always end digit of row or col should be added by 1

//         // console.log(state.currentRow,state.toRow,state.currentCol,state.toCol);
//         renderHeader(state.currentRow+2,state.toRow+2,state.currentCol+2,state.toCol+2)

//         // rendering row and cols
//         renderGridRow(state.currentRow+2,state.toRow+2,state.toCol+2,xOffset,yOffset)
//         renderGridCol(state.currentCol+2,state.toCol+2,state.toRow+2,xOffset,yOffset) 
 
//         ctx.fillStyle ="gray"
//         console.log();
      
//     // restore()    

   

// }















//backup

// import { state, ctx } from './elements'
// import {
//     black, gridHeaderColor, headerTextColor, yOffset,xOffset,gridHeaderLineColor,
//     gridFonts, gridLinesColor, gridLineWidth, CELLHEIGHT, CELLWIDTH
// } from '../modules/constants'
// import { ColPerScreen, npxLine,npx, numToAlph, RowPerScreen } from '../modules/utils'

// const save = () => {
//     ctx.save()
//     ctx.beginPath()
// }

// const restore = () => {
//     ctx.restore()
// }


// const fillText = (str, x, y, maxLen = 140,
//     style = black,
//     font = "Roboto Hevletica Arial") => {
//     x = npxLine(x)
//     y = npxLine(y)
//     ctx.font = font
//     ctx.fillStyle = style
//     ctx.fillText(str, x, y, maxLen)
// }

// const renderGrid = (x, y, nx, ny, lineWidth = gridLineWidth, style = gridLinesColor, xOffset = 0, yOffset = 0) => {
//     ctx.beginPath()
//     ctx.lineWidth = lineWidth
//     ctx.strokeStyle = style;
//     ctx.moveTo(npxLine(x + xOffset), npxLine(y + yOffset));
//     ctx.lineTo(npxLine(nx + xOffset), npxLine(ny + yOffset))
//     ctx.closePath()
//     ctx.stroke()
// }
// const fillRect = (x, y, w, h,xOff=xOffset,yOff=yOffset, style) => {
    
//     // console.log(npxLine(x+xOff), npxLine(y+yOff), npxLine(w+xOff), npxLine(h+yOff))
//     ctx.fillStyle = style
//     ctx.fillRect(npx(x+xOff), npx(y+yOff), npx(w+xOff), npx(h+yOff))
// }

// // const renderHeader = (x, y, tx, ty, width = gridLineWidth, color = gridLinesColor) => {
// //     ctx.beginPath()
// //     ctx.lineWidth = width
// //     ctx.strokeStyle = color;
// //     ctx.moveTo(npxLine(x), npxLine(y));
// //     ctx.lineTo(npxLine(tx), npxLine(ty))
// //     ctx.stroke()
// // }

// export const testScrollAndStaticHeader = () => {

// }
// const renderHeader =(sR,eR,sC,eC,)=>{
//     // rendering header grid
//      renderGridCol(sC,eC,(eR-sR),xOffset,0,true)
//      renderGridRow(sR,eR,(eC-sC),0,yOffset,true)
    
// }


// const renderGridRow=(start,end,col,xOff = xOffset,yOff = yOffset,isHeader=false)=>{

//     const TotalRowLen = (col * cellWidth)   

//     for (let row = 0; row <= (end-start); row++) {
       
  
//         const ny = CELLHEIGHT * row
//         if(isHeader){
//             // Row:fill rectangle with color and draw line for headers
//             if(row == 0){
//                 fillRect(0,ny,xOffset-.5,CELLHEIGHT,0,0,gridHeaderColor)            
//                 renderGrid(0,ny,TotalRowLen+xOffset,ny, gridLineWidth, gridHeaderLineColor, xOff,yOff)
//             }else{
//                 fillRect(0,ny,xOffset-.5,CELLHEIGHT,0,0,gridHeaderColor)    
//                 fillText(row,(xOffset-.5)/2,(ny+CELLHEIGHT/1.5),140,headerTextColor)        
//                 renderGrid(0,ny,xOffset,ny, gridLineWidth, gridHeaderLineColor, xOff,yOff)
//             }
//         }else{
//             //grid(Row):draw grid with grid color first grid line should not be rendered
//             if(row == 0){

//             }else{
//                 renderGrid(0,ny,TotalRowLen,ny, gridLineWidth, gridLinesColor, xOff,yOff)
//             }
         
//         }
//     }
// }
// const renderGridCol =(start,end,row,xOff = xOffset,yOff = yOffset,isHeader=false)=>{

//     const totalColLen = row * CELLHEIGHT

//     for (let col = 0; col <= (end-start); col++) {
           
//         const nx =cellWidth * col
        
//         if(isHeader){
//             // Col:fill rectangle with color and draw line for headers
//             if(col == 0){
//                 fillRect(nx,0,xOffset-.5,CELLHEIGHT,0,0,gridHeaderColor)
//                 renderGrid(nx,0,nx,totalColLen+yOffset, gridLineWidth,gridHeaderLineColor,xOff,yOff)
//             }else{
                
//                 fillRect(nx-(cellWidth-xOffset),0,cellWidth,CELLHEIGHT,0,0,gridHeaderColor) 
//                 fillText(numToAlph(col-1),nx-(cellWidth-xOffset)/5,CELLHEIGHT/1.5,140,headerTextColor)
//                 renderGrid(nx,0,nx,CELLHEIGHT, gridLineWidth,gridHeaderLineColor,xOff,yOff)
//             }
             
//         }else{
//             //grid(Col):draw grid with grid color first grid line should not be rendered
//             if(col == 0){

//             }else{
//                 renderGrid(nx,0,nx,totalColLen, gridLineWidth, gridLinesColor,xOff,yOff)
//             }
            
//         }
        
//     }
// }



// export const drawGrid = () => {
    
//     save()
    
//         // **remember always end digit of row or col should be added by 1

//        renderHeader(0,2,0,2)

//         //rendering row and cols
//         renderGridRow(0,2,2,xOffset,yOffset)
//         renderGridCol(0,2,2,xOffset,yOffset) 
        
        

//     restore()
// }












