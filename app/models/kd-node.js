module.exports = class KdNode {
  constructor(point, isXAligned=true) {
    this.point = point;
    this.leftNode = null;
    this.rightNode = null;
    this.isXAligned = isXAligned;
    this.nearestNode = null;
    this.nearestDistance = null;
  }

  getLeftNode() {
    return this.leftNode;
  }

  getRightNode() {
    return this.rightNode;
  }

  insert(kdNode) {
    if (this.isToTheLeft(kdNode)) {
      if (this.leftNode === null) {
        kdNode.isXAligned = !this.isXAligned;
        this.leftNode = kdNode;
      } else {
        this.leftNode.insert(kdNode);
      }
    } else {
      if (this.rightNode === null) {
        kdNode.isXAligned = !this.isXAligned;
        this.rightNode = kdNode;
      } else {
        this.rightNode.insert(kdNode);
      }
    }
  }

  isToTheLeft(kdNode) {
    if (this.isXAligned) {
      return (kdNode.point.x < this.point.x);
    } else {
      return (kdNode.point.y < this.point.y)
    }
  }

  distanceToNode(kdNode) {
    const xDiff = this.point.x - kdNode.point.x;
    const yDiff = this.point.y - kdNode.point.y;

    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }

  checkIsNearestNode(kdNode) {
    if (!this.isSameNode(kdNode)) {
      const currentDistance = this.distanceToNode(kdNode);
      if (this.nearestDistance === null || this.nearestDistance > currentDistance) {
        this.nearestDistance = currentDistance;
        this.nearestNode = kdNode;
      }
    } else {
      console.log("SKIPPED: " + this.point.name);
    }
  }

  isLeafNode() {
    return (this.getLeftNode() === null && this.getRightNode() === null);
  }

  isSameNode(kdNode) {
    return (this.point.name === kdNode.point.name);
  }

  getNearestNode(kdTree) {
    if (kdTree === null) return;
    if (kdTree.isLeafNode()) {
      this.checkIsNearestNode(kdTree);
    } else {
      if (this.isToTheLeft(kdTree)) {
        this.getNearestNode(kdTree.getLeftNode())
      } else {
        this.getNearestNode(kdTree.getRightNode());
      }
      this.checkIsNearestNode(kdTree);
      if (kdTree.isSameNode(this.nearestNode)) {
        if (!this.isToTheLeft(kdTree)) {
          this.getNearestNode(kdTree.getLeftNode())
        } else {
          this.getNearestNode(kdTree.getRightNode());
        }
      }
    }
  }
};

