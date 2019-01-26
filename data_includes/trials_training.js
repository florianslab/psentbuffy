PennController( "training-shake-the-ball" ,
    newCanvas("ball", 40, 40).settings.css({'border': 'solid 1px black', 'border-radius': '20px'}).print()
    ,
    newText("instructions", "This ball is transparent. Shake it, and it will change color.").print()
    ,
    newButton("shake", "Shake").print().wait()
    ,
    shake('red')
    ,
    getText("instructions").settings.text("Retry as many times as you want: the ball sometimes turns green!")
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
                getText("instructions").settings.text("No luck this time! Retry and maybe it will turn green.")
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
    newText("instructions", "We put a few of these balls in this bowl. Click on it to draw one ball.").print()
    ,
    newSelector("clickBowl").settings.add( getCanvas("bowl") ).settings.once().wait()
    ,
    getCanvas('bowl').remove()
    ,
    reportNoBuffy("green","red"),
    getText("label shake").settings.hidden(),
    getCanvas("shakenBall").settings.hidden(),
    getCanvas("lineMiddle").settings.hidden(),
    getCanvas("sequence").print()
    ,
    newCanvas("ball", 40, 40).settings.css({'border': 'solid 1px black', 'border-radius': '20px', 'background': 'green'}).print()
    ,
    getText("instructions").settings.text("You drew a green ball. <br>Now reset and shake the ball.").print()
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
    getText("label shake").settings.visible(),
    getCanvas("shakenBall").settings.visible(),
    getCanvas("lineMiddle").settings.visible()
    ,
    newTimer("prelegend", 250).start().wait()
    ,
    newTooltip("legend", "This is a report of what happened")
        .settings.frame("dotted 2px purple")
        .settings.position("bottom center")
        .print( getCanvas("sequence") )
        .wait()
    ,
    getTooltip("legend").settings.text("In this case, it reports that the ball that was drawn was green").print(getCanvas("drawnBall")).wait(),
    getTooltip("legend").settings.text("then it was reset and shaken and it was red").print(getCanvas("shakenBall")).wait()
    ,
    newButton("validate", "Validate").print().wait()
)


PennController( "training-buffy-guesses" ,
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
    report(/*actual*/"blue","blue",/*buffy*/"orange","blue"),
    getText("label guess").settings.hidden(),
    getCanvas("buffyPanel").settings.hidden(),
    getCanvas("lineLeft").settings.hidden(),
    getText("label shake").settings.hidden(),
    getCanvas("shakenBall").settings.hidden(),
    getCanvas("lineRight").settings.hidden(),
    getCanvas("sequence").print()
    ,
    newCanvas("ball", 40, 40).settings.css({'border': 'solid 1px black', 'border-radius': '20px', 'background': 'blue'}).print()
    ,
    getText("description").settings.text("<p>You drew a blue ball.</p>")
    ,
    newText("instructions", 
        "Now Buffy the cat, who has been blindfolded, <br>"+
        "tries to guess the color of the ball you drew, <br>"+
        "and what color it will be after the shake."
    ).print()
    ,
    newButton("continue", "Continue").print().wait().remove()
    ,
    getText("label guess").settings.visible(),
    getCanvas("lineLeft").settings.visible(),
    getCanvas("buffyPanel").settings.visible()
    ,
    newButton("shake", "Shake").settings.disable().settings.after(newButton("reset", "Reset")).print()
    ,
    getText("instructions").settings.text(""),
    getText("description").settings.text("<p>Buffy thought that, after the shake, the ball would be blue.</p><p>&nbsp;</p>")
    ,
    newTimer("beforeDescription", 250).start().wait()
    ,
    getText("instructions").settings.text("<p>Now reset and shake the ball.</p>")
    ,
    getButton("reset").wait().settings.disable()
    ,
    getCanvas("ball").settings.css("background", "white"),
    getButton("shake").settings.enable().wait().remove()
    ,
    shake("blue")
    ,
    getText("label shake").settings.visible(),
    getCanvas("shakenBall").settings.visible(),
    getCanvas("lineRight").settings.visible()
    ,
    getText("description").settings.text(
        "<p>Buffy thought that, after the shake, the ball would be blue.</p>"+
        "<p>As a matter of fact, her <em>shake</em> guess was correct.</p>"
    ),
    newButton("validate", "Validate").print().wait()
)


PennController( "training-paint-main-draw" ,
    newText("description", 
        "<p>When it was drawn, the ball was pink.</p>"+
        "<p>As a matter of fact, Buffy's <em>draw</em> guess was correct.</p>"
    ).print()
    ,
    report(/*actual*/"pink","yellow",/*buffy*/"yellow","pink"),
    getCanvas("sequence").print()
    ,
    newTooltip('guide', "From now on you will only see final reports")
        .print()
        .wait()
        .remove()
    ,
    getTooltip('guide')
        .settings.text('Sometimes, a problem happened with the pictures and the colors can be wrong')
        .settings.position('middle right')
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
    newText("description", 
        "<p>Buffy thought that, when it was drawn, the ball was orange.</p>"+
        "<p>As a matter of fact, her <em>draw</em> guess was correct.</p>"
    ).print()
    ,
    report(/*actual*/"orange","orange",/*buffy*/"orange","pink"),
    getCanvas("sequence").print()
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
                .settings.position('center top')
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
    newText("description", 
        "<p>After the shake, the ball was green again.</p>"+
        "<p>As a matter of fact, Buffy's <em>shake</em> guess was correct.</p>"
    ).print()
    ,
    report(/*actual*/"red","green",/*buffy*/"green","green"),
    getCanvas("sequence").print()
    ,
    palette( 'green' , 'red' , getCanvas('drawnBall') , getCanvas('buffyPatch1') , getCanvas("buffyPatch2") , getCanvas('shakenBall') )
    ,
    newTooltip("feedback").settings.frame("dashed 2px purple").settings.position("middle right")
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