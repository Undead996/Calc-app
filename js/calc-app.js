"use strict";
window.addEventListener("load", goCalc);
function goCalc() {
    var calc = new Calc;
    calc.setInp();
    calc.setOut();
    calc.setButtons();
}
var Calc = /** @class */ (function () {
    function Calc() {
        this.keyEvents = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "/", "*", "=", "."];
        this.regExp = new RegExp(/^\d+(?:,\d{3})*(?:\.\d{1,6})?|^\-\d+(?:,\d{3})*(?:\.\d{1,6})?|\d+(?:,\d{3})*(?:\.\d{1,6})?|\-|\+|\*|\/|\=/g);
        this.select = this.select.bind(this);
        this.mainCalc = this.mainCalc.bind(this);
        this.handKeys = this.handKeys.bind(this);
        this.clear = this.clear.bind(this);
        this.inpCheck = this.inpCheck.bind(this);
    }
    Calc.prototype.setInp = function () {
        var inp = document.querySelector("#inp");
        inp.addEventListener("keypress", this.handKeys);
        this.inp = inp;
    };
    Calc.prototype.setOut = function () {
        var out = document.querySelector("#out");
        this.out = out;
    };
    Calc.prototype.setButtons = function () {
        var btns = document.querySelectorAll(".input-area button");
        for (var i = 0; i < btns.length; i++) {
            if (btns[i].innerText === "C") {
                btns[i].addEventListener("click", this.clear);
            }
            if (btns[i].innerText != "C" && btns[i].textContent != "←") {
                btns[i].addEventListener("click", this.select);
            }
        }
        this.btns = btns;
    };
    Calc.prototype.inpCheck = function (val) {
        for (var i = 10; i < this.keyEvents.length; i++) {
            if (val === this.inp.value[this.inp.value.length - 1] && val === this.keyEvents[i]) {
                return true;
            }
            for (var j = 10; j < this.keyEvents.length; j++) {
                if (this.inp.value[this.inp.value.length - 1] === this.keyEvents[j] && val === this.keyEvents[i]) {
                    return true;
                }
            }
        }
    };
    Calc.prototype.select = function (e) {
        if (this.inpCheck(e.target.textContent)) {
            return;
        }
        ;
        this.inp.value = this.inp.value + e.target.textContent;
        this.mainCalc();
    };
    Calc.prototype.handKeys = function (e) {
        e.preventDefault();
        if (this.inpCheck(e.key)) {
            return;
        }
        ;
        if (this.keyEvents.includes(e.key)) {
            this.inp.value += e.key;
        }
        if (e.keyCode === 13) {
            this.inp.value += "=";
        }
        this.mainCalc();
    };
    Calc.prototype.mainCalc = function () {
        this.tmp = this.inp.value.match(this.regExp);
        var a;
        var b;
        var c;
        if (this.tmp.length > 3) {
            a = +this.tmp[0];
            b = +this.tmp[2];
            c = this.tmp[3];
            if (this.tmp[1] === "+") {
                this.tmp = ["" + (a + b), "" + c];
            }
            if (this.tmp[1] === "-") {
                this.tmp = ["" + (a - b), "" + c];
            }
            if (this.tmp[1] === "*") {
                this.tmp = ["" + a * b, "" + c];
            }
            if (this.tmp[1] === "/") {
                this.tmp = ["" + a / b, "" + c];
            }
            if (c === "=") {
                this.tmp.pop();
            }
            var arr = this.tmp[0].match(this.regExp);
            this.tmp[0] = arr[0];
            console.log(this.tmp);
            this.useOut();
            if (this.tmp[1]) {
                this.inp.value = this.tmp[0] + this.tmp[1];
            }
            else {
                this.inp.value = this.tmp[0];
            }
        }
    };
    Calc.prototype.useOut = function () {
        this.out.innerHTML += "<p>" + this.tmp[0] + "</p>";
        if (this.out.childNodes.length > 3) {
            this.out.firstChild.remove();
        }
    };
    Calc.prototype.clear = function () {
        this.inp.value = "";
        this.tmp = [];
        this.out.innerHTML = "";
    };
    return Calc;
}());
