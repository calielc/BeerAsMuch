import * as Words from "./words";

class SampleSync {
    public static main(): void {
        function writeConsole(result: Words.WordAtIndex): void {
            console.log("wasted: " + result.Wasted + ", words[" + result.Index + "] = " + result.Word);
        }

        const words = new Words.WordsCollection();
        console.log("Wasted: " + words.Wasted);

        const promises = new Array();
        promises.push(words.get(-1).then(writeConsole));
        promises.push(words.get(0).then(writeConsole));
        promises.push(words.get(500).then(writeConsole));
        promises.push(words.get(19675).then(writeConsole));
        promises.push(words.get(32767).then(writeConsole));
        promises.push(words.get(65535).then(writeConsole));
        promises.push(words.get(20457600000000000).then(writeConsole));

        Promise.all(promises).then(() => {
            console.log("Wasted: " + words.Wasted);
        });
    }
}

SampleSync.main();
