'use strict';

/* Expose. */
module.exports = thematicBreak;

/* Stringify a delete `node`. */
function thematicBreak(ctx, node, index, parent) {
  var cmd = ctx.thematicBreak || '\\horizontalLine';

  return cmd + '\n\n';
}