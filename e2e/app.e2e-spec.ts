import { MistakePage } from './app.po';

describe('mistake App', () => {
  let page: MistakePage;

  beforeEach(() => {
    page = new MistakePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
