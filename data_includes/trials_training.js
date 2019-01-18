PennController( "training-shake-the-ball" ,
    newCanvas("ball", 40, 40).settings.css({'border': 'solid 1px black', 'border-radius': '20px'}).print()
    ,
    newText("description", "This ball is transparent. Shake it, and it will change color.").print()
    ,
    newButton("shake", "Shake").print().wait()
    ,
    shake('red')
    ,
    getText("description").settings.text("Retry as many times as you want: the ball sometimes turns green!")
    ,
    newVar("color")
    ,
    getButton("shake")
        .settings.after(
            newButton("reset", "Reset").settings.callback(
                getButton("shake").settings.enable()
                ,
                getButton('reset').settings.disable()
                ,
                getCanvas("ball").settings.css('background', 'transparent')
            )
        )
        .settings.callback(
            getVar("color").set( v=>(Math.random()>0.5?'red':'green') )
            ,
            ...shake( getVar("color") )
            ,
            getVar("color").test.is('red').success(
                getText("description").settings.text("No luck this time! Retry and maybe it will turn green.")
            )
        )
        .wait(
            getVar("color").test.is("green")
        )
    ,
    newTimer('afterShake', 500).start().wait()
    ,
    newButton("validate", "Validate").print().wait()
)


PennController( "training-draw-the-ball" ,
    newCanvas("bowl", 100, 0)
        .settings.css({
            'border-top': '100px solid gray',
            'border-left': '25px solid transparent',
            'border-right': '25px solid transparent',
            'height': '0',
            'width': '100px'
        })
        .print()
    ,
    newText("description", "We put a few of these balls in this bowl. Click on it to draw one ball.").print()
    ,
    newSelector("clickBowl").settings.add( getCanvas("bowl") ).settings.once().wait()
    ,
    getCanvas('bowl').remove()
    ,
    newText("draw", "1. Draw: ").settings.after(
        newCanvas("drawnBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': 'green'})
    ).print()
    ,
    newText("shaken", "2. Shake: ").settings.after(
        newCanvas("shakenBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': 'red', 'vertical-align': 'text-bottom'}).settings.hidden()
    ).settings.hidden().print()
    ,
    newCanvas("ball", 40, 40).settings.css({'border': 'solid 1px black', 'border-radius': '20px', 'background': 'green'}).print()
    ,
    getText("description").settings.text("You drew a green ball. <br>Now reset and shake the ball.").print()
    ,
    newButton("shake", "Shake").settings.disable().settings.after(newButton("reset", "Reset")).print()
    ,
    getButton("reset").wait().settings.disable()
    ,
    getCanvas("ball").settings.css("background", "white"),
    getButton("shake").settings.enable().wait().remove()
    ,
    shake("red")
    ,
    getText("shaken").settings.visible(),
    getCanvas("shakenBall").settings.visible()
    ,
    newTooltip("legend", "This is a report of what happened")
        .settings.frame("none")
        .settings.position("bottom center")
        .print( getCanvas("shakenBall") )
        .wait()
        .settings.frame("dotted 2px purple")
    ,
    getTooltip("legend").settings.text("In this case, it reports that the ball that was drawn was green").print(getCanvas("drawnBall")).wait(),
    getTooltip("legend").settings.text("then it was reset and shaken and it was red").print(getCanvas("shakenBall")).wait()
    ,
    newButton("validate", "Validate").print().wait()
)

PennController( "training-buffy-guesses" ,
    newCanvas( "buffysGuesses" , 100 , 80 )
        .settings.add( "center at 25%" ,  5 , newText("firstBuffy", "draw").settings.italic() )
        .settings.add( "center at 25%" , 45 , newText("secondBuffy", "shake").settings.italic() )
        .settings.add( "center at 75%" ,  5 , newCanvas("buffyPatch1", 20, 20).settings.css('background','orange') )
        .settings.add( "center at 75%" , 45 , newCanvas("buffyPatch2", 20, 20).settings.css('background','blue') )
    ,
    newCanvas("buffyPanel", 200, 100)  
        .settings.add( "right at 100%" , "center at 55%" , newImage("buffy", "buffy_blindfold.png").settings.size(80,80) )
        .settings.add( -5 , -10 , newImage("buffyBubble", "buffyBubble.png").settings.size(130,120) )
        .settings.add( "center at 25%" , 0 , newText("think", "I THINK...") )
        .settings.add( 0 , 20 , getCanvas("buffysGuesses") )
    ,
    newCanvas("bowl", 100, 0)
        .settings.css({
            'border-top': '100px solid gray',
            'border-left': '25px solid transparent',
            'border-right': '25px solid transparent',
            'height': '0',
            'width': '100px'
        })
        .print()
    ,
    newText("description", "Click on the bowl to draw a ball.").print()
    ,
    newSelector("clickBowl").settings.add( getCanvas("bowl") ).settings.once().wait()
    ,
    getCanvas('bowl').remove()
    ,
    newText("draw", "1. Draw: ").settings.after(
        newCanvas("drawnBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': 'blue'})
    ).print()
    ,
    newText("guess", "2. Buffy's guesses: ").settings.after(
        getCanvas("buffyPanel").settings.hidden()
    ).settings.hidden().print()
    ,
    newText("shaken", "3. Shake: ").settings.after(
        newCanvas("shakenBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': 'blue'}).settings.hidden()
    ).settings.hidden().print()
    ,
    newCanvas("ball", 40, 40).settings.css({'border': 'solid 1px black', 'border-radius': '20px', 'background': 'blue'}).print()
    ,
    getText("description").settings.text(
        "<p>You drew a blue ball.</p>"+
        "Now Buffy the cat, who has been blindfolded, <br>"+
        "tries to guess the color of the ball you drew, <br>"+
        "and what color it will be after the shake.")
        .print()
    ,
    newButton("continue", "Continue").print().wait().remove()
    ,
    getText("guess").settings.visible(),
    getCanvas("buffyPanel").settings.visible()
    ,
    newButton("shake", "Shake").settings.disable().settings.after(newButton("reset", "Reset")).print()
    ,
    getText("description").settings.text(
        "<p>Buffy is wrong about the color of the ball you drew. </p>"+
        "<p>Now reset and shake the ball.</p>"
    ).print(),
    getButton("reset").wait().settings.disable()
    ,
    getCanvas("ball").settings.css("background", "white"),
    getButton("shake").settings.enable().wait().remove()
    ,
    getText("description").settings.text("<em>shaking...</em>"),
    shake("blue")
    ,
    getText("shaken").settings.visible(),
    getCanvas("shakenBall").settings.visible()
    ,
    getText("description").settings.text(
        "<p>Buffy thought that, after the shake, the ball would be blue,</p>"+
        "<p>and she was right about it</p>"
    ),
    newButton("validate", "Validate").print().wait()
)


PennController( "training-paint-main-draw" ,
    newCanvas( "buffysGuesses" , 100 , 80 )
        .settings.add( "center at 25%" ,  5 , newText("firstBuffy", "draw").settings.italic() )
        .settings.add( "center at 25%" , 45 , newText("secondBuffy", "shake").settings.italic() )
        .settings.add( "center at 75%" ,  5 , newCanvas("buffyPatch1", 20, 20).settings.css('background','yellow') )
        .settings.add( "center at 75%" , 45 , newCanvas("buffyPatch2", 20, 20).settings.css('background','pink') )
    ,
    newCanvas("buffyPanel", 200, 100)  
    .settings.add( "right at 100%" , "center at 55%" , newImage("buffy", "buffy_blindfold.png").settings.size(80,80) )
        .settings.add( -5 , -10 , newImage("buffyBubble", "buffyBubble.png").settings.size(130,120) )
        .settings.add( "center at 25%" , 0 , newText("think", "I THINK...") )
        .settings.add( 0 , 20 , getCanvas("buffysGuesses") )
    ,
    newText("draw", "1. Draw: ").settings.after(
        newCanvas("drawnBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': 'pink'})
    ).print()
    ,
    newText("guess", "2. Buffy's guesses: ").settings.after( getCanvas("buffyPanel") ).print()
    ,
    newText("shaken", "3. Shake: ").settings.after(
        newCanvas("shakenBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': 'yellow'})
    ).print()
    ,
    newText("description", "<p>When it was drawn, the ball was pink, </p><p>and Buffy was right about it.</p>").print()
    ,
    newTooltip('guide', "From now on you will only see final reports")
        .print()
        .wait()
        .remove()
    ,
    getTooltip('guide')
        .settings.text('Sometimes, a problem happened with the pictures and the colors can be wrong')
        .settings.position('top right')
        .settings.frame("dashed 2px purple")
        .print( getCanvas('buffyPatch1') )
        .wait()
        .remove()
    ,
    palette( 'pink' , 'yellow' , getCanvas('drawnBall') , getCanvas('buffyPatch1') , getCanvas("buffyPatch2") , getCanvas('shakenBall') )
    ,
    getPalette('palette').settings.callback(
        getPalette('palette').test.color( getCanvas("shakenBall") , 'pink' ).success(
            getPalette('palette').settings.disable(),
            getSelector("usePink").settings.disable()
            ,
            getTooltip('guide')
                .settings.text("This color is consistent with the description: no need to change it")
                .print( getCanvas('shakenBall') )
                .wait()
            ,
            getSelector("usePink").settings.enable(),
            getPalette('palette').settings.enable(),
            getPalette('palette').brush( getCanvas("shakenBall") , 'yellow' )
        )
        ,
        getPalette('palette').test.color( getCanvas("buffyPatch2") , 'yellow' ).success(
            getPalette('palette').settings.disable(),
            getSelector("usePink").settings.disable()
            ,
            getTooltip('guide')
                .settings.text("This color is consistent with the description: no need to change it")
                .print( getCanvas('buffyPatch2') )
                .wait()
            ,
            getSelector("usePink").settings.enable(),
            getPalette('palette').settings.enable(),
            getPalette('palette').brush( getCanvas("buffyPatch2") , 'pink' )
        )
        ,
        getPalette('palette').test.color( getCanvas("drawnBall") , 'yellow' ).success(
            getPalette('palette').settings.disable(),
            getSelector("usePink").settings.disable()
            ,
            getTooltip('guide')
                .settings.text("The ball was pink when it was drawn: this needs no fixing")
                .print( getCanvas('drawnBall') )
                .wait()
            ,
            getSelector("usePink").settings.enable(),
            getPalette('palette').settings.enable(),
            getPalette('palette').brush( getCanvas("drawnBall") , 'pink' )
        )
    )
    ,
    getTooltip('guide')
        .settings.text('If you notice an inconsistency, use the colors from your palette')
        .print( getCanvas('board') )
        .wait()
    ,
    getTooltip('guide')
        .settings.text("For example, this should be pink since Buffy was in fact right about the draw")
        .print( getCanvas('buffyPatch1') )
        .wait()
    ,
    getTooltip('guide')
        .settings.text("Click on this to use pink")
        .print( getCanvas('color1') )
    ,
    newSelector("usePink")
        .settings.add( getCanvas('color1') )
        .settings.frame('none')
        .settings.once()
        .wait()
    ,
    getTooltip('guide')
        .settings.text("Good, now click here to fix the report of Buffy's guess")
        .print( getCanvas("buffyPatch1") )
    ,
    newSelector("printPink")
        .settings.add( getCanvas("buffyPatch1") )
        .settings.frame('none')
        .settings.once()
        .wait()
    ,
    getTooltip('guide')
        .settings.frame("none")
        .settings.text("Great, let's go through a couple more examples")
        .settings.position("center middle")
        .print( getText('description') )
        .wait()
)




PennController( "training-dontpaint-buffy" ,
    newCanvas( "buffysGuesses" , 100 , 80 )
        .settings.add( "center at 25%" ,  5 , newText("firstBuffy", "draw").settings.italic() )
        .settings.add( "center at 25%" , 45 , newText("secondBuffy", "shake").settings.italic() )
        .settings.add( "center at 75%" ,  5 , newCanvas("buffyPatch1", 20, 20).settings.css('background','orange') )
        .settings.add( "center at 75%" , 45 , newCanvas("buffyPatch2", 20, 20).settings.css('background','pink') )
    ,
    newCanvas("buffyPanel", 200, 100)  
        .settings.add( "right at 100%" , "center at 55%" , newImage("buffy", "buffy_blindfold.png").settings.size(80,80) )
        .settings.add( -5 , -10 , newImage("buffyBubble", "buffyBubble.png").settings.size(130,120) )
        .settings.add( "center at 25%" , 0 , newText("think", "I THINK...") )
        .settings.add( 0 , 20 , getCanvas("buffysGuesses") )
    ,
    newText("draw", "1. Draw: ").settings.after(
        newCanvas("drawnBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': 'orange'})
    ).print()
    ,
    newText("guess", "2. Buffy's guesses: ").settings.after( getCanvas("buffyPanel") ).print()
    ,
    newText("shaken", "3. Shake: ").settings.after(
        newCanvas("shakenBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': 'orange'})
    ).print()
    ,
    newText("description", 
        "<p>Buffy thought that, when it was drawn, the ball was orange, </p>"+
        "<p>and she was right about it.</p>"
    ).print()
    ,
    palette( 'orange' , 'pink' , getCanvas('drawnBall') , getCanvas('buffyPatch1') , getCanvas("buffyPatch2") , getCanvas('shakenBall') )
    ,
    newTooltip("feedback").settings.frame("dashed 2px purple")
    ,
    newSelector("clickDrawn")
        .settings.add( getCanvas("drawnBall") , getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("shakenBall") )
        .settings.frame("none")
        .settings.callback(
            getPalette('palette')
                .brush( getCanvas('drawnBall') , 'orange' )
                .brush( getCanvas('buffyPatch1') , 'orange' )
                .brush( getCanvas('shakenBall') , 'orange' )
                .brush( getCanvas('buffyPatch2') , 'pink' )
            ,
            getTooltip('feedback')
                .settings.text("No need to fix anything: the colors already match the description")
                .settings.position('center bottom')
                .print( getText('description') )
        )
    ,
    newButton('validate', "Validate")
        .print()
        .wait()
    ,
    getTooltip('feedback')
        .settings.frame("none")
        .settings.text("Right, sometimes no fix is needed! Let's try one last one")
        .settings.position("center middle")
        .print( getCanvas("board") )
        .wait()
)


PennController( "training-paint-main-draw" ,
    newCanvas( "buffysGuesses" , 100 , 80 )
        .settings.add( "center at 25%" ,  5 , newText("firstBuffy", "draw").settings.italic() )
        .settings.add( "center at 25%" , 45 , newText("secondBuffy", "shake").settings.italic() )
        .settings.add( "center at 75%" ,  5 , newCanvas("buffyPatch1", 20, 20).settings.css('background','green') )
        .settings.add( "center at 75%" , 45 , newCanvas("buffyPatch2", 20, 20).settings.css('background','green') )
    ,
    newCanvas("buffyPanel", 200, 100)  
        .settings.add( "right at 100%" , "center at 55%" , newImage("buffy", "buffy_blindfold.png").settings.size(80,80) )
        .settings.add( -5 , -10 , newImage("buffyBubble", "buffyBubble.png").settings.size(130,120) )
        .settings.add( "center at 25%" , 0 , newText("think", "I THINK...") )
        .settings.add( 0 , 20 , getCanvas("buffysGuesses") )
    ,
    newText("draw", "1. Draw: ").settings.after(
        newCanvas("drawnBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': 'red'})
    ).print()
    ,
    newText("guess", "2. Buffy's guesses: ").settings.after( getCanvas("buffyPanel") ).print()
    ,
    newText("shaken", "3. Shake: ").settings.after(
        newCanvas("shakenBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': 'green'})
    ).print()
    ,
    newText("description", "<p>After the shake, the ball was green again, </p><p>and Buffy was right about it.</p>").print()
    ,
    palette( 'green' , 'red' , getCanvas('drawnBall') , getCanvas('buffyPatch1') , getCanvas("buffyPatch2") , getCanvas('shakenBall') )
    ,
    newTooltip("feedback").settings.frame("dashed 2px purple")
    ,
    newSelector("clickDrawn")
        .settings.add( getCanvas("drawnBall") )
        .settings.frame("none")
        .settings.callback(
            getPalette('palette').test.color( getCanvas("drawnBall") , 'green' )
            .success(
                getTooltip('feedback')
                    .settings.text("Right, this should be green: the ball was green <em>again</em>")
                    .print( getCanvas('drawnBall') )
                ,
                getSelector('clickDrawn').settings.disable()
            )
        )
    ,
    getPalette('palette').settings.callback(
        getPalette('palette').test.color( getCanvas("shakenBall") , 'red' ).success(
            getTooltip('feedback')
                .settings.text("Wrong, this should remain green: the ball was green again")
                .print( getCanvas('shakenBall') )
                .wait()
            ,
            getPalette('palette').brush( getCanvas("shakenBall") , 'green' )
        )
        ,
        getPalette('palette').test.color( getCanvas("buffyPatch2") , 'red' ).success(
            getTooltip('feedback')
                .settings.text("Wrong, this should remain green: Buffy was right that the ball was green again")
                .print( getCanvas('buffyPatch2') )
                .wait()
            ,
            getPalette('palette').brush( getCanvas("buffyPatch2") , 'green' )
        )
        ,
        getPalette('palette').test.color( getCanvas("buffyPatch1") , 'red' ).success(
            getTooltip('feedback')
                .settings.text("This color is consistent with the description: no need to fix it")
                .print( getCanvas('buffyPatch1') )
                .wait()
            ,
            getPalette('palette').brush( getCanvas("buffyPatch1") , 'green' )
        )
    )
    ,
    newButton('validate', "Validate")
        .print()
        .wait(
            getPalette('palette').test.color( getCanvas('drawnBall') , 'green' )
            .failure(
                getTooltip('feedback')
                    .settings.text("This should be green: the ball was green <em>again</em>")
                    .print( getCanvas('drawnBall') )
            )
        )
    ,
    getTooltip('feedback')
        .settings.frame("none")
        .settings.text("Great, you got it! You are ready for the experiment.")
        .settings.position("center middle")
        .print( getCanvas("board") )
        .wait()
)









// //      ACTUAL SQUARES
// //
// PennController( "training-observations-only" ,
//     // Strip configuration
//     strip( 'grey' , 'grey' , 'grey', 'grey' )
//     ,
//     getCanvas("tada").settings.hidden(),
//     getCanvas("observationsPanel").settings.center().print()
//     // End strip configuration
//     ,
//     newText("description" , "The first flash was green").print(),
//     palette( 'green' , 'red' , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
//     instructions()
//     ,
//     newTooltip("feedback", "You must paint this <strong>green</strong>: the first flash was green")
//         .settings.position("left middle")
//     ,
//     pressSpaceKey(
//         getPalette("palette").test.color( getCanvas("obsPatch1") , "green" )
//         .failure( getTooltip("feedback").print(getCanvas("obsPatch1")).wait() )
//     )
//     ,
//     finalMessage( "Good, the first flash was green, so you painted the 1st square green" )
// )


// PennController( "training-observations-only" ,
//     // Strip configuration
//     strip( 'grey' , 'grey' , 'grey', 'grey' )
//     ,
//     getCanvas("tada").settings.hidden(),
//     getCanvas("observationsPanel").settings.center().print()
//     // End strip configuration
//     ,
//     newText("description" , "The second flash was red").print(),
//     palette( 'green' , 'red' , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
//     instructions()
//     ,
//     newTooltip("feedback", "You must paint this <strong>red</strong>: the second flash was red")
//         .settings.position("right middle")
//     ,
//     pressSpaceKey(
//         getPalette("palette").test.color( getCanvas("obsPatch2") , "red" )
//         .failure( getTooltip("feedback").print(getCanvas("obsPatch2")).wait() )
//     )
//     ,
//     finalMessage( "Good, the second flash was red, so you painted the 2nd square red" )
// )


// PennController( "training-observations-only" ,
//     // Strip configuration
//     strip( 'grey' , 'grey' , 'grey', 'grey' )
//     ,
//     getCanvas("tada").settings.hidden(),
//     getCanvas("observationsPanel").settings.center().print()
//     // End strip configuration
//     ,
//     newText("description" , "The second flash was blue again").print(),
//     palette( 'blue' , 'yellow' , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
//     instructions()
//     ,
//     newTooltip("feedback", "You must paint both of these <strong>blue</strong>: "+
//                            "the second flash was blue <em>again</em>")
//         .settings.position("center top")
//     ,
//     pressSpaceKey(
//         getPalette("palette").test.color( getCanvas("obsPatch1") , "blue" ).and(
//             getPalette("palette").test.color( getCanvas("obsPatch2") , "blue" )
//         ).failure( getTooltip("feedback").print(getCanvas("observationsPanel")).wait() )
//     )
//     ,
//     finalMessage( "Good, the second flash was blue <em>again</em>, so you painted both squares blue" )
// )
// //
// //      END ACTUAL SQUARES



// //      FIRST TRANSITION
// //
// PennController( 'training-transition1' , 
//     newText("transition", "<p>Good. Now things are going to get a little bit more complex.</p>"+
//                           "<p>To the left of the flahes, you will see the guesses of Buffy the cat</p>"+
//                           "<p>Pay attention to the descriptions so as to paint accurately</p>").print()
//     ,
//     pressSpaceKey()
// )
// //
// //      END FIRST TRANSITION



// //      BUFFY + ACTUAL SQUARES
// //
// PennController( "training-with-buffy" ,
//     // Strip configuration
//     strip( 'grey' , 'grey' , 'grey', 'grey' )
//     ,
//     getCanvas("strip").settings.center().print()
//     // End strip configuration
//     ,
//     newText("description" , "Buffy thought the first flash would be pink")
//         .settings.after( newText("continuation", "...").settings.bold().settings.hidden() )
//         .print(),
//     palette( 'pink' , 'green' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
//     instructions()
//     ,
//     newTooltip("feedback", "You must paint this <strong>pink</strong>: "+
//                            "Buffy thought the first flash would be pink")
//         .settings.position("left middle")
//     ,
//     pressSpaceKey(
//         getPalette("palette").test.color( getCanvas("buffyPatch1") , "pink" )
//         .failure( getTooltip("feedback").print(getCanvas("buffyPatch1")).wait() )
//     )
//     ,
//     getText("instructions").remove(),
//     getText("then").settings.visible(),
//     getText("continuation").settings.visible()
//     ,
//     pressSpaceKey()
//     ,
//     getCanvas("observationsPanel").settings.visible(),
//     getText("continuation")
//         .settings.text(", and she was right"),
//     getTooltip("feedback")  
//         .settings.text("You must paint this <strong>pink</strong>: "+
//                        "Buffy was right, so the first flash indeed turned out to be pink")
//     ,
//     getText("instructions").print()
//     ,
//     pressSpaceKey(
//         getPalette("palette").test.color( getCanvas("obsPatch1") , "pink" )
//         .failure( getTooltip("feedback").print(getCanvas("obsPatch1")).wait() )
//     )
//     ,
//     finalMessage( "Good, Buffy was right that the first flash would be pink, so you painted both 1st squares pink" )
// )


// PennController( "training-with-buffy" ,
//     // Strip configuration
//     strip( 'grey' , 'grey' , 'grey', 'grey' )
//     ,
//     getCanvas("strip").settings.center().print()
//     // End strip configuration
//     ,
//     newText("description" , "Buffy thought the second flash would be orange")
//         .settings.after( newText("continuation", "...").settings.bold().settings.hidden() )
//         .print(),
//     palette( 'blue' , 'orange' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
//     instructions()
//     ,
//     newTooltip("feedback", "You must paint this <strong>orange</strong>: Buffy thought the second flash would be orange")
//         .settings.position("right middle")
//     ,
//     pressSpaceKey(
//         getPalette("palette").test.color( getCanvas("buffyPatch2") , "orange" )
//         .failure( getTooltip("feedback").print(getCanvas("buffyPatch2")).wait() )
//     )
//     ,
//     getText("instructions").remove(),
//     getText("then").settings.visible(),
//     getText("continuation").settings.visible()
//     ,
//     pressSpaceKey()
//     ,
//     getCanvas("observationsPanel").settings.visible(),
//     getText("continuation")
//         .settings.text(", but she was wrong"),
//     getTooltip("feedback")
//         .settings.text("You must paint this <strong>blue</strong>: "+
//                        "Buffy was wrong, so the second did <em>not</em> turn out to be orange")
//     ,
//     getText("instructions").print()
//     ,
//     pressSpaceKey(
//         getPalette("palette").test.color( getCanvas("obsPatch2") , "blue" )
//         .failure( getTooltip("feedback").print(getCanvas("obsPatch2")).wait() )
//     )
//     ,
//     finalMessage( "Good, Buffy was wrong that the second flash would be orange, so you painted Buffy's 2nd square orange and the actual 2nd square blue" )
// )


// PennController( "training-with-buffy" ,
//     // Pre-trial message
//     newText("reversed", "Let's try to reverse the order!").print(),
//     pressSpaceKey(),
//     getText("reversed").remove()
//     // End pre-trial message
//     , 
//     // Strip configuration
//     strip( 'grey' , 'grey' , 'grey', 'grey' )
//     ,
//     getCanvas("buffyPanel").settings.hidden(),
//     getCanvas("strip").settings.center().print(),
//     getCanvas("observationsPanel").settings.visible()
//     // End strip configuration
//     ,
//     newText("description" , "The second flash was yellow again")
//         .settings.after( newText("continuation", "...").settings.bold().settings.hidden() )
//         .print(),
//     palette( 'red' , 'yellow' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
//     instructions()
//     ,
//     newTooltip("feedback", "You must paint both of these <strong>yellow</strong>: "+
//                            "the second flash was yellow <em>again</em>")
//         .settings.position("center bottom")
//     ,
//     pressSpaceKey(
//         getPalette("palette").test.color( getCanvas("obsPatch1") , "yellow" ).and(
//             getPalette("palette").test.color( getCanvas("obsPatch2") , "yellow" )
//         ).failure( getTooltip("feedback").print(getCanvas("observationsPanel")).wait() )
//     )
//     ,
//     getText("instructions").remove(),
//     getCanvas("buffyPanel").settings.visible(),
//     getText("then").settings.visible(),
//     getText("continuation")
//         .settings.text(", so Buffy was wrong")
//         .settings.visible(),
//     getTooltip("feedback")
//         .settings.text("You should have <strong>red</strong> here: Buffy was <em>wrong</em>")
//     ,
//     getText("instructions").print()
//     ,
//     pressSpaceKey(
//         getPalette("palette").test.color( getCanvas("buffyPatch2") , "red" )
//         .failure( getTooltip("feedback").print(getCanvas("buffysGuesses")).wait() )
//     )
//     ,
//     finalMessage( "Good, the second flash was yellow again, so you painted the actual 1st and 2nd squares yellow and Buffy's red, because she was wrong"  )
// )
// //
// //      END BUFFY + ACTUAL SQUARES



// //      SECOND TRANSITION
// //
// PennController( 'training-transition2' ,
//     newText("transition", "<p>Good, now you understand the painting task.</p>"+
//                           "<p>From now on, you will review what <em>other people</em> did on this task.</p>"+
//                           "<p>We ask you to fix the colors <em>if need be</em> before validating.</p>"+
//                           "<p>Let us go through a couple of trials together and then you will do it on your own.</p>").print()
//     ,
//     pressSpaceKey()
// )
// //
// //      END SECOND TRANSITION



// //      FIXING TASK
// //
// PennController( "training-fixing" , 
//     // Strip configuration
//     strip( /*Buffy 1st*/'orange' , /*Buffy 2st*/'orange' , /*Actual 1st*/'orange', /*Actual 2nd*/'blue' )
//     ,
//     getCanvas("strip").settings.center().print(),
//     getCanvas("observationsPanel").settings.visible(),
//     getCanvas("then").settings.visible()
//     // End strip configuration
//     ,
//     newText("description" , "Buffy thought the second flash would be orange, and she was right").print(),
//     newTooltip("feedback"),
//     newKey("pressKey", " ")
//     ,
//     palette( 'blue' , 'orange' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
//     getPalette("palette")
//         .brush( getCanvas("obsPatch2") , "blue" )
//         .brush( getCanvas("buffyPatch2") , "orange" )
//         .settings.callback(
//             getPalette("palette").test.color( getCanvas("buffyPatch2") , "orange" ).failure(
//                 getKey("pressKey").settings.disable()       // Temporarilly disable trial validation
//                 ,
//                 getPalette("palette").brush(getCanvas("buffyPatch2"),"orange"),
//                 getTooltip("feedback")
//                     .settings.text("No, this was right: Buffy did think the second flash would be orange")
//                     .settings.position("left middle")
//                     .print( getCanvas("buffyPatch2") )
//                     .wait()
//                 ,
//                 getKey("pressKey").settings.enable()
//             )
//         )
//     ,
//     instructions()
//     ,
//     // Can't use pressSpaceKey because of palette.callback and tooltip's press on Space
//     newText("pressSpace", "<p>Press Space to continue</p>").settings.italic().settings.center().print(),
//     getKey("pressKey").wait(
//         getPalette("palette").test.color( getCanvas("obsPatch2") , "orange" ).failure( 
//             getTooltip("feedback")
//                 .settings.text("This flash should be <strong>orange</strong>: "+
//                             "Buffy was <em>right</em> that the second flash would be orange")
//                 .settings.position("right middle")
//                 .print( getCanvas("obsPatch2") )
//                 .wait()
//         )
//     ),
//     getText("pressSpace").remove()
//     ,
//     finalMessage(  )
// )


// PennController( "training-fixing" , 
//     // Strip configuration
//     strip( /*Buffy 1st*/'green' , /*Buffy 2st*/'green' , /*Actual 1st*/'green', /*Actual 2nd*/'red' )
//     ,
//     getCanvas("strip").settings.center().print(),
//     getCanvas("observationsPanel").settings.visible(),
//     getCanvas("then").settings.visible()
//     // End strip configuration
//     ,
//     newText("description" , "The second flash was red again, so Buffy was wrong").print(),
//     newTooltip("feedback"),
//     newKey("pressKey", " ")
//     ,
//     palette( 'green' , 'red' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
//     getPalette("palette")
//         .brush( getCanvas("obsPatch1") , "green" )
//         .brush( getCanvas("obsPatch2") , "red" )
//         .brush( getCanvas("buffyPatch2") , "green" )
//         .settings.callback(
//             getPalette("palette").test.color( getCanvas("obsPatch2") , "red" ).failure(
//                 getKey("pressKey").settings.disable()       // Temporarilly disable trial validation
//                 ,
//                 getPalette("palette").brush(getCanvas("obsPatch2"),"red"),
//                 getTooltip("feedback")
//                     .settings.text("No, this was right: the second flash was red")
//                     .settings.position("right middle")
//                     .print( getCanvas("obsPatch2") )
//                     .wait()
//                 ,
//                 getKey("pressKey").settings.enable()
//             )
//             ,
//             getPalette("palette").test.color( getCanvas("buffyPatch2") , "green" ).failure(
//                 getKey("pressKey").settings.disable()       // Temporarilly disable trial validation
//                 ,
//                 getPalette("palette").brush(getCanvas("buffyPatch2"),"green"),
//                 getTooltip("feedback")
//                     .settings.text("No need to change this: Buffy guessing green did make her <em>wrong</em>, as described")
//                     .settings.position("left middle")
//                     .print( getCanvas("buffyPatch2") )
//                     .wait()
//                 ,
//                 getKey("pressKey").settings.enable()
//             )
//         )
//     ,
//     instructions()
//     ,
//     newText("pressSpace", "<p>Press Space to continue</p>").settings.italic().settings.center().print(),
//     getKey("pressKey").wait(
//         getPalette("palette").test.color( getCanvas("obsPatch1") , "red" ).failure( 
//             getTooltip("feedback")
//                 .settings.text("This flash should be <strong>red</strong>: the second flash was red <em>again</em>")
//                 .settings.position("left middle")
//                 .print( getCanvas("obsPatch1") )
//                 .wait()
//         )
//     ),
//     getText("pressSpace").remove()
//     ,
//     finalMessage(  )
// )


// PennController( "training-fixing" , 
//     // Strip configuration
//     strip( /*Buffy 1st*/'yellow' , /*Buffy 2st*/'blue' , /*Actual 1st*/'yellow', /*Actual 2nd*/'yellow' )
//     ,
//     getCanvas("strip").settings.center().print(),
//     getCanvas("observationsPanel").settings.visible(),
//     getCanvas("then").settings.visible()
//     // End strip configuration
//     ,
//     newText("description" , "Buffy thought the first flash would be yellow, and she was right").print(),
//     newTooltip("feedback"),
//     newKey("pressKey", " ")
//     ,
//     palette( 'yellow' , 'blue' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
//     getPalette("palette")
//         .brush( getCanvas("obsPatch1") , "yellow" )
//         .brush( getCanvas("buffyPatch1") , "yellow" )
//         .settings.callback(
//             getPalette("palette").test.color( getCanvas("obsPatch1") , "yellow" ).failure(
//                 getKey("pressKey").settings.disable()       // Temporarilly disable trial validation
//                 ,
//                 getPalette("palette").brush(getCanvas("obsPatch2"),"yellow"),
//                 getTooltip("feedback")
//                     .settings.text("No, this was right: Buffy was <em>right</em> that the first flash would be yellow")
//                     .settings.position("left middle")
//                     .print( getCanvas("obsPatch1") )
//                     .wait()
//                 ,
//                 getKey("pressKey").settings.enable()
//             )
//             ,
//             getPalette("palette").test.color( getCanvas("buffyPatch1") , "yellow" ).failure(
//                 getKey("pressKey").settings.disable()       // Temporarilly disable trial validation
//                 ,
//                 getPalette("palette").brush(getCanvas("buffyPatch1"),"yellow"),
//                 getTooltip("feedback")
//                     .settings.text("No, this was right: Buffy did think that the first flash would be yellow")
//                     .settings.position("left middle")
//                     .print( getCanvas("buffyPatch1") )
//                     .wait()
//                 ,
//                 getKey("pressKey").settings.enable()
//             )
//         )
//     ,
//     instructions()
//     ,
//     newText("pressSpace", "<p>Press Space to continue</p>").settings.italic().settings.center().print(),
//     getKey("pressKey").wait(),
//     getText("pressSpace").remove()
//     ,
//     finalMessage( "Good, all the colors were already right on this one!" )
// )