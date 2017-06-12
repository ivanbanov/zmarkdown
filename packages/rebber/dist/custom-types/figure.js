'use strict';

/* Dependencies. */
var all = require('../all');
var has = require('has'

/* Expose. */
);module.exports = figure;

var defaultMacros = {
  blockquote: function blockquote(innerText) {
    var caption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Anonymous';
    return '\\begin{Quotation}{' + caption + '}\n' + innerText + '\n\\end{Quotation}\n\n';
  }

  /* Stringify a Figure `node`. */
};function figure(ctx, node) {
  var type = node.children[0].type;
  var macro = has(ctx, 'figure') && has(ctx.figure, type) && ctx.figure[type] || has(defaultMacros, type) && defaultMacros[type];
  if (!macro) return;

  var caption = '';
  if (node.children.length) {
    caption = node.children.filter(function (node) {
      return node.type === 'figcaption';
    }).map(function (node) {
      return all(ctx, node);
    }).join('');
  }

  node.children = node.children.filter(function (node) {
    return node.type !== 'figcaption';
  });
  if (node.children.length === 1) {
    node.children = node.children[0].children;
  }
  var innerText = all(ctx, node);
  return macro(innerText.trim(), caption);
}