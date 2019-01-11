//      ACTUAL SQUARES
//
PennController( "training-observations-only" ,
    // Strip configuration
    strip( 'grey' , 'grey' , 'grey', 'grey' )
    ,
    getCanvas("tada").settings.hidden(),
    getCanvas("observationsPanel").settings.center().print()
    // End strip configuration
    ,
    newText("description" , "The first flash was green").print(),
    palette( 'green' , 'red' , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
    instructions()
    ,
    newTooltip("feedback", "You must paint this <strong>green</strong>: the first flash was green")
        .settings.position("left middle")
    ,
    pressSpaceKey(
        getPalette("palette").test.color( getCanvas("obsPatch1") , "green" )
        .failure( getTooltip("feedback").print(getCanvas("obsPatch1")).wait() )
    )
    ,
    finalMessage( "Good, the first flash was green, so you painted the 1st square green" )
)


PennController( "training-observations-only" ,
    // Strip configuration
    strip( 'grey' , 'grey' , 'grey', 'grey' )
    ,
    getCanvas("tada").settings.hidden(),
    getCanvas("observationsPanel").settings.center().print()
    // End strip configuration
    ,
    newText("description" , "The second flash was red").print(),
    palette( 'green' , 'red' , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
    instructions()
    ,
    newTooltip("feedback", "You must paint this <strong>red</strong>: the second flash was red")
        .settings.position("right middle")
    ,
    pressSpaceKey(
        getPalette("palette").test.color( getCanvas("obsPatch2") , "red" )
        .failure( getTooltip("feedback").print(getCanvas("obsPatch2")).wait() )
    )
    ,
    finalMessage( "Good, the second flash was red, so you painted the 2nd square red" )
)


PennController( "training-observations-only" ,
    // Strip configuration
    strip( 'grey' , 'grey' , 'grey', 'grey' )
    ,
    getCanvas("tada").settings.hidden(),
    getCanvas("observationsPanel").settings.center().print()
    // End strip configuration
    ,
    newText("description" , "The second flash was blue again").print(),
    palette( 'blue' , 'yellow' , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
    instructions()
    ,
    newTooltip("feedback", "You must paint both of these <strong>blue</strong>: "+
                           "the second flash was blue <em>again</em>")
        .settings.position("center top")
    ,
    pressSpaceKey(
        getPalette("palette").test.color( getCanvas("obsPatch1") , "blue" ).and(
            getPalette("palette").test.color( getCanvas("obsPatch2") , "blue" )
        ).failure( getTooltip("feedback").print(getCanvas("observationsPanel")).wait() )
    )
    ,
    finalMessage( "Good, the second flash was blue <em>again</em>, so you painted both squares blue" )
)
//
//      END ACTUAL SQUARES


//      FIRST TRANSITION
//
PennController( 'training-transition1' , 
    newText("transition", "<p>Good. Now things are going to get a little bit more complex.</p>"+
                          "<p>To the left of the flahes, you will see the guesses of Buffy the cat</p>"+
                          "<p>Pay attention to the descriptions so as to paint accurately</p>").print()
    ,
    pressSpaceKey()
)
//
//      END FIRST TRANSITION


//      BUFFY + ACTUAL SQUARES
//
PennController( "training-with-buffy" ,
    // Strip configuration
    strip( 'grey' , 'grey' , 'grey', 'grey' )
    ,
    getCanvas("strip").settings.center().print()
    // End strip configuration
    ,
    newText("description" , "Buffy thought the first flash would be pink")
        .settings.after( newText("continuation", "...").settings.bold().settings.hidden() )
        .print(),
    palette( 'pink' , 'green' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
    instructions()
    ,
    newTooltip("feedback", "You must paint this <strong>pink</strong>: "+
                           "Buffy thought the first flash would be pink")
        .settings.position("left middle")
    ,
    pressSpaceKey(
        getPalette("palette").test.color( getCanvas("buffyPatch1") , "pink" )
        .failure( getTooltip("feedback").print(getCanvas("buffyPatch1")).wait() )
    )
    ,
    getText("instructions").remove(),
    getText("then").settings.visible(),
    getText("continuation").settings.visible()
    ,
    pressSpaceKey()
    ,
    getCanvas("observationsPanel").settings.visible(),
    getText("continuation")
        .settings.text(", and she was right"),
    getTooltip("feedback")  
        .settings.text("You must paint this <strong>pink</strong>: "+
                       "Buffy was right, so the first flash indeed turned out to be pink")
    ,
    getText("instructions").print()
    ,
    pressSpaceKey(
        getPalette("palette").test.color( getCanvas("obsPatch1") , "pink" )
        .failure( getTooltip("feedback").print(getCanvas("obsPatch1")).wait() )
    )
    ,
    finalMessage( "Good, Buffy was right that the first flash would be pink, so you painted both 1st squares pink" )
)


PennController( "training-with-buffy" ,
    // Strip configuration
    strip( 'grey' , 'grey' , 'grey', 'grey' )
    ,
    getCanvas("strip").settings.center().print()
    // End strip configuration
    ,
    newText("description" , "Buffy thought the second flash would be orange")
        .settings.after( newText("continuation", "...").settings.bold().settings.hidden() )
        .print(),
    palette( 'blue' , 'orange' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
    instructions()
    ,
    newTooltip("feedback", "You must paint this <strong>orange</strong>: Buffy thought the second flash would be orange")
        .settings.position("right middle")
    ,
    pressSpaceKey(
        getPalette("palette").test.color( getCanvas("buffyPatch2") , "orange" )
        .failure( getTooltip("feedback").print(getCanvas("buffyPatch2")).wait() )
    )
    ,
    getText("instructions").remove(),
    getText("then").settings.visible(),
    getText("continuation").settings.visible()
    ,
    pressSpaceKey()
    ,
    getCanvas("observationsPanel").settings.visible(),
    getText("continuation")
        .settings.text(", but she was wrong"),
    getTooltip("feedback")
        .settings.text("You must paint this <strong>blue</strong>: "+
                       "Buffy was wrong, so the second did <em>not</em> turn out to be orange")
    ,
    getText("instructions").print()
    ,
    pressSpaceKey(
        getPalette("palette").test.color( getCanvas("obsPatch2") , "blue" )
        .failure( getTooltip("feedback").print(getCanvas("obsPatch2")).wait() )
    )
    ,
    finalMessage( "Good, Buffy was wrong that the second flash would be orange, so you painted Buffy's 2nd square orange and the actual 2nd square blue" )
)


PennController( "training-with-buffy" ,
    // Pre-trial message
    newText("reversed", "Let's try to reverse the order!").print(),
    pressSpaceKey(),
    getText("reversed").remove()
    // End pre-trial message
    , 
    // Strip configuration
    strip( 'grey' , 'grey' , 'grey', 'grey' )
    ,
    getCanvas("buffyPanel").settings.hidden(),
    getCanvas("strip").settings.center().print(),
    getCanvas("observationsPanel").settings.visible()
    // End strip configuration
    ,
    newText("description" , "The second flash was yellow again")
        .settings.after( newText("continuation", "...").settings.bold().settings.hidden() )
        .print(),
    palette( 'red' , 'yellow' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
    instructions()
    ,
    newTooltip("feedback", "You must paint both of these <strong>yellow</strong>: "+
                           "the second flash was yellow <em>again</em>")
        .settings.position("center bottom")
    ,
    pressSpaceKey(
        getPalette("palette").test.color( getCanvas("obsPatch1") , "yellow" ).and(
            getPalette("palette").test.color( getCanvas("obsPatch2") , "yellow" )
        ).failure( getTooltip("feedback").print(getCanvas("observationsPanel")).wait() )
    )
    ,
    getText("instructions").remove(),
    getCanvas("buffyPanel").settings.visible(),
    getText("then").settings.visible(),
    getText("continuation")
        .settings.text(", so Buffy was wrong")
        .settings.visible(),
    getTooltip("feedback")
        .settings.text("You should have <strong>red</strong> here: Buffy was <em>wrong</em>")
    ,
    getText("instructions").print()
    ,
    pressSpaceKey(
        getPalette("palette").test.color( getCanvas("buffyPatch2") , "red" )
        .failure( getTooltip("feedback").print(getCanvas("buffysGuesses")).wait() )
    )
    ,
    finalMessage( "Good, the second flash was yellow again, so you painted the actual 1st and 2nd squares yellow and Buffy's red, because she was wrong"  )
)
//
//      END BUFFY + ACTUAL SQUARES


//      SECOND TRANSITION
//
PennController( 'training-transition2' ,
    newText("transition", "<p>Good, now you understand the painting task.</p>"+
                          "<p>From now on, you will review what <em>other people</em> did on this task.</p>"+
                          "<p>We ask you to fix the colors <em>if need be</em> before validating.</p>"+
                          "<p>Let us go through a couple of trials together and then you will do it on your own.</p>").print()
    ,
    pressSpaceKey()
)
//
//      END SECOND TRANSITION


//      FIXING TASK
//
PennController( "training-fixing" , 
    // Strip configuration
    strip( /*Buffy 1st*/'orange' , /*Buffy 2st*/'orange' , /*Actual 1st*/'orange', /*Actual 2nd*/'blue' )
    ,
    getCanvas("strip").settings.center().print(),
    getCanvas("observationsPanel").settings.visible(),
    getCanvas("then").settings.visible()
    // End strip configuration
    ,
    newText("description" , "Buffy thought the second flash would be orange, and she was right")
        .settings.after( newText("continuation", "...").settings.bold().settings.hidden() )
        .print(),
    palette( 'red' , 'yellow' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") ),
    instructions()
    ,
    newTooltip("feedback", "You must paint both of these <strong>yellow</strong>: "+
                           "the second flash was yellow <em>again</em>")
        .settings.position("center bottom")
    ,
    pressSpaceKey(
        getPalette("palette").test.color( getCanvas("obsPatch1") , "yellow" ).and(
            getPalette("palette").test.color( getCanvas("obsPatch2") , "yellow" )
        ).failure( getTooltip("feedback").print(getCanvas("observationsPanel")).wait() )
    )
    ,
    getText("instructions").remove(),
    getCanvas("buffyPanel").settings.visible(),
    getText("then").settings.visible(),
    getText("continuation")
        .settings.text(", so Buffy was wrong")
        .settings.visible(),
    getTooltip("feedback")
        .settings.text("You should have <strong>red</strong> here: Buffy was <em>wrong</em>")
    ,
    getText("instructions").print()
    ,
    pressSpaceKey(
        getPalette("palette").test.color( getCanvas("buffyPatch2") , "red" )
        .failure( getTooltip("feedback").print(getCanvas("buffysGuesses")).wait() )
    )
    ,
    finalMessage( "Good, the second flash was yellow again, so you painted the actual 1st and 2nd squares yellow and Buffy's red, because she was wrong"  )
)