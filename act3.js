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

if (node.name == "103") {
            node.p = arbor.Point(100, 100)
}
if (node.name == "148") {
            node.p = arbor.Point(-100, 100)
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


    sys.addNode('146', {killscreen:true})
    sys.addNode('144', {killscreen:true})
    sys.addNode('117', {killscreen:true})
    sys.addNode('57', {killscreen:true})
    sys.addNode('19', {killscreen:true})
    sys.addNode('53', {killscreen:true})
    sys.addNode('129', {killscreen:true})
    sys.addNode('71', {killscreen:true})
    sys.addNode('63', {killscreen:true})
    sys.addNode('153', {killscreen:true})
    sys.addNode('16', {killscreen:true})
    sys.addNode('6', {killscreen:true})
    sys.addNode('161', {killscreen:true})
    sys.addNode('105', {killscreen:true})
    sys.addNode('125', {killscreen:true})
    sys.addNode('3', {killscreen:true})
    sys.addNode('163', {killscreen:true})
    sys.addNode('92', {killscreen:true})
    sys.addNode('147', {killscreen:true})
    sys.addNode('159', {killscreen:true})
    sys.addNode('166', {killscreen:true})



    sys.addEdge('1', '164')
    sys.addEdge('164', '51')
    sys.addEdge('164', '172')
    sys.addEdge('51', '151')
    sys.addEdge('51', '146')
    sys.addEdge('151', '146')
    sys.addEdge('146', '130')
    sys.addEdge('146', '144')
    sys.addEdge('144', '41')
    sys.addEdge('41', '110')
    sys.addEdge('110', '142')
    sys.addEdge('110', '112')
    sys.addEdge('112', '2')
    sys.addEdge('112', '117')
    sys.addEdge('117', '152')
    sys.addEdge('152', '101')
    sys.addEdge('101', '87')
    sys.addEdge('87', '88')
    sys.addEdge('87', '69')
    sys.addEdge('88', '57')
    sys.addEdge('88', '18')
    sys.addEdge('57', '113')
    sys.addEdge('113', '78')
    sys.addEdge('113', '18')
    sys.addEdge('18', '19')
    sys.addEdge('18', '14')
    sys.addEdge('14', '141')
    sys.addEdge('14', '33')
    sys.addEdge('33', '107')
    sys.addEdge('33', '72')
    sys.addEdge('107', '40')
    sys.addEdge('40', '53')
    sys.addEdge('53', '140')
    sys.addEdge('140', '12')
    sys.addEdge('12', '171')
    sys.addEdge('12', '42')
    sys.addEdge('171', '129')
    sys.addEdge('129', '50')
    sys.addEdge('50', '71')
    sys.addEdge('50', '68')
    sys.addEdge('71', '29')
    sys.addEdge('29', '63')
    sys.addEdge('63', '23')
    sys.addEdge('23', '116')
    sys.addEdge('23', '121')
    sys.addEdge('116', '165')
    sys.addEdge('116', '105')
    sys.addEdge('165', '100')
    sys.addEdge('100', '153')
    sys.addEdge('100', '16')
    sys.addEdge('16', '84')
    sys.addEdge('84', '169')
    sys.addEdge('84', '136')
    sys.addEdge('136', '6')
    sys.addEdge('136', '148')
    sys.addEdge('69', '66')
    sys.addEdge('69', '38')
    sys.addEdge('66', '21')
    sys.addEdge('66', '95')
    sys.addEdge('95', '97')
    sys.addEdge('97', '75')
    sys.addEdge('75', '156')
    sys.addEdge('75', '28')
    sys.addEdge('28', '46')
    sys.addEdge('28', '158')
    sys.addEdge('158', '40')
    sys.addEdge('42', '35')
    sys.addEdge('42', '39')
    sys.addEdge('35', '111')
    sys.addEdge('111', '137')
    sys.addEdge('111', '161')
    sys.addEdge('161', '114')
    sys.addEdge('114', '116')
    sys.addEdge('105', '126')
    sys.addEdge('126', '96')
    sys.addEdge('96', '125')
    sys.addEdge('125', '122')
    sys.addEdge('122', '76')
    sys.addEdge('76', '127')
    sys.addEdge('76', '3')
    sys.addEdge('3', '135')
    sys.addEdge('135', '85')
    sys.addEdge('85', '4')
    sys.addEdge('4', '163')
    sys.addEdge('163', '92')
    sys.addEdge('92', '147')
    sys.addEdge('147', '10')
    sys.addEdge('10', '9')
    sys.addEdge('9', '58')
    sys.addEdge('9', '64')
    sys.addEdge('64', '159')
    sys.addEdge('64', '20')
    sys.addEdge('20', '166')
    sys.addEdge('20', '103')
    sys.addEdge('103', '170')
    sys.addEdge('103', '109')
    sys.addEdge('103', '119')




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
