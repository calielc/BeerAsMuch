export class WordAtIndex {
    private readonly _index: number;
    private readonly _word: string | null;
    private readonly _wasted: number;

    constructor(index: number, word: string | null, wasted: number) {
        this._index = index;
        this._word = word;
        this._wasted = wasted;
    }

    public get Index(): number {
        return this._index;
    } 

    public get Word(): string | null {
        return this._word;
    }

    public get Wasted(): number {
        return this._wasted;
    } 
}

const Filename: string = './assets/words_alpha.txt';

export interface IWordsCollection {
    readonly Wasted: number;
    get(index: number): Promise<WordAtIndex>;
    getAsync(index: number): Promise<WordAtIndex>
}

export class WordsCollection implements IWordsCollection {
    private _wasted: number = 0;

    public get Wasted(): number {
        return this._wasted;
    } 

    public get(index: number): Promise<WordAtIndex> {
        return new Promise(resolve => {
            if (index < 0) {
                this._wasted += 1;
                resolve(new WordAtIndex(index, null, this._wasted));
                return;
            }

            var fs = require('fs');
            var readline = require('readline');
            var stream = require('stream');
            
            var instream = fs.createReadStream(Filename);
            var outstream = new stream;
            var rl = readline.createInterface(instream, outstream);
            
            var currentIndex: number = 0;
            var lineAtIndex: string | null = null;
    
            rl.on('line', (currentLine: string | null) => {
                if (currentIndex == index) {
                    lineAtIndex = currentLine;
                }
                currentIndex += 1;
            });
            
            rl.on('close', () => {
                this._wasted += 1;
                resolve(new WordAtIndex(index, lineAtIndex, this._wasted));           
            });
        });
    }
    
    public async getAsync(index: number): Promise<WordAtIndex> {
        return await this.get(index);
    }
}
