var Words = require("./words");

var outputFunc = (result) => {
    console.log("wasted: " + result.wasted + ", words[" + result.index + "] = " + result.word);
};

var words = new Words();
console.log("Wasted: " + words.wasted());
words.get(-1).then(outputFunc);
words.get(0).then(outputFunc);
words.get(500).then(outputFunc);
words.get(19675).then(outputFunc);
words.get(32767).then(outputFunc);
words.get(65535).then(outputFunc);
words.get(20457600000000000).then(outputFunc);
