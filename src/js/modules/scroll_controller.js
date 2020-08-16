import { state } from "../views/elements";
import { addScrollBar, removeScrollBar } from "../views/scrollView";
import { SCROLL_Y_OFFSET, SCROLL_X_OFFSET, SCROLL_Y_SPEED, SCROLL_X_SPEED, SLIDER_SPEED_OFFSET, CELLWIDTH } from './constants'
import { colPerScreen, getRowPercentage, screenHeight, screenWidth, getColPercentage, rowPerScreen, getSlidePercentage, maxScroll, npx } from "./utils";

export default class ScrollController {
    constructor() {

    }

    getScrollSliderHeight() {
        return (rowPerScreen() * 100 / state.row)
    }
    getScrollSliderWidth() {
        return (colPerScreen() * 100 / state.col)
    }
    moveScrollBar() {

        const slider = document.querySelector('.slider')
        const sliderHorizontal = document.querySelector(".slider-horizontal")

        //stores percentages current(state.percentage) and last(state.lastperc)
        state.percentage = getRowPercentage()
        state.lastPerc = state.percentage
        state.hPercentage = getColPercentage()
        state.hLastPerc = state.hPercentage


        slider.style.top = state.percentage + "%"
       if(state.hMove) 
       {
            sliderHorizontal.style.left = state.hPercentage + "%"
            state.hMove = false
       }


    }

    getScrollCaseHeight() {
        return screenHeight() - SCROLL_Y_OFFSET+1 //error correction of 1px  
    }
    getScrollCaseWidth() {
        return screenWidth() - SCROLL_X_OFFSET-1 //error correction of 1px  
    }
    updateScrollBarOnResize() {
        removeScrollBar()
        addScrollBar()
    }
    handleOnWheelEvent(e) {
        if (!e.shiftKey) {
            //wheel event
            if (e.deltaY > 0) {
                if (state.toRow < state.row) {
                    state.currentRow += 1
                    state.toRow += 1
                }
            }
            else {
                if (state.currentRow != 0) {
                    state.currentRow -= 1
                    state.toRow -= 1
                }
            }
        } else {
            state.hMove = true
            //shift + wheel event
            if (e.deltaY > 0) {
                if (state.toCol < state.col) {
                    state.currentCol += 1
                    state.toCol += 1
                }
            }
            else {
                if (state.currentCol != 0) {
                    state.currentCol -= 1
                    state.toCol -= 1
                }
            }
        }
        this.moveScrollBar()
        state.ctx.drawCanvas()

    }

    handleScrollUpBtnClick(e) {

        state.vScroller = setInterval(() => {
            if (state.toRow < state.row) {
                state.currentRow += 1
                state.toRow += 1
            }
            this.moveScrollBar()
            state.ctx.drawCanvas()

        }, SCROLL_Y_SPEED);
    }

    handleScrollDownBtnClick(e) {

        state.vScroller = setInterval(() => {
            if (state.currentRow != 0) {
                state.currentRow -= 1
                state.toRow -= 1
            }
            this.moveScrollBar()
            state.ctx.drawCanvas()

        }, SCROLL_Y_SPEED);
    }

    handleScrollRightClick(e) {
        state.hMove = true
        state.hScroller = setInterval(() => {
            state.hMove = true
            //    console.log(state.toCol,state.col);
            if (state.toCol < state.col) {
                state.currentCol += 1
                state.toCol += 1
            }
            this.moveScrollBar()
            state.ctx.drawCanvas()
        }, SCROLL_X_SPEED);
    }

    handleScrollLeftClick(e) {

        state.hScroller = setInterval(() => {
            state.hMove = true
            if (state.currentCol != 0) {
                state.currentCol -= 1
                state.toCol -= 1
            }
            this.moveScrollBar()
            state.ctx.drawCanvas()
        }, SCROLL_X_SPEED);
    }

    handleVerticalSliderMovement(e) {
        state.vCurrentY = e.clientY
        this.verticalSliderMovement(e)
        this.verticalSliderActive()
        state.ctx.drawCanvas()
    }

    verticalSliderActive() {
        const slider = document.querySelector('.slider')
        slider.style.backgroundColor = "gray"
    }

    verticalSliderInActive() {
        const slider = document.querySelector('.slider')
        slider.style.backgroundColor = "#dadce0"
    }

    handleHorizontalSliderMovement(e) {
        state.hCurrentX = e.clientX
        this.horizontalSliderMovement()
        this.horizontalSliderActive()
        state.ctx.drawCanvas()
    }

    horizontalSliderActive() {
        const slider = document.querySelector('.slider-horizontal')
        slider.style.backgroundColor = "gray"
    }
    horizontalSliderInActive() {
        const slider = document.querySelector('.slider-horizontal')
        slider.style.backgroundColor = "#dadce0"
    }

    verticalSliderMovement() {
        const slider = document.querySelector('.slider')
        // const sliderHorizontal = document.querySelector(".slider-horizontal")

        state.percentage = parseInt(((state.vCurrentY - state.initialClickMargin) * 100) / (screenHeight()-SCROLL_X_OFFSET))
        state.percentage += state.lastPerc
    
        const max = 100 - this.getScrollSliderHeight()

        //stoping conditions
        if (state.percentage <= 0) {
            state.percentage = 0
        } else if (state.percentage >= max) {
            state.percentage = max
        }

        //finding current row by
        //how many percentage 
        //slider moved
        state.currentRow = Math.floor((state.percentage * state.row) / 100)
        state.toRow = state.currentRow + state.rowPerScreen
        slider.style.top = state.percentage + "%" //getRowPercentage() + "%" 
       
    }

    horizontalSliderMovement() {

        const sliderHorizontal = document.querySelector(".slider-horizontal")

        state.hPercentage = parseInt(((state.hCurrentX - state.initialClickMargin_h) * 100) / (screenWidth()-SCROLL_X_OFFSET))
        state.hPercentage += state.hLastPerc

        const max = 100 - this.getScrollSliderWidth()

        
        //stoping conditions
        if (state.hPercentage <= 0) {
            state.hPercentage = 0
        } else if (state.hPercentage >= max) {
            state.hPercentage = max
        }
     
        //finding current row by
        //how many percentage 
        //slider moved
        state.currentCol = Math.floor((state.hPercentage * state.col) / 100)
        state.toCol = state.currentCol + state.colPerScreen
        sliderHorizontal.style.left =state.hPercentage + "%" 

    }


}