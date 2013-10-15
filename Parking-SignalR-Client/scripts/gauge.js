(function (global, $) {
    var gauge,
        $gauge,
        $gaugeSlider,
        value = 50,
        app = global.app = global.app || {};

    app.gauge = {
        createGauge: function () {
            $gauge = $("#gauge");
            $gaugeSlider = $("#gauge-value");

            app.gauge.drawGauge();
            app.gauge.bindResizeEvent();

            $gaugeSlider.attr({
                max: 180,
                min: 0,
                value: value
            });

            $gaugeSlider.on("change", function () {
                value = $gaugeSlider.val();
                gauge.value(value);
 
            });
        },

        drawGauge: function () {
            gauge = $gauge.kendoRadialGauge({
                theme: global.app.chartsTheme,
                renderAs: "svg",
                pointer: {
                    value: value
                },
                scale: {
                    minorUnit: 5,
                    startAngle: -30,
                    endAngle: 210,
                    max: 180,
                    ranges: [
                        {
                            from: 0,
                            to: 80,
                            color: "#c0c0c2"
                        }, {
                            from: 80,
                            to: 120,
                            color: "#ffc700"
                        }, {
                            from: 120,
                            to: 150,
                            color: "#ff7a00"
                        }, {
                            from: 150,
                            to: 180,
                            color: "#c20000"
                        }
                    ]
                }
            }).data("kendoRadialGauge");            
        },

        bindResizeEvent: function () {
            //as the dataviz-s are complex elements they need redrow after window resize 
            //in order to position themselve on the right place and right size
            $(window).on("resize.gauge", $.proxy(app.gauge.drawGauge, app.gauge));
        },

        unbindResizeEvent: function () {
            //unbind the "resize event" to prevent redudntant calculations when the tab is not active
            $(window).off("resize.gauge");
        }
    };
})(window, jQuery);