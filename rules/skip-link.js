HTMLInspector.rules.add(
  'skip-link', {},

  function (listener, reporter, config) {
    listener.on('element', function (name, element) {
      if(name == 'body'){
        var isSkipLinkPresent = $(element).first().is('a');
        if(!isSkipLinkPresent){
          reporter.warn(
            'skip-link',
            'If possible, a skip to main content link should immediately succeed the opening body tag.',
            element
          )
        }
      }
    });
  }
);
