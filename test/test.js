
var dirty = require('model-dirty');

var model = require('model');
var TestModel = model('test');
TestModel
  .route('http://localhost:9001')
  .attr('id')
  .attr('name')
  .attr('test')
  .use(dirty);

describe('model-dirty', function() {
  var model;
  beforeEach(function() {
    model = new TestModel({id: 1, name:'New'});
  });
  it('should always send id attribute', function(done) {
    model.dirty = {};
    model.save(function(err, res) {
      expect(JSON.parse(res.text)).to.eql({id: 1});
      done();
    });
  });
  it('should send all attributes for new instance', function(done) {
    model.save(function(err, res) {
      expect(JSON.parse(res.text)).to.eql(model.attrs);
      done();
    });
  });
  it('should only send changed attributes for update instance', function(done) {
    // fake save
    model.dirty = {};
    model.test('dirty')

    var dirty = model.dirty;
    model.save(function(err, res) {
      var mirror = JSON.parse(res.text);
      expect(Object.keys(mirror).length).to.eql(2);
      expect(mirror.id).to.eql(1);
      expect(mirror.test).to.eql('dirty');
      done();
    });
  });
  it('should not break toJSON', function(done) {
    model.dirty = {}; // make sure it doesn't read from dirty
    expect(model._toJSON()).to.eql(model.toJSON());

    model.save(function(err, res) {
      // expect(model).to.eql(this); // fails in phantomJS?
      expect(this._toJSON()).to.eql(this.toJSON());
      done();
    });
  });
});