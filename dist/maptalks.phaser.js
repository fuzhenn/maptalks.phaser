/*!
 * maptalks.phaser v2.0.2
 * LICENSE : MIT
 * (c) 2016-2017 maptalks.org
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks'), require('phaser-ce')) :
	typeof define === 'function' && define.amd ? define(['exports', 'maptalks', 'phaser-ce'], factory) :
	(factory((global.maptalks = global.maptalks || {}),global.maptalks,global.Phaser));
}(this, (function (exports,maptalks,Phaser) { 'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var options = {
    antialias: true,
    multiTexture: true
};

var PhaserLayer = function (_maptalks$CanvasLayer) {
    _inherits(PhaserLayer, _maptalks$CanvasLayer);

    function PhaserLayer() {
        _classCallCheck(this, PhaserLayer);

        return _possibleConstructorReturn(this, _maptalks$CanvasLayer.apply(this, arguments));
    }

    PhaserLayer.prototype.coordinateToPoint = function coordinateToPoint(coord) {
        var map = this.getMap();
        if (!map) return null;
        return map.coordinateToContainerPoint(coord).toArray();
    };

    return PhaserLayer;
}(maptalks.CanvasLayer);

PhaserLayer.mergeOptions(options);

var PhaserRenderer = function (_maptalks$renderer$Ca) {
    _inherits(PhaserRenderer, _maptalks$renderer$Ca);

    function PhaserRenderer() {
        _classCallCheck(this, PhaserRenderer);

        return _possibleConstructorReturn(this, _maptalks$renderer$Ca.apply(this, arguments));
    }

    PhaserRenderer.prototype.draw = function draw() {
        _maptalks$renderer$Ca.prototype.draw.call(this);
    };

    PhaserRenderer.prototype.drawOnInteracting = function drawOnInteracting() {
        _maptalks$renderer$Ca.prototype.drawOnInteracting.call(this);
    };

    PhaserRenderer.prototype.getPrepareParams = function getPrepareParams() {
        return [this.game];
    };

    PhaserRenderer.prototype.getDrawParams = function getDrawParams() {
        return [this.game];
    };

    PhaserRenderer.prototype.createCanvas = function createCanvas() {
        if (this.inited) {
            return;
        }
        this.inited = true;
        var map = this.getMap();
        var size = map.getSize();

        // let _options = maptalks.Util.extend({},options);
        // _options.width = size.width;
        // _options.height = size.height;
        // _options.renderer = Phaser.AUTO;
        // _options.state = {};
        // _options.state.preload = (e) => {
        //     this.layer.fire('phaser.preload',{game:e});
        // }
        // _options.state.update = this._onGameUpdate.bind(this);
        // _options.state.create = (e) => {
        //     this.canvas = e.canvas;
        //     this.layer.fire('phaser.create',{game:e});
        // }
        this._container = maptalks.DomUtil.createEl('div');
        //let options.parent = this._container;
        this.game = new Phaser.Game(size.width, size.height, Phaser.CANVAS, this._container, {
            preload: this._onGamePreload.bind(this),
            create: this._onGameCreate.bind(this)
            //update: this._onGameCreate.bind(this)
        });
        this.canvas = this.game.canvas;
    };

    PhaserRenderer.prototype._onGamePreload = function _onGamePreload(e) {
        this.layer.fire('phaser.preload', { game: e });
    };

    PhaserRenderer.prototype._onGameCreate = function _onGameCreate(e) {
        this.canvas = e.canvas;
        this.setCanvasUpdated();
        this.layer.fire('phaser.create', { game: e });
    };

    PhaserRenderer.prototype._onGameUpdate = function _onGameUpdate(e) {
        this.setCanvasUpdated();
        this.layer.fire('phaser.update', { game: e });
    };

    PhaserRenderer.prototype.resizeCanvas = function resizeCanvas() {
        if (!this.canvas) {
            return;
        }
    };

    PhaserRenderer.prototype.clearCanvas = function clearCanvas() {
        if (!this.canvas) {
            return;
        }
    };

    PhaserRenderer.prototype.prepareCanvas = function prepareCanvas() {
        if (this.context) {
            // the layer is double buffered, clip the canvas with layer's mask.
            return _maptalks$renderer$Ca.prototype.prepareCanvas.call(this);
        }
        if (!this.canvas) {
            this.createCanvas();
        } else {
            this.clearCanvas();
        }
        this.layer.fire('renderstart', { 'context': this.context, 'gl': this.gl });
        return null;
    };

    return PhaserRenderer;
}(maptalks.renderer.CanvasLayerRenderer);

PhaserLayer.registerRenderer('canvas', PhaserRenderer);

exports.PhaserLayer = PhaserLayer;

Object.defineProperty(exports, '__esModule', { value: true });

})));
