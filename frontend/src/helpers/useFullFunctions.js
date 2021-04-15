export const amountFormatter = (amount, maxDecimals = 2) => {
  let n = Math.abs(amount).toFixed(maxDecimals).split(".");

  n[0] = n[0]
    .split("")
    .reverse()
    .map((c, i, a) => (i > 1 && i < a.length && i % 2 != 0 ? c + "," : c))

    .reverse()
    .join("");
  let final = (Math.sign(amount) < 0 ? "-" : "") + n.join(".");

  return final;
};

export const textTruncate = (text, textLength = 25, textReplace = "...") =>
  text.substr(0, textLength) + textReplace;
