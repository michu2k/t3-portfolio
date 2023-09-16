function getUserInitials(fullname?: string | null) {
  const letters = (fullname ?? "").match(/\b(\w)/g) || [];
  return `${letters[0] ?? ""}${letters[1] ?? ""}`;
}

export {getUserInitials};
