import textSearch from "./textSearch";
import { describe, test, expect } from 'vitest'

//change to this output: [{ text: 'The ', highlight: false }, { text: 'quick', highlight: true }, { text: ' brown fox jumps over the lazy dog', highlight: false }]

describe('textSearch', () => {
  test('empty string', () => {
    // expect(textSearch('', '')).toBe('');
    expect(textSearch('', '')).toStrictEqual([
      { text: '', highlight: false },
    ]);
    expect(textSearch('', 'xyz')).toStrictEqual(
      [{ text: '', highlight: false }],
    )
  });

  test('empty query', () => {
    expect(textSearch('', '')).toStrictEqual(
      [{ text: '', highlight: false }],
    )
    expect(textSearch('The quick brown fox jumps over the lazy dog', '')).toStrictEqual(
      [{ text: 'The quick brown fox jumps over the lazy dog', highlight: false }],
    )
  });

  test('no matches', () => {
    expect(textSearch('The quick brown fox jumps over the lazy dog', '')).toStrictEqual(
      [
        { text: 'The quick brown fox jumps over the lazy dog', highlight: false }
      ]
    );
    expect(
      textSearch('The quick brown fox jumps over the lazy dog', 'aaa'),
    ).toStrictEqual(
      [
        { text: 'The quick brown fox jumps over the lazy dog', highlight: false }
      ]
    );
    expect(
      textSearch('The quick brown fox jumps over the lazy dog', 'abc'),
    ).toStrictEqual(
      [
        { text: 'The quick brown fox jumps over the lazy dog', highlight: false }
      ]
    );
    expect(
      textSearch('The quick brown fox jumps over the lazy dog', 'dogo'),
    ).toStrictEqual(
      [
        { text: 'The quick brown fox jumps over the lazy dog', highlight: false }
      ]
    );
  });

  describe('matches', () => {
    test('exact match', () => {
      expect(
        textSearch('The quick brown fox jumps over the lazy dog', 'quick'),
      ).toStrictEqual(
        [
          { text: 'The ', highlight: false },
          { text: 'quick', highlight: true },
          { text: ' brown fox jumps over the lazy dog', highlight: false },
        ]
      );

      expect(
        textSearch('The quick brown fox jumps over the lazy dog', 'jumps'),
      ).toStrictEqual(
        [
          { text: 'The quick brown fox ', highlight: false },
          { text: 'jumps', highlight: true },
          { text: ' over the lazy dog', highlight: false },
        ]
      );
      
    });

    test('case-insensitive match', () => {
      expect(
        textSearch('The Quick Brown Fox Jumps Over The Lazy Dog', 'fox'),
      ).toStrictEqual(
        [
          { text: 'The Quick Brown ', highlight: false },
          { text: 'Fox', highlight: true },
          { text: ' Jumps Over The Lazy Dog', highlight: false },
        ]
      )

      expect(
        textSearch('The Quick Brown Fox Jumps Over The Lazy Dog', 'QUICK'),
      ).toStrictEqual(
        [
          { text: 'The ', highlight: false },
          { text: 'Quick', highlight: true },
          { text: ' Brown Fox Jumps Over The Lazy Dog', highlight: false },
        ]
      )
    });

    test('partial match', () => {
      expect(
        textSearch('The quick brown fox jumps over the lazy dog', 'jump'),
      ).toStrictEqual(
        [
          { text: 'The quick brown fox ', highlight: false },
          { text: 'jump', highlight: true },
          { text: 's over the lazy dog', highlight: false },
        ]
      );

      expect(
        textSearch('The quick brown fox jumps over the lazy dog', 'he'),
      ).toStrictEqual(
        [
          { text: 'T', highlight: false },
          { text: 'he', highlight: true },
          { text: ' quick brown fox jumps over t', highlight: false },
          { text: 'he', highlight: true },
          { text: ' lazy dog', highlight: false },
        ]
      );

    });

    test('characters do not match the same word more than once', () => {
      expect(textSearch('aaabbcc', 'aa')).toStrictEqual(
        [
          { text: 'aa', highlight: true },
          { text: 'abbcc', highlight: false },
        ]
      );
    });
  });
});
  