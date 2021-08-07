

const scrollToRef = (ref, offset = 0) => window.scrollTo(0, ref.current.offsetTop + offset);

export default scrollToRef;