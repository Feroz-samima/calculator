// webpage calculator.
// author md feroz hassan.
// licence mit.

// function for binding element
const idSelector=(id) =>document.getElementById(id)
const selectorAll=(a)=>document.querySelectorAll(a)
// declare all the variable for element
const display = idSelector('display')
const numberBtn = selectorAll('.num')
const operatorBtn =selectorAll('.operator')
const equal = idSelector('equal')
const clear= idSelector('clear')
const ce = idSelector('ce')
const operatorDisplay=idSelector('operatorDisplay')
const container=selectorAll('.container')[0]
const history = idSelector('history')
const close = idSelector('close')
const replay = idSelector('replay')
const tan = idSelector('tan')
const opt = idSelector('opt')
const clock = idSelector('clock')
// declare global varieble
let prevValue='';
let currentValue='';
let operator = '';
let historyArr=[];

// initially display value 0
display.innerText=0;
// function for history modal
display.onclick=()=>history.style.display='block'
// function for close history modal
close.onclick=()=> history.style.display='none'

// function for reset all value that click Ac button
clear.onclick=()=>{
  prevValue='';
  currentValue='';
  display.innerText=0;
  operator=''
  operatorDisplay.innerText=''
  historyArr=[]
}
// erase current value.
ce.onclick=()=> {
  currentValue=''
  display.innerText=0
}

numberBtn.forEach(num=> {
  num.onclick=(e)=> {
   const evalue=e.target.innerText;
   if (evalue=='.'&&currentValue==''){
      currentValue += 0+evalue
      display.innerText = currentValue
    }else{
      if (evalue=='.'&&currentValue.includes('.'))return
      if (evalue=='0'&&currentValue=='') return
      
      currentValue += evalue
      display.innerText = currentValue
    }
  }
})

operatorBtn.forEach(operate => {
  operate.onclick=(e)=> {
    if (operator==''&& !prevValue &&currentValue){
      prevValue=currentValue
      operator=e.target.value
      historyArr.push(currentValue)
      currentValue='';
      }else if(operator==e.target.value&& currentValue){
        updateDisplay()
        currentValue=''
      }else if(!(operator==e.target.value)&&prevValue){
        if (!currentValue=='') {
          updateDisplay()
          currentValue=''
        }
          operator=e.target.value
          
      }
      operatorDisplay.innerText=e.target.innerText
  }
})

equal.onclick=(e)=> {
  if (prevValue&&!currentValue&&operator=='*') {
    prevValue = prevValue*prevValue;
    display.innerText=prevValue;
    return
  }
  updateDisplay()
  operatorDisplay.innerText=e.target.innerText
}

function updateDisplay() {
  if (currentValue) {
  prevValue = eval(prevValue+operator+currentValue)
  if (prevValue.toString().includes('.')) {
    var fixedDecimalWith=prevValue
    display.innerText=fixedDecimalWith;
    historyArr.push(currentValue)
  }else{
    display.innerText=prevValue
    historyArr.push(currentValue)
  }
  currentValue=''
  }else{
    if (!currentValue&& !prevValue) return
    display.innerText=prevValue;
    currentValue=''
  }
}
// function for view history 
var i =0;
replay.onclick=function(){
  if (historyArr.length) {
   var interval= setInterval(()=> {
    display.innerText=historyArr[i];
    operatorDisplay.innerText=i+1
    i++
    if (i==historyArr.length+1) {
      clearInterval(interval)
      display.innerText=prevValue;
      i=0
    }
  },1000)
    
  }
}

tan.onclick=(e)=>{
  const pi = Math.PI;
  if (currentValue) {
    display.innerText=`tan(${currentValue})`
    currentValue=Math.tan(currentValue*pi/180)
  }else if (!currentValue&&prevValue) {
    display.innerText = `tan(${prevValue})`
    prevValue = Math.tan(prevValue*pi/ 180)
  }
}
opt.onclick=()=> {
  console.log('ok');
}
setInterval(()=> {
clock.innerText = new Date().toLocaleTimeString()
},1000);