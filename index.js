const COLORS = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    FgGray: "\x1b[90m",
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
    BgGray: "\x1b[100m"
}

getInput = async (msg) => {
    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        readline.question(msg, name => {
            readline.close();
            resolve(name);
        });
    });
}

getNumberInput = async (msg, defaultNumber = false) => {
    const firstMsg = msg ? msg : "   ";
    const retryMsg =  `   ${COLORS.FgRed} Try again. Insert number:\n ${COLORS.Reset}`;
    let userInput = '', firstTime = true;
    do {
        userInput = await getInput(firstTime ? firstMsg : retryMsg);
        if (defaultNumber && firstTime && isNaN(parseInt(userInput))) {
            return defaultNumber;
        }
        firstTime = false;
    } while (isNaN(parseInt(userInput)));
    return userInput;
}

getRandomNumber = (max = 20, min = 1) => {
    return Math.floor(Math.random() * max) + min;
}

doCalc = async (index, maxNumber) => {
    const firstNumber = getRandomNumber(maxNumber);
    const secondNumber = getRandomNumber(maxNumber);
    const result = firstNumber * secondNumber;
    const equation = `${index}) ${firstNumber} X ${secondNumber} = `;
    console.log(equation);
    const userInput = await getNumberInput();
    const correct = firstNumber * secondNumber == userInput;
    const resString = correct ? (`${COLORS.FgBlue}V${COLORS.Reset}`) : (`${COLORS.FgRed}X (${result})${COLORS.Reset}`);
    console.log(`   ${resString}`);
    return correct;
}

mainFunc = async () => {
    const amountOfQuestions = await getNumberInput("Amount of questions ? Default is 10 ", 10);
    const maxNumber = await getNumberInput("Maximum number ? ", 20);
    let index = 0, amountOfCorrect = 0;
    while (index++ < amountOfQuestions) {
        if (await doCalc(index, maxNumber)) {
            amountOfCorrect++;
        }
    }
    const percent = amountOfCorrect * 100 / amountOfQuestions;
    console.log(`${COLORS.FgMagenta} ${percent}% (${amountOfCorrect}/${amountOfQuestions})${COLORS.Reset}`);
}

mainFunc().then(res => {
    process.exit(0)
}).catch(err => {
    console.error(err);
    process.exit(1);
});
