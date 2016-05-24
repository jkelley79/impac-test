'use strict';

describe('impacApp.home module', function() {

  beforeEach(module('impacApp.home'));

  describe('home controller', function(){
    var scope, homeCtrl;

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        homeCtrl = $controller('HomeCtrl', {$scope: scope});
    }));

    it('should ....', inject(function($controller) {
      //spec body
      expect(homeCtrl).toBeDefined();
    }));

  });
});
