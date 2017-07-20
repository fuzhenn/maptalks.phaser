import * as maptalks from 'maptalks';
import * as Phaser from 'phaser-ce';

const options = {
    antialias:true,
    multiTexture:true
};

export class PhaserLayer extends maptalks.CanvasLayer {
    coordinateToPoint(coord) {
        let map = this.getMap();
        if (!map) return null;
        return map.coordinateToContainerPoint(coord).toArray();
    }
}

PhaserLayer.mergeOptions(options);

class PhaserRenderer extends maptalks.renderer.CanvasLayerRenderer {

    draw() {
        super.draw();
    }

    drawOnInteracting() {
        super.drawOnInteracting();
    }

    getPrepareParams() {
        return [this.game];
    }

    getDrawParams() {
        return [this.game];
    }

    createCanvas() {
        if (this.inited) {
            return;
        }
        this.inited = true;
        const map = this.getMap();
        const size = map.getSize();

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
        this.game = new Phaser.Game(
            size.width, size.height, Phaser.CANVAS,
            this._container,
            {
                preload: this._onGamePreload.bind(this),
                create: this._onGameCreate.bind(this),
                update: this._onGameUpdate.bind(this)
            }
        );
        this.canvas = this.game.canvas;
    }

    _onGamePreload(e) {
        this.layer.fire('phaser.preload', { game:e });
    }

    _onGameCreate(e) {
        this.canvas = e.canvas;
        this.setCanvasUpdated();
        this.layer.fire('phaser.create', { game:e });
    }

    _onGameUpdate(e) {
        this.setCanvasUpdated();
        this.layer.fire('phaser.update', { game:e });
    }

    resizeCanvas() {
        if (!this.canvas) {
            return;
        }
    }

    clearCanvas() {
        if (!this.canvas) {
            return;
        }

    }

    prepareCanvas() {
        if (this.context) {
            // the layer is double buffered, clip the canvas with layer's mask.
            return super.prepareCanvas();
        }
        if (!this.canvas) {
            this.createCanvas();
        } else {
            this.clearCanvas();
        }
        this.layer.fire('renderstart', { 'context' : this.context, 'gl' : this.gl });
        return null;
    }
}
PhaserLayer.registerRenderer('canvas', PhaserRenderer);
