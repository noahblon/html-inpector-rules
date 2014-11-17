HTMLInspector.rules.add(
  'img-input-alt-attributes', {
  },

  function (listener, reporter, config) {
    listener.on('element', function (name, element) {    
      var $element = $(element);
      if(name === 'input'){
        var type = $element.attr('image');
        if(type == image){
          var attr = $(element).attr('alt');
          console.log(attr);
          if(attr === undefined) {
            reporter.warn(
              'img-input-alt-attributes',
              'Image inputs require an alt attribute',
              element
            )
          }
        }
      });
    });
  }
);