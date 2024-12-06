const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector(".line-width");
const color = document.querySelector(".color");
const colorOption = Array.from(document.querySelectorAll(".color-option"));
const fillingMode = document.querySelector(".filling-mode");
const newCanvas = document.querySelector(".new-canvas");
const eraserMode = document.querySelector(".eraser-mode");
const imageFile = document.querySelector(".image");
const uploadButton = document.querySelector(".upload-button");
const saveButton = document.querySelector(".save-button");
const drawTextMode = document.querySelector(".draw-text-mode");
console.log(colorOption);
canvas.width = 400;
canvas.height = 400;
ctx.lineCap ="round";
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
  temp = ctx.fillStyle;
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = temp;
}
function onClickEraserMode(){
  isFillingMode = false;
  temp = ctx.fillStyle;
  ctx.strokeStyle = "white";
  ctx.lineWidth = "10";
  ctx.fillStyle = temp;
}
function onClickUploadButton(){
  imageFile.click();
}
function onChageImageFile(event){
  console.dir(event);
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function(){
    ctx.drawImage(image, 0,0, canvas.width,canvas.height);
    imageFile.value==null;
  }
}
function onDoubleClick(event){
  if(drawTextMode!==""){
    
    ctx.save();
    const text = drawTextMode.value;
    ctx.font = "80px 굴림체";
    ctx.lineWidth = 3;
    ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}
function onClickSaveButton(){
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "lil-paint image";
  a.click();
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
eraserMode.addEventListener("click", onClickEraserMode);
imageFile.addEventListener("change", onChageImageFile);
uploadButton.addEventListener("click",onClickUploadButton);
canvas.addEventListener("dblclick", onDoubleClick);
saveButton.addEventListener("click", onClickSaveButton);