(function (global) {
    var app = global.app = global.app || {};

    app.qrcode = {
        createQRCode: function () {
            var qrcode,
                $qrcode = $("#qrcode"),
                $generateCodeBttn = $("#qrcode-generate"),
                $codeValue = $("#qrcode-value");
           
            qrcode = $qrcode.kendoQRCode({
                renderAs: "svg",
                value: "http://www.icenium.com/",
                errorCorrection: "M",
                size: 220,
                border: {
                    color: "#000000",
                    width: 5
                }
            }).data("kendoQRCode");
            
            $generateCodeBttn.on("click", function () {
                var value = $codeValue.val();

                qrcode.value(value);
            });
        }
    };
})(window);