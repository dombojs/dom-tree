
module.exports = tree;

/**
 * transform component/dom list nodes into a tree
 *
 * @return {TreeNode} tree structure
 * @api public
 */

function tree() {

    var nodes = this.toArray().map(TreeNode.create),
        len = nodes.length,
        parents = [];

    for (var i = 0; i < len; i++) {
        parents[i] = null;
        var n = nodes[i].domNode, p = n;
        while (p = p.parentNode) {
            if (p === document.body || parents[i] !== null) {
                break;
            }
            for (var j = 0; j < len; j++) {
                if (p === nodes[j].domNode) {
                    parents[i] = nodes[j];
                    break;
                }
            }
        }
    }

    var root = new TreeNode;

    for (var i = 0; i < len; i++) {
        (parents[i] || root).addChild(nodes[i]);
    }

    return root;

}

function TreeNode(domNode) {
    this.domNode = domNode;
    this.children = [];
    this.parent = null;
}

TreeNode.create = function(domNode) {
    return new TreeNode(domNode);
}

TreeNode.prototype.addChild = function(node) {
    node.parent = this;
    this.children.push(node);
}

TreeNode.prototype.toArray = function(arr) {
    if (!arr) arr = [];
    this.visit(function(node) {
        arr.push(node.domNode);
    });
    return arr;
}

TreeNode.prototype.toList = function(reverse) {
    var arr = this.toArray();
    if (reverse) arr.reverse();
    return dom(arr);
}

TreeNode.prototype.visit = function(fn) {
    if (this.domNode) {
        if (false === fn(this)) return false;
    }
    for (var i = 0, len = this.children.length; i < len; i++) {
        if (false === this.children[i].visit(fn)) return false;
    }
}
