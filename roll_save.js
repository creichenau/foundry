async function popupText(target) {

    let r = new Roll("1d20");
    let roll = await r.evaluate();
    let textResult = "ERROR"


    if (roll.total >= target) {
        textResult = "<b style='color: green'>PASSED</b>";
    } else {
        textResult = "<b style='color: red'>FAILED</b>";
    }

    roll.toMessage({
        rollMode: 'roll',
        flavor: 'Save rolled (TN ' + target + '): ' + textResult + "."
    });
    return;
}

let dialogContent = ``;
let d = new Dialog({
    title: "Roll Save",
    content: dialogContent,
    buttons: {
        oneInSix: {
            label: "9",
            callback: (contents) => {
                popupText(9)
            }
        },
        twoInSix: {
            label: "10",
            callback: (contents) => {
                popupText(10)
            }
        },
        threeInSix: {
            label: "11",
            callback: (contents) => {
                popupText(11)
            }
        },
        fourInSix: {
            label: "12",
            callback: (contents) => {
                popupText(12)
            }
        },
        fiveInSix: {
            label: "13",
            callback: (contents) => {
                popupText(13)
            }
        },
        fourteen: {
            label: "14",
            callback: (contents) => {
                popupText(14)
            }
        },
        fifteen: {
            label: "15",
            callback: (contents) => {
                popupText(15)
            }
        },
        sixteen: {
            label: "16",
            callback: (contents) => {
                popupText(16)
            }
        }
    },
    default: "one"
})
d.render(true)