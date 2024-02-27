console.log("filted loaded");

function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

function mask(event) {
    var keyCode = event.which || event.keyCode; 
    var matrix = '+7 (___) ___-__-__',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, ''),
        new_value = matrix.replace(/[_\d]/g, function(a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
    i = new_value.indexOf('_');
    if (i !== -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
    }
    var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function(a) {
            return '\\d{1,' + a.length + '}';
        }).replace(/[+()]/g, '\\$&');
    reg = new RegExp('^' + reg + '$');
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
    if (event.type === 'blur' && this.value.length < 5)  this.value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    var input = document.querySelector("#tel");
    console.log("input:",input); // Should not be null

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
});
