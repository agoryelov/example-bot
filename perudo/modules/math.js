
/**
 * Generates an array of all possible bid actions for a given
 * number of dice and number of faces ordered by their strength.
 * 
 * Note: Does not include liar or exact.
 * Example: [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 1]...]
 */
const generateActions = (nDice, nFaces) => {
  nFaces = nFaces ? nFaces : 6;
  let actions = [];
  let halfBid = nDice + 1;
  for (let d = 1; d <= nDice; d++) {
    for (let f = 2; f <= nFaces; f++) {
        actions.push([d, f]);
    }
    if (d % 2 != 0) {
      halfBid = Math.floor((d + 1) / 2);
        actions.push([halfBid, 1]);
    }
  }
  for (let h = halfBid + 1; h <= nDice; h++) {
      actions.push([h, 1]);
  }
  return actions;
}

module.exports = {
  generateActions
}