import { CELLHEIGHT, CELLWIDTH, xOffset, yOffset } from "./constants"
import { npx } from "./utils"

export default class Row{
    constructor(rows,height=30) {
        this.rows = rows
        this.height = height
    }

    getY(row){
        

            return npx(row * CELLHEIGHT)+21
        
    }


}