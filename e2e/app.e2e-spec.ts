import { AuthPage } from './app.po';

describe('auth App', () => {
  let page: AuthPage;

  beforeEach(() => {
    page = new AuthPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
