const latticeStore = {
  ref: { current: [] },
  setLatticePoints: (points) => {
    latticeStore.ref.current = points;
  },
  getLatticePoints: () => latticeStore.ref.current,
};

export const useLatticeStore = () => latticeStore;
