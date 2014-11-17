HTMLInspector.rules.add(
  'table-grouping-tags', {
  },

  function (listener, reporter, config) {
    listener.on('element', function (name, element) {    
      if(name === 'table'){
        var $element = $(element);
        var $thead = $element.find('thead');
        var $tbody = $element.find('tbody');
        if($thead.length === 0){
          reporter.warn(
            'table-grouping-tags',
            'Tables must contain a thead element.',
            element
          );
        }
        if($tbody.length === 0) {
          reporter.warn(
            'table-grouping-tags',
            'Tables must contain a tbody element.',
            element
          );
        }
      }
    });
  }
);