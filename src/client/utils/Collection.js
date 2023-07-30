module.exports = class Collection extends Map {
  constructor(iterable) {
    super(iterable);
    this.usageFrequency = new Map();
  }

  get(key) {
    const value = super.get(key);
    if (value) {
      // Increment the usage frequency for the element
      const currentFrequency = this.usageFrequency.get(key) || 0;
      this.usageFrequency.set(key, currentFrequency + 1);
    }
    return value;
  }

  // Optionally, you can add a method to get the least frequently used key directly from the Collection
  getLeastUsedKey() {
    let minFrequency = Infinity;
    let leastUsedKey = null;

    for (const [key, frequency] of this.usageFrequency.entries()) {
      if (frequency < minFrequency) {
        minFrequency = frequency;
        leastUsedKey = key;
      }
    }

    return leastUsedKey;
  }
};
