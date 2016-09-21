var color = window.getComputedStyle(document.querySelector(".selected")).backgroundColor;
var canvas =  document.querySelector("canvas");
var context = canvas.getContext("2d");
var ul = document.querySelector("ul");
var redRange = document.getElementById("red");
var greenRange = document.getElementById("green");
var blueRange = document.getElementById("blue");
var newColorPreview = document.getElementById("newColor");
var addNewColorButton = document.getElementById("addNewColor");
var saveImageButton = document.getElementById("saveImage");
var revealColorSelectButton = document.getElementById("revealColorSelect");

var lastEvent;
var isMouseDown = false;

function handleColorClick() {
	ul.querySelectorAll("li").forEach(function(el) {
		el.classList.remove("selected");
	});
	this.classList.add("selected");
	color = window.getComputedStyle(this).backgroundColor;
}

function bindColorClickHandler(el) {
	el.addEventListener("click", handleColorClick);
}

function changeColor(){
	var r = redRange.value;
	var g = greenRange.value;
	var b = blueRange.value;
	newColorPreview.style.background = "rgb(" + r + "," + g + "," + b + ")";
}

function bindChangeHandler(el) {
	el.addEventListener("input", changeColor);
}

function toggleFlexibility(elementId) {
	var el = document.getElementById(elementId);
	var visability = window.getComputedStyle(el).display;
	if(visability == "none") {
		el.style.display = "block";
	} else {
		el.style.display = "none";
	}
}

ul.querySelectorAll("li").forEach(bindColorClickHandler);

canvas.addEventListener("mousedown", function(e){
	lastEvent = e;
	isMouseDown = true;
});

canvas.addEventListener("mousemove", function(e){
	if(isMouseDown) {
		context.beginPath();
		context.moveTo(lastEvent.offsetX,lastEvent.offsetY);	
		context.lineTo(e.offsetX,e.offsetY);
		context.strokeStyle = color;
		context.stroke();
		lastEvent = e;		
	}
});

canvas.addEventListener("mouseup", function(){
	isMouseDown = false;
});

document.querySelectorAll("input[type=range]").forEach(bindChangeHandler);

revealColorSelectButton.addEventListener("click", function(){
	changeColor();
	toggleFlexibility("colorSelect");
});

addNewColorButton.addEventListener("click", function(){
	var li = document.createElement("li");
	li.style.backgroundColor = window.getComputedStyle(newColorPreview).backgroundColor;
	ul.appendChild(li);
	bindColorClickHandler(li);
	li.click();
});

saveImageButton.addEventListener("click", function(){
	var downloadLink = document.createElement("a");
	downloadLink.href = canvas.toDataURL();
	downloadLink.download = "image.png";
	downloadLink.target = "_blank";
	downloadLink.click();
});