
function toJSON() {
  var fields = this.dirty;
  fields[this.model.primaryKey] = this.primary();
  return fields;
}

module.exports = function(model) {
  model.prototype._toJSON = model.prototype.toJSON;
  model.prototype._save   = model.prototype.save;

  model.prototype.save = function(fn) {
    var m = this;

    m.toJSON = toJSON;
    return m._save(function() {
      m.toJSON = m._toJSON;
      fn.apply(m, arguments);
    });
  };
};