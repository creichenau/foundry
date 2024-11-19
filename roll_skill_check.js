async function popupText(chance) {

    let r = new Roll("1d6");
    let roll = await r.evaluate();
    let textResult = "ERROR"

    if (roll.total == 1) {
        textResult = "<b style='color: red'>FAILED</b>";
    } else {
        if (roll.total == 6) {
            textResult = "<b style='color: green'>PASSED</b>";
        } else {
            if (chance == "two") {
                if (roll.total > 1) {
                    textResult = "<b style='color: green'>PASSED</b>";
                } else {
                    textResult = "<b style='color: red'>FAILED</b>";
                }
            }
            if (chance == "three") {
                if (roll.total > 2) {
                    textResult = "<b style='color: green'>PASSED</b>";
                } else {
                    textResult = "<b style='color: red'>FAILED</b>";
                }
            }
            if (chance == "four") {
                if (roll.total > 3) {
                    textResult = "<b style='color: green'>PASSED</b>";
                } else {
                    textResult = "<b style='color: red'>FAILED</b>";
                }
            }
            if (chance == "five") {
                if (roll.total > 4) {
                    textResult = "<b style='color: green'>PASSED</b>";
                } else {
                    textResult = "<b style='color: red'>FAILED</b>";
                }
            }
            if (chance == "six") {
                if (roll.total > 5) {
                    textResult = "<b style='color: green'>PASSED</b>";
                } else {
                    textResult = "<b style='color: red'>FAILED</b>";
                }
            }
        }
    }   

    roll.toMessage({
        rollMode: 'roll',
        flavor: 'Skill Check rolled: ' + textResult + "."
    }, { rollMode: 'gmroll' });
    return;
}

let dialogContent = `Select skill target:`;
let d = new Dialog({
    title: "Roll Skill Check",
    content: dialogContent,
    buttons: {
        two: {
            label: "2",
            callback: (contents) => {
                popupText("two")
            }
        },
        three: {
            label: "3",
            callback: (contents) => {
                popupText("three")
            }
        },
        four: {
            label: "4",
            callback: (contents) => {
                popupText("four")
            }
        },
        five: {
            label: "5",
            callback: (contents) => {
                popupText("five")
            }
        },
        six: {
            label: "6",
            callback: (contents) => {
                popupText("six")
            }
        }
    },
    default: "six"
})
d.render(true)