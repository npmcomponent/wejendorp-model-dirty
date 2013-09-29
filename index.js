
module.exports = function(model) {
  model.prototype._save = model.prototype.save;

  model.prototype.save = function(fn) {
    var m = this;
    m.toJSON = function() {
      var fields = m.dirty;
      fields[m.model.primaryKey] = m.primary();
      return fields;
    };

    m._save(function() {
      m.toJSON = function() { return m.attrs; }
      fn.apply(m, arguments);
    });

  };
};