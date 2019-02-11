PennController.ResetPrefix(null);

PennController.AddHost("https://files.lab.florianschwarz.net/ibexfiles/PennController/SampleTrials/");

const DELAY = 750;

PennController.Sequence( 
    startsWith("tutorial") 
    ,
    startsWith("practice-1-"),     
    startsWith("practice-2-"),     
    startsWith("practice-3-"),     
    startsWith("practice-4-"),     
    startsWith("practice-5-"),     
    startsWith("practice-6-"),     
    startsWith("practice-7-"),     
    startsWith("practice-8-"),     
    startsWith("practice-9-"),     
    startsWith("practice-10-")
    ,
    randomize(startsWith("test")) 
)

    
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