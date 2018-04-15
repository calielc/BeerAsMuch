import * as Words from "./words"

class Sample1 {
    public static main(): void {
        function outputFunc(result: Words.WordResult): void {
            console.log("wasted: " + result.Wasted + ", words[" + result.Index + "] = " + result.Word);
        };
            
        let words = new Words.Word();
        console.log("Wasted: " + words.Wasted);
        
        var promises = new Array();
        promises.push(words.get(-1).then(outputFunc));
        promises.push(words.get(0).then(outputFunc));
        promises.push(words.get(500).then(outputFunc));
        promises.push(words.get(19675).then(outputFunc));
        promises.push(words.get(32767).then(outputFunc));
        promises.push(words.get(65535).then(outputFunc));
        promises.push(words.get(20457600000000000).then(outputFunc));
        
        Promise.all(promises).then(_ => {
            console.log("Wasted: " + words.Wasted);
        });
    }
}

Sample1.main();
