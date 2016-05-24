module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'assets/libs/bower_components/angular/angular.js',
      'assets/libs/bower_components/angular-route/angular-route.js',
      'assets/libs/bower_components/angular-mocks/angular-mocks.js',
      'app/components/**/*.js',
      'app/shared/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
