function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.addEventListener("mousedown", dragMouseDown);
    element.addEventListener("touchstart", dragMouseDown);

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX || e.touches[0].clientX;
        pos4 = e.clientY || e.touches[0].clientY;
        document.addEventListener("mouseup", closeDragElement);
        document.addEventListener("touchend", closeDragElement);
        document.addEventListener("mousemove", elementDrag);
        document.addEventListener("touchmove", elementDrag);
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - (e.clientX || e.touches[0].clientX);
        pos2 = pos4 - (e.clientY || e.touches[0].clientY);
        pos3 = e.clientX || e.touches[0].clientX;
        pos4 = e.clientY || e.touches[0].clientY;

        const newTop = element.offsetTop - pos2;
        const newLeft = element.offsetLeft - pos1;

        // Constrain dragging within the container
        const container = document.getElementById('container');
        const containerRect = container.getBoundingClientRect();
        const elRect = element.getBoundingClientRect();

        if (newTop >= 0 && newLeft >= 0 &&
            newTop + elRect.height <= containerRect.height &&
            newLeft + elRect.width <= containerRect.width) {
            element.style.top = newTop + "px";
            element.style.left = newLeft + "px";
        }
    }

    function closeDragElement() {
        document.removeEventListener("mouseup", closeDragElement);
        document.removeEventListener("touchend", closeDragElement);
        document.removeEventListener("mousemove", elementDrag);
        document.removeEventListener("touchmove", elementDrag);
    }
}

function handleThumbnailDrag(e) {
    const thumbnail = e.target;
    const newImg = document.createElement('img');
    newImg.src = thumbnail.src;
    newImg.className = 'draggable';
    newImg.style.width = 'auto'; // Ensure dragged images have flexible width
    newImg.style.height = 'auto';
    document.getElementById('container').appendChild(newImg);
    makeDraggable(newImg);
}

document.querySelectorAll('.thumbnail').forEach(function(element) {
    element.addEventListener('mousedown', handleThumbnailDrag);
    element.addEventListener('touchstart', handleThumbnailDrag);
});

function goToHomePage() {
    window.location.href = "https://beaufun.brizy.site/";
}
