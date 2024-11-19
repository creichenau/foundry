async function popupText(chance) {

    let r = new Roll("1d6");
    let roll = await r.evaluate();
    let textResult = "ERROR"
    let formula = "+0"
    let tot = roll.total;
    if (chance == "neg3") {
        formula = "-3"
        tot = tot - 3;
    }
    if (chance == "neg2") {
        formula = "-2"
        tot = tot - 2;
    }
    if (chance == "neg1") {
        formula = "-1"
        tot = tot - 1;
    }
    if (chance == "plus1") {
        formula = "+1"
        tot = tot + 1;
    }
    if (chance == "plus2") {
        formula = "+2"
        tot = tot + 2;
    }
    if (chance == "plus3") {
        formula = "+3"
        tot = tot + 3;
    }
    if (roll.total == 1) {
        formula = "AUTO";
        textResult = "<b style='color: red'>FAILED</b>";
    } else {
        if (roll.total == 6) {
            formula = "AUTO";
            textResult = "<b style='color: green'>PASSED</b>";
        } else {
            if (tot > 3) {
                textResult = "<b style='color: green'>PASSED</b>";
            } else {
                textResult = "<b style='color: red'>FAILED</b>";
            }
        }
    }

    roll.toMessage({
        rollMode: 'roll',
        flavor: 'Ability check rolled (' + formula + ') : ' + textResult + "."
    }, {});
    return;
}

let dialogContent = `Select Ability Modifier:`;
let d = new Dialog({
    title: "Roll Ability Check",
    content: dialogContent,
    buttons: {
        neg3: {
            label: "-3",
            callback: (contents) => {
                popupText("neg3")
            }
        },
        neg2: {
            label: "-2",
            callback: (contents) => {
                popupText("neg2")
            }
        },
        neg1: {
            label: "-1",
            callback: (contents) => {
                popupText("neg1")
            }
        },
        zero: {
            label: "0",
            callback: (contents) => {
                popupText("zero")
            }
        },
        plus1: {
            label: "+1",
            callback: (contents) => {
                popupText("plus1")
            }
        },
        plus2: {
            label: "+2",
            callback: (contents) => {
                popupText("plus2")
            }
        },
        plus3: {
            label: "+3",
            callback: (contents) => {
                popupText("plus3")
            }
        }
    },
    default: "zero"
})
d.render(true);