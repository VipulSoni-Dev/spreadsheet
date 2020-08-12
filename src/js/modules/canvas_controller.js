import { ctx, pxRation, state } from "../views/elements";
import { drawGrid } from '../views/canvasView'
import { devicePR, npx, screenWidth, screenHeight,rowPerScreen,colPerScreen} from './utils'





export default class CanvasController {

    constructor(sheet) {
        this.sheet = sheet
        // this.init()
    }



    init() {

        //initializing state 
        state.row = this.sheet.row.rows
        state.rowHeight = this.sheet.row.height
        state.col = this.sheet.col.cols
        state.colWidth = this.sheet.col.width
        // console.log(state.row,state.col);

        state.currentRow = 0
        state.toRow = rowPerScreen()
        state.currentCol = 0
        state.toCol = colPerScreen()

        const deviceWidth = screenWidth()
        const deviceHeight = screenHeight()

        ctx.canvas.style.width = deviceWidth + "px"
        ctx.canvas.style.height = deviceHeight + "px"

        ctx.canvas.width = npx(deviceWidth)
        ctx.canvas.height = npx(deviceHeight)

        ctx.scale(devicePR(), devicePR())
    }

    drawCanvas() {
        drawGrid()
    }



}





// import { drawSheet, initCanvas } from '../views/canvas_view'

// import { screenHeight, screenWidth, ctx, canvasDom,spreadSheet ,input, state} from '../views/domelements'

// export default class CanvasController {

//     constructor(width = screenWidth, height = screenHeight) {
//         this.width = width
//         this.height = height
//     }


//     calcWidth(sheetObj) {
//         return (this.width * (sheetObj.column.size / 6.8))
//     }
//     calcHeight(sheetObj) {
//         if (this.height > (sheetObj.row / 5)) {
//             return (this.height * (sheetObj.row / 19.1))
//         } else {
//             return this.height
//         }

//     }

//     init() {

//         const widthForCanvas = this.calcWidth(spreadSheet)
//         const heightForCanvas = this.calcHeight(spreadSheet)
//         initCanvas(widthForCanvas, heightForCanvas)
//         drawSheet()

//     }
//     updateCanvas() {
//         drawSheet()
//     }

//     focusOnCell(e) {

//         //maigc is here
//         const col = parseInt((e.pageX - 10) / 200)
//         const row = parseInt((e.pageY - 10) / 40)

//         //preventing miss Focusing
//         if (e.pageX < ctx.canvas.offsetWidth && e.pageY < ctx.canvas.offsetHeight) {
//             //preventing 1 row and 1 col focus
//             if (!(col == 0 || row == 0)) {

//                 //redrawing spreadsheet here


//                 // ctx.strokeStyle = "#000000"
//                 // ctx.strokeRect(col * 200, row * 40, 200, 40);

//                 this.focusInsertField(col * 200+8,row * 40+8,199-10,39-7,row,col)
//                 this.updateCanvas()

//             }
//         }

//         return [row,col]
//     }

//     focusInsertField(x,y,w,h,row,col)
//     {


//         // const input = document.querySelector("#input")


//         // const input =  document.createElement("input")
//         input.value =spreadSheet.sheet[`_r${row}c${col}`]
//         input.outline = '#fff'
//         input.style.position='absolute'
//         input.style.left=x+"px"
//         input.style.top=y+"px"
//         input.style.width=w+"px"
//         input.style.height=h+"px"              
//         input.style.border ='3px dashed #555'
//         input.style.display ="block"
//          input.style.outline = 'gray'
//         input.focus()
//         // document.querySelector("body").appendChild(input).focus()





//     }
//     tabToFocus(row,col){
//         if (!(col == 0 || row == 0)) {

//             this.focusInsertField(col * 200+8,row * 40+8,199-10,39-7,row,col)
//             this.updateCanvas()

//         }
//     }

// }