// True only when ?static=1 is present (QA screenshots). Read once on the client.
// Normal visits never set this, so entrance animations play as designed.
export const STATIC =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("static");
