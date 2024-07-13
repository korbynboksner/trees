/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    if (!this.root) return 0;

    let total = 0;

    function sum(node) {
      total += node.val;
      for (let child of node.children) {
        sum(child);
      }
    }

    sum(this.root);
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */
  countEvens() {
    if (!this.root) return 0;

    let count = 0;

    function countEvenNodes(node) {
      if (node.val % 2 === 0) count++;
      for (let child of node.children) {
        countEvenNodes(child);
      }
    }

    countEvenNodes(this.root);
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */
  numGreater(lowerBound) {
    if (!this.root) return 0;

    let count = 0;

    function countNodesGreaterThan(node, lowerBound) {
      if (node.val > lowerBound) count++;
      for (let child of node.children) {
        countNodesGreaterThan(child, lowerBound);
      }
    }

    countNodesGreaterThan(this.root, lowerBound);
    return count;
  }
}

module.exports = { Tree, TreeNode };