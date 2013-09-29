
# model-dirty

  Plugin to make model send only dirty fields on save/update.
  Works by replacing `model#toJSON` in the `model#save`

## Installation

  Install with [component(1)](http://component.io):

    $ component install wejendorp/model-dirty

## Usage

```js
var dirty = require('model-dirty');
var model = require('model');
var myModel = model('myModel')
  .attr('id')
  // ...
  ;

myModel.use(dirty);

// myModel#save is now dirty attributes only
```

## License

  MIT
