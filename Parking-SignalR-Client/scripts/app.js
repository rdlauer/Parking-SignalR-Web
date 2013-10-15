$(function () {

    // initialize our kendo ui mobile application
    var kui = new kendo.mobile.Application(document.body, { skin: "flat" });

    // initialize our signalr connection
    $.connection.hub.url = "http://localhost/parking-signalr-web/signalr";
    var chat = $.connection.parkingHub;

    $.connection.hub.start()
        .done(function () { console.log('Now connected, connection ID=' + $.connection.hub.id); })
        .fail(function () { console.log('Could not Connect!'); });

    chat.client.broadcastMessage = function (result) {
        var arr = $.parseJSON(result);
        app.gauge.drawGauge(arr.length);
        $("#available-spots").text(arr.toString().replace(/,/g, ", "));
    };
    
});


(function (global, $) {
    var gauge,
        $gauge,
        app = global.app = global.app || {};

    app.gauge = {
        
        // initialize our kendo ui dataviz radial gauge
        createGauge: function () {
            $gauge = $("#gauge");
            app.gauge.drawGauge(0);
        },

        // re-draw the gauge based on the data we are passing to it
        drawGauge: function (count) {
            gauge = $gauge.kendoRadialGauge({
                theme: "silver",
                renderAs: "svg",
                pointer: {
                    value: count
                },
                scale: {
                    minorUnit: 1,
                    startAngle: -30,
                    endAngle: 210,
                    max: 10,
                    ranges: [
                        {
                            from: 6,
                            to: 10,
                            color: "#c0c0c2"
                        }, {
                            from: 4,
                            to: 6,
                            color: "#ffc700"
                        }, {
                            from: 2,
                            to: 4,
                            color: "#ff7a00"
                        }, {
                            from: 0,
                            to: 2,
                            color: "#c20000"
                        }
                    ]
                }
            }).data("kendoRadialGauge");
        }

    };
})(window, jQuery);