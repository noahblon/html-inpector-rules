HTMLInspector.rules.add(
  'type-attributes', {
    elements: [
      'link',
      'style'
    ]
  },

  function (listener, reporter, config) {
    listener.on('element', function (name, element) {    
      config.elements.forEach(function (item) {
        if(item === name){
          var attr = $(element).attr('type');
          if(attr != undefined) {
            reporter.warn(
              'type-attributes',
              'The type attribute should be omitted from '+item+' tags in HTML5 documents.',
              element
            )
          }
        }
      });
    });
  }
);