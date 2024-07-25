window.mainTimeline = 0;
window.timelineIconWidth = 0;

function drawCanvas(element, name = 'timeline-canvas') {
    const dimensions = element.getBoundingClientRect();
    const existingCanvas = element.querySelector('canvas');
    if(existingCanvas) {
        //reset the canvas
        existingCanvas.width = dimensions.width;
        existingCanvas.height = dimensions.height;
        //redraw
        const ctx = existingCanvas.getContext('2d');
        ctx.reset();
        return [ctx, existingCanvas];
    } else {
        const canvas = document.createElement('canvas');
        canvas.id = name;
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        console.log('canvas width: ', canvas.width, ' canvas height: ', canvas.height);
        const ctx = canvas.getContext('2d');
        element.appendChild(canvas);
        return [ctx, canvas];
    }
}

function drawTimeline(ctx, canvas, container, elements) {
    //draw an black line on the canvas between each icon
    if(canvas.getContext) {
        //clear the canvas
        ctx.reset();
        const canvasHeight = canvas.height;
        //set the line color
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        //draw the lines
        for(let i = 0; i < elements.length; i++) {
            const item = elements[i];
            const nextItem = elements[i + 1];
            /*
                get the coordinates of the Item relative to the container element. boundingClientRect returns the position of the element relative to the viewport. 
                We need to subtract the position of the container element to get the position of the Item relative to the container element.
            */
            const itemX = item.getBoundingClientRect().left - container.getBoundingClientRect().left;
            const itemY = item.getBoundingClientRect().top - container.getBoundingClientRect().top;
            const itemWidth = item.offsetWidth;
            const itemHeight = item.offsetHeight;

            window.mainTimeline = itemX;
            window.timelineIconWidth = itemWidth;
            
            ctx.beginPath();
            //move to just below the Item
            ctx.moveTo(itemX + (itemWidth / 2), itemY + itemHeight + 16);
            //draw a line to the next Item if it exists, otherwise draw a line to the bottom of the canvas
            if(nextItem) {
                const nextItemX = nextItem.getBoundingClientRect().left - container.getBoundingClientRect().left;
                const nextItemY = nextItem.getBoundingClientRect().top - container.getBoundingClientRect().top;
                ctx.lineTo(nextItemX + (itemWidth / 2), nextItemY - 16);    
            } else {
                //last item. draw a line to the bottom of the canvas
                ctx.lineTo(itemX + (itemWidth / 2), canvasHeight);
            }
            ctx.stroke();
        }
    } else {
        console.log('Canvas not supported');
    }
}

function drawBranchTimeline(ctx, canvas, container, elements) {
    //first draw a straight orange line on the canvas from window.mainTimeline, top to bottom
    if(canvas.getContext) {

        //clear the canvas
        ctx.reset();
        const canvasHeight = canvas.height;
        //set the line color
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 2;

        //draw the main line
        const mainTimeline = {x: window.mainTimeline + (window.timelineIconWidth / 2), y: 0};
        const mainTimelineEnd = {x: window.mainTimeline + (window.timelineIconWidth / 2), y: canvasHeight};

        ctx.beginPath();
        ctx.moveTo(mainTimeline.x, mainTimeline.y);
        ctx.lineTo(mainTimelineEnd.x, mainTimelineEnd.y);
        ctx.stroke();

        //now draw a new line from mainTimeline, straight down 16px, then to 16px above the first icon (x) and middle of the first icon (y)
        const firstItem = elements[0];
        const firstItemX = firstItem.getBoundingClientRect().left - container.getBoundingClientRect().left;
        const firstItemY = firstItem.getBoundingClientRect().top - container.getBoundingClientRect().top;
        const firstItemWidth = firstItem.offsetWidth;

        ctx.beginPath();
        ctx.moveTo(mainTimeline.x, firstItemY - 64);
        ctx.lineTo(firstItemX + (firstItemWidth / 2), firstItemY - 32);
        ctx.lineTo(firstItemX + (firstItemWidth / 2), firstItemY - 16);
        ctx.stroke();

        //next draw lines between icons in the branch
        for(let i = 0; i < elements.length; i++) {
            const item = elements[i];
            const nextItem = elements[i + 1];
            /*
                get the coordinates of the Item relative to the container element. boundingClientRect returns the position of the element relative to the viewport. 
                We need to subtract the position of the container element to get the position of the Item relative to the container element.
            */
            const itemX = item.getBoundingClientRect().left - container.getBoundingClientRect().left;
            const itemY = item.getBoundingClientRect().top - container.getBoundingClientRect().top;
            const itemWidth = item.offsetWidth;
            const itemHeight = item.offsetHeight;

            ctx.beginPath();
            //move to just below the Item
            ctx.moveTo(itemX + (itemWidth / 2), itemY + itemHeight + 16);
            //draw a line to the next Item if it exists, otherwise draw a line to the bottom of the canvas
            if(nextItem) {
                const nextItemX = nextItem.getBoundingClientRect().left - container.getBoundingClientRect().left;
                const nextItemY = nextItem.getBoundingClientRect().top - container.getBoundingClientRect().top;
                ctx.lineTo(nextItemX + (itemWidth / 2), nextItemY - 16);    
            }
            ctx.stroke();
        }

        //finally draw a line from the last icon, straight down 16px, then to mainTimeline (x) and 16px above the bottom of the canvas (y)
        const lastItem = elements[elements.length - 1];
        const lastItemX = lastItem.getBoundingClientRect().left - container.getBoundingClientRect().left;
        const lastItemY = lastItem.getBoundingClientRect().top - container.getBoundingClientRect().top;
        const lastItemWidth = lastItem.offsetWidth;
        const lastItemHeight = lastItem.offsetHeight;

        ctx.beginPath();
        ctx.moveTo(lastItemX + (lastItemWidth / 2), lastItemY + lastItemHeight + 16);
        ctx.lineTo(lastItemX + (lastItemWidth / 2), lastItemY  + lastItemHeight + 32);
        ctx.lineTo(mainTimeline.x,lastItemY  + lastItemHeight + 64) ;
        ctx.stroke();
        

    }
}



//dom content loaded
window.addEventListener('load', function() {
    const expContainer = document.getElementById('resume-experience');
    if(expContainer) {
        const expItems = expContainer.querySelectorAll('.icon-commit');
        const [expCtx, expCanvas] = drawCanvas(expContainer, 'experience-timeline-canvas');
        drawTimeline(expCtx, expCanvas, expContainer, expItems);
    }
    const educContainer = document.getElementById('resume-education');
    if(educContainer) {
        const educItems = educContainer.querySelectorAll('.icon-commit');
        const [educCtx, educCanvas] = drawCanvas(educContainer, 'education-timeline-canvas');
        drawBranchTimeline(educCtx, educCanvas, educContainer, educItems);
    }

});

window.addEventListener('resize', function() {
    const expContainer = document.getElementById('resume-experience');
    if(expContainer) {
        const expItems = expContainer.querySelectorAll('.icon-commit');
        const [expCtx, expCanvas] = drawCanvas(expContainer, 'experience-timeline-canvas');
        drawTimeline(expCtx, expCanvas, expContainer, expItems);
    }
    const educContainer = document.getElementById('resume-education');
    if(educContainer) {
        const educItems = educContainer.querySelectorAll('.icon-commit');
        const [educCtx, educCanvas] = drawCanvas(educContainer, 'education-timeline-canvas');
        drawBranchTimeline(educCtx, educCanvas, educContainer, educItems);
    }
});
