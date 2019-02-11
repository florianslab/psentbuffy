PennController( "tutorial-introduction" ,
    newText("training label", "Tutorial")
        .settings.center()
        .settings.italic()
        .settings.color('blue')
        .print()
    ,
    reportNoBuffy("green","red"),
    getText("label draw").settings.hidden(),
    getText("label shake").settings.hidden(),
    getCanvas("drawnBall").settings.hidden(),
    getCanvas("shakenBall").settings.hidden(),
    getCanvas("lineMiddle").settings.hidden(),
    getCanvas("sequence").print()
    ,
    newCanvas("bowlShape", 100, 0)
        .settings.css({
            'border-top': '100px solid gray',
            'border-left': '25px solid transparent',
            'border-right': '25px solid transparent',
            'height': '0',
            'width': '100px'
        })
    ,
    newCanvas("bowl", 150, 100)
        .settings.add( 0 , 0 , getCanvas("bowlShape") )
        .print()
    ,
    newTooltip("guide", "This is a blackboard")
        .settings.frame("dotted 2px white")
        .settings.position("bottom center")
        .print( getCanvas("sequence") )
        .wait()
    ,
    getTooltip("guide").settings.text("And this is a bowl. Click on it to draw a ball out of it.")
        .settings.frame("dotted 2px black")
        .print( getCanvas("bowl") )
        .wait()
    ,
    newSelector("clickBowl").settings.add( getCanvas("bowl") ).settings.once().wait()
    ,
    getCanvas('bowl').remove()
    ,
    newCanvas("ball", 40, 40).settings.css({'border': 'solid 1px black', 'border-radius': '20px', 'background': 'green'}).print()
    ,
    getTooltip("guide").settings.text("You drew a green ball")
        .print( getCanvas("ball") )
        .wait()
    ,
    getText("label draw").settings.visible(),
    getCanvas("drawnBall").settings.visible()
    ,
    getTooltip("guide").settings.text("As things happen, an illustrator depicts them on the black board")
        .settings.frame("dotted 2px white")
        .print( getCanvas("drawnBall") )
        .wait()
    ,
    getTooltip("guide").settings.text("Here, the illustration consistently depicts that you drew a green ball")
        .print( getCanvas("drawnBall") )
        .wait()
    ,
    getTooltip("guide").settings.text("The ball is a magic ball: you can reset it to transparent, and shake it to see what color it then turns!")
        .settings.frame("dotted 2px black")
        .print( getCanvas("ball") )
        .wait()
    ,
    newButton("shake", "Shake").settings.disable().settings.after(newButton("reset", "Reset")).print()
    ,
    getTooltip("guide").settings.text("Click the <em>Reset</em> button and then click the <em>Shake</em> button")
        .print()
        .wait()
    ,
    getButton("reset").wait().settings.disable(),
    getCanvas("ball").settings.css("background", "white")
    ,
    getTooltip("guide").settings.text("Good, you reset the ball to transparent. Now click the <em>Shake</em> button")
        .print()
    ,
    getButton("shake").settings.enable().wait().remove()
    ,
    shake("red")
    ,
    getTooltip("guide").settings.text("See, the ball turned red!")
        .print( getButton("ball") )
        .wait()
    ,
    getText("label shake").settings.visible(),
    getCanvas("shakenBall").settings.visible(),
    getCanvas("lineMiddle").settings.visible()
    ,
    getTooltip("guide").settings.text("The illustrator proceeds: the illustration rightly shows that the ball was red after the shake")
        .settings.frame("dotted 2px white")
        .print( getCanvas("shakenBall") )
        .wait()
    ,
    getTooltip("guide").settings.text("Let's add some more fun to the game")
        .print()
        .wait()
)
    

PennController( "tutorial-introduce-buffy" ,
    newText("training label", "Tutorial")
        .settings.center()
        .settings.italic()
        .settings.color('blue')
        .print()
    ,
    report(/*actual*/"green","green",/*buffy*/"orange","green"),
    ...hide23(),
    getText("label draw").settings.hidden(),
    getCanvas("drawnBall").settings.hidden(),
    getCanvas("sequence").print()
    ,
    newCanvas("bowlShape", 100, 0)
        .settings.css({
            'border-top': '100px solid gray',
            'border-left': '25px solid transparent',
            'border-right': '25px solid transparent',
            'height': '0',
            'width': '100px'
        })
    ,
    newCanvas("bowl", 150, 100)
        .settings.add( 0 , 0 , getCanvas("bowlShape") )
        .print()
    ,
    newTooltip("guide", "Click on the bowl to draw a magic ball")
        .settings.frame("dotted 2px white")
        .settings.position("bottom center")
        .print( getCanvas("bowl") )
        .wait()
    ,
    newSelector("clickBowl").settings.add( getCanvas("bowl") ).settings.once().wait()
    ,
    getCanvas('bowl').remove()
    ,
    newCanvas("ball", 40, 40).settings.css({'border': 'solid 1px black', 'border-radius': '20px', 'background': 'green'}).print()
    ,
    getTooltip("guide").settings.text("You drew a green ball")
        .print()
        .wait()
    ,
    getText("label draw").settings.visible(),
    getCanvas("drawnBall").settings.visible()
    ,
    getTooltip("guide").settings.text("The illustrator depicts it on the board")
        .print( getCanvas("drawnBall") )
        .wait()
    ,
    newImage("real buffy", "buffy_blindfold.png")
        .settings.before( newText("buffy says", "Orange!").settings.hidden().settings.css({'font-weight': 'bold', 'font-size': 'x-large'}) )
        .print()
    ,
    getTooltip("guide").settings.text("This is Buffy the cat. She is blindfolded, and she will make guesses.")
        .settings.frame("none")
        .print( getCanvas("real buffy") )
        .wait()
    ,
    getTooltip("guide").settings.text("&quot;<em>Buffy, what color do you think the ball was when it was drawn?</em>&quot;")
        .print( getCanvas("real buffy") )
        .wait()
    ,
    getText("buffy says").settings.visible()
    ,
    getTooltip("guide").settings.text("Buffy cannot see the drawn ball, so she does not know she is wrong")
        .print( getCanvas("buffy says") )
        .wait()
    ,
    getText("buffy says").settings.hidden()
    ,
    getTooltip("guide").settings.text("&quot;<em>Buffy, what color do you think the ball will be after the shake?</em>&quot;")
        .print( getCanvas("real buffy") )
        .wait()
    ,
    getText("buffy says").settings.text("Green!").settings.visible()
    ,
    getTooltip("guide").settings.text("Buffy thinks that, after the shake, the ball will be green")
        .print( getCanvas("buffy says") )
        .wait()
    ,
    getText("buffy says").settings.hidden(),
    getText("label guess").settings.visible(),
    getCanvas("lineLeft").settings.visible(),
    getCanvas("buffyPanel").settings.visible()
    ,
    getTooltip("guide").settings.text("The illustrator depicts Buffy's guesses on the blackboard")
        .settings.frame("dotted 2px white")
        .print( getCanvas("buffyPanel") )
        .wait()
    ,
    getImage("real buffy").remove(),
    newButton("shake", "Shake").settings.disable().settings.after(newButton("reset", "Reset")).print()
    ,
    getTooltip("guide").settings.text("Now Reset and Shake the ball")
        .print()
    ,
    getButton("reset").wait().settings.disable(),
    getCanvas("ball").settings.css("background", "white"),
    getButton("shake").settings.enable()
    ,
    getTooltip("guide").settings.text("You reset the ball to transparent. Now click <em>Shake</em>")
        .print()
    ,
    getButton("shake").wait().remove(),
    shake("green"),
    getText("label shake").settings.visible(),
    getCanvas("shakenBall").settings.visible(),
    getCanvas("lineRight").settings.visible()
    ,
    getTooltip("guide").settings.text("And finally, the illustrator depicts what happened after the shake")
        .print( getCanvas("shakenBall") )
        .wait()
    ,
    getTooltip("guide").settings.text("So this is what a game looks like, but the illustrator isn't always reliable").print().wait(),
    getTooltip("guide").settings.text("Your task will be to check the illustrations, given some facts about what actually happened").print().wait(),
    getTooltip("guide").settings.text("Sometimes the illustrator is right, but sometimes you will have to fix the illustration").print().wait(),
    getTooltip("guide").settings.text("Let's proceed and look at an incorrect illustration").print().wait()
)
    

    
    
    
    

PennController( "tutorial-incorrect-illustration" ,
    newText("training label", "Tutorial")
        .settings.center()
        .settings.italic()
        .settings.color('blue')
        .print()
    ,
    newText("description", "<p><em>Fact:</em> &nbsp; The ball was pink when it was drawn.</p>").print()
    ,
    report(/*actual*/"yellow","yellow",/*buffy*/"yellow","pink"),
    ...hide23(),
    getText("label draw").settings.hidden(),
    getCanvas("drawnBall").settings.hidden(),
    getCanvas("sequence").print()
    ,
    newTooltip("guide", "This is a fact given to you")
        .settings.frame("dotted 2px black")
        .settings.position("bottom center")
        .print( getText("description") )
        .wait()
    ,
    getTooltip("guide").settings.text("And this is our good old blackboard")
        .print( getCanvas("sequence") )
        .wait()
    ,
    getTooltip("guide").settings.text("Let us see what the illustrator depicted")
        .print( getCanvas("sequence") )
        .wait()
    ,
    getText("label draw").settings.visible(),
    getCanvas("drawnBall").settings.visible(),
    newTimer("between-steps", DELAY).start().wait()
    ,
    getText("label guess").settings.visible(),
    getCanvas("buffyPanel").settings.visible(),
    getCanvas("lineLeft").settings.visible(),
    getTimer("between-steps").start().wait()
    ,
    getText("label shake").settings.visible(),
    getCanvas("shakenBall").settings.visible(),
    getCanvas("lineRight").settings.visible()
    ,
    getTooltip("guide").settings.text("For all we know, the illustrator is right about Buffy's guesses...")
        .settings.frame("dotted 2px white")
        .print( getCanvas("buffyPanel") )
        .wait()
    ,
    getTooltip("guide").settings.text("... and about the <em>shake</em> color: they're not inconsistent with the fact")
        .print( getCanvas("shakenBall") )
        .wait()
    ,
    getTooltip("guide").settings.text("But as you can see, the illustrator is wrong about the <em>draw</em> color")
        .print( getCanvas("drawnBall") )
        .wait()
    ,
    palette( 'pink' , 'yellow' , getCanvas('drawnBall') , getCanvas('buffyPatch1') , getCanvas("buffyPatch2") , getCanvas('shakenBall') )
    ,
    getPalette('palette').settings.callback(
        getPalette('palette').test.color( getCanvas("shakenBall") , 'pink' ).success(
            getPalette('palette').settings.disable(),
            getSelector("usePink").settings.disable()
            ,
            getTooltip('guide')
                .settings.text("The currently depicted <em>shake</em> color is not inconsistent with the fact: no need to change it")
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
                .settings.text("The current depiction of Buffy's <em>draw</em> guess is not inconsistent with the fact: no need to change it")
                .print( getCanvas('buffyPatch2') )
                .wait()
            ,
            getSelector("usePink").settings.enable(),
            getPalette('palette').settings.enable(),
            getPalette('palette').brush( getCanvas("buffyPatch2") , 'pink' )
        )
        ,
        getPalette('palette').test.color( getCanvas("buffyPatch1") , 'pink' ).success(
            getPalette('palette').settings.disable(),
            getSelector("usePink").settings.disable()
            ,
            getTooltip('guide')
                .settings.text("The current depiction of Buffy's <em>shake</em> guess is not inconsistent with the fact: no need to change it")
                .print( getCanvas('buffyPatch1') )
                .wait()
            ,
            getSelector("usePink").settings.enable(),
            getPalette('palette').settings.enable(),
            getPalette('palette').brush( getCanvas("buffyPatch1") , 'yellow' )
        )
    )
    ,
    getTooltip("guide").settings.text("Your task is to use these colors, when appropriate, to fix the illustration")
        .settings.frame("dotted 2px black")
        .print( getCanvas("board") )
        .wait()
    ,
    getTooltip('guide').settings.text("For example, the <em>draw</em> color should be pink, given the fact that we know")
        .settings.frame("dotted 2px white")
        .print( getCanvas('drawnBall') )
        .wait()
    ,
    getTooltip('guide').settings.text("First make a simple click on the pink patch")
        .settings.frame("dotted 2px black")
        .print( getCanvas('color1') )
    ,
    newSelector("usePink")
        .settings.add( getCanvas('color1') )
        .settings.frame('none')
        .settings.once()
        .wait()
    ,
    getTooltip('guide').settings.text("And now click on the <em>draw</em> color to fix it")
        .settings.frame("dotted 2px white")
        .print( getCanvas("drawnBall") )
    ,
    newSelector("printPink")
        .settings.add( getCanvas("drawnBall") )
        .settings.frame('none')
        .settings.once()
        .wait()
    ,
    getTooltip('guide').settings.text("Great, let's go through a couple more examples")
        .print()
        .wait()
)



    
    
    
    
PennController( "tutorial-correct-illustration" ,
    newText("training label", "Tutorial")
        .settings.center()
        .settings.italic()
        .settings.color('blue')
        .print()
    ,
    newText("description", "<p><em>Fact:</em> &nbsp; Buffy thought that, after the shake, the ball would be violet.</p>").print()
    ,
    report(/*actual*/"orange","orange",/*buffy*/"orange","violet"),
    ...hide23(),
    getText("label draw").settings.hidden(),
    getCanvas("drawnBall").settings.hidden(),
    getCanvas("sequence").print()
    ,
    newTimer("between-steps", DELAY).start().wait()    
    ,
    getText("label draw").settings.visible(),
    getCanvas("drawnBall").settings.visible(),
    getTimer("between-steps").start().wait()
    ,
    getText("label guess").settings.visible(),
    getCanvas("buffyPanel").settings.visible(),
    getCanvas("lineLeft").settings.visible(),
    getTimer("between-steps").start().wait()
    ,
    getText("label shake").settings.visible(),
    getCanvas("shakenBall").settings.visible(),
    getCanvas("lineRight").settings.visible()
    ,
    palette( 'orange' , 'violet' , getCanvas('drawnBall') , getCanvas('buffyPatch1') , getCanvas("buffyPatch2") , getCanvas('shakenBall') )
    ,
    newSelector("clickDrawn")
        .settings.add( getCanvas("drawnBall") , getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("shakenBall") )
        .settings.frame("none")
        .settings.callback(
            getPalette('palette')
                .brush( getCanvas('drawnBall') , 'orange' )
                .brush( getCanvas('buffyPatch1') , 'orange' )
                .brush( getCanvas('shakenBall') , 'orange' )
                .brush( getCanvas('buffyPatch2') , 'violet' )
            ,
            getTooltip('guide').settings.text("No need to fix anything: the illustration is not inconsistent with the fact")
                .settings.position('center top')
                .print( getText('description') )
        )
    ,
    newButton("continue", "Continue")
        .print()
    ,
    newTooltip("guide", "Click on <em>Continue</em> when the illustration is consistent with the fact")
        .print()
    ,
    getButton("continue").wait()
    ,
    getTooltip('guide').settings.text("Right, sometimes the illustrator is right, and no fix is needed! Let's try one last one")
        .print()
        .wait()
)

    
    
    
    
PennController( "tutorial-again" ,
    newText("training label", "Tutorial")
        .settings.center()
        .settings.italic()
        .settings.color('blue')
        .print()
    ,
    newText("description", "<p><em>Fact:</em> &nbsp; After the shake, the ball was green again.</p>").print()
    ,
    report(/*actual*/"red","green",/*buffy*/"green","green"),
    ...hide23(),
    getText("label draw").settings.hidden(),
    getCanvas("drawnBall").settings.hidden(),
    getCanvas("sequence").print()
    ,
    newTimer("between-steps", DELAY).start().wait()    
    ,
    getText("label draw").settings.visible(),
    getCanvas("drawnBall").settings.visible(),
    getTimer("between-steps").start().wait()
    ,
    getText("label guess").settings.visible(),
    getCanvas("buffyPanel").settings.visible(),
    getCanvas("lineLeft").settings.visible(),
    getTimer("between-steps").start().wait()
    ,
    getText("label shake").settings.visible(),
    getCanvas("shakenBall").settings.visible(),
    getCanvas("lineRight").settings.visible()
    ,
    palette( 'green' , 'red' , getCanvas('drawnBall') , getCanvas('buffyPatch1') , getCanvas("buffyPatch2") , getCanvas('shakenBall') )
    ,
    newTooltip("feedback", "").settings.frame("dashed 2px white")
    ,
    newSelector("clickDrawn")
        .settings.add( getCanvas("drawnBall") )
        .settings.frame("none")
        .settings.callback(
            getPalette('palette').test.color( getCanvas("drawnBall") , 'green' )
            .success(
                getTooltip('feedback').settings.text("Right, the decpited <em>draw</em> color should be green: the ball was green <em>again</em>")
                    .print( getCanvas('drawnBall') )
                ,
                getSelector('clickDrawn').settings.disable()
            )
        )
    ,
    getPalette('palette').settings.callback(
        getPalette('palette').test.color( getCanvas("shakenBall") , 'red' ).success(
            getTooltip('feedback').settings.text("Wrong, the depicted <em>shake</em> color should remain green: the ball was green again")
                .print( getCanvas('shakenBall') )
                .wait()
            ,
            getPalette('palette').brush( getCanvas("shakenBall") , 'green' )
        )
        ,
        getPalette('palette').test.color( getCanvas("buffyPatch2") , 'red' ).success(
            getTooltip('feedback').settings.text("The current depiction of Buffy's <em>shake</em> guess is not inconsistent with the fact, no need to change it")
                .print( getCanvas('buffyPatch2') )
                .wait()
            ,
            getPalette('palette').brush( getCanvas("buffyPatch2") , 'green' )
        )
        ,
        getPalette('palette').test.color( getCanvas("buffyPatch1") , 'red' ).success(
            getTooltip('feedback').settings.text("The current depiction of Buffy's <em>draw</em> guess is not inconsistent with the fact, no need to change it")
                .print( getCanvas('buffyPatch1') )
                .wait()
            ,
            getPalette('palette').brush( getCanvas("buffyPatch1") , 'green' )
        )
    )
    ,
    newButton('continue', "Continue")
        .print()
        .wait(
            getPalette('palette').test.color( getCanvas('drawnBall') , 'green' )
            .failure(
                getTooltip('feedback').settings.text("The depicted <em>draw</em> color should be green: the ball was green <em>again</em>")
                    .print( getCanvas('drawnBall') )
            )
        )
    ,
    getTooltip('feedback')
        .settings.text("Great, you got it! Now you will practice a little and then we'll start the experiment.")
        .print()
        .wait()
)