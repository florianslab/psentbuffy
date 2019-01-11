PennController.ResetPrefix(null);

PennController.AddHost("https://files.lab.florianschwarz.net/ibexfiles/PennController/SampleTrials/");

PennController.Sequence( startsWith("training") )

// Exectued before all trials
PennController.Header(
    defaultTooltip                  // Aspect & properties of all tooltips
        .settings.size(250, 60)
        .settings.key("")
        .settings.frame()
        .settings.label("Click here or Press Space")
    ,
    newTimer("pre-timer", 200).start().wait()
)





PennController(
    strip( /*1st guess*/'red' , /*2nd guess*/'green' , /*1st flash*/'green' , /*2nd flash*/'green' )
    ,
    getCanvas("strip").print()
    ,
    newCanvas("pre-spacing", 1, "2em").print()
    ,
    newText("description", "Buffy thought the second flash would again be green")
        .settings.after( newText("right", "...").settings.hidden() )
        .settings.center()
        .print()
    ,
    newKey("toThen", "")
        .wait()
    ,
    getText("then").settings.visible()
    ,
    getText("right").settings.visible()
    ,
    newKey("toReveal", "")
        .wait()
    ,
    getCanvas("observationsPanel").settings.visible()
    ,
    getText("right")
        .settings.text(", and she was right")
    ,
    newCanvas("post-spacing", 1, "2em").print()
    ,
    newButton("continue", "continue")
        .print()
        .wait()
)









PennController(
    newScale("rate", "1","2","3","4","5","6","7")
        .settings.button()
        .settings.keys()
        .settings.callback( newFunction("hack", ()=>{
            let e = getScale("rate")._element;
            e.table.find("td").css("font-weight","normal");
            let i = e.buttons.indexOf(e.choices[e.choices.length-1][1]);
            $(e.table.find("td").get(i)).css("font-weight","bold");
        }).call() )
        .print()
    ,
    newCanvas('myCanvas', 600, 600)
        .settings.add("center at 33%", "center at 50%", newText("left", 
            "This is a very long text to see if setting a size to the text element will make it wrap its textual content"
        ).settings.cssContainer('width', 200))
        .settings.add("center at 66%", "center at 50%", newText("right", 
            "This is another very long text to see if setting a size to the text element will make it wrap its textual content"
        ).settings.cssContainer('width', 200))
        .settings.add( "center at 50%", "center at 90%", newImage("tank", "1fishSquareTank.png").settings.size('auto', 200) )
        .print()
    ,
    newButton("continue", "continue")
        .print()
        .wait()
).noHeader().noFooter()

// PennController(
//     newButton("continue", "continue")
//         .print()
//         .wait()
//     ,
//     newEyeTracker("tracker")
//         .calibrate(75)
//         .settings.add( getButton("continue") )
//         .settings.add( getButton("continue2") )
//         .start()
//     ,
//     newButton("continue2", "continue")
//         .print()
//         .wait()
// ).noHeader().noFooter()


// const PANEL   = "panel";
// const BUFFY   = "panelBuffy";
// const BOARD   = "board";
// const PALETTE = "colorer";
// const COLOR1  = "palette1";
// const COLOR2  = "palette2";
// const COLOR3  = "palette3";


// function initiatePaletteAndPanels( palette , panel , buffy ) {
//     buffy = buffy||{left: "white", middle: "white", right: "white"};
//     return [
//         newCanvas(PANEL, 200, 100)
//             .settings.center()
//             .settings.add( "center at  33" , "center at 50", newCanvas("actual_left"  , 60, 60) )
//             .settings.add( "center at 100" , "center at 50", newCanvas("actual_middle", 60, 60) )
//             .settings.add( "center at 166" , "center at 50", newCanvas("actual_right" , 60, 60) )
//         ,
//         newCanvas(BUFFY, 200, 100)
//             .settings.center()
//             .settings.add( "center at 100" , -20 , newText("guess", "I THINK...") )
//             .settings.add( "center at  33" , "center at 50", newCanvas("buffy_left"  , 60, 60) )
//             .settings.add( "center at 100" , "center at 50", newCanvas("buffy_middle", 60, 60) )
//             .settings.add( "center at 166" , "center at 50", newCanvas("buffy_right" , 60, 60) )
//             .settings.after( newImage("buffy", "buffy.png") )
//         ,
//         newCanvas(BOARD, 100, 100)
//             .settings.center()
//             .settings.add( "center at 50" ,  -5  , newImage('bgPalette', 'https://www.dropbox.com/s/oa5ipw0b5gfgm5v/1494779624.png?raw=1' ).settings.size(120,90) )
//             .settings.add( 60 ,  5 , newCanvas(COLOR1 , 20, 20).settings.css('background', palette[0]) )
//             .settings.add( 35 , 15 , newCanvas(COLOR2 , 20, 20).settings.css('background', palette[1]) )
//             .settings.add( 10 , 25 , newCanvas(COLOR3 , 20, 20).settings.css('background', palette[2]) )
//             .settings.center()
//         ,
//         newPalette(PALETTE)
//             .settings.addColor( palette[0] , getCanvas(COLOR1) , "3" )
//             .settings.addColor( palette[1] , getCanvas(COLOR2) , "2" )
//             .settings.addColor( palette[2] , getCanvas(COLOR3) , "1" )
//             .settings.addElement( 
//                 getCanvas("actual_left"), getCanvas("actual_middle"), getCanvas("actual_right"), 
//                 getCanvas("buffy_left"),  getCanvas("buffy_middle"),  getCanvas("buffy_right")
//             )
//             .brush( getCanvas("actual_left")   , panel.left   )
//             .brush( getCanvas("actual_middle") , panel.middle )
//             .brush( getCanvas("actual_right")  , panel.right  )
//             .brush( getCanvas("buffy_left")    , buffy.left   )
//             .brush( getCanvas("buffy_middle")  , buffy.middle )
//             .brush( getCanvas("buffy_right")   , buffy.right  )
//     ];
// }



// function validate( command ){
//     return [
//         getEyeTracker("tracker")
//             .settings.add( getCanvas(PANEL) )
//             .settings.add( getCanvas(BUFFY) )
//             .start()
//         ,
//         newCanvas('button', 80, 20)
//             .settings.add( 0 , 0 , newText("continue text", "Continue&nbsp;").settings.after(
//                 newCanvas("triangle", 20, 15).settings.css({
//                     width: 0, height: 0,
//                     'border-top': '7px solid transparent',
//                     'border-bottom': '7px solid transparent',
//                     'border-left': '7px solid blue'
//                 })
//             ).settings.css('color', 'blue'))
//             .settings.center()
//             .print()
//         ,
//         newSelector('continue')
//             .settings.add( getCanvas('button') )
//             .settings.keys( ' ' )
//             .settings.frame('none')
//             .wait(
//                 command
//             )
//     ];
// }


// PennController.Header(
//     newEyeTracker('tracker', 30)
//         .settings.log()
//         .calibrate(75)
// );


// PennController.Footer(
//     getCanvas('button')
//         .remove()
//     ,
//     getPalette(PALETTE)
//         .unselect()
//         .settings.disable()
//     ,
//     newTimer("delay", 500)
//         .start()
//         .wait()
// )



// PennController(
//     initiatePaletteAndPanels(
//         [ "orange" , "green" , "white" ],                    /* palette */ 
//         {left: "orange",  middle: "green", right: "white"}   /* panel */ 
//     )
//     ,
//     getCanvas(PANEL).print()    // Show actual 3-light panel here
//     ,
//     newText("test sentence", "The color was green on the third flash").print()
//     ,
//     getCanvas(BOARD).print()    // Palette board below test sentence
//     ,            
//     validate( getPalette(PALETTE).test.color( getCanvas('actual_right') , "green" ) )   // Add the 'Continue' button
// )


// PennController(
//     initiatePaletteAndPanels(
//         [ "pink" , "blue" , "white" ],                       /* palette */ 
//         {left: "blue",  middle: "white", right: "white"}     /* panel */ 
//     )
//     ,
//     getCanvas(PANEL).print()
//     ,
//     newText("test sentence", "The color was pink on the first flash").print()
//     ,
//     getCanvas(BOARD).print()
//     ,
//     validate( getPalette(PALETTE).test.color( getCanvas('actual_left') , "pink" ) )
// )


// PennController(
//     initiatePaletteAndPanels(
//         [ "red" , "blue" , "white" ],                       /* palette */ 
//         {left: "red",  middle: "white", right: "blue"}      /* panel */
//     )
//     ,
//     getCanvas(PANEL).print()
//     ,
//     newText("test sentence", "The color was red again on the third flash").print()
//     ,
//     getCanvas(BOARD).print()
//     ,
//     validate( getPalette(PALETTE).test.color( getCanvas('actual_right') , "red" ) )
// )


// PennController(
//     initiatePaletteAndPanels(
//         [ "orange" , "green" , "white" ],                   /* palette */ 
//         {left: "white", middle: "white", right: "orange"}   /* panel */ 
//     )
//     ,
//     getCanvas(PANEL).print()
//     ,
//     newText("test sentence", "The color was orange again on the third flash").print()
//     ,
//     getCanvas(BOARD).print()
//     ,
//     validate( 
//         getPalette(PALETTE)
//             .test.color( getCanvas('actual_left') , "orange" )
//             .or( getPalette(PALETTE).test.color( getCanvas('actual_middle'),'orange') )
//     )
// )


// PennController(
//     initiatePaletteAndPanels(
//         [ "red" , "blue" , "white" ],                    /* palette */ 
//         {left: "red", middle: "blue", right: "white"},   /* panel */ 
//         {left: "red", middle: "blue", right: "white"},   /* buffy */ 
//     )
//     ,
//     getCanvas(PANEL).print()
//     ,
//     getCanvas(BUFFY).print()
//     ,
//     newText("test sentence", "Buffy believed the color was red on the third flash").print()
//     ,
//     getCanvas(BOARD).print()
//     ,
//     validate( getPalette(PALETTE).test.color( getCanvas('buffy_right') , "red" ) )
// )


// PennController(
//     initiatePaletteAndPanels(
//         [ "yellow" , "blue" , "white" ],                     /* palette */ 
//         {left: "yellow", middle: "blue", right: "yellow"},   /* panel */ 
//         {left: "blue", middle: "blue", right: "white"},      /* buffy */ 
//     )
//     ,
//     getCanvas(PANEL).print()
//     ,
//     getCanvas(BUFFY).print()
//     ,
//     newText("test sentence", "The color was yellow again on the third flash").print()
//     ,
//     getCanvas(BOARD).print()
//     ,
//     validate( 
//         getPalette(PALETTE)
//             .test.color( getCanvas('actual_right') , "yellow" )
//             .and(
//                 getPalette(PALETTE).test.color(getCanvas('actual_left'),'yellow')
//                     .or(getPalette(PALETTE).test.color(getCanvas('actual_middle'),'yellow'))
//             )
//     )
// )