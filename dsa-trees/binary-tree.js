/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth(node = this.root) {
    if (!node) return 0;
    if (!node.left && !node.right) return 1;
    if (!node.left) return this.minDepth(node.right) + 1;
    if (!node.right) return this.minDepth(node.left) + 1;
    return Math.min(this.minDepth(node.left), this.minDepth(node.right)) + 1;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth(node = this.root) {
    if (!node) return 0;
    return Math.max(this.maxDepth(node.left), this.maxDepth(node.right)) + 1;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum() {
    let result = { max: 0 };

    function helper(node) {
      if (!node) return 0;
      const leftSum = Math.max(helper(node.left), 0);
      const rightSum = Math.max(helper(node.right), 0);
      result.max = Math.max(result.max, node.val + leftSum + rightSum);
      return node.val + Math.max(leftSum, rightSum);
    }

    helper(this.root);
    return result.max;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(lowerBound) {
    if (!this.root) return null;
    let queue = [this.root];
    let nextLarger = null;

    while (queue.length) {
      let current = queue.shift();
      if (current.val > lowerBound && (nextLarger === null || current.val < nextLarger)) {
        nextLarger = current.val;
      }
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return nextLarger;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */
  areCousins(node1, node2) {
    if (!this.root || node1 === node2) return false;

    function getDepthAndParent(node, target, depth = 0, parent = null) {
      if (!node) return null;
      if (node === target) return { depth, parent };

      return (
        getDepthAndParent(node.left, target, depth + 1, node) ||
        getDepthAndParent(node.right, target, depth + 1, node)
      );
    }

    const node1Info = getDepthAndParent(this.root, node1);
    const node2Info = getDepthAndParent(this.root, node2);

    return (
      node1Info &&
      node2Info &&
      node1Info.depth === node2Info.depth &&
      node1Info.parent !== node2Info.parent
    );
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */
  static serialize(tree) {
    const values = [];

    function traverse(node) {
      if (!node) {
        values.push('null');
      } else {
        values.push(node.val);
        traverse(node.left);
        traverse(node.right);
      }
    }

    traverse(tree.root);
    return values.join(',');
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */
  static deserialize(stringTree) {
    if (!stringTree) return null;

    const values = stringTree.split(',');
    let index = 0;

    function buildTree() {
      if (values[index] === 'null') {
        index++;
        return null;
      }

      const node = new BinaryTreeNode(parseInt(values[index]));
      index++;
      node.left = buildTree();
      node.right = buildTree();
      return node;
    }

    return new BinaryTree(buildTree());
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */
  lowestCommonAncestor(node1, node2) {
    function findLCA(node, node1, node2) {
      if (!node) return null;
      if (node === node1 || node === node2) return node;

      const left = findLCA(node.left, node1, node2);
      const right = findLCA(node.right, node1, node2);

      if (left && right) return node;
      return left || right;
    }

    return findLCA(this.root, node1, node2);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };