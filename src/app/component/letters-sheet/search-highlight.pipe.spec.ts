import { SearchHighlightPipe } from './search-highlight.pipe';

describe('SearchHighlightPipe', () => {
  const pipe = new SearchHighlightPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform "textsearchtermtext" to "text<mark>searchterm</mark>text"', () => {
    expect(pipe.transform('textsearchtermtext', 'searchterm')).toEqual('text<mark>searchterm</mark>text');
  });
});
