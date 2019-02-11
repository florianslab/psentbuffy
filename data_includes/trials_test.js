PennController.Template( "psbuffy.csv" ,
    row => PennController( "test-" + row.Subject + "-" + row.MatrixLeftPredicate + "-" + row.Condition ,
        // DEBUG
        newText("debug", JSON.stringify(row).replace(/,/g,'<br>') )
            .print()
            .settings.cssContainer({position:'absolute',left:0,'text-align':'left'})
        ,
        // END DEBUG
        newText("description", "<p><em>Fact:</em> &nbsp; "+row.Sentence.charAt(0).toUpperCase()+row.Sentence.slice(1)+"</p>").print()
        ,
        report(row.Actual1,row.Actual2,row.Buffy1,row.Buffy2),
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
        palette( row.Color , row.altercolor , getCanvas('drawnBall') , getCanvas('buffyPatch1') , getCanvas("buffyPatch2") , getCanvas('shakenBall') ),
        getPalette("palette").settings.log()
        ,
        newKey("space", " ").settings.callback( getButton("continue").click() ),
        newButton('continue', "Continue")
            .print()
            .wait()
            .remove()
        ,
        getCanvas('board').remove()
        ,
        newTimer("beforeEnd", 200).start().wait()
    )
)