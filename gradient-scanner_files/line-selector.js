/*
 * Copyright (c) 2011 Kevin Decker (http://www.incaseofstairs.com/)
 * See LICENSE for license information
 */
/*global $,jQuery,LineUtils,ImageDataUtils,GradientScanner */
$(document).ready(function() {
    const SNAP_TO_PX = 10;

    var canvas = $("#imageDisplay"),
        context = canvas[0].getContext("2d"),

        linePreview = $(".line-preview");

    var dragging, dragStart, dragEnd, imageData;

    function resetLineOverlay() {
        $("#lineOverlay").css({
            width: "",
            top: "",
            left: ""
        });
    }

    canvas.parent().mousedown(function(event) {
        // Only activate this if the event is due to a left click
        if (event.which !== 1) {
            return;
        }

        dragging = true;
        var canvasOffset = canvas.offset();
        dragStart = {x: event.pageX-canvasOffset.left, y: event.pageY-canvasOffset.top};

        var edgeSnaps = ImageDataUtils.getInitialSnapToTarget(GradientScanner.edgeContext, dragStart);
        dragStart = edgeSnaps || dragStart;
        // Init the line overlay
        $("#lineOverlay").css("width", "0px")
                .css("left", dragStart.x+"px")
                .css("top", dragStart.y+"px");

        // Reset any existing data
        dragEnd = undefined;
        imageData = undefined;

        GradientScanner.line = {};
        GradientScanner.resetLinePreview();
        $(".flow-section").flowSection("disable", true);

        event.preventDefault();
    }).mousemove(function(event) {
        if (dragging) {
            var canvasOffset = canvas.offset();
            dragEnd = {x: event.pageX-canvasOffset.left, y: event.pageY-canvasOffset.top};

            // Check for snapto
            if (Math.abs(dragEnd.y-dragStart.y) < SNAP_TO_PX) {
                dragEnd.y = dragStart.y;
            } else if (Math.abs(dragEnd.x-dragStart.x) < SNAP_TO_PX) {
                dragEnd.x = dragStart.x;
            }

            // Check for edge snapto
            var edgeSnap = ImageDataUtils.getSnapToTarget(GradientScanner.edgeContext, dragStart, dragEnd);
            dragEnd = edgeSnap || dragEnd;

            // Collect the line data while the user is dragging
            imageData = ImageDataUtils.getLinePixels(context, dragStart, dragEnd);
            if (!imageData) {
                GradientScanner.resetLinePreview();
                return;
            }

            // Display the line preview
            var stretcher = ImageDataUtils.createCanvasFromImageData(imageData);
            linePreview.attr("src", stretcher.toDataURL());

            // Move the line indicator
            var distance = LineUtils.distance(dragStart, dragEnd),
                rotate = "rotate(" + LineUtils.slopeInRads(dragStart, dragEnd) + "rad)";
            $("#lineOverlay").css("width", distance)
                    .css("-moz-transform", rotate)
                    .css("-o-transform", rotate)
                    .css("-webkit-transform", rotate);
        }
    }).mouseup(function(event) {
        dragging = false;

        // If they didn't move the mouse then there isn't much we can do
        if (!dragEnd || !LineUtils.distance(dragStart, dragEnd)) {
            resetLineOverlay();
            return;
        }

        GradientScanner.line = {
            start: dragStart,
            end: dragEnd,
            imageData: imageData
        };

        $(document).trigger(new jQuery.Event("lineUpdated"));
        $(".flow-section").flowSection("enableNext");
    });

    $(document).bind("imageLoaded", function(event) {
        GradientScanner.line = {};
        GradientScanner.resetLinePreview();

        resetLineOverlay();
    });
});
