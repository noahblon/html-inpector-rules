HTMLInspector.rules.add(
  'omm-naming-convention', {
    whitelist: [
      'js-',
      'mixin-',
      'view-',
      'util-'
    ]
  },

  function (listener, reporter, config) {

    listener.on('element', function (name, element) {
      var classes = element.classList;
      var filteredClasses = [];
      for(i=0; i < classes.length; i++){
        if(classes[i].lastIndexOf('js-', 0) != 0 && 
           classes[i].lastIndexOf('mixin-', 0) != 0 &&
           classes[i].lastIndexOf('view-', 0) != 0 &&
           classes[i].lastIndexOf('util-', 0) != 0
          ){
          filteredClasses.push(classes[i]);
        }
      }
      var $element = $(element);
      if(filteredClasses.length > 0) {
        // If the element is a base object.  Assumes first class is base object class declaration
        if(filteredClasses[0].indexOf('-') == -1) {
          var baseObjectName = filteredClasses[0]; 
          var extensionCount = 0;
          // Iterate over all classes
          for(i=1; i < filteredClasses.length; i++){
            // If its a class without an _, its assumed to be a base object
            if(filteredClasses[i].indexOf('_') == -1 ){
              reporter.warn(
                'omm-naming-convention',
                'A base object element must not include another base object class',
                element
              );
            } else {
              // Otherwise its an extension of a base object. Test that against the object name
              extensionCount++;
              var objectName = filteredClasses[i].split('_');
              if (objectName[0] != baseObjectName){
                reporter.warn(
                  'omm-naming-convention',
                  'An object extension must extend a base object class.',
                  element
                );
              }
            } 
          }
          if(extensionCount > 1) {
            reporter.warn(
              'omm-naming-convention',
              'An object must not contain more than one extension.',
              element
            );
          }
        }
        // should be an object member
        else {
          // Test object member against its parent
          var object = '';
          var extensionCount = 0;
          var objectClass = filteredClasses[0].split('-');

          if(objectClass.length > 2){
            var slice = objectClass.slice(0,-1);
            object = slice.join('-');
          } else {
            object = objectClass[0];
          }
          if(!($element.parent().is('.' + object))){
            reporter.warn(
              'omm-naming-convention',
              'An object member must be a direct descendant of its parent.',
              element
            );
          }
          for(i=1; i < filteredClasses.length; i++){
            extensionCount++;
            var objectName = filteredClasses[i].split('_');
            if (objectName[0] != filteredClasses[0]){
              reporter.warn(
                'omm-naming-convention',
                'An object extension must extend a base object class.',
                element
              );
            }
            if(extensionCount > 1) {
              reporter.warn(
                'omm-naming-convention',
                'An object must not contain more than one extension.',
                element
              );
            }
          }
          
          }
        }
      }
    );
  }
);