Demo.FuelItem2 = Em.View.extend({
  templateName: "demo_item",
  
  classNameBindings: 'defaultClass'.w(),
    
  defaultClass: "demo_item",
  
  isFlipped: false,
  duration: 800,
  reverseAfter: 4000,
  easing: TWEEN.Easing.Quadratic.InOut,
  
  // Size at init, no mechanism for updating on the fly
  width: 128,
  height: 128,
  row: 1,
  col: 1,
  
  reversed: false,
  
  didInsertElement: function() {
    this._super();
    
    this.$().css({ width: this.get("width"), height: this.get("height") });
    this.$("*").css({ width: (this.get("width") / 2) });
    
    this.$(".bottomRight, .topRight").css({ 
      backgroundPosition: (this.get("width") / -2) + "px 0"
    });
    
    this.$(".topLeft, .topRight").css({ 
      backgroundImage: "url(img/google-chrome-logo-620x620.jpg)"
    });
    
    this.$(".bottomLeft, .bottomRight").css({ 
      backgroundImage: "url(img/HTML5rawkes.png)",
      backgroundColor: "black"
    });

    this._positionDidChange();
  },
  
  baseTransform: "translateX(0) translateY(0)",
  
  _positionDidChange: function() {
    var top  = (this.get("row") - 1) * this.get("height"),
        left = (this.get("col") - 1) * this.get("width");
        
    this.set("baseTransform", "translateY(" + top + "px) translateX(" + left + "px)");
    
    this._canvasBackgroundForPosition(left, top);
  }.observes("row", "col"),
  
  _canvasBackgroundForPosition: function(x, y) {
    if (typeof Demo.largeImage === "undefined") {
      Demo.largeImage = document.getElementById("large");
    }
  
    var w = this.get("width");
    var h = this.get("height");
    var ctx = document.getCSSCanvasContext("2d", Em.guidFor(this), w, h);
    
    ctx.drawImage(
      Demo.largeImage, 
      x, y, 
      w, h,
      0, 0,
      w, h
    );
  },
  
  _baseTransformDidChange: function() {
    this.setTransform(this.get("baseTransform"));
  }.observes("baseTransform"),
  
  setTransform: function(value) {
    this.get("element").style.WebkitTransform = value;
  },
  
  setRotation: function(pos, reverse) {
    var topRightProgress,
        bottomLeftProgress;
  
    if (typeof this.bottomLeftElem === "undefined") {
      this.bottomLeftElem = this.$(".bottomLeft")[0];
    }

    if (typeof this.topRightElem === "undefined") {
      this.topRightElem = this.$(".topRight")[0];
    }

    if (reverse) {
      bottomLeftProgress = pos * 180;
      topRightProgress   = bottomLeftProgress - 180;
    } else {
      topRightProgress   = pos * -180;
      bottomLeftProgress = topRightProgress + 180;
    }

    this.bottomLeftElem.style.WebkitTransform = "rotateY(" + bottomLeftProgress.toFixed(10) + "deg)";
    this.topRightElem.style.WebkitTransform = "rotateY(" + topRightProgress.toFixed(10) + "deg)";
  }
});