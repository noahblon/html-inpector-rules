HTMLInspector.rules.add(
  'form-novalidate', {
    elements: ['form']
  },

  function (listener, reporter, config) {
    listener.on('element', function (name, element) {
      config.elements.forEach(function (item) {
        if (item === name) {
          var attr = $(element).attr('novalidate');
          if(attr === undefined){
            reporter.warn(
              'form-novalidate',
              'The form tag should have a novalidate attribute.',
              element
            );
          }
        }
      });
    });
  }
);