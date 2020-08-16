import { npx } from "./utils"

export default class Row{
    constructor(rows,height=30) {
        this.rows = rows
        this.height = height
    }

    getY(row){
        return (row*100)-50.5
    }


}