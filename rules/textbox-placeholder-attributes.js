HTMLInspector.rules.add(
  'textbox-placeholder-attributes', {
  },

  function (listener, reporter, config) {
    listener.on('element', function (name, element) {    
      if(name == 'input'){
        var type = $(element).attr('type');
        if(type == 'text'){
          var placeholder = $(element).attr('placeholder');
          if(placeholder === undefined) {
            reporter.warn(
              'textbox-placeholder-attribute',
              'Consider adding placeholder text to this textbox to enhance accessibility',
              element
            );
          }
        }
      }
    });
  }
);