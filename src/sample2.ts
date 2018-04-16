import * as Words from "./words"

class SampleAsync {
    public static async main() {
        function writeConsole(result: Words.WordAtIndex): void {
            console.log("wasted: " + result.Wasted + ", words[" + result.Index + "] = " + result.Word);
        };

        let words = new Words.WordsCollection();
        console.log("Wasted: " + words.Wasted);

        writeConsole(await words.getAsync(-1));
        writeConsole(await words.get(-1));
        writeConsole(await words.get(0));
        writeConsole(await words.get(500));
        writeConsole(await words.get(19675));
        writeConsole(await words.get(32767));
        writeConsole(await words.get(65535));
        writeConsole(await words.get(20457600000000000));

        console.log("Wasted: " + words.Wasted);
    }
}
SampleAsync.main();
