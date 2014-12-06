/*
 * Copyright (c) 2011 Kevin Decker (http://www.incaseofstairs.com/)
 * See LICENSE for license information
 */
/*global $, ColorStops, LineUtils */

// Global namespace
var GradientScanner = {};

$(document).ready(function() {
    var linePreview = $(".line-preview");

    GradientScanner.resetLinePreview = function() {
        // Provide a 1px transparent image for the preview images
        linePreview.attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
    };
    GradientScanner.resetLinePreview();

    var line, relLine, gradientType = "linear";

    $(document).bind("gradientUpdated", function(event) {
        line = GradientScanner.line;

        // Clip the coords to their containing boxes.
        var relContaining = LineUtils.containingRect(line.start, line.end);
        relLine = {
            start: LineUtils.relativeCoords(line.start, relContaining),
            end: LineUtils.relativeCoords(line.end, relContaining)
        };

        var css = ColorStops.generateCSS(gradientType, relLine.start, relLine.end, GradientScanner.colorStops);
        $(".generated-css").text("background-image: " + css.join(";\nbackground-image: "));
    });

    $(document).bind("imageLoaded", function(event) {
        $(".generated-css").text("");

        $(".flow-section").flowSection("disable", true);
    });

    $(".flow-section").flowSection();
});
