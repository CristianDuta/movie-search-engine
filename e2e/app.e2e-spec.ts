import { AssessmentUiPage } from './app.po';

describe('assessment-ui App', function() {
  let page: AssessmentUiPage;

  beforeEach(() => {
    page = new AssessmentUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
