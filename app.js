const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector(".line-width");
const color = document.querySelector(".color");
const colorOption = Array.from(document.querySelectorAll(".color-option"));
const fillingMode = document.querySelector(".filling-mode");
const newCanvas = document.querySelector(".new-canvas");
console.log(colorOption);
canvas.width = 400;
canvas.height = 400;
let isPainting = false;
let isFillingMode = false;
function startPainting(){
  isPainting = true;
}
function onMove(event){
  if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function canclePainting(){
  isPainting = false;
}
function onLineWidthChange(event) {
  ctx.beginPath();
  ctx.lineWidth = event.target.value;
}
function onColorChange(event){
  console.log(event.target.value);
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
function onClickColorOption(event){
  console.dir(event.target.dataset.color);
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;
  color.value = event.target.dataset.color;
}
function onClickMode(event){
  if(isFillingMode==false){
    isFillingMode=true;
    fillingMode.innerText = "💦"
  } else{
    isFillingMode=false;
    fillingMode.innerText = "✒️"
  }
  console.log(isFillingMode);
}
function onClickCanvas(){
  if(isFillingMode){
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }
}
function onClickNewCanvas(){
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
}
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave", canclePainting);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOption.forEach(color=> color.addEventListener("click",onClickColorOption));
fillingMode.addEventListener("click", onClickMode);
canvas.addEventListener("click", onClickCanvas);
newCanvas.addEventListener("click", onClickNewCanvas);