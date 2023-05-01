export const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const modalVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { delay: 0.5 } },
};
