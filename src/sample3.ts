import * as Words from "./words";

class SavingBeer {
    public static async runTests(verbose: boolean) {
        const words = ["a", "lupus", "house", "trash", "trasher", "zyzzyvas", "zz"];

        for (let index = 0; index < words.length; index++) {
            const word = words[index];
            await new SavingBeer(word).execute(verbose);
        }
    }

    private readonly word: string;
    private readonly wordsCollection: Words.IWordsCollection = new Words.WordsCollection();

    constructor(word: string) {
        this.word = word.toUpperCase();
    }

    public async execute(verbose: boolean = false): Promise<number> {
        const Jump = 99999;

        let minIndex: number = 0;
        let maxIndex: number | null = null;
        let index = Jump;

        function writeLog(text: string) {
            console.log(text);
        }
        function writeDebug(text: string) {
            if (verbose) {
                console.debug(text);
            }
        }

        writeLog("trying to find " + this.word);
        try {
            do {
                const result = await this.wordsCollection.get(index);
                writeDebug(
                    this.wordsCollection.Wasted +
                    " => min: " + minIndex +
                    ", max: " +  maxIndex +
                    ", [" + index + "] = " + result.Word);

                if (result.Word == null) {
                    writeDebug("\tFar Away");

                    maxIndex = index - 1;
                    index = Math.round((minIndex + maxIndex) / 2);
                    continue;
                }

                const foundWord = result.Word.toUpperCase();

                if (this.word < foundWord) {
                    writeDebug("\tBefore");

                    maxIndex = index - 1;
                    index = Math.round((minIndex + maxIndex) / 2);
                    continue;
                }

                if (this.word > foundWord) {
                    writeDebug("\tAfter");

                    minIndex = index + 1;
                    if (maxIndex == null) {
                        index = minIndex + Jump;
                    }
                    else {
                        index = Math.round((minIndex + maxIndex) / 2);
                    }
                    continue;
                }

                writeLog("\tBingo");
                return this.wordsCollection.Wasted;
            }
            while (maxIndex == null || maxIndex >= minIndex);

            writeDebug(this.wordsCollection.Wasted + " => min: " + minIndex + ", max: " +  maxIndex);
            writeLog("\tNot Found");

            return this.wordsCollection.Wasted;
        }
        finally {
            writeLog("\t" + this.wordsCollection.Wasted + " beers was wasted");
            writeLog("");
        }
    }
}

SavingBeer.runTests(false);
