async function popupText(chance) {

 let r = new Roll("1d6");   
let roll = await r.evaluate();
    let textResult = "ERROR"

    if (chance == "one") {
        if (roll.total == 6) {
            textResult = "<b style='color: green'>PASSED</b>";
        } else {
            textResult = "<b style='color: red'>FAILED</b>";
        }
    }
    if (chance == "two") {
        if (roll.total > 4) {
            textResult = "<b style='color: green'>PASSED</b>";
        } else {
            textResult = "<b style='color: red'>FAILED</b>";
        }
    }
    if (chance == "three") {
        if (roll.total > 3) {
            textResult = "<b style='color: green'>PASSED</b>";
        } else {
            textResult = "<b style='color: red'>FAILED</b>";
        }
    }
    if (chance == "four") {
        if (roll.total > 2) {
            textResult = "<b style='color: green'>PASSED</b>";
        } else {
            textResult = "<b style='color: red'>FAILED</b>";
        }
    }
    if (chance == "five") {
        if (roll.total > 1) {
            textResult = "<b style='color: green'>PASSED</b>";
        } else {
            textResult = "<b style='color: red'>FAILED</b>";
        }
    }

    roll.toMessage({
        rollMode: 'roll',
        flavor: 'X in 6 rolled (' + chance + ' in six): ' + textResult + "."
    }, {rollMode: 'gmroll'});
    return;
}

let dialogContent = ``;
let d = new Dialog({
    title: "Roll X in 6",
    content: dialogContent,
    buttons: {
        oneInSix: {
            label: "1 in 6",
            callback: (contents) => {
                popupText("one")
            }
        },
        twoInSix: {
            label: "2 in 6",
            callback: (contents) => {
                popupText("two")
            }
        },
        threeInSix: {
            label: "3 in 6",
            callback: (contents) => {
                popupText("three")
            }
        },
        fourInSix: {
            label: "4 in 6",
            callback: (contents) => {
                popupText("four")
            }
        },
        fiveInSix: {
            label: "5 in 6",
            callback: (contents) => {
                popupText("five")
            }
        }
    },
    default: "one"
})
d.render(true)