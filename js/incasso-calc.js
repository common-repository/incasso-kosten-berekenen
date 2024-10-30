/**
 * This control needs the jQuery library
 */
function CollectionkostenCalculator() {
}
CollectionkostenCalculator.prototype = {
    SLEEP_TIME: 500,
    POPUP_TIME: 400,
    INPUT_FIELD: jQuery('#IKB_incasso_calculator #amount'),
    OUTPUT_FIELD: jQuery('#IKB_incasso_calculator #kosten'),
    ICON_INFO: jQuery('#IKB_incasso_calculator .IKB_incasso_info_icon'),
    ICON_CLOSE: jQuery('#IKB_incasso_calculator .IKB_incasso_close_icon'),
    POPUP_DIV: jQuery('#IKB_incasso_calculator .popup'),
    _timeoutId: null,
    init: function () {
        this._inputEventListener();
        this._iconEventListener();
    },
    _inputEventListener: function () {
        this.INPUT_FIELD.keyup(jQuery.proxy(function (event) {
            this.OUTPUT_FIELD.val("Berekenen...");
            this.OUTPUT_FIELD.addClass("calculating");
            if (this._timeoutId != null) {
                clearTimeout(this._timeoutId);
                this._timeoutId = null;
            }
            this._timeoutId = setTimeout(jQuery.proxy(function () {
                this._inputChangeHandler();
            }, this), this.SLEEP_TIME);
        }, this));
    },
    _inputChangeHandler: function () {
        this.OUTPUT_FIELD.val(this._calculatekosten());
    },
    _calculatekosten: function () {
        var amount = this._toFloat(this.INPUT_FIELD.val());
        var result = null;
        if (isNaN(amount)) {
            result = "Vul bedrag in.";
        } else {
// boven 200000, kosten 0.5%
            if (amount > 200000) {
                result += ((amount - 200000) / 200);
                amount = 200000;
            }
// boven 10000, kosten 1%
            if (amount > 10000) {
                result += ((amount - 10000) / 100);
                amount = 10000
            }
// boven 5000, kosten 5%
            if (amount > 5000) {
                result += ((amount - 5000) / 20);
                amount = 5000;
            }
// boven 2500, kosten 1%
            if (amount > 2500) {
                result += ((amount - 2500) / 10);
                amount = 2500;
            }
// onder 2500, kosten 15%
            if (amount <= 2500) {
                result += ((amount / 100) * 15);
            }
// minimaal maximaal check
            result = (result < 40) ? 40 : result;
            result = (result > 6775) ? 6775 : result;
        }
        this.OUTPUT_FIELD.removeClass("calculating");
        return this._toCurrency(result);
    },
    _toFloat: function (input) {
        return parseFloat(input.replace(/,/g, '.'));
    },
    _toCurrency: function (input) {
        if (!isNaN(input)) {
// var rounded = Math.round(input * 100) / 100;
            var rst = (input * 100) / 100
            var rounded = rst.toFixed(2);
            return (rounded + '').replace('.', ',');
        } else {
            return input;
        }
    },
    _iconEventListener: function () {
        this.ICON_INFO.mouseover(
                jQuery.proxy(function () {
                    this._infoIconHoverInHandler();
                }, this));
        this.ICON_CLOSE.click(
                jQuery.proxy(function () {
                    this._closeIconClickHandler();
                }, this));
    },
    _infoIconHoverInHandler: function () {
        this.POPUP_DIV.fadeIn(this.POPUP_TIME);
    },
    _closeIconClickHandler: function () {
        this.POPUP_DIV.fadeOut(this.POPUP_TIME);
    }
};
var IKB_incasso_calculator = new CollectionkostenCalculator();
IKB_incasso_calculator.init(); 