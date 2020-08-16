import { loading, mainContainer } from "../views/elements"
import CanvasController from "./canvas_controller"

export default class Spreadsheet{
    
    constructor(name,sheet)
        {
            this.name = name
            this.sheets = [...sheet]
        }

        load(sheetIndex){
            loading.style.display = "none"
            mainContainer.style.display = "block"

            const canvas = new  CanvasController(this.sheets[sheetIndex])
            canvas.init()
            canvas.drawCanvas()
            return canvas
        }
    

        // init(){
        //     let newColumnArr = new Map()
        //     for (let i = 0; i < this.column; i++) {
        //         newColumnArr.set(i,this.colToAlpha(i))              
        //     } 
        //     this.column = newColumnArr
           
           

        //     for (let i = 1; i < this.row; i++) {
        //         for (let j = 1; j < this.column.size; j++) {
        //             this.sheet = {
        //                 ...this.sheet,    
        //                 [`_r${i}c${j}`]: "",
        //             }
        //         }              
        //     }
     
        // }


        // updateCell(cell_Id,value){
        //     this.sheet[cell_Id] = value
        // }

        // getMaxLengthCol(row){
        //     let max = 0
        //     return this.column.forEach(col => {
        //         max =  this.sheet[`_r${row}c${col}`].length > max ? this.sheet[`_r${row}c${col}`].length : max 
        //     }); 
        // }
}