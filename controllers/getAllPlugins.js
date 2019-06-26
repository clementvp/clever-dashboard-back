const fs = require('fs');

const getAllPlugins = async (req, res) => {
  try {
    const plugins = await fs.readdirSync('./plugins');
    res.status(200).json({ error: false, msg: 'OK', plugins });
  } catch (err) {
    res.status(500).json({ error: true, msg: 'KO', error_msg: 'Error during plugins scan' });
  }
};

module.exports = getAllPlugins;
