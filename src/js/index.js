// import CanvasController from './modules/canvas_controller'
// import { headerTextColor } from './modules/constants'
import ScrollController from './modules/scroll_controller'
import sheet from './modules/sheet'
import Spreadsheet from './modules/spreadsheet'
// import { colPerScreen, rowPerScreen } from './modules/utils'
import { ctx, state } from './views/elements'
import { addScrollBar } from './views/scrollView'
import { screenWidth, colPerScreen, rowPerScreen, scrollInit } from './modules/utils'
import { addMaskViewToPage, removeMaskView, updateMaskView } from './views/maskView'
// import { drawGridEnd } from './views/canvasView'


// state.positionY = 4
// state.positionX = 8


//starting spreadsheet

const workbook = new Spreadsheet("workbook", [new sheet("sheet1", 99, 26)])
state.ctx = workbook.load(0)

//adding scrollbars
addScrollBar()
addMaskViewToPage()
//init events.........
const sc = new ScrollController()
//resize event listner
window.addEventListener("resize", (e) => {
    scrollInit()
    workbook.load(0)
    sc.updateScrollBarOnResize(screenWidth())
    removeMaskView()
    addMaskViewToPage()

})

//keyboard navigation
window.addEventListener("keydown", (e) => {
    e.preventDefault()
    //    state.enteredInCell = false
    //default initializations
    if(e.key == "r" && e.ctrlKey || e.key == "F5"){
        document.location.reload()
    }else if (e.key == "ArrowDown") {
        state.enteredInCell = false
        if (state.activeCellRow < state.rowPerScreen) {
            state.activeCellRow += 1
        } else if (state.toRow < state.row) {
            state.currentRow += 1
            state.toRow += 1
        }

    } else if (e.key == "ArrowUp") {
        state.enteredInCell = false
        if (state.activeCellRow != 1) {
            state.activeCellRow -= 1
        } else if (state.currentRow != 0) {
            state.currentRow -= 1
            state.toRow -= 1
        }
    } else if (e.key == "ArrowRight") {
        state.enteredInCell = false
        state.hMove = true //hmove is required for horizontal movement
        if (state.activeCellCol < state.colPerScreen) {
            state.activeCellCol += 1
        } else if (state.toCol < state.col) {
            state.currentCol += 1
            state.toCol += 1
        }
    } else if (e.key == "ArrowLeft") {
        state.enteredInCell = false
        state.hMove = true
        if (state.activeCellCol != 1) {
            state.activeCellCol -= 1
        } else if (state.currentCol != 0) {
            state.currentCol -= 1
            state.toCol -= 1
        }
    } else if (e.key == "Tab" && e.shiftKey) {
        state.enteredInCell = false
        state.hMove = true
        if (state.activeCellCol != 1) {
            state.activeCellCol -= 1
        } else if (state.currentCol != 0) {
            state.currentCol -= 1
            state.toCol -= 1
        }
    } else if (e.key == "Tab") {
        state.enteredInCell = false
        state.hMove = true
        if (state.activeCellCol < state.colPerScreen) {
            state.activeCellCol += 1
        } else if (state.toCol < state.col) {
            state.currentCol += 1
            state.toCol += 1
        }
    } else if (e.key == "Enter" && e.shiftKey) {
        if (!state.enteredInCell) {
            state.enteredInCell = true
        } else {
            if (state.activeCellRow != 1) {
                state.activeCellRow -= 1
            } else if (state.currentRow != 0) {
                state.currentRow -= 1
                state.toRow -= 1
            }
        }

    } else if (e.key == "Enter") {
        if (!state.enteredInCell) {
            state.enteredInCell = true
        } else {
            if (state.activeCellRow < state.rowPerScreen) {
                state.activeCellRow += 1
            } else if (state.toRow < state.row) {
                state.currentRow += 1
                state.toRow += 1
            }
        }
    }


    console.log(e);
    removeMaskView()
    addMaskViewToPage()
    sc.moveScrollBar()
    state.ctx.drawCanvas()
})

//scroll up callback
window.scrollUp = (e) => {

    if (e.type === "mousedown") {
        sc.handleScrollUpBtnClick(e)
    } else {
        clearInterval(state.vScroller)
    }
}

//scroll down btn callback
window.scrollDown = (e) => {

    if (e.type === "mousedown") {
        sc.handleScrollDownBtnClick(e)
    } else {
        clearInterval(state.vScroller)
    }
}

//scroll right btn callback
window.scrollRight = (e) => {

    if (e.type === "mousedown") {
        sc.handleScrollRightClick(e)
    } else {
        clearInterval(state.hScroller)
    }
}

//scroll left btn callback
window.scrollLeft = (e) => {

    if (e.type === "mousedown") {
        sc.handleScrollLeftClick(e)
    } else {
        clearInterval(state.hScroller)
    }
}
//scrolling by mouse wheel event.
window.addEventListener("wheel", e => {

    sc.handleOnWheelEvent(e)
})


//for scroll slidding
document.addEventListener("mouseup", (e) => {
    // if(e.target.className == "slider"){
    if (state.verticalSlider) {
        state.lastPerc = state.percentage
        sc.verticalSliderInActive()
        state.verticalSlider = false
    }
    if (state.horizontalSlider) {
        state.hLastPerc = state.hPercentage
        sc.horizontalSliderInActive()
        state.horizontalSlider = false
    }

})


document.addEventListener("mousemove", (e) => {
    //    if(e.target.className == "slider"){
    if (state.verticalSlider) {
        window.vScroll(e)
    }
    if (state.horizontalSlider) {
        window.hScroll(e)
    }

})

window.vScroll = (e) => {
    if (e.type == "mousedown") {

        state.initialClickMargin = e.clientY
        state.verticalSlider = true
    }
    else if (e.type == "mousemove") {
        if (state.verticalSlider) {
            sc.handleVerticalSliderMovement(e)
        }

    }

}

window.hScroll = (e) => {

    if (e.type == "mousedown") {

        state.initialClickMargin_h = e.clientX
        state.horizontalSlider = true
    }
    else if (e.type == "mousemove") {
        if (state.horizontalSlider) {
            sc.handleHorizontalSliderMovement(e)
        }

    }

}
