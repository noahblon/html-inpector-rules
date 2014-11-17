HTMLInspector.rules.add(
  'meta-charset', {
    elements: ['meta']
  },

  function (listener, reporter, config) {
    var count = 0;
    listener.on('element', function (name, element) {
      config.elements.forEach(function (item) {
        if (item === name) {
          var attr = $(element).attr('charset');
          if(attr != null){
            if(!($(element).parent().is('head'))){
              reporter.warn(
                'meta-charset',
                'The charset declaration should immediately proceed the opening head tag.',
                element);
            }
          }
          if (attr != 'utf=8' || attr != 'UTF-8') {
            reporter.warn(
              'meta-charset',
              'The meta tag should use utf-8 encoding.',
              element);
            count++;
          }
        }
      });
    });
    listener.on('afterInspect', function () {
      if (count === 0) {
        reporter.warn(
          'meta-charset',
          'A charset should be set in a meta tag following the open head tag.')
      }
      if (count > 1) {
        reporter.warn(
          'meta-charset',
          'Only a single meta tag defining a charset should be present per document.');
      }
    });
  }
);