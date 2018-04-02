import { lcm, useCache } from "./util";
import NumLooper from "./NumLooper";

const create = () => {
  const tickMetas = [];
  const ticks = [];

  let tickNumLooper = NumLooper.create(1, 1);

  const getCachedTickIndexs = useCache(tickNum => {
    const indexs = [];

    tickMetas.forEach((tick, index) => {
      if (tick.gap === 0 || tickNum % tick.gap === 0) {
        indexs.push(index);
      }
    });

    return indexs;
  });

  const getNextTicks = () => {
    const nextTickIndexs = getCachedTickIndexs(tickNumLooper.getNum());
    const nextTicks = nextTickIndexs.map(index => ticks[index]);

    tickNumLooper.next();

    return nextTicks;
  };

  const resetTickNumMax = newGap => {
    const oldTickNumMax = tickNumLooper.getMax();
    console.log("chck", oldTickNumMax, newGap, lcm(oldTickNumMax, newGap));
    tickNumLooper.setMax(lcm(oldTickNumMax, newGap));
  };

  const afterAddTick = (tick, tickMeta) => {
    resetTickNumMax(tickMeta.gap);
    getCachedTickIndexs.clearCache();
  };

  const tickMetaDefault = {
    order: 10000,
    gap: 1
  };
  const addTick = (tick, tickMeta) => {
    console.log(tickMeta);
    tickMeta = {
      ...tickMetaDefault,
      ...tickMeta
    };

    tickMetas.push(tickMeta);
    ticks.push(tick);

    afterAddTick(tick, tickMeta);
  };

  const preload = function*() {
    while (!tickNumLooper.isLast()) {
      getCachedTickIndexs(tickNumLooper.getNum());
      tickNumLooper.next();
      yield [tickNumLooper.getMax(), tickNumLooper.getNum()];
    }
  };

  return {
    getNextTicks,
    addTick,
    preload
  };
};

export default { create };
