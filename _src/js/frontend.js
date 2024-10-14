document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('body').setAttribute('id', 'ariom');
});

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

function redraw_timeline() {
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
}

//dom content loaded
window.addEventListener('load', function() {
    redraw_timeline();
});

window.addEventListener('resize', function() {
    redraw_timeline();
});

let category_nav = document.querySelector('.categories-nav');
if(category_nav) {
    category_nav.addEventListener('wheel', (event) => {
        event.preventDefault();

        category_nav.scrollBy({
            left: event.deltaY < 0 ? -30 : 30,
        });
    });
}

//redraw when the details element is toggled
const details_tags = document.querySelectorAll('details');
details_tags.forEach(function(details) {
    details.addEventListener('toggle', function() {
        redraw_timeline();
    });
});

//dom content loaded
window.addEventListener('load', function() {
    /*  find all input/textarea/select tags. if there is an 'aria-required' attribute, add a HTML5 'required' attribute as well */
    const formElements = document.querySelectorAll('input, textarea, select');
    formElements.forEach(function(el) {
        if(el.hasAttribute('aria-required')) {
            el.setAttribute('required', 'required');
            //add a span element after to display a tick or cross
            const span = document.createElement('span');
            span.classList.add('icon');
            el.parentNode.insertBefore(span, el.nextSibling);
        }
    });
});

let blog = document.querySelector('body.blog');
if(blog) {
    //if url has '?cst' or nothing at all, we are on page 1. add a blog-1 class to the body
    if(window.location.search === '' || window.location.search === '?cst') {
        blog.classList.add('blog-1');
    }
    //if url contains the partial '?query-0-page=n', we are on page n. add a blog-n class to the body
    if(window.location.search.includes('query-0-page')) {
        let page = window.location.search.split('=')[1];
        if(page.includes('&')) {
            page = page.split('&')[0];
        }
        blog.classList.add('blog-' + page);
    }
}

//trying to use jQuery sparingly 
jQuery(document).ready(function ($) {
    $('.post-date-created').each(function() {
        $(this).prepend('<span class="inline-block text-lg font-light italic">Posted&nbsp;</span>');
    });
    $('.post-date-updated').each(function() {
        $(this).prepend('<span class="inline-block text-lg font-light italic">Updated&nbsp;</span>');
    });

    //change the text of the pagination arrows
    $('span.wp-block-query-pagination-previous-arrow').each(function() {
        $(this).text('◁');
    });

    $('span.wp-block-query-pagination-next-arrow').each(function() {
        $(this).text('▷');
    });

    $('.post-meta-details').each(function() {
        $categories = $(this).find('.taxonomy-category.wp-block-post-terms');
        $tags = $(this).find('.taxonomy-post_tag.wp-block-post-terms');

        $categories.prepend('<span class="inline-block text-lg font-light">In:&nbsp;</span>');
        //prepend all a tags inside $tags with a # symbol
        $tags.find('a').each(function() {
            $(this).prepend('#');
        });
    });

    $('.wp-block-footnotes').each(function() {
        //wrap the footnotes in a div
        $(this).wrap('<div class="footnotes-container"></div>');
        //add a heading
        $(this).parent().prepend('<h6 class="text-lg font-semibold leading-normal mb-2">Footnotes</h2>');
        $(this).addClass('!pl-2');
    });
        

    $('.wp-block-footnotes a').each(function() {
        //replace text content with ⇑
        $(this).text('⇑');
    });

});

//utility function to check make #links scroll smoothly
jQuery(document).ready(function ($) {
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1500, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
});

let tables = document.querySelectorAll('figure.wp-block-table');
if(tables) {
    tables.forEach(function(table) {
        //git initial table height
        const tableHeight = table.offsetHeight;
        //wrap the table in a div
        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table-scroll-wrapper');
        table.parentNode.insertBefore(tableContainer, table);
        tableContainer.appendChild(table);
    });
}