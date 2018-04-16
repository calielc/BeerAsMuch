import * as Words from "./words"

class SavingBeer {
    private readonly _word: string;
    private readonly _wordsCollection: Words.IWordsCollection = new Words.WordsCollection();

    constructor(word: string) {
        this._word = word.toUpperCase();
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

        writeLog("trying to find " + this._word);
        try {
            do {
                let result = await this._wordsCollection.getAsync(index);
                writeDebug(this._wordsCollection.Wasted + " => min: " + minIndex + ", max: " +  maxIndex + ", [" + index + "] = " + result.Word);

                if (result.Word == null) {
                    writeDebug("\tFar Away");

                    maxIndex = index - 1;
                    index = Math.round((minIndex + maxIndex) / 2);
                    continue;
                }

                let foundWord = result.Word.toUpperCase(); 
                
                if (this._word < foundWord) {
                    writeDebug("\tBefore");

                    maxIndex = index - 1;
                    index = Math.round((minIndex + maxIndex) / 2);
                    continue;
                }
                
                if (this._word > foundWord) {
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
                return this._wordsCollection.Wasted;
            } 
            while (maxIndex == null || maxIndex >= minIndex)

            writeDebug(this._wordsCollection.Wasted + " => min: " + minIndex + ", max: " +  maxIndex);
            writeLog("\tNot Found");

            return this._wordsCollection.Wasted;
        }
        finally {
            writeLog("\t" + this._wordsCollection.Wasted + " beers was wasted")
            writeLog("");
        }
    }

    public static async runTestes(verbose: boolean) {
        let words = ["a", "lupus", "house", "trash", "trasher", "zyzzyvas", "zz"];

        for (let index = 0; index < words.length; index++) {
            const word = words[index];
            await new SavingBeer(word).execute(verbose);
        }
    }
}

SavingBeer.runTestes(false);

