(function (global, $) {
    var app = global.app = global.app || {};

    app.pieChart = {
        createPieChart: function () {
            app.pieChart.drawPieChart();
            app.pieChart.bindResizeEvent();
        },

        drawPieChart: function () {
            var $pieChart = $("#pie-chart");

            pieChart = $pieChart.kendoChart({
                theme: global.app.chartsTheme,
                renderAs: "svg",
                title: {
                    position: "top",
                    text: "Internet Population Growth, 2007 - 2012"
                },
                legend: {
                    position: "bottom"
                },
                chartArea: {
                    background: ""
                },
                series: [
                    {
                        type: "pie",
                        startAngle: 150,
                        data: [
                            {
                                category: "Asia",
                                value: 53.8
                            }, {
                                category: "Europe",
                                value: 16.1
                            }, {
                                category: "Latin America",
                                value: 11.3
                            }, {
                                category: "Africa",
                                value: 9.6
                            }, {
                                category: "Middle East",
                                value: 5.2
                            }, {
                                category: "North America",
                                value: 3.6
                            }
                        ]
                    }
                ],
                tooltip: {
                    visible: true,
                    format: "{0}%"
                }
            }).data("kendoChart");           
        },

        bindResizeEvent: function () {
            //as the dataviz-s are complex elements they need redrow after window resize 
            //in order to position themselve on the right place and right size
            $(window).on("resize.pieChart", $.proxy(app.pieChart.drawPieChart, app.pieChart));
        },

        unbindResizeEvent: function () {
            //unbind the "resize event" to prevent redudntant calculations when the tab is not active
            $(window).off("resize.pieChart");
        }
    };
})(window, jQuery);