/*
 * Copyright (c) 2011 Kevin Decker (http://www.incaseofstairs.com/)
 * See LICENSE for license information
 */
/*global $, jQuery, ColorStops, GradientScanner */

$(document).ready(function() {
    $.template(
        "colorStopTemplate",
        "<div class=\"color-stop ${disabled}\">"
            + "<div class=\"color-preview\" style=\"background-color: ${colorCss}\"/>"
            + "${colorCss} ${position}%"
        + "</div>");

    var colorStopsEl = $("#colorStops");

    var colorStops, editStop, deltaE = ColorStops.JND;

    function renderStop(stop, index) {
        var stopEl = $.tmpl("colorStopTemplate", {
            position: Math.floor(stop.position*1000)/10,
            colorCss: ColorStops.getColorValue(stop.color),
            disabled: stop.disabled ? "disabled" : ""
        });
        stopEl.data("stopIndex", index);

        return stopEl;
    }
    function outputGradient() {
        $(document).trigger(new jQuery.Event("gradientUpdated"));
    }
    function updateGradient() {
        colorStops = GradientScanner.colorStops;

        colorStopsEl.html("");
        $(".stop-editor").removeClass("active");

        colorStops.forEach(function(stop, index) {
            colorStopsEl.append(renderStop(stop, index));
        });

        outputGradient();
    }

    $(".stop-position-slider").slider({
        step: 0.001,
        min: 0,
        max: 1,
        slide: function(event, ui) {
            var growing = editStop.position < ui.value,

                editingEl = $(".color-stop.editing"),
                curIndex = editingEl.data("stopIndex"),

                toUpdate = colorStopsEl.children().filter(function() {
                    var el = $(this),
                        index = el.data("stopIndex"),
                        stop = colorStops[index];
                    if (growing) {
                        return index > curIndex && stop.position < ui.value;
                    } else {
                        return index < curIndex && stop.position > ui.value;
                    }
                });

            // Update the stop index for all of the elements that are between this location and
            // the destination
            toUpdate.each(function() {
                var el = $(this);
                el.data("stopIndex", el.data("stopIndex") + (growing?-1:1));
            });

            // Update the data model
            curIndex += (growing?1:-1)*toUpdate.length;
            editStop.position = ui.value;
            colorStops.sort(function(a, b) { return a.position-b.position; });

            // Rerender the element for the updated state
            var stopEl = renderStop(editStop, curIndex);
            stopEl.addClass("editing");
            if (!toUpdate.length) {
                editingEl.after(stopEl);
            } else if (growing) {
                toUpdate.last().after(stopEl);
            } else {
                toUpdate.first().before(stopEl);
            }
            editingEl.remove();

            // Make sure that the element is visible
            // TODO : Cache this height value
            colorStopsEl.scrollTop(stopEl.height()*(curIndex-1));

            // Update the rest of the app
            outputGradient();
        }
    });

    $("#disableCheck").click(function() {
        var el = $(this);
        editStop.disabled = this.checked;
        $(".color-stop.editing").toggleClass("disabled", editStop.disabled);

        // Update the rest of the app
        outputGradient();
    });

    $(".color-sel").ColorPicker({
        flat: true,
        onChange: function(hsb, hex, rgb) {
            editStop.color[0] = rgb.r;
            editStop.color[1] = rgb.g;
            editStop.color[2] = rgb.b;

            var editingEl = $(".color-stop.editing");

            // Rerender the element for the updated state
            var stopEl = renderStop(editStop, editingEl.data("stopIndex"));
            stopEl.addClass("editing");
            editingEl.replaceWith(stopEl);

            // Update the rest of the app
            outputGradient();
        }
    });

    colorStopsEl.delegate(".color-stop", "click", function(event) {
        var el = $(this);

        editStop = colorStops[el.data("stopIndex")];

        if (!el.hasClass("editing")) {
            $(".stop-position-slider").slider("option", "value", editStop.position);
            $("#disableCheck").attr("checked", editStop.disabled ? "checked" : "");
            $(".color-sel").ColorPickerSetColor({r:editStop.color[0], g:editStop.color[1], b:editStop.color[2]});

            $(".color-stop.editing").removeClass("editing");
            $(".stop-editor").addClass("active");
        } else {
            $(".stop-editor").removeClass("active");
        }
        el.toggleClass("editing");

        outputGradient();
    });

    $(document).bind("deltaEUpdated", updateGradient);
});
