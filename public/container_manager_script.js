var mainContainer = null;

var mouseDown = false;
var dragPos = null;
var dragElement = null;

//function init() {
mainContainer = document.getElementsByClassName('main-container')[0];

document.addEventListener('mouseup', (event) => {
    mouseDown = false;
    dragPos = null;
    dragElement = null;
});

document.addEventListener('mousedown', (event) => {
    if (mouseDown && dragElement != null) {
    }
});
document.addEventListener('mousemove', (event) => {
    //console.log('PosX: ' + event.clientX + ' PosY: ' + event.clientY);
    if (mouseDown && dragPos != null && dragElement != null) {
        var posX = event.clientX - getOffset(mainContainer).left;
        var posY = event.clientY- getOffset(mainContainer).top;
        dragPos = { y: posY, x: posX };
        
        moveElementToPos();
    }

});


var elements = document.getElementsByClassName('btn_drag');
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

//}


function moveElementToPos(){
    dragElement.style.left = dragPos.x + 'px';
    dragElement.style.top = dragPos.y + 'px';
}

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