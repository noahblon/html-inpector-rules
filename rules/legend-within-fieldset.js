HTMLInspector.rules.add(
  'legend-within-fieldset', {
  },

  function (listener, reporter, config) {
    listener.on('element', function (name, element) {    
      if(name === 'fieldset'){
        var $element = $(element);
        var $legend = $element.find('legend');
        if($legend.length === 0) {
          reporter.warn(
            'legend-within-fieldset',
            'Fieldsets should contain a legend which describes its purpose.',
            element
          )
        }
        else if($legend.length === 1){
          var isFirst = $element.first().is('legend');
          if(!isFirst){
            reporter.warn(
              'legend-within-fieldset',
              'A legend should immediately succeed the fieldset opening tag.',
              element
            )
          }
        }
        else {
          reporter.warn(
            'legend-within-fieldset',
            'A fieldset must only contain one legend.',
            element
          )
        }
      }
    });
  }
);