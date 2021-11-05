class BinaryHeap {
  constructor(scoreFunction) {
    this.content = [];
    this.scoreFunction = scoreFunction;
  }

  push(element) {
    this.content.push(element);
    this.bubbleUp(this.content.length - 1);
  }

  pop() {
    const result = this.content[0];
    const end = this.content.pop();
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }

    return result;
  }

  size() {
    return this.content.length;
  }

  bubbleUp(n) {
    let currentIndex = n;
    const element = this.content[currentIndex];
    const score = this.scoreFunction(element);

    while (currentIndex > 0) {
      const parentN = Math.floor((currentIndex + 1) / 2) - 1;
      const parent = this.content[parentN];
      if (score >= this.scoreFunction(parent)) break;

      this.content[parentN] = element;
      this.content[currentIndex] = parent;

      currentIndex = parentN;
    }
  }

  sinkDown(n) {
    let currentIndex = n;
    const { length } = this.content;
    const element = this.content[currentIndex];
    const elemScore = this.scoreFunction(element);

    while (true) {
      const rightChildIndex = (currentIndex + 1) * 2;
      const leftChildIndex = rightChildIndex - 1;

      let swap = null;

      if (leftChildIndex < length) {
        const leftChild = this.content[leftChildIndex];
        const leftChildScore = this.scoreFunction(leftChild);
        if (leftChildScore < elemScore) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        const rightChild = this.content[rightChildIndex];
        const rightChildScore = this.scoreFunction(rightChild);
        if (
          rightChildScore <
          (swap == null ? elemScore : this.scoreFunction(swap))
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap == null) break;

      this.content[currentIndex] = this.content[swap];
      this.content[swap] = element;
      currentIndex = swap;
    }
  }
}

export default BinaryHeap;
