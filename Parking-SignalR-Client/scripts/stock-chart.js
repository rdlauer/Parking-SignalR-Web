(function (global, $) {
    var app = global.app = global.app || {};

    app.stockChart = {
        createStockChart: function () {
            app.stockChart.drawStockChart();
            app.stockChart.bindResizeEvent();
        },

        drawStockChart: function () {
            var $stockChart = $("#stock-chart");
            
            $stockChart.kendoStockChart({
                theme: global.app.chartsTheme,
                renderAs: "svg",
                dataSource: {
                    transport: {
                        read: {
                            url: "data/boeing-stock.json",
                            dataType: "json"
                        }
                    }
                },
                title: {
                    position: "top",
                    text: "The Boeing Company (NYSE:BA)"
                },
                chartArea: {
                    background: ""
                },
                dateField: "Date",
                series: [
                    {
                        type: "line",
                        field: "Open"
                    }
                ],
                navigator: {
                    series: {
                        type: "area",
                        field: "Open"
                    },
                    select: {
                        from: "2012/09/01",
                        to: "2012/10/09"
                    }
                }
            });            
        },

        bindResizeEvent: function () {
            //as the dataviz-s are complex elements they need redrow after window resize 
            //in order to position themselve on the right place and right size
            $(window).on("resize.stockChart", $.proxy(app.stockChart.drawStockChart, app.stockChart));
        },

        unbindResizeEvent: function () {
            //unbind the "resize event" to prevent redudntant calculations when the tab is not active
            $(window).off("resize.stockChart");
        }
    };
})(window, jQuery);