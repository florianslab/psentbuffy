// Animates the canvas 'ball' and changes its color
shake = color=>[
    getCanvas("ball").settings.css({transition: '0.25s ease-in-out', transform: 'translateX(10px)'})
    ,
    getButton("shake").settings.disable()
    ,
    getText("instructions").settings.text("<em>shaking...</em>")
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
    getText("instructions").settings.text(" ")
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
        .settings.add( "right at 100%" , "center at 55%" , newImage("buffy", "buffy_blindfold.png").settings.size(80,80) )
        .settings.add( -5 , -10 , newImage("buffyBubble", "buffyBubble.png").settings.size(130,120) )
        .settings.add( "center at 25%" , 0 , newText("think", "I THINK...") )
        .settings.add( 0 , 20 , getCanvas("buffysGuesses") )
    ,
    newCanvas("drawnBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': actual1})
    ,
    newCanvas("shakenBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': actual2})
    ,
    newText("label draw" , "1. Draw:") , newText("label guess", "2. Buffy's guesses:") , newText("label shake", "3. Shake:")
    ,
    newCanvas( "labels" , 600 , 20 )
        .settings.add( "center at 20%" , "center at 50%" , getText("label draw")  )
        .settings.add( "center at 50%" , "center at 50%" , getText("label guess") )
        .settings.add( "center at 80%" , "center at 50%" , getText("label shake") )
    ,
    newCanvas( "reports" , 600 , 80 )
        .settings.add( "center at 20%" , "center at 50%" , getCanvas("drawnBall")   )
        .settings.add( "center at 50%" , "center at 50%" , getCanvas("buffyPanel") )
        .settings.add( "center at 80%" , "center at 50%" , getCanvas("shakenBall")  )
    ,
    newCanvas( "sequence" , 600 , 120 )
        .settings.add( 0 , 0  , getCanvas("labels")  )
        .settings.add( 0 , 40 , getCanvas("reports") )
        .settings.add( "center at 30%" , 0 , newCanvas("lineLeft",0,120).settings.css("border","dashed 1px black")  )
        .settings.add( "center at 70%" , 0 , newCanvas("lineRight",0,120).settings.css("border","dashed 1px black") )
]

// Generates a report without Buffy :'(
reportNoBuffy = (...args) => report(...args).concat([
    getCanvas("labels").settings.remove( getText("label guess")  ),
    getCanvas("reports").settings.remove( getCanvas("buffyPanel") ),
    getCanvas("sequence").settings.remove( getCanvas("lineLeft")   ).settings.remove( getCanvas("lineRight")  )
    ,
    getCanvas("sequence").settings.add( "center at 50%" , 0 , newCanvas("lineMiddle", 0,  120).settings.css("border", "dashed 1px black") )
    ,
    getText("label shake").settings.text("2. Shake:")
])