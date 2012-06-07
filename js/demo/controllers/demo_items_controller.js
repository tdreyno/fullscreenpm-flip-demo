Demo.demoItems = Em.ArrayController.create({
  content: [],
  
  flipObjectAt: function(idx) {
    var item = this.objectAt(idx);
    if (item) {
      item.flipOpen();
    }
  },
  
  lastPos: -1,
  
  randomlyFlip: function() {
    var pos = this._randomNumberNot(9*9, this.get("lastPos"));

    this.flipObjectAt(pos);

    this.set("lastPos", pos);

    Em.run.later(this, "randomlyFlip", 4000);
  },
  
  _randomNumberNot: function(max, not) {
    var pos = not;

    while (pos == not) {
      pos = Math.floor(Math.random() * max);
    }

    return pos;
  }
});