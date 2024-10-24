module.exports.config = {
  'name': "help2",
  'version': "2.0.0",
  'hasPermssion': 0x0,
  'credits': "Loid Butter",
   usePrefix: true,
  'description': "commands list",
  'commandCategory': "system",
  'usages': "module name",
  'cooldowns': 0x1,
  'envConfig': {
    'autoUnsend': false,
    'delayUnsend': 0x12c
  }
};
module.exports.languages = {
  'en': {
    'moduleInfo': "─────[ %1 ]──────\n\nUsage: %3\nCategory: %4\nWaiting time: %5 seconds(s)\nPermission: %6\nDescription: %2\n\nModule coded by %7",
    'helpList': "[ There are %1 commands on this bot, Use: \"%2help nameCommand\" to know how to use! ]",
    'user': "User",
    'adminGroup': "Admin group",
    'adminBot': "Admin bot"
  }
};
module.exports.handleEvent = function ({
  api: _0x54ced9,
  event: _0x145c3b,
  getText: _0x6a9c
}) {
  const {
    commands: _0xdf661
  } = global.client;
  const {
    threadID: _0x5a6539,
    messageID: _0x3e90ca,
    body: _0x234589
  } = _0x145c3b;
  if (!_0x234589 || typeof _0x234589 == "undefined" || _0x234589.indexOf("help") != 0) {
    return;
  }
  const _0x20c27c = _0x234589.slice(_0x234589.indexOf("help")).trim().split(/\s+/);
  if (_0x20c27c.length == 1 || !_0xdf661.has(_0x20c27c[1].toLowerCase())) {
    return;
  }
  const _0x3cd223 = global.data.threadData.get(parseInt(_0x5a6539)) || {};
  const _0x47187a = _0xdf661.get(_0x20c27c[1].toLowerCase());
  const _0x48fc8f = _0x3cd223.hasOwnProperty("PREFIX") ? _0x3cd223.PREFIX : global.config.PREFIX;
  return _0x54ced9.sendMessage(_0x6a9c("moduleInfo", _0x47187a.config.name, _0x47187a.config.description, '' + _0x48fc8f + _0x47187a.config.name + " " + (_0x47187a.config.usages ? _0x47187a.config.usages : ''), _0x47187a.config.commandCategory, _0x47187a.config.cooldowns, _0x47187a.config.hasPermssion == 0 ? _0x6a9c("user") : _0x47187a.config.hasPermssion == 1 ? _0x6a9c("adminGroup") : _0x6a9c("adminBot"), _0x47187a.config.credits), _0x5a6539, _0x3e90ca);
};
module.exports.run = function ({
  api: _0x584fbd,
  event: _0x43a470,
  args: _0xf042b9,
  getText: _0x246146
}) {
  const _0x2a17d9 = require("axios");
  const _0x448a23 = require("request");
  const _0x536e3c = require("fs-extra");
  const {
    commands: _0x49f6c4
  } = global.client;
  const _0xdee4c6 = _0x49f6c4.get((_0xf042b9[0] || '').toLowerCase());
  const {
    autoUnsend: _0x3ab960,
    delayUnsend: _0xd4f367
  } = global.configModule[this.config.name];
  if (_0xf042b9[0] == "all") {
    const _0xd73ac4 = _0x49f6c4.values();
    var _0x43ecaa = [];
    var _0x555a8c = '';
    for (const _0x8cd7af of _0xd73ac4) {
      if (!_0x43ecaa.some(_0x3ef9d4 => _0x3ef9d4.group.toLowerCase() == _0x8cd7af.config.commandCategory.toLowerCase())) {
        _0x43ecaa.push({
          'group': _0x8cd7af.config.commandCategory.toLowerCase(),
          'cmds': [_0x8cd7af.config.name]
        });
      } else {
        _0x43ecaa.find(_0x5de84a => _0x5de84a.group.toLowerCase() == _0x8cd7af.config.commandCategory.toLowerCase()).cmds.push(_0x8cd7af.config.name);
      }
    }
    _0x43ecaa.forEach(_0x54b1a9 => _0x555a8c += "☂︎ " + (_0x54b1a9.group.charAt(0).toUpperCase() + _0x54b1a9.group.slice(1)) + " \n" + _0x54b1a9.cmds.join(" • ") + "\n\n");
    return _0x2a17d9.get("https://loidsenpaihelpapi.miraiandgoat.repl.co").then(_0x225c9e => {
      let _0x90915b = _0x225c9e.data.data.substring(_0x225c9e.data.data.lastIndexOf('.') + 1);
      _0x584fbd.getUserInfo(parseInt("100090879572769"), (_0xd63890, _0x48106b) => {
        if (_0xd63890) {
          return console.log(_0xd63890);
        }
        var _0x280665 = Object.keys(_0x48106b);
        var _0x59e630 = _0x48106b[_0x280665].name.replace('@', '');
        let _0x294510 = function () {
          _0x584fbd.sendMessage({
            'body': "Commands list\n\n" + _0x555a8c + ("\nSpamming the bot are strictly prohibited\n\nTotal Commands: " + _0x49f6c4.size + "\n\nDeveloper:\n" + _0x59e630),
            'mentions': [{
              'tag': _0x59e630,
              'id': "100090879572769",
              'fromIndex': 0x0
            }],
            'attachment': _0x536e3c.createReadStream(__dirname + ("/cache/472." + _0x90915b))
          }, _0x43a470.threadID, (_0x440cbc, _0x55873e) => {
            _0x536e3c.unlinkSync(__dirname + ("/cache/472." + _0x90915b));
            if (_0x3ab960 == false) {
              setTimeout(() => {
                return _0x584fbd.unsendMessage(_0x55873e.messageID);
              }, _0xd4f367 * 1000);
            } else {
              return;
            }
          }, _0x43a470.messageID);
        };
        _0x448a23(_0x225c9e.data.data).pipe(_0x536e3c.createWriteStream(__dirname + ("/cache/472." + _0x90915b))).on("close", _0x294510);
      });
    });
  }
  ;
  if (!_0xdee4c6) {
    const _0xe5abb7 = [];
    const _0x30eca5 = parseInt(_0xf042b9[0]) || 1;
    let _0x4b55b7 = 0;
    let _0x2adbe0 = '';
    for (var [_0x1e0fa7, _0x3ff437] of _0x49f6c4) {
      _0x1e0fa7 += '';
      _0xe5abb7.push(_0x1e0fa7);
    }
    _0xe5abb7.sort((_0x3eef62, _0x1f9eeb) => _0x3eef62.data - _0x1f9eeb.data);
    const _0x1d8a09 = 9999 * _0x30eca5 - 9999;
    _0x4b55b7 = _0x1d8a09;
    const _0x563f59 = _0xe5abb7.slice(_0x1d8a09, _0x1d8a09 + 9999);
    for (let _0x51e208 of _0x563f59) _0x2adbe0 += '『' + ++_0x4b55b7 + "』╰┈➤》/" + _0x51e208 + "👿\n";
    const _0x290493 = " 》『𝗦𝗛𝗔𝗢𝗡 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗛𝗘𝗟𝗣 𝗟𝗜𝗦𝗧』《\nPage 『" + _0x30eca5 + '/' + Math.ceil(_0xe5abb7.length / 9999) + '』';
    const _0x54ae6a = "\n🔥━━━━━━━━━━━━━━━━🔥\n\n╰┈➤👉2024👿" + global.config.BOTNAME + " 𝗕𝗢𝗧\n\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥: 𝗦𝗛𝗔𝗢𝗡 𝗔𝗛𝗠𝗘𝗗\n\n❈:𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗘𝗡𝗚𝗧𝗛: " + _0xe5abb7.length + "\n✥:𝗕𝗢𝗧 𝗡𝗔𝗠𝗘: " + global.config.BOTNAME + "\n❅:𝗣𝗥𝗘𝗙𝗜𝗫: " + global.config.PREFIX + "\n✥:𝗢𝗪𝗡𝗘𝗥 𝗙𝗕:https://www.facebook.com/Hey.Its.Me.Shaon.Ahmed";
    var _0x4c45d2 = ["https://i.imgur.com/qMe4oK0.jpg", "https://i.imgur.com/CpiigAY.jpg", "https://i.imgur.com/QzN6CGW.jpg", "https://i.imgur.com/ccfEyVR.jpg"];
    var _0x173f56 = () => _0x584fbd.sendMessage({
      'body': _0x290493 + "\n\n" + _0x2adbe0 + _0x54ae6a,
      'attachment': _0x536e3c.createReadStream(__dirname + "/cache/loidbutter.jpg")
    }, _0x43a470.threadID, () => _0x536e3c.unlinkSync(__dirname + "/cache/loidbutter.jpg"), _0x43a470.messageID);
    return _0x448a23(encodeURI(_0x4c45d2[Math.floor(Math.random() * _0x4c45d2.length)])).pipe(_0x536e3c.createWriteStream(__dirname + "/cache/loidbutter.jpg")).on("close", () => _0x173f56());
  }
  const _0x52a546 = _0x246146("moduleInfo", _0xdee4c6.config.name, _0xdee4c6.config.description, '' + (_0xdee4c6.config.usages ? _0xdee4c6.config.usages : ''), _0xdee4c6.config.commandCategory, _0xdee4c6.config.cooldowns, _0xdee4c6.config.hasPermssion == 0 ? _0x246146("user") : _0xdee4c6.config.hasPermssion == 1 ? _0x246146("adminGroup") : _0x246146("adminBot"), _0xdee4c6.config.credits);
  var _0x4c45d2 = ["https://i.imgur.com/qMe4oK0.jpg", "https://i.imgur.com/CpiigAY.jpg", "https://i.imgur.com/QzN6CGW.jpg", "https://i.imgur.com/ccfEyVR.jpg"];
  var _0x173f56 = () => _0x584fbd.sendMessage({
    'body': _0x52a546,
    'attachment': _0x536e3c.createReadStream(__dirname + "/cache/loidbutter.jpg")
  }, _0x43a470.threadID, () => _0x536e3c.unlinkSync(__dirname + "/cache/loidbutter.jpg"), _0x43a470.messageID);
  return _0x448a23(encodeURI(_0x4c45d2[Math.floor(Math.random() * _0x4c45d2.length)])).pipe(_0x536e3c.createWriteStream(__dirname + "/cache/loidbutter.jpg")).on("close", () => _0x173f56());
};
