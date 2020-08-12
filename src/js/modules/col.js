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
}