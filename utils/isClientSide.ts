function isClientSide() {
  return typeof window !== "undefined";
}

export {isClientSide};