PennController.Template( "practice.csv" ,
    row => PennController( "practice-"  + row.Order + "-" + row.Subject + "-" + row.MatrixLeftPredicate + "-" + row.Condition ,
        // DEBUG
        newText("debug", JSON.stringify(row).replace(/,/g,'<br>') )
            .print()
            .settings.cssContainer({position:'absolute',left:0,'text-align':'left'})
        ,
        // END DEBUG
        newText("practice label", "Practice trial")
            .settings.center()
            .settings.italic()
            .settings.color('blue')
            .print()
        ,
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
        getPalette("palette")
            .brush( getCanvas('drawnBall')   , row.Actual1 )
            .brush( getCanvas('buffyPatch1') , row.Buffy1  )
            .brush( getCanvas('buffyPatch2') , row.Buffy2  )
            .brush( getCanvas('shakenBall')  , row.Actual2 )
            .settings.log()
        ,
        newKey("space", " ").settings.callback( getButton("continue").click() ),
        newButton('continue', "Continue")
            .print()
            .wait()
            .remove()
        ,
        getCanvas('board').remove()
        ,
        ...checkColors(row)
        ,
        ( row.Order==10 ? 
          getTooltip("feedback")
              .settings.text("Good, practice is over! The experiment will start next and we will no longer give you feedback.")
              .settings.label("Start the experiment")
              .print( getCanvas("sequence") )
              .wait()
        : 
        null )
    )
)
    
    
    
checkColors = row => {
    let top = [
        newTooltip("feedback", "")
            .settings.position("bottom center")
            .settings.frame('none')
        ,
        newVar("correct", true)
    ];
    let commands = [
        getVar("correct").test.is(true).failure(
            getTooltip("feedback").settings.text("Oops, it appears you were wrong").print(getCanvas("sequence")).wait()
        )
    ];
    if (row.Subject=="Second" || row.Subject=="Again") commands = [
        getPalette("palette")
            .test.color(getCanvas("shakenBall"),row.Color).failure( blink(getCanvas("shakenBall")) , getVar("correct").set(v=>false) ),
        getPalette("palette")
            .test.color(getCanvas("buffyPatch2"),row.Color).failure( blink(getCanvas("buffyPatch2")) , getVar("correct").set(v=>false) )
        ,
        ...commands
        ,
        getPalette("palette")
            .brush( getCanvas("shakenBall") , row.Color )
            .brush( getCanvas("buffyPatch2" ) , row.Color )
    ];
    if (row.Subject=="First" || row.Subject=="Again") commands = [
        getPalette("palette")
            .test.color(getCanvas("drawnBall"),row.Color).failure( blink(getCanvas("drawnBall")) , getVar("correct").set(v=>false) )
        ,
        ...commands
        ,
        getPalette("palette")
            .brush( getCanvas("drawnBall") , row.Color )
    ];
    if (row.Subject=="First") commands = [
        getPalette("palette")
            .test.color(getCanvas("buffyPatch1"),row.Color).failure( blink(getCanvas("buffyPatch1")) , getVar("correct").set(v=>false) )
        ,
        ...commands
        ,
        getPalette("palette")
            .brush( getCanvas("buffyPatch1") , row.Color )
    ];
    return [
        ...top
        ,
        ...commands
        ,
        unblink(getCanvas("drawnBall")),unblink(getCanvas("shakenBall")),unblink(getCanvas("buffyPatch1")),unblink(getCanvas("buffyPatch2")),
        getCanvas("drawnBall").settings.css("border", "solid 1px white"),
        getCanvas("shakenBall").settings.css("border", "solid 1px white"),
        getCanvas("buffyPatch1").settings.css("border", "none"),
        getCanvas("buffyPatch2").settings.css("border", "none")
        ,
        newTimer("beforeEnd", 200).start().wait()
        ,
        getVar("correct").test.is(true).failure(
            getTooltip("feedback").settings.text("Now that's better").settings.label("Got it!").print(getCanvas("sequence")).wait()
        )
    ];
}
    

blink = element => newFunction("blink-"+element._element.id, function(){
        element._element.jQueryElement.css("border", "solid 2px red");
        let b = 1;
        let a = setInterval(()=>{
            b = 1 - b;
            element._element.jQueryElement.css("border", (b==1?"solid 2px red":"none"));
        }, 500);
        this['blink-'+element._element.id] = a;
    }).call()
        
        
unblink = element => newFunction("unblink-"+element._element.id, function(){
        if (this.hasOwnProperty('blink-'+element._element.id)) clearInterval(this['blink-'+element._element.id]);
    }).call()
