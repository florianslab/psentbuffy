PennController.ResetPrefix(null);

PennController.AddHost("https://files.lab.florianschwarz.net/ibexfiles/PennController/SampleTrials/");

PennController.Sequence( startsWith("training") , randomize(startsWith("test")) )

    
// Exectued before all trials
PennController.Header(
    defaultTooltip                  // Aspect & properties of all tooltips
        .settings.size(250, 60)
        .settings.key("")
        .settings.frame()
        .settings.label("Click here or Press Space")
    ,
    newTimer("pre-timer", 200).start().wait()
)