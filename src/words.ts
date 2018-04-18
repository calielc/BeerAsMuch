export class WordAtIndex {
    private readonly index: number;
    private readonly word: string | null;
    private readonly wasted: number;

    constructor(index: number, word: string | null, wasted: number) {
        this.index = index;
        this.word = word;
        this.wasted = wasted;
    }

    public get Index(): number {
        return this.index;
    }

    public get Word(): string | null {
        return this.word;
    }

    public get Wasted(): number {
        return this.wasted;
    }
}

const Filename: string = "./assets/words_alpha.txt";

export interface IWordsCollection {
    readonly Wasted: number;
    get(index: number): Promise<WordAtIndex>;
}

export class WordsCollection implements IWordsCollection {
    private wasted: number = 0;

    public get Wasted(): number {
        return this.wasted;
    }

    public async get(index: number): Promise<WordAtIndex> {
        return await this.getAsync(index);
    }

    private getAsync(index: number): Promise<WordAtIndex> {
        return new Promise((resolve) => {
            if (index < 0) {
                this.wasted += 1;
                resolve(new WordAtIndex(index, null, this.wasted));
                return;
            }

            const fs = require("fs");
            const readline = require("readline");
            const stream = require("stream");

            const instream = fs.createReadStream(Filename);
            const outstream = new stream();
            const rl = readline.createInterface(instream, outstream);

            let currentIndex: number = 0;
            let lineAtIndex: string | null = null;

            rl.on("line", (currentLine: string | null) => {
                if (currentIndex === index) {
                    lineAtIndex = currentLine;
                }
                currentIndex += 1;
            });

            rl.on("close", () => {
                this.wasted += 1;
                resolve(new WordAtIndex(index, lineAtIndex, this.wasted));
            });
        });
    }
}
