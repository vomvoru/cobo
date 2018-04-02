import "babel-polyfill";

import _ from "lodash";
import Tick from "./Tick";
import Canvas from "./Canvas";

const create = ({ width = 480, height = 320 }) => {
  const canvasInstance = Canvas.create({ width, height });
  const tickInstance = Tick.create();

  const draw = () => {
    canvasInstance.clear();

    const ticks = tickInstance.getNextTicks();

    ticks.forEach(tick => {
      canvasInstance.begin();
      tick(canvasInstance);
      canvasInstance.close();
    });

    requestAnimationFrame(draw);
  };

  return {
    getCanvas: () => canvasInstance.getDOM(),
    run: () => _.once(draw)(),
    addTick: (tick, tickMeta) => tickInstance.addTick(tick, tickMeta),
    preload: () => tickInstance.preload()
  };
};

export default {
  create
};
