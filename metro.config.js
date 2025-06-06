const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 添加web平台支持
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config; 