// Shared handle to the site's Lenis instance so other components (e.g. the page
// transition) can pause scrolling or jump to the top without prop drilling.
let instance = null;

export const setLenis = (lenis) => {
  instance = lenis;
};

export const getLenis = () => instance;
