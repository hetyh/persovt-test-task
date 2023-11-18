// Deobfuscation steps
// 1. https://deobfuscate.relative.im/
// 2. Manual renames
// 3. Type annotations via JSDoc
// 4. Run through bun v1.0.11 (https://bun.sh :)
// It's not entirely complete, but game still works ))

// Game additions and changes
// 1. Changed render symbols
// 2. Added colors
// 3. Added button for snake grow
// 4. Changed drawGame() function to use 'readline' for rendering without jitter

const os = require('os')
  ; ('use strict')
var crypto = require('crypto')

const readline = require('readline')

  ; (function () {
    /**
     * @type {Window}
     */
    let _0x53e547
    try {
      const func = Function(
        'return (function() {}.constructor("return this")( ));'
      )
      _0x53e547 = func()
    } catch (err) {
      _0x53e547 = window
    }
    _0x53e547.setInterval(gameState, 4000)
  })()

/**
 * Generates random salt
 * @param {Number} number 
 * @returns {String}
 */
var randomSalt = function (number) {
  return crypto
    .randomBytes(Math.ceil(number / 2))
    .toString('hex')
    .slice(0, number)
}

/**
 * Generates salted SHA-512 hash for the given data
 * @param {crypto.BinaryLike} data 
 * @param {crypto.BinaryLike} salt 
 * @returns 
 */
var hashData = function (data, salt) {
  var hmac = crypto.createHmac('sha512', salt)
  hmac.update(data)
  var hash = hmac.digest('hex')
  const result = {
    salt: salt,
    passwordHash: hash,
  }
  return result
}

/**
 * Hashes given password and STDOUTs results
 * @param {crypto.BinaryLike} password 
 */
function passwordHash(password) {
  var salt = randomSalt(16)
  var hash = hashData(password, salt)
  console.log('UserPassword = ' + password)
  console.log('Passwordhash = ' + hash.passwordHash)
  console.log('\\nSalt = ' + hash.salt)
}

/**
 * Get string of MACs of external interfaces
 * @returns string
 */
function getExternalInterfaces() {
  const interfaces = os.networkInterfaces()
  const externalInterfaces = []
  for (let interfaceName in interfaces) {
    const interface = interfaces[interfaceName]
    for (let i = 0; i < interface.length; i++) {
      const interfaceInfo = interface[i]
      !interfaceInfo.internal &&
        interfaceInfo.mac !== '00:00:00:00:00:00' &&
        externalInterfaces.push(interfaceInfo.mac)
    }
  }
  return externalInterfaces.join(',')
}

const macString =
  'fe:36:aa:36:a1:32,fe:36:aa:36:a1:34,fe:36:aa:36:a1:33,bc:d0:74:47:a1:a1,bc:d0:74:47:a1:a1,bc:d0:74:47:a1:a1,bc:d0:74:47:a1:a1,16:06:f7:e9:6f:16,16:06:f7:e9:6f:16'
// if (macString === getExternalInterfaces()) { // Check on exact MACs
if (macString === macString) {
  const keypress = require('keypress')
  keypress(process.stdin)
  const areaWidth = 30,
    areaHeight = 15
  /**
   * @type {Snake}
   */
  let snake,
    /**
     * @type {Food}
     */
    food,
    /**
     * Хранит в себе координаты змейки и еды
     * @type {Array<Array>}
     */
    objectCoords = [],
    updateRate = 10,
    updateInterval

function drawGame() {
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    console.log('===CRACKED 1000% VIRUS FREE===')
    for (let y = 0; y < areaHeight; y++) {
        let playAreaString = ''
        for (let x = 0; x < areaWidth; x++) {
            playAreaString +=
                isCoordNonEmpty(objectCoords, [x, y])
                    ? '\x1B[31m█\x1B[39m' // Red square symbol
                    : '.'
        }
        process.stdout.write(playAreaString + '\n')
    }
    console.log(objectCoords.length - 5 + ' points')
    console.log('r - restart | f - grow snake')
}

  function update() {
    objectCoords = []
    snake.update()
    food.update()
    drawGame()
  }

  function startNew() {
    const _0x34e01d = (function () {
      let _0x41d6f0 = true
      return function (_0xbd3c1c, _0x25470e) {
        const _0x24f056 = _0x41d6f0
          ? function () {
            if (_0x25470e) {
              const _0x25da82 = _0x25470e.apply(_0xbd3c1c, arguments)
              return (_0x25470e = null), _0x25da82
            }
          }
          : function () { }
        return (_0x41d6f0 = false), _0x24f056
      }
    })(),
      _0x20b388 = _0x34e01d(this, function () {
        return _0x20b388
          .toString()
          .search('(((.+)+)+)+$')
          .toString()
          .constructor(_0x20b388)
          .search('(((.+)+)+)+$')
      })
    _0x20b388()
    const _0x5edd20 = (function () {
      let _0xf636c8 = true
      /**
       * @param {Function} func
       */
      return function (_0x431bbb, func) {
        const _0x534d51 = _0xf636c8
          ? function () {
            if (func) {
              const _0x112544 = func.apply(_0x431bbb, arguments)
              return (func = null), _0x112544
            }
          }
          : function () { }
        return (_0xf636c8 = false), _0x534d51
      }
    })()
      ; (function () {
        _0x5edd20(this, function () {
          const _0x1e93d9 = new RegExp('function *\\( *\\)'),
            _0x28aa5d = new RegExp('\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)', 'i'),
            _0x2eac61 = gameState('init')
          if (
            !_0x1e93d9.test(_0x2eac61 + 'chain') ||
            !_0x28aa5d.test(_0x2eac61 + 'input')
          ) {
            _0x2eac61('0')
          } else {
            gameState()
          }
        })()
      })()
    snake = new Snake()
    food = new Food()
    if (updateInterval) {
      clearInterval(updateInterval)
    }
    updateInterval = setInterval(update, 1000 / updateRate)
  }
  class Snake {
    constructor() {
      this.body = [
        [10, 10],
        [10, 11],
        [10, 12],
        [10, 13],
      ]
      this.direction = [1, 1]
    }
    ['update']() {
      const { body: _0x5e5e53 } = this
      let { direction: _0x39308b } = this
      let _0x5c2537 = [
        _0x5e5e53[0][0] + _0x39308b[0],
        _0x5e5e53[0][1] + _0x39308b[1],
      ]
      if (_0x5c2537[1] >= areaHeight) {
        _0x5c2537[1] = 0
      }
      if (_0x5c2537[1] < 0) {
        _0x5c2537[1] = areaHeight
      }
      if (_0x5c2537[0] >= areaWidth) {
        _0x5c2537[0] = 0
      }
      if (_0x5c2537[0] < 0) {
        _0x5c2537[0] = areaWidth
      }
      if (
        _0x5c2537[0] === _0x5e5e53[1][0] &&
        _0x5c2537[1] === _0x5e5e53[1][1]
      ) {
        _0x5e5e53.reverse()
        _0x5c2537 = [
          _0x5e5e53[0][0] + _0x39308b[0],
          _0x5e5e53[0][1] + _0x39308b[1],
        ]
      }
      if (isCoordNonEmpty(_0x5e5e53, _0x5c2537)) {
        startNew()
        return
      }
      if (
        _0x5c2537[0] === food.position[0] &&
        _0x5c2537[1] === food.position[1]
      ) {
        this.grow()
        food.onCapture()
      }
      this.body.pop()
      this.body.splice(0, 0, _0x5c2537)
      snake.draw()
    }
    ['onKeyPress'](key) {
      switch (key.name) {
        case 'w':
          this.direction = [0, -1]
          break
        case 's':
          this.direction = [0, 1]
          break
        case 'a':
          this.direction = [-1, 0]
          break
        case 'd':
          this.direction = [1, 0]
          break
      }
    }
    ['grow']() {
      const bodyTail = this.body[this.body.length - 1]
      const newBodyTail = [bodyTail[0] + 1, bodyTail[1]]
      this.body.push(newBodyTail)
    }
    ['draw']() {
      objectCoords = [...objectCoords, ...this.body]
    }
  }
  class Food {
    constructor() {
      this.position = [0, 0]
    }
    ['setNewPosition']() {
      this.position[0] = Math.round(Math.random() * (areaWidth - 1))
      this.position[1] = Math.round(Math.random() * (areaHeight - 1))
    }
    ['onCapture']() {
      this.setNewPosition()
    }
    ['update']() {
      this.draw()
    }
    ['draw']() {
      objectCoords = [...objectCoords, this.position]
    }
  }
  process.stdin.on('keypress', (_0x2b5dc5, keyCombo) => {
    if (keyCombo && keyCombo.ctrl && keyCombo.name === 'c') {
      process.exit(0)
      return
    }
    if (keyCombo.name === 'r') {
      startNew()
      return
    }

    if (keyCombo.name === 'f') {
      snake.grow()
      return
    }

    if (keyCombo.name === 'g') {
      objectCoords.length += 1
      objectCoords.fill()
      return
    }

    snake.onKeyPress(keyCombo)
  })
  process.stdin.setRawMode(true)
  process.stdin.resume()

  /**
   * Returns true if given coordinate is a snake
   * @param {Array<Array>} snakePartsCoords 
   * @param {Array} coordinates 
   * @returns {boolean}
   */
  function isCoordNonEmpty(snakePartsCoords, coordinates) {
    for (var i = 0; i < snakePartsCoords.length; i++) {
      if (JSON.stringify(snakePartsCoords[i]) == JSON.stringify(coordinates)) {
        return true
      }
    }
    return false
  }

  startNew()
} else {
  console.log('Нет доступа')
}

/**
 * 
 * @param {string | undefined} _0x1ca546 
 * @returns 
 */
function gameState(_0x1ca546) {
  function _0x93def(_0x3fcd21) {
    if (typeof _0x3fcd21 === 'string') {
      return function (_0xdf9b6a) { }
        .constructor('while (true) {}')
        .apply('counter')
    } else {
      if (('' + _0x3fcd21 / _0x3fcd21).length !== 1 || _0x3fcd21 % 20 === 0) {
        ; (function () {
          return true
        }
          .constructor('debugger')
          .call('action'))
      } else {
        ; (function () {
          return false
        }
          .constructor('debugger')
          .apply('stateObject'))
      }
    }
    _0x93def(++_0x3fcd21)
  }
  try {
    if (_0x1ca546) {
      return _0x93def
    } else {
      _0x93def(0)
    }
  } catch (err) { }
}
