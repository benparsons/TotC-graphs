//
//  main.js
//
//  A project template for using arbor.js
//

(function ($) {

  var Renderer = function(canvas){
    var canvas = $(canvas).get(0)
    var ctx = canvas.getContext("2d");
    var particleSystem

    var that = {
      init:function(system){
        //
        // the particle system will call the init function once, right before the
        // first frame is to be drawn. it's a good place to set up the canvas and
        // to pass the canvas size to the particle system
        //
        // save a reference to the particle system for use in the .redraw() loop
        particleSystem = system

        // inform the system of the screen dimensions so it can map coords for us.
        // if the canvas is ever resized, screenSize should be called again with
        // the new dimensions
        particleSystem.screenSize(canvas.width, canvas.height)
        particleSystem.screenPadding(80) // leave an extra 80px of whitespace per side

        // set up some event handlers to allow for node-dragging
        that.initMouseHandling()
      },

      redraw:function(){
        //
        // redraw will be called repeatedly during the run whenever the node positions
        // change. the new positions for the nodes can be accessed by looking at the
        // .p attribute of a given node. however the p.x & p.y values are in the coordinates
        // of the particle system rather than the screen. you can either map them to
        // the screen yourself, or use the convenience iterators .eachNode (and .eachEdge)
        // which allow you to step through the actual node objects but also pass an
        // x,y point in the screen's coordinate system
        //
        ctx.fillStyle = "white"
        ctx.fillRect(0,0, canvas.width, canvas.height)

        particleSystem.eachEdge(function(edge, pt1, pt2){
          // edge: {source:Node, target:Node, length:#, data:{}}
          // pt1:  {x:#, y:#}  source position in screen coords
          // pt2:  {x:#, y:#}  target position in screen coords

          // draw a line from pt1 to pt2
          ctx.strokeStyle = "rgba(0,0,0, .333)"
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(pt1.x, pt1.y)
          ctx.lineTo(pt2.x, pt2.y)
          //ctx.arcTo(pt2.x, pt2.y, (pt1.x+pt2.x), (pt1.y+pt2.y), 1);
          ctx.stroke()




        })

        particleSystem.eachNode(function(node, pt){

if (node.name == "1") {
//            node.p = arbor.Point(0, -100)
}
if (node.name == "17") {
            node.p = arbor.Point(0, -100)
}
if (node.name == "65") {
            node.p = arbor.Point(0, 10)
}
if (node.name == "23") {
            node.p = arbor.Point(10, -100)
}
if (node.name == "52") {
            node.p = arbor.Point(-10, -100)
}
if (node.name == "51") {
 //           node.p = arbor.Point(0, -50)
}

          // node: {mass:#, p:{x,y}, name:"", data:{}}
          // pt:   {x:#, y:#}  node position in screen coords

          // draw a rectangle centered at pt
          var w = ctx.measureText(node.data.label||"").width + 6
          var label = node.name
          if (!(label||"").match(/^[ \t]*$/)){
            pt.x = Math.floor(pt.x)
            pt.y = Math.floor(pt.y)
          }else{
            label = null
          }

          // clear any edges below the text label
          // ctx.fillStyle = 'rgba(255,255,255,.6)'
          // ctx.fillRect(pt.x-w/2, pt.y-7, w,14)


          ctx.clearRect(pt.x-w/2, pt.y-7, w,14)



          // draw the text
          if (label){
            if (label === "65")
                ctx.font = "bold 14px Arial"
            else
                ctx.font = "11px Arial"
            ctx.textAlign = "center"

            if (node.data.killscreen)
		ctx.fillStyle = "#FF0000"
            else ctx.fillStyle = "#888888"

            //ctx.fillStyle = "#888888"

            // ctx.fillText(label||"", pt.x, pt.y+4)
            ctx.fillText(label||"", pt.x, pt.y+4)
          }
        })
      },

      initMouseHandling:function(){
        // no-nonsense drag and drop (thanks springy.js)
        var dragged = null;

        // set up a handler object that will initially listen for mousedowns then
        // for moves and mouseups while dragging
        var handler = {
          clicked:function(e){
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            dragged = particleSystem.nearest(_mouseP);

            if (dragged && dragged.node !== null){
              // while we're dragging, don't let physics move the node
              dragged.node.fixed = true
            }

            $(canvas).bind('mousemove', handler.dragged)
            $(window).bind('mouseup', handler.dropped)

            return false
          },
          dragged:function(e){
            var pos = $(canvas).offset();
            var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

            if (dragged && dragged.node !== null){
              var p = particleSystem.fromScreen(s)
              dragged.node.p = p
            }

            return false
          },

          dropped:function(e){
            if (dragged===null || dragged.node===undefined) return
            if (dragged.node !== null) dragged.node.fixed = false
            dragged.node.tempMass = 1000
            dragged = null
            $(canvas).unbind('mousemove', handler.dragged)
            $(window).unbind('mouseup', handler.dropped)
            _mouseP = null
            return false
          }
        }

        // start listening
        $(canvas).mousedown(handler.clicked);

      },

    }
    return that
  }

  $(document).ready(function(){
    var sys = arbor.ParticleSystem(1000, 600, 0.5) // create the system with sensible repulsion/stiffness/friction
    sys.parameters({gravity:true}) // use center-gravity to make the graph settle nicely (ymmv)
    sys.renderer = Renderer("#viewport") // our newly created renderer will have its .init() method called shortly by sys...

    // add some nodes to the graph and watch it go...
    //sys.addNode('17', {fixed:true, x:0, y:-100})
    //sys.addNode("65", {fixed:true, x:0, y:200})
    sys.addNode('5', {killscreen:true})
    sys.addNode('10', {killscreen:true})
    sys.addNode('29', {killscreen:true})
    sys.addNode('31', {killscreen:true})
    sys.addNode('35', {killscreen:true})
    sys.addNode('36', {killscreen:true})
    sys.addNode('41', {killscreen:true})
    sys.addNode('42', {killscreen:true})
    sys.addNode('47', {killscreen:true})
    sys.addNode('48', {killscreen:true})
    sys.addNode('52', {killscreen:true})
    sys.addNode('55', {killscreen:true})

    sys.addEdge('1','17')
    sys.addEdge('17','51')
    sys.addEdge('17','52')
    sys.addEdge('17','23')
    sys.addEdge('51', '47')
    sys.addEdge('51', '50')
    sys.addEdge('47', '59')
    sys.addEdge('59', '32')
    sys.addEdge('59', '38')
    sys.addEdge('32', '9')
    sys.addEdge('32', '43')
    sys.addEdge('43', '45')
    sys.addEdge('45', '39')
    sys.addEdge('45', '46')
sys.addEdge('46', '57')
    sys.addEdge('57', '57 do')
    sys.addEdge('57', '57 wait')
    sys.addEdge('57 do', '57 lose')
    sys.addEdge('57 do', '48')
    sys.addEdge('57 wait', '57 lose')
    sys.addEdge('57 wait', '48')
    sys.addEdge('48', '48 fail')
    sys.addEdge('48', '58')
    sys.addEdge('50', '47')
    sys.addEdge('50', '38')
    sys.addEdge('38', '44')
    sys.addEdge('52', '22')
    sys.addEdge('22', '10')
    sys.addEdge('22', '60')
    sys.addEdge('60', '11')
    sys.addEdge('60', '63')
    sys.addEdge('11', '16')
    sys.addEdge('11', '34')
    sys.addEdge('16', '14')
    sys.addEdge('14', '53')
    sys.addEdge('53', '55')
    sys.addEdge('53', '31')
    sys.addEdge('55', '65')
    sys.addEdge('23', '29')
    sys.addEdge('23', '6')
    sys.addEdge('29', '28')
    sys.addEdge('28', '54')
    sys.addEdge('28', '27')
    sys.addEdge('54', '61')
    sys.addEdge('54', '3')
    sys.addEdge('61', '56')
    sys.addEdge('3', '56')
    sys.addEdge('56', '5')
    sys.addEdge('5', '4')
    sys.addEdge('4', '7')
    sys.addEdge('7', '35')
    sys.addEdge('7', '62')
    sys.addEdge('35', '13')
    sys.addEdge('13', '65')
    sys.addEdge('6', '36')
    sys.addEdge('6', '64')
    sys.addEdge('36', '25')
    sys.addEdge('25', '41')
    sys.addEdge('25', '15')
    sys.addEdge('41', '5')
    sys.addEdge('27', '12')
    sys.addEdge('27', '18')
    sys.addEdge('12', '56')
    sys.addEdge('18', '56')
    sys.addEdge('64', '19')
    sys.addEdge('64', '15')
    sys.addEdge('19', '24')
    sys.addEdge('19', '42')
    sys.addEdge('24', '51')
    sys.addEdge('15', '5')
    sys.addEdge('62', '51')
    sys.addEdge('62', '52')
    sys.addEdge('44', '8')
    sys.addEdge('44', '30')
    sys.addEdge('30', '20')
    sys.addEdge('30', '45')
    sys.addEdge('39', '57')
    sys.addEdge('58', '65')
    sys.addEdge('8', '45')
    sys.addEdge('20', '45')
    sys.addEdge('9', '37')
    sys.addEdge('37', '45')
    sys.addEdge('10', '2')
    sys.addEdge('2', '21')
    sys.addEdge('21', '14')
    sys.addEdge('21', '26')
    sys.addEdge('26', '23')

sys.pruneNode('62')
sys.pruneNode('24')
sys.pruneNode('26')


    // or, equivalently:
    //
    // sys.graft({
    //   nodes:{
    //     f:{alone:true, mass:.25}
    //   },
    //   edges:{
    //     a:{ b:{},
    //         c:{},
    //         d:{},
    //         e:{}
    //     }
    //   }
    // })

  })

})(this.jQuery)
