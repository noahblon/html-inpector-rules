HTMLInspector.rules.add(
  "html5-prohibited-elements",
  {
    prohibitedElements: ["article",
               "aside",
               "datalist",
               "dialog",
               "figcaption",
               "figure",
               "footer",
               "header",
               "keygen",
               "main",
               "mark",
               "menuitem",
               "meter",
               "nav",
               "output",
               "progress",
               "section",
               "summary",
               "time"]
  },
  function(listener, reporter, config) {

    // register a handler for the `attribute` event
    listener.on('element', function(name, element) {
      config.prohibitedElements.forEach(function(item) {
        if (item === name) {
          reporter.warn(
            "html5-prohibited-elements",
            "The HTML5 element " + item + " is prohibited.",
            element
          )
        }
      })
    }
  )
});