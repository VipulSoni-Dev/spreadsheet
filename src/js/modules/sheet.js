import { npx } from "./utils"
import { CELLHEIGHT, CELLWIDTH } from "./constants"
import Col from "./col"
import Row from "./row"

export default class sheet{
    constructor(name , row , col)
    {
        this.name = name
        this.row = new Row(row,npx(CELLHEIGHT))
        this.col = new Col(col,npx(CELLWIDTH))
        this.data = []
    }






}