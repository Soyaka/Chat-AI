
// TODO: make it smaller
export function FindCode(inputString) {
    let Blocks = [];
    let isCodeBlock = false;
    let currentBlockCode = "";
    let NormalText = "";

    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] === "`" && inputString[i + 1] === "`" && inputString[i + 2] === "`") {
            if (isCodeBlock) {
                if (NormalText) {
                    Blocks.push({ normal: NormalText });
                }
                if (currentBlockCode) {
                    Blocks.push({ code:currentBlockCode});
                }

                isCodeBlock = !isCodeBlock;
                currentBlockCode = "";
                NormalText = "";
                i += 2;
            } else {
                isCodeBlock = !isCodeBlock;
                i += 2;
            }
        } else {
            if (isCodeBlock) {
                currentBlockCode += inputString[i];
            } else {
                NormalText += inputString[i];
            }
        }
    }

    if (NormalText) {
        Blocks.push({ normal: NormalText });
    }
    if (currentBlockCode) {
        Blocks.push({ code: currentBlockCode  });
    }

    return Blocks;
}

let langs = [
    "c",
    "c#",
    "coffeescript",
    "css",
    "d",
    "go",
    "haskell",
    "html",
    "java",
    "javascript",
    "json",
    "lua",
    "php",
    "python",
    "r",
    "ruby",
    "scheme",
    "shell",
    "smalltalk"
];

export function findFirstWord(inputString) {
    const words = inputString.split(/\s+/);
    const firstWord = words[0].trim().toLowerCase();
    
    if (langs.includes(firstWord)) {
        return firstWord;
    } else {
        return "javascript";
    }
}
