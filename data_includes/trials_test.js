PennController.Template( "psbuffy.csv" ,
    row => PennController( "test-" + row.Subject + "-" + row.MatrixLeftPredicate + "-" + row.Condition ,
        // DEBUG
        newText("debug", JSON.stringify(row).replace(/,/g,'<br>') )
            .print()
            .settings.cssContainer({position:'absolute',left:0,'text-align':'left'})
        ,
        // END DEBUG
        newText("description",
            "<p>"+row.Sentence.charAt(0).toUpperCase()+row.Sentence.slice(1)+".</p>"+
            "<p>"+row.Continuation+".</p>"
        ).print()
        ,
        report(row.Actual1,row.Actual2,row.Buffy1,row.Buffy2)
        ,
        getCanvas("sequence").print()
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