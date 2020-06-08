var mainContainer = null;

var mouseDown = false;
var dragPos = null;
var dragElement = null;

mainContainer = document.getElementsByClassName('main-container')[0];
document.getElementById('youtube_container').style.backgroundColor = "blue";
document.getElementById('spotify_container').style.backgroundColor = "green";

// #### Event Listeners for Document #### //
// Add Event Listeners to the document to handle dragging function.
document.addEventListener('mouseup', (event) => {
    dragElement.style.zIndex = "1";
    mouseDown = false;
    dragPos = null;
    dragElement = null;
});
document.addEventListener('mousemove', (event) => {
    //console.log('PosX: ' + event.clientX + ' PosY: ' + event.clientY);
    if (mouseDown && dragPos !== null && dragElement !== null) {
        dragElement.style.zIndex = "1";
        var posX = event.clientX - getOffset(mainContainer).left;
        var posY = event.clientY- getOffset(mainContainer).top;
        dragPos = { y: posY, x: posX };
        
        moveElementToPos();
    }
});




// #### Event Listeners for Containers and Child Elements #### //
// Add Event Listerners to all containers to handle which is in front
var elements = document.getElementsByClassName('container');
for (var i = 0; i < elements.length; i++)
{
    elements[i].addEventListener('mousedown', (event) => {
        var containers = document.getElementsByClassName('container');
        for (var i = 0; i < containers.length; i++)
        {
            containers[i].style.zIndex = "0";
        }

        event.target.style.zIndex = "1";
    });
}

// Add Event Listeners to all Drag buttons on containers to set dragPos and dragElement
elements = document.getElementsByClassName('btn_drag');
for (var i = 0; i < elements.length; i++)
{
    elements[i].addEventListener('mousedown', (event) => {
        mouseDown = true;

        var relX = event.clientX - getOffset(mainContainer).left;
        var relY = event.clientY - getOffset(mainContainer).top;
        dragPos = { y: relY, x: relX };
        dragElement = event.target.parentNode;
    });
}

// Add Event Listeners to all Close buttons on containers
elements = document.getElementsByClassName('btn_close');
for (var i = 0; i < elements.length; i++)
{
    elements[i].addEventListener('mousedown', (event) => {
        console.log(event.target.parentNode.id);
        document.getElementById(event.target.parentNode.id).style.display = 'none';
    });
}







// Move dragElement to dragPos when function is called
function moveElementToPos(){
    dragElement.style.left = dragPos.x + 'px';
    dragElement.style.top = dragPos.y + 'px';
}

// Get offset of element to calculate where to put element when dragging
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}