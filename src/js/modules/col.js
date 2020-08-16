import { CELLHEIGHT, CELLWIDTH, xOffset, yOffset } from "./constants"
import { npx } from "./utils"

export default class Col{
    constructor(cols,width=100){
        this.cols = cols
        this.width = width

    }
    getCols(){
        return this.cols
    }
    getTotalWidth(){
        return this.cols * this.width
    }
    getX(col){
        if(devicePixelRatio%2 == 0){
            return npx(col*CELLWIDTH)-npx(xOffset+.5)
        }else{
            return npx(col*CELLWIDTH)-npx(xOffset+1)
        }
        
    }
}