$(function () {

    // generate the html inside of our template
    var template = kendo.template($("#template").html());
    $(".content").html(template);

    // add an event handler to the change event of our checkboxes
    $(":checkbox").change(function () {

        // create an array of available parking spots
        var availableSpots = [];

        $('input:checked').each(function () {
            availableSpots.push(parseInt(this.value));
        });

        // connect to our signalr hub and broadcast the parking data
        var parking = $.connection.parkingHub;

        $.connection.hub.start().done(function () {
            parking.server.updateParkingAvailability(JSON.stringify(availableSpots));
        });

    });
});