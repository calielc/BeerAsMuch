import * as Words from "../src/words";

let wordsCollection: Words.IWordsCollection;

beforeEach(() => {
  wordsCollection  = new Words.WordsCollection();
});

test("should request -1", async () => {
  expect(await wordsCollection.get(-1))
    .toEqual({index: -1, wasted: 1, word: null});
}, 1000);

test("should request 0", async () => {
  expect(await wordsCollection.get(0))
    .toEqual({index: 0, wasted: 1, word: "a"});
}, 1000);

test("should request 500", async () => {
  expect(await wordsCollection.get(500))
    .toEqual({index: 500, wasted: 1, word: "abjuratory"});
}, 1000);

test("should request MAX", async () => {
  expect(await wordsCollection.get(Number.MAX_SAFE_INTEGER))
    .toEqual({index: Number.MAX_SAFE_INTEGER, wasted: 1, word: null});
}, 1000);
