//
//  main.js
//
//  A project template for using arbor.js
//

(function($){

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
            node.p = arbor.Point(0, -100)
}
if (node.name == "18") {
            node.p = arbor.Point(-100, -100)
}
if (node.name == "51") {
            node.p = arbor.Point(100, -100)
}
if (node.name == "116") {
            node.p = arbor.Point(0, 100)
}
if (node.name == "46") {
            node.p = arbor.Point(100, 0)
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
            if (label === "116")
                ctx.font = "bold 14px Arial"
            else
                ctx.font = "11px Arial"
            ctx.textAlign = "center"

            if (node.data.killscreen)
		ctx.fillStyle = "#FF0000"
            else ctx.fillStyle = "#888888"

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
    var sys = arbor.ParticleSystem(2000, 100, 0.2) // create the system with sensible repulsion/stiffness/friction
    sys.parameters({gravity:false}) // use center-gravity to make the graph settle nicely (ymmv)
    sys.renderer = Renderer("#viewport") // our newly created renderer will have its .init() method called shortly by sys...


    sys.addNode('96', {killscreen:true})
    sys.addNode('62', {killscreen:true})
    sys.addNode('115', {killscreen:true})
    sys.addNode('45', {killscreen:true})
    sys.addNode('110', {killscreen:true})
    sys.addNode('58', {killscreen:true})
    sys.addNode('66', {killscreen:true})
    sys.addNode('18', {killscreen:true})
    sys.addNode('90', {killscreen:true})
    sys.addNode('32', {killscreen:true})
    sys.addNode('59', {killscreen:true})
    sys.addNode('21', {killscreen:true})
    sys.addNode('78', {killscreen:true})
    sys.addNode('107', {killscreen:true})
    sys.addNode('109', {killscreen:true})
    sys.addNode('6', {killscreen:true})
    sys.addNode('59', {killscreen:true})
    sys.addNode('29', {killscreen:true})
    sys.addNode('99', {killscreen:true})
    sys.addNode('26', {killscreen:true})
    sys.addNode('73', {killscreen:true})
    sys.addNode('79', {killscreen:true})
    sys.addNode('97', {killscreen:true})


    sys.addEdge('1', '18')
    sys.addEdge('1', '51')
    sys.addEdge('18', '34')
    sys.addEdge('34', '94')
    sys.addEdge('34', '76')
    sys.addEdge('76', '53')
    sys.addEdge('53', '82')
    sys.addEdge('82', '90')
    sys.addEdge('82', '57')
    sys.addEdge('90', '15')
    sys.addEdge('15', '48')
    sys.addEdge('15', '87')
    sys.addEdge('48', '60')
    sys.addEdge('60', '50')
    sys.addEdge('50', '111')
    sys.addEdge('111', '32')
    sys.addEdge('111', '64')
    sys.addEdge('32', '35')
    sys.addEdge('35', '59')
    sys.addEdge('59', '9')
    sys.addEdge('9', '23')
    sys.addEdge('9', '104')
    sys.addEdge('23', '95')
    sys.addEdge('23', '3')
    sys.addEdge('3', '21')
    sys.addEdge('3', '100')
    sys.addEdge('21', '95')
    sys.addEdge('95', '13')
    sys.addEdge('13', '41')
    sys.addEdge('41', '99')
    sys.addEdge('99', '65')
    sys.addEdge('99', '36')
    sys.addEdge('99', '73')
    sys.addEdge('65', '26')
    sys.addEdge('26', '28')
    sys.addEdge('28', '54')
    sys.addEdge('54', '22')
    sys.addEdge('54', '85')
    sys.addEdge('85', '17')
    sys.addEdge('17', '116')
    sys.addEdge('22', '97')
    sys.addEdge('22', '67')
    sys.addEdge('67', '17')
    sys.addEdge('94', '10')
    sys.addEdge('94', '20')
    sys.addEdge('10', '10 lose')
    sys.addEdge('20', '19')
    sys.addEdge('19', '44')
    sys.addEdge('19', '75')
    sys.addEdge('19', '14')
    sys.addEdge('44', '14')
    sys.addEdge('75', '24')
    sys.addEdge('24', '92')
    sys.addEdge('24', '7')
    sys.addEdge('7', '7 lose')
    sys.addEdge('92', '92 lose')
    sys.addEdge('92', '33')
    sys.addEdge('33', '31')
    sys.addEdge('33', '6')
    sys.addEdge('6', '56')
    sys.addEdge('56', '16')
    sys.addEdge('16', '113')
    sys.addEdge('113', '106')
    sys.addEdge('113', '37')
    sys.addEdge('106', '110')
    sys.addEdge('106', '103')
    sys.addEdge('110', '86')
    sys.addEdge('86', '55')
    sys.addEdge('55', '60')
    sys.addEdge('60', '50')
    sys.addEdge('50', '111')
    sys.addEdge('64', '8')
    sys.addEdge('64', '58')
    sys.addEdge('58', '66')
    sys.addEdge('66', '81')
    sys.addEdge('81', '23')
    sys.addEdge('81', '104')
    sys.addEdge('104', '29')
    sys.addEdge('104', '80')
    sys.addEdge('51', '18')
    sys.addEdge('51', '96')
    sys.addEdge('96', '62')
    sys.addEdge('62', '5')
    sys.addEdge('5', '19')
    sys.addEdge('5', '14')
    sys.addEdge('19', '44')
    sys.addEdge('19', '75')
    sys.addEdge('19', '14')
    sys.addEdge('14', '53')
    sys.addEdge('14', '68')
    sys.addEdge('68', '115')
    sys.addEdge('68', '45')
    sys.addEdge('45', '47')
    sys.addEdge('47', '33')
    sys.addEdge('31', '74')
    sys.addEdge('31', '78')
    sys.addEdge('78', '105')
    sys.addEdge('105', '107')
    sys.addEdge('105', '74')
    sys.addEdge('105', '30')
    sys.addEdge('30', '109')
    sys.addEdge('109', '46')
    sys.addEdge('46', '102')
    sys.addEdge('46', '42')
    sys.addEdge('102', '12')
    sys.addEdge('102', '63')
    sys.addEdge('63', '27')
    sys.addEdge('27', '111')
    sys.addEdge('8', '101')
    sys.addEdge('8', '59')
    sys.addEdge('8', '70')
    sys.addEdge('59', '9')
    sys.addEdge('29', '93')
    sys.addEdge('93', '89')
    sys.addEdge('89', '41')
    sys.addEdge('99', '36')
    sys.addEdge('99', '73')
    sys.addEdge('73', '39')
    sys.addEdge('39', '79')
    sys.addEdge('39', '43')
    sys.addEdge('43', '26')




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
