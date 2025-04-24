import * as PIXI from 'pixi.js';
import 'pixi-tween';
import * as filters from 'pixi-filters';
import EventEmitter from 'events';

export default class NoiseImage extends EventEmitter {
    constructor($target) {
        super();

        this.$target = $target;
        this.screenWidth = $target.width();
        this.screenHeight = $target.height();
        this.timer1Id = null;
        this.timer2Id = null;

        const app = new PIXI.Application({
            width: this.screenWidth,
            height: this.screenHeight,
            view: $target.get(0),
            transparent: true,
        });

        const container = new PIXI.Container();
        container.x = 0;
        container.y = 0;
        container.width = app.screen.width;
        container.height = app.screen.height;
        this.container = container;

        app.stage.addChild(container);
        this.app = app;
    }

    setup(imageResource) {
        const image = PIXI.Sprite.from(imageResource.texture);
        image.anchor.set(0);
        image.position.set(0, 0);

        const noise = new PIXI.filters.NoiseFilter({
            noise: 0.5,
            seed: 0.5,
        });
        const glitch = new filters.GlitchFilter({
            slices: 100,
            offset: 0,
            direction: 0,
            fillMode: filters.GlitchFilter.LOOP,
            seed: 0.5,
            average: false,
            red: {
                x: -7.4,
                y: 2,
            },
            blur: {
                x: 10,
                y: -4,
            },
            green: {
                x: -10,
                y: 4,
            },
        });
        noise.enabled = false;
        glitch.enabled = false;

        this.noiseFilter = noise;
        this.glitchFilter = glitch;

        image.filters = [glitch, noise];

        this.container.addChild(image);

        this.app.ticker.add(this.runNoise.bind(this));
    }

    run() {
        this.timer1Id = setTimeout(() => {
            this.noiseFilter.enabled = false;
            this.glitchFilter.enabled = false;

            this.timer2Id = setTimeout(() => {
                this.run();
            }, 3000);
        }, 200);

        this.noiseFilter.enabled = true;
        this.glitchFilter.enabled = true;
    }

    stop() {
        clearTimeout(this.timer1Id);
        clearTimeout(this.timer2Id);
        this.noiseFilter.enabled = false;
        this.glitchFilter.enabled = false;
    }

    runNoise() {
        const glitch = this.glitchFilter;
        const noise = this.noiseFilter;

        glitch.slices = Math.floor(Math.random() * 500);
        glitch.offset = Math.floor(Math.random() * 101);
        glitch.seed = Math.random();

        noise.noise = Math.random();
        noise.seed = Math.random();
    }
}
