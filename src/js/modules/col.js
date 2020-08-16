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
        return (col* 21)-.5
    }
}