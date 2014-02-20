*This repository is a mirror of the [component](http://component.io) module [wejendorp/model-dirty](http://github.com/wejendorp/model-dirty). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/wejendorp-model-dirty`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
# model-dirty

  Plugin to make model send only dirty fields on save/update.
  Works by replacing `model#toJSON` in `model#save`

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
