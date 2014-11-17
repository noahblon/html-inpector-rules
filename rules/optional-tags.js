HTMLInspector.rules.add(
  'optional-tags', {
    elements: [
      'html',
      'head',
      'body',
      'title'
    ]
  },

  function (listener, reporter, config) {
    var map = {};
    config.elements.forEach(function (item) {
      map[item] = 0;
    });  
    listener.on('element', function (name, element) {    
      config.elements.forEach(function (item) {
        if (item === name) {
          map[item]++;
        }
      });
    });
    listener.on('afterInspect', function (name, element) {
      var i = 0;
      for (var property in map) {
        if(map[property] === 0){
          reporter.warn(
            'optional-tags',
            'The '+Object.keys(map)[i]+' tag is required.',
            ''
          )
        }
        if(map[property] > 1){
          reporter.warn(
            'optional-tags',
            'Only one '+Object.keys(map)[i]+' tag should be present per document.',
            ''
          )         
        }
        i++;
      }
    });

  }
);