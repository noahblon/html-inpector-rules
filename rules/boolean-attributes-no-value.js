HTMLInspector.rules.add(
  'boolean-attributes-no-value', {
    booleans: [
      'required', 
      'disabled',
      'checked',
      'novalidate'
    ]
  },

  function (listener, reporter, config) {
    listener.on('attribute', function(name, value, element) {
      config.booleans.forEach(function (item) {
        if(item===name){
          if(value != ''){
            reporter.warn(
              'boolean-attributes-no-value',
              'The attribute "'+name+'" is a boolean and should not have a value.',
              element
            );
          }
        }
      });
    });
  }
);