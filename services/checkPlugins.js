const checkPlugins = (plugins) => {
  const errors = [];
  plugins.forEach((plugin) => {
    if (typeof plugin.x === 'undefined'
      || plugin.x === ''
      || typeof plugin.y === 'undefined'
      || plugin.y === ''
      || !plugin.w
      || !plugin.h
      || !plugin.i
      || !plugin.type
      || !plugin.url) {
      errors.push(plugin);
    }
  });
  if (errors.length === 0) {
    return true;
  }
  return false;
};

module.exports = checkPlugins;
