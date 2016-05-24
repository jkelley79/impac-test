'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('impac app', function() {


  it('should automatically redirect to /home when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/home");
  });

});
