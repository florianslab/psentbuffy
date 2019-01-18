PennController.Template( "psbuffy.csv" ,
    row => PennController( "test-" + row.Subject + "-" + row.MatrixLeftPredicate + "-" + row.Condition ,
        // DEBUG
        newText("debug", JSON.stringify(row).replace(/,/g,'<br>') )
            .print()
            .settings.cssContainer({position:'absolute',left:0,'text-align':'left'})
        ,
        // END DEBUG
        newCanvas( "buffysGuesses" , 100 , 80 )
            .settings.add( "center at 25%" ,  5 , newText("firstBuffy", "draw").settings.italic() )
            .settings.add( "center at 25%" , 45 , newText("secondBuffy", "shake").settings.italic() )
            .settings.add( "center at 75%" ,  5 , newCanvas("buffyPatch1", 20, 20).settings.css('background',row.Buffy1) )
            .settings.add( "center at 75%" , 45 , newCanvas("buffyPatch2", 20, 20).settings.css('background',row.Buffy2) )
        ,
        newCanvas("buffyPanel", 200, 100)  
            .settings.add( "right at 100%" , "center at 55%" , newImage("buffy", "buffy_blindfold.png").settings.size(80,80) )
            .settings.add( -5 , -10 , newImage("buffyBubble", "buffyBubble.png").settings.size(130,120) )
            .settings.add( "center at 25%" , 0 , newText("think", "I THINK...") )
            .settings.add( 0 , 20 , getCanvas("buffysGuesses") )
        ,
        newText("draw", "1. Draw: ").settings.after(
            newCanvas("drawnBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': row.Actual1})
        ).print()
        ,
        newText("guess", "2. Buffy's guesses: ").settings.after( getCanvas("buffyPanel") ).print()
        ,
        newText("shaken", "3. Shake: ").settings.after(
            newCanvas("shakenBall", 20, 20).settings.css({'border': 'solid 1px black', 'border-radius': '10px', 'background': row.Actual2})
        ).print()
        ,
        newText("description", 
            "<p>"+row.Sentence.charAt(0).toUpperCase()+row.Sentence.slice(1)+", </p>"+
            "<p>"+row.Continuation+".</p>"
        ).print()
        ,
        palette( row.Color , row.altercolor , getCanvas('drawnBall') , getCanvas('buffyPatch1') , getCanvas("buffyPatch2") , getCanvas('shakenBall') ),
        getPalette("palette").settings.log()
        ,
        newKey("space", " ").settings.callback( getButton("validate").click() ),
        newButton('validate', "Validate")
            .print()
            .wait()
            .remove()
        ,
        getCanvas('board').remove()
        ,
        newTimer("beforeEnd", 200).start().wait()
    )
)


// PennController( "test-again-main-fix" ,
//         // Strip configuration
//         strip( /*Buffy 1st*/'yellow' , /*Buffy 2st*/'yellow' , /*Actual 1st*/'blue', /*Actual 2nd*/'yellow' )
//         ,
//         getCanvas("strip").settings.center().print(),
//         getCanvas("observationsPanel").settings.visible(),
//         getCanvas("then").settings.visible()
//         // End strip configuration
//         ,
//         newText("description" , "The second flash was yellow again,<br>and Buffy was right about it").print(),
//         newKey("pressKey", " ")
//         ,
//         palette( 'yellow' , 'blue' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") )
//         ,
//         instructions()
//         ,
//         pressSpaceKey()
// )


// PennController( "test-again-main-fix" ,
//         // Strip configuration
//         strip( /*Buffy 1st*/'yellow' , /*Buffy 2st*/'yellow' , /*Actual 1st*/'blue', /*Actual 2nd*/'yellow' )
//         ,
//         getCanvas("strip").settings.center().print(),
//         getCanvas("observationsPanel").settings.visible(),
//         getCanvas("then").settings.visible()
//         // End strip configuration
//         ,
//         newText("description" , "The second flash was yellow,<br>and Buffy was right about it").print(),
//         newKey("pressKey", " ")
//         ,
//         palette( 'yellow' , 'blue' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") )
//         ,
//         instructions()
//         ,
//         pressSpaceKey()
// )

// PennController( "test-again-main-fix" ,
//         // Strip configuration
//         strip( /*Buffy 1st*/'yellow' , /*Buffy 2st*/'yellow' , /*Actual 1st*/'blue', /*Actual 2nd*/'yellow' )
//         ,
//         getCanvas("strip").settings.center().print(),
//         getCanvas("observationsPanel").settings.visible(),
//         getCanvas("then").settings.visible()
//         // End strip configuration
//         ,
//         newText("description" , "Buffy thought the second flash would be yellow,<br>and she was right about it").print(),
//         newKey("pressKey", " ")
//         ,
//         palette( 'yellow' , 'blue' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") )
//         ,
//         instructions()
//         ,
//         pressSpaceKey()
// )

// PennController( "test-again-main-fix" ,
//         // Strip configuration
//         strip( /*Buffy 1st*/'blue' , /*Buffy 2st*/'yellow' , /*Actual 1st*/'yellow', /*Actual 2nd*/'yellow' )
//         ,
//         getCanvas("strip").settings.center().print(),
//         getCanvas("observationsPanel").settings.visible(),
//         getCanvas("then").settings.visible()
//         // End strip configuration
//         ,
//         newText("description" , "Buffy thought the second flash would again be yellow,<br>and she was right about it").print(),
//         newKey("pressKey", " ")
//         ,
//         palette( 'yellow' , 'blue' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") )
//         ,
//         instructions()
//         ,
//         pressSpaceKey()
// )




// PennController( "test-again-main-good" ,
//         // Strip configuration
//         strip( /*Buffy 1st*/'yellow' , /*Buffy 2st*/'yellow' , /*Actual 1st*/'yellow', /*Actual 2nd*/'yellow' )
//         ,
//         getCanvas("strip").settings.center().print(),
//         getCanvas("observationsPanel").settings.visible(),
//         getCanvas("then").settings.visible()
//         // End strip configuration
//         ,
//         newText("description" , "The second flash was yellow again,<br>so Buffy was right").print(),
//         newKey("pressKey", " ")
//         ,
//         palette( 'yellow' , 'blue' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") )
//         ,
//         instructions()
//         ,
//         pressSpaceKey()
// )


// PennController( "test-main-fix" ,
//         // Strip configuration
//         strip( /*Buffy 1st*/'yellow' , /*Buffy 2st*/'yellow' , /*Actual 1st*/'blue', /*Actual 2nd*/'yellow' )
//         ,
//         getCanvas("strip").settings.center().print(),
//         getCanvas("observationsPanel").settings.visible(),
//         getCanvas("then").settings.visible()
//         // End strip configuration
//         ,
//         newText("description" , "The first flash was yellow,<br>so Buffy was right").print(),
//         newKey("pressKey", " ")
//         ,
//         palette( 'yellow' , 'blue' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") )
//         ,
//         instructions()
//         ,
//         pressSpaceKey()
// )


// PennController( "test-main-good" ,
//         // Strip configuration
//         strip( /*Buffy 1st*/'yellow' , /*Buffy 2st*/'yellow' , /*Actual 1st*/'yellow', /*Actual 2nd*/'yellow' )
//         ,
//         getCanvas("strip").settings.center().print(),
//         getCanvas("observationsPanel").settings.visible(),
//         getCanvas("then").settings.visible()
//         // End strip configuration
//         ,
//         newText("description" , "The first flash was yellow,<br>so Buffy was right").print(),
//         newKey("pressKey", " ")
//         ,
//         palette( 'yellow' , 'blue' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") )
//         ,
//         instructions()
//         ,
//         pressSpaceKey()
// )



// PennController( "test-again-buffy-good" ,
//         // Strip configuration
//         strip( /*Buffy 1st*/'yellow' , /*Buffy 2st*/'yellow' , /*Actual 1st*/'yellow', /*Actual 2nd*/'yellow' )
//         ,
//         getCanvas("strip").settings.center().print(),
//         getCanvas("observationsPanel").settings.visible(),
//         getCanvas("then").settings.visible()
//         // End strip configuration
//         ,
//         newText("description" , "Buffy thought the second flash would again be yellow,<br>and she was right").print(),
//         newKey("pressKey", " ")
//         ,
//         palette( 'yellow' , 'blue' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") )
//         ,
//         instructions()
//         ,
//         pressSpaceKey()
// )





// PennController( "test-again-main-bad" ,
//         // Strip configuration
//         strip( /*Buffy 1st*/'yellow' , /*Buffy 2st*/'yellow' , /*Actual 1st*/'yellow', /*Actual 2nd*/'yellow' )
//         ,
//         getCanvas("strip").settings.center().print(),
//         getCanvas("observationsPanel").settings.visible(),
//         getCanvas("then").settings.visible()
//         // End strip configuration
//         ,
//         newText("description" , "The second flash was yellow again,<br>so Buffy was right").print(),
//         newKey("pressKey", " ")
//         ,
//         palette( 'yellow' , 'blue' ,  getCanvas("buffyPatch1") , getCanvas("buffyPatch2") , getCanvas("obsPatch1") , getCanvas("obsPatch2") )
//         ,
//         instructions()
//         ,
//         pressSpaceKey()
// )