HTMLInspector.rules.add(
  'button-contains-text', {
  },

  function (listener, reporter, config) {
    listener.on('element', function (name, element) {    
      if(name === 'button'){
        $element = $(element);
        var innerTxt = $element.text();
        if(innerTxt === ''){
          reporter.warn(
            'button-contains-text',
            'Buttons must contain text.',
            element
          )
        }
      }
    });
  }
);