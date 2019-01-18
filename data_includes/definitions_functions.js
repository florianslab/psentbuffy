// Animates the canvas 'ball' and changes its color
shake = color=>[
    getCanvas("ball").settings.css({transition: '0.25s ease-in-out', transform: 'translateX(10px)'})
    ,
    getButton("shake").settings.disable()
    ,
    getText("description").settings.text("<em>shaking...</em>")
    ,
    newTimer(String(Math.round(Math.random()*100000)), 300).start().wait()
    ,
    getCanvas("ball").settings.css({transform: 'none'})
    ,
    newTimer(String(Math.round(Math.random()*100000)), 300).start().wait()
    ,
    getCanvas("ball").settings.css('background', color)
    ,
    getButton("reset").settings.enable()
    ,
    getText("description").settings.text(" ")
]

// Generates a palette with two colors
palette = (color1,color2,...elements)=>[
    newCanvas("board", 100, 100)
        .settings.center()
        .settings.add( "center at 50" ,  -5  , newImage('bgPalette', 'https://www.dropbox.com/s/oa5ipw0b5gfgm5v/1494779624.png?raw=1' ).settings.size(120,90) )
        .settings.add( 40 , 12 , newCanvas("color1" , 20, 20).settings.css('background', color1) )
        .settings.add( 15 , 25 , newCanvas("color2" , 20, 20).settings.css('background', color2) )   
        .print()
    ,
    newPalette("palette")
        .settings.addColor( color1 , getCanvas("color1") /*, '2'*/ )
        .settings.addColor( color2 , getCanvas("color2") /*, '1'*/ )
        .settings.addElement( ...elements )
]


// Generates Canvas of Buffy's guesses and actuals flashes (actual flashes are hidden by default)
strip = (buffy1,buffy2,actual1,actual2)=>[
    newCanvas( "buffysGuesses" , 100 , 80 )
        //.settings.add( "center at 25%" , 0 , newText("firstBuffy", "1st").settings.italic() )
        //.settings.add( "center at 75%" , 0 , newText("secondBuffy", "2nd").settings.italic() )
        .settings.add( "center at 25%" , 5 , newText("firstBuffy", "1 was").settings.italic() )
        .settings.add( "center at 75%" , 5 , newText("secondBuffy", "2'll be").settings.italic() )
        .settings.add( "center at 25%" , 30 , newCanvas("buffyPatch1", 40, 40).settings.css('background',buffy1) )
        .settings.add( "center at 50%" , 20 , newCanvas("buffySep", 2, 60).settings.css('background','black') )
        .settings.add( "center at 75%" , 30 , newCanvas("buffyPatch2", 40, 40).settings.css('background',buffy2) )
    ,
    newCanvas( "observations" , 100 , 80 )
        .settings.add( "center at 25%" , 0 , newText("firstObs", "1st").settings.italic() )
        .settings.add( "center at 75%" , 0 , newText("secondObs", "2nd").settings.italic() )
        .settings.add( "center at 25%" , 30 , newCanvas("obsPatch1", 40, 40).settings.css('background',actual1) )
        .settings.add( "center at 50%" , 20 , newCanvas("obsSep", 2, 60).settings.css('background','black') )
        .settings.add( "center at 75%" , 30 , newCanvas("obsPatch2", 40, 40).settings.css('background',actual2) )
    ,
    newCanvas("buffyPanel", 200, 100)  
        //.settings.add( "right at 100%" , "center at 55%" , newImage("buffy", "buffy.png").settings.size(80,80) )
        .settings.add( "right at 100%" , "center at 55%" , newImage("buffy", "buffy_blindfold.png").settings.size(80,80) )
        .settings.add( -5 , -10 , newImage("buffyBubble", "buffyBubble.png").settings.size(130,120) )
        .settings.add( "center at 25%" , 0 , newText("think", "I THINK...") )
        .settings.add( 0 , 20 , getCanvas("buffysGuesses") )
    ,
    newCanvas("observationsPanel", 100, 100)
        .settings.add( "center at 50%" , 0 , newText("tada", "TADA!") )
        .settings.add( 0 , 20 , getCanvas("observations") )
    ,
    newCanvas("strip", 500, 100)
        .settings.add(               0 ,               0 , getCanvas("buffyPanel") )
        .settings.add( "center at 50%" , "center at 50%" , newText("then", "then").settings.hidden() )
        .settings.add( "right at 100%" ,               0 , getCanvas("observationsPanel").settings.hidden() )
        .settings.center()
]


// Prints instructions to paint the colors accordingly
instructions = ()=>newText("instructions", "Use the colors on the palette to paint the flashes accordingly")
                        .settings.italic().settings.center().print();


// Prints a "press any key message"
pressSpaceKey = condition=> [
    newText(text = String(Math.round(Math.random()*100000)), "<p>Press Space to continue</p>").settings.italic().settings.center().print(),
    newKey(String(Math.round(Math.random()*100000)), " ").wait(condition),
    getText(text).remove()
]


// Prints a final message on the whole screen and waits for a keypress
finalMessage = message=>[
    newText("final message", message||"Good! Press any key to continue")
        .settings.css({color: "green", 'font-weight': 'bold', background: "floralwhite", padding:"1em"})
    ,
    newCanvas("good", "100vw", "100vh")
        .settings.cssContainer({position: "absolute", top:0, left:0})
        .settings.add(0,0,newCanvas("bg", "100vw", "100vh").settings.css({background:"gray", opacity:0.65}))
        .settings.add("center at 50%", "center at 50%", getText("final message"))
        .print()
    ,
    newKey("any", "").wait()
]