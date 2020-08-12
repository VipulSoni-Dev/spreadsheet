import { state } from "../views/elements";
import { CELLHEIGHT ,CELLWIDTH, SCROLL_Y_OFFSET, SLIDER_SPEED_OFFSET} from "./constants";

export const devicePR=()=> {
    return window.devicePixelRatio || 1;
  }
  
 export const thinLineWidth=()=>{
    return devicePR() - 0.5;
  }
  
export const npx =(px) =>{
    return  parseInt(px * devicePR(), 10);
  }
  
 export const npxLine =(px)=>{
    const n =  npx(px)
    return n > 0 ? n - 0.5 : 0.5;
  }  

 export const screenWidth=()=>{
    return document.documentElement.clientWidth  || 1366
  }
 export const screenHeight=()=>{
    return document.documentElement.clientHeight || 768
  } 

  //Row and Col on Screen  
  export const rowPerScreen =()=>{
    const Rows = screenHeight()/npx(CELLHEIGHT)  //we need scaling for resized CELLHEIGHT    
    return Rows > state.row ? state.row : parseInt(Rows) 
  } 
  export const colPerScreen = ()=>{
    const Cols = screenWidth()/npx(CELLWIDTH) //we need scaling for resized CELLWIDTH
    return Cols > state.col ? state.col : parseInt(Cols)
  }

  export const getRowPercentage=()=>{
    
    if(((npx(state.currentRow * 100))/npx(state.row)) >0){
      return ((npx(state.currentRow * 100))/npx(state.row))
    }else{
       return 0
    }
    
  }



  export const getColPercentage=()=>{
    if(((npx(state.currentCol * 100))/npx(state.col)) >0){
      return ((npx(state.currentCol * 100))/npx(state.col))
    }else{
       return 0
    }
  }

  export const getScrollLines=()=>{
  //  console.log(parseInt(state.row.toString().length-2));
  //   return parseInt(state.row.toString().length-2)
    return Math.floor(state.row /100)

  }

  export const numToAlph=(num)=>{

    let num2 = num%26
    const s = String.fromCharCode(65+num2)
    num2 = parseInt(num/26)
    if(num2>0){
        return numToAlph(num2-1)+s
    }else{
        return s
    }

  }