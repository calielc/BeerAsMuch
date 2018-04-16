let _wasted = 0;

function Words() {};

Words.prototype.wasted = () => _wasted;

Words.prototype.get = function(index) {
    return new Promise(resolve => {
        if (index < 0) {
            _wasted += 1;
            resolve({
                index: index,
                word: undefined,
                wasted: _wasted
            });
            return;
        }

        var fs = require('fs');
        var readline = require('readline');
        var stream = require('stream');
        
        var instream = fs.createReadStream('./assets/words_alpha.txt');
        var outstream = new stream;
        var rl = readline.createInterface(instream, outstream);
        
        var currentIndex = 0;
        var result = undefined;

        rl.on('line', (line) => {
            if (currentIndex == index) {
                result = line;
            }
            currentIndex += 1;
        });
        
        rl.on('close', () => {
            _wasted += 1;
            resolve({
                index: index,
                word: result,
                wasted: _wasted
            });
        });
    });
};

module.exports = Words;