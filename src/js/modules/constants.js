import {state} from '../views/elements'
import Row from './row'
//color constants
const BLACK ="#000"
const GRID_HEADER_COLOR =  "#f8f9fa"
const GRID_HEADER_LINE_COLOR ="#bcbcbc"
const HEADER_TEXT_COLOR = "#5f6368"
const GRID_fONTS = " Roboto Hevletica Arial"
const GRID_LINE_COLOR = "#e2e3e3"
const GRID_LINE_WIDTH = 1 

//cell size 
const CELLWIDTH = 100
const CELLHEIGHT = 21

//offsets
const xOffset =  50
const yOffset = 21
const SCROLL_Y_OFFSET = 55
const SCROLL_X_OFFSET = 55

//scrolling timeout
const SCROLL_Y_SPEED = 35
const SCROLL_X_SPEED = 35

//slider speed offset
const SLIDER_SPEED_OFFSET = 15 // speed ranges from (2 - 15) 2 is fast 15 is slow

//maxLength 
const MAXLEN =140

//padding offset for 1st column numbers
const PAD_FIRST_COLUMN = 3.5 

//active cell height & widht
const ACTIVE_CELL_HEIGHT = 20
const ACTIVE_CELL_WIDTH = 99

export  {
        SCROLL_Y_SPEED,MAXLEN,PAD_FIRST_COLUMN,
        SCROLL_Y_OFFSET,GRID_HEADER_LINE_COLOR,
        BLACK,GRID_HEADER_COLOR,HEADER_TEXT_COLOR,
        GRID_fONTS,GRID_LINE_COLOR,GRID_LINE_WIDTH,
        yOffset,xOffset,CELLWIDTH,CELLHEIGHT,SCROLL_X_OFFSET,
        SCROLL_X_SPEED,SLIDER_SPEED_OFFSET,
        ACTIVE_CELL_HEIGHT,ACTIVE_CELL_WIDTH,
    }