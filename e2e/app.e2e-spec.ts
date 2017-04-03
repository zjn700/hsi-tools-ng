import { HsiToolsPage } from './app.po';

describe('hsi-tools App', () => {
  let page: HsiToolsPage;

  beforeEach(() => {
    page = new HsiToolsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
