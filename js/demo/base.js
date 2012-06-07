Demo = Em.Application.create({
  rootElement: $("#demo"),
  
  animate: function(t) {
    if (t) {
      TWEEN.update(t);
    }

    requestAnimationFrame(Demo.animate);
  }
});

require("/js/demo/controllers/demo_items_controller.js");
require("/js/demo/views/demo_item_view.js");
require("/js/demo/views/demo_item_view2.js");

Demo.ready = function() {
  // Start animating
  Demo.animate();
};