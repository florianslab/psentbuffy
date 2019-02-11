// Animates the canvas 'ball' and changes its color
shake = color=>[
    getCanvas("ball").settings.css({transition: '0.25s ease-in-out', transform: 'translateX(10px)'})
    ,
    getButton("shake").settings.disable()
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


// Generates a report sequence Canvas with the four specified colors
report = (actual1,actual2,buffy1,buffy2) => [
    newCanvas( "buffysGuesses" , 100 , 80 )
        .settings.add( "center at 25%" ,  5 , newText("firstBuffy", "draw").settings.italic() )
        .settings.add( "center at 25%" , 45 , newText("secondBuffy", "shake").settings.italic() )
        .settings.add( "center at 75%" ,  5 , newCanvas("buffyPatch1", 20, 20).settings.css('background',buffy1) )
        .settings.add( "center at 75%" , 45 , newCanvas("buffyPatch2", 20, 20).settings.css('background',buffy2) )
    ,
    newCanvas("buffyPanel", 200, 100)
        .settings.css("font-family", "Chalkduster, fantasy")
        .settings.add( "right at 100%" , "center at 55%" , newImage("buffy", "buffy_blindfold.png").settings.size(80,80) )
        .settings.add( -5 , -10 , newImage("buffyBubble", "buffyBubble.png").settings.size(130,120) )
        .settings.add( "center at 25%" , 0 , newText("think", "I THINK...") )
        .settings.add( 0 , 20 , getCanvas("buffysGuesses") )
    ,
    newCanvas("drawnBall", 20, 20).settings.css({'border': 'solid 1px white', 'border-radius': '10px', 'background': actual1})
    ,
    newCanvas("shakenBall", 20, 20).settings.css({'border': 'solid 1px white', 'border-radius': '10px', 'background': actual2})
    ,
    newText("label draw" , "1. Draw:"), newText("label guess", "2. Buffy's guesses:"), newText("label shake", "3. Shake:")
    ,
    newCanvas( "labels" , 600 , 20 )
        .settings.css({"font-family": "Chalkduster, fantasy", color: "white"})
        .settings.add( "center at 16%" , "center at 50%" , getText("label draw")  )
        .settings.add( "center at 50%" , "center at 50%" , getText("label guess") )
        .settings.add( "center at 83%" , "center at 50%" , getText("label shake") )
    ,
    newCanvas( "reports" , 600 , 110 )
        .settings.add( "center at 16%" , "center at 50%" , getCanvas("drawnBall")   )
        .settings.add( "center at 50%" , "center at 50%" , getCanvas("buffyPanel") )
        .settings.add( "center at 83%" , "center at 50%" , getCanvas("shakenBall")  )
    ,
    newImage("chalk", "https://www.dropbox.com/s/bpwbe2psliq0ak5/chalk_overlay.png?raw=1")
        .settings.size(600,160)
        .settings.css("opacity",0.2)
        .settings.cssContainer("pointer-events", "none")
    ,
    newCanvas( "sequence" , 600 , 160 )
        .settings.css("border", "solid 5px darkgoldenrod")
        .settings.add( 0 , 0  , newImage("blackboard", "https://www.dropbox.com/s/xo5r6a38xook8x7/blackboard.png?raw=1").settings.size(600,160) )
        .settings.add( 0 , 10 , getCanvas("labels")  )
        .settings.add( 0 , 40 , getCanvas("reports") )
        .settings.add( "center at 30%" , "center at 50%" , newCanvas("lineLeft", 0,108).settings.css("border","dashed 1px white") )
        .settings.add( "center at 70%" , "center at 50%" , newCanvas("lineRight",0,108).settings.css("border","dashed 1px white") )
        .settings.add( 0 , 0  , getImage("chalk") )
]

// Generates a report without Buffy :'(
reportNoBuffy = (...args) => report(...args).concat([
    getCanvas("labels").settings.remove( getText("label guess")  ),
    getCanvas("reports").settings.remove( getCanvas("buffyPanel") ),
    getCanvas("sequence").settings.remove( getCanvas("lineLeft")   ).settings.remove( getCanvas("lineRight")  )
    ,
    getCanvas("sequence").settings.add( "center at 50%" , "center at 50%" , newCanvas("lineMiddle", 0,  108).settings.css("border", "dashed 1px white") )
    ,
    getText("label shake").settings.text("2. Shake:")
])
    
    
hide23 = ()=>[
    getText("label guess").settings.hidden(),
    getCanvas("buffyPanel").settings.hidden(),
    getCanvas("lineLeft").settings.hidden(),
    getText("label shake").settings.hidden(),
    getCanvas("shakenBall").settings.hidden(),
    getCanvas("lineRight").settings.hidden(),
]
reveal23 = ()=>[
    getText("label guess").settings.visible(),
    getCanvas("buffyPanel").settings.visible(),
    getCanvas("lineLeft").settings.visible(),
    getText("label shake").settings.visible(),
    getCanvas("shakenBall").settings.visible(),
    getCanvas("lineRight").settings.visible(),
]
