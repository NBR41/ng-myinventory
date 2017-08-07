import { NgMyinventoryPage } from './app.po';

describe('ng-myinventory App', () => {
  let page: NgMyinventoryPage;

  beforeEach(() => {
    page = new NgMyinventoryPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
