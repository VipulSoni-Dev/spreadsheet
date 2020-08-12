import { state } from "../views/elements";
import { addScrollBar, removeScrollBar } from "../views/scrollView";
import { SCROLL_Y_OFFSET, SCROLL_X_OFFSET, SCROLL_Y_SPEED, SCROLL_X_SPEED, SLIDER_SPEED_OFFSET } from './constants'
import { colPerScreen, getRowPercentage, screenHeight, screenWidth, getColPercentage, rowPerScreen, getSlidePercentage, maxScroll } from "./utils";

export default class ScrollController {
    constructor() {

    }

    getScrollSliderHeight() {
        return Math.round(rowPerScreen() * 100 / state.row)
    }
    getScrollSliderWidth() {
        return Math.round(colPerScreen() * 100 / state.col)
    }
    moveScrollBar() {

        const slider = document.querySelector('.slider')
        const sliderHorizontal = document.querySelector(".slider-horizontal")

        //stores percentages current(state.percentage) and last(state.lastperc)
        state.percentage = getRowPercentage()
        state.lastPerc = state.percentage
       
        if(state.hScroller || state.hMove){
            state.hPercentage = getColPercentage()
            state.hLastPerc = state.hPercentage
            state.hMove = false
        }


        slider.style.top = state.percentage + "%"   
        sliderHorizontal.style.left = state.hPercentage + "%"

    }

    getScrollCaseHeight() {
        return screenHeight() - SCROLL_Y_OFFSET //56 is Yoffset for scrollBar 
    }
    getScrollCaseWidth() {
        return screenWidth() - SCROLL_X_OFFSET //56 is Yoffset for scrollBar 
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
            state.hMove =true
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

        state.hScroller = setInterval(() => {
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
        this.verticalSliderMovement()
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

        state.percentage = parseInt(((state.vCurrentY - state.initialClickMargin) * 100) / screenHeight())
        state.percentage += state.lastPerc
        // console.log(percentage,state.perc);
        const max = 100 - this.getScrollSliderHeight()
        if (state.percentage <= 0) {
            state.percentage = 0
        } else if (state.percentage >= max) {
            state.percentage = max
        }


        state.currentRow = Math.ceil((state.percentage * state.row) / 100)
        state.toRow = state.currentRow + rowPerScreen()
        slider.style.top = state.percentage + "%"

    }

    horizontalSliderMovement() {
        // const slider = document.querySelector('.slider')
        const sliderHorizontal = document.querySelector(".slider-horizontal")

        state.hPercentage = parseInt(((state.hCurrentX - state.initialClickMargin_h) * 100) / screenWidth())
        state.hPercentage += state.hLastPerc

        const max = 100 - this.getScrollSliderWidth()
        if (state.hPercentage <= 0) {
            state.hPercentage = 0
        } else if (state.hPercentage >= max) {
            state.hPercentage = max
        }

        state.currentCol = Math.ceil((state.hPercentage * state.toCol) / 100)
        state.toCol = state.currentCol + colPerScreen()

        sliderHorizontal.style.left = state.hPercentage + "%"   //utile.getRowPercentage() will give current slider(vertical) position 
            
    }


}