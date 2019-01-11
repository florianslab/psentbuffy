// BUTTON element
window.PennController._AddElementType("Button", function(PennEngine) {

    // This is executed when Ibex runs the script in data_includes (not a promise, no need to resolve)
    this.immediate = function(id, text){
        this.initialText = text;                            // In case this gets changed later
    };

    // This is executed when 'newAudio' is executed in the trial (converted into a Promise, so call resolve)
    this.uponCreation = function(resolve){
        this.text = this.initialText;
        this.jQueryElement = $("<button>").html(this.text);
        // Default settings
        this.clicks = [];
        this.hasClicked = false;
        this.log = false;
        this.jQueryElement[0].onclick = ()=>{
            this.hasClicked=true;
            this.clicks.push(["Click", "Click", Date.now(), "NULL"]);
        };
        resolve();
    }

    // This is executed at the end of a trial
    this.end = function(){
        if (this.log){
            if (!this.clicks.length)
                PennEngine.controllers.running.save(this.type, this.id, "Click", "NA", "Never");
            for (let c in this.clicks)                      // Save any clicks if logging
                PennEngine.controllers.running.save(this.type, this.id, ...this.clicks[c]);
        }
    };

    this.value = function(){                                    // Value is timestamp of last click
        if (this.clicks.length)                         
            return this.clicks[this.clicks.length-1][2];
        else
            return 0;
    };
    
    this.actions = {
        wait: function(resolve, test){
            if (test == "first" && this.hasClicked) // If first and already clicked, resolve already
                resolve();
            else {                                  // Else, extend remove and do the checks
                let resolved = false;
                this.jQueryElement.click(()=>{
                    if (resolved)
                        return;
                    if (test instanceof Object && test._runPromises && test.success){
                        let oldDisabled = this.jQueryElement.attr("disabled");  // Disable temporarilly
                        this.jQueryElement.attr("disabled", "tmp");
                        test._runPromises().then(value=>{   // If a valid test command was provided
                            if (value=="success") {
                                resolved = true;
                                resolve();                  // resolve only if test is a success
                            }
                            if (this.jQueryElement.attr("disabled")=="tmp"){
                                if (!oldDisabled)           // Restore old setting if not modified by test
                                    this.jQueryElement.removeAttr("disabled");
                                else    
                                    this.jQueryElement.attr("disabled", oldDisabled);
                            }   
                        });
                    }
                    else{                                    // If no (valid) test command was provided
                        resolved = true;
                        resolve();                          // resolve anyway
                    }
                });
            }
        }
    };
    
    this.settings = {
        callback: function(resolve, ...elementCommands){
            let originalClick = this.jQueryElement[0].onclick;
            this.jQueryElement[0].onclick = async function () {
                if (!this.disabled)
                    for (let c in elementCommands)
                        await elementCommands[c]._runPromises();
                originalClick.apply(this);
            };
            resolve();
        },
        log: function(resolve){
            this.log = true;
            resolve();
        },
        once: function(resolve){
            if (this.hasClicked)
                this.jQueryElement.attr("disabled", true);
            else
                this.jQueryElement.click(()=>this.jQueryElement.attr("disabled",true));
            resolve();
        }
    };

    this.test = {
        clicked: function(){
            return this.hasClicked;
        }  
    };

});