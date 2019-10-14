"use strict";

var _class;

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function decorateSword(target, key, descriptor) {
  // 首先获取到 init 方法
  var initMethod = descriptor.value; // 宝剑添加攻击力 100 点

  var moreAtk = 100;
  var returnObj;

  descriptor.value = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    args[0] += moreAtk;
    returnObj = initMethod.apply(target, args);
    return returnObj;
  };
}

function decorateArmour(target, key, descriptor) {
  // 首先获取到 init 方法
  var initMethod = descriptor.value; // 护甲添加防御力 100 点

  var moreDef = 100;
  var returnObj;

  descriptor.value = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args[1] += moreDef;
    returnObj = initMethod.apply(target, args);
    return returnObj;
  };
}

var Warrior = (_class =
/*#__PURE__*/
function () {
  function Warrior() {
    var atk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
    var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    var hp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    var mp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;

    _classCallCheck(this, Warrior);

    this.init(atk, def, hp, mp);
  }

  _createClass(Warrior, [{
    key: "init",
    value: function init(atk, def, hp, mp) {
      this.atk = atk;
      this.def = def;
      this.hp = hp;
      this.mp = mp;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "\u653B\u51FB\u529B:".concat(this.atk, ", \u9632\u5FA1\u529B: ").concat(this.def, ", \u8840\u91CF: ").concat(this.hp, ", \u6CD5\u529B\u503C: ").concat(this.mp);
    }
  }]);

  return Warrior;
}(), (_applyDecoratedDescriptor(_class.prototype, "init", [decorateSword, decorateArmour], Object.getOwnPropertyDescriptor(_class.prototype, "init"), _class.prototype)), _class);
var Reaper = new Warrior();
console.log("\u52C7\u8005\u72B6\u6001 => ".concat(Reaper));