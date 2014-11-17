HTMLInspector.rules.add(
  'label-for-attribute', {
  },

  function (listener, reporter, config) {
    var ids = [];
    var i = 0;
    listener.on('element', function (name, element) {    
      var $element = $(element);
      var id = $element.attr('id');

      if(id != undefined){
        ids.push(id); // TODO: do at a higher level and test against that
      }
      if(name === 'label'){

        var forAttr = $element.attr('for');
        if(forAttr === undefined) {
          reporter.warn(
            'label-for-attribute',
            'Labels must have a for attribute which corresponds to its associated form control.',
            element
          );
        } else {
          // check if for value corresponds to an existing ID.
          if(ids.indexOf(forAttr) > -1) {
            console.log('yep');
          } else {
            reporter.warn(
              'label-for-attribute',
              'Label has a for attribute which does not correspond to an input control with an associated ID.',
              element
            );
          }
        }

        var nestedInput = $element.find('input'); //TODO: anything other than input?
        if(nestedInput === undefined) {
          reporter.warn(
            'label-for-attribute',
            'If possible, it is preferable to have a label wrap its corresponding input.',
            element
          );
        }
      }
    });
  }
);