// EYETRACKER element
window.PennController._AddElementType("EyeTracker", function(PennEngine) {

    let tracker;
    let initiated = false;
    let currentTracker;
    let sessionID;
    let storePoints = false;
    let past50Array = [[], []];
    let calibrated = false;

    // GENERIC FUNCTIONS
    //
    // from https://gist.github.com/revolunet/843889
    function lzw_encode(s) {
        var dict = {};
        var data = (s + "").split("");
        var out = [];
        var currChar;
        var phrase = data[0];
        var code = 256;
        for (var i=1; i<data.length; i++) {
            currChar=data[i];
            if (dict[phrase + currChar] != null) {
                phrase += currChar;
            }
            else {
                out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                dict[phrase + currChar] = code;
                code++;
                phrase=currChar;
            }
        }
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        for (var i=0; i<out.length; i++) {
            out[i] = String.fromCharCode(out[i]);
        }
        return out.join("");
    }


    // Show/Hide the video and the tracking point
    function showTracker(show){
        show = !(show===false);
        window.webgazer.showFaceFeedbackBox(show);
        window.webgazer.showFaceOverlay(show);
        window.webgazer.showPredictionPoints(show);
        window.webgazer.showVideo(show);
        $("#webgazerGazeDot").css('pointer-events', 'none');
    }

    // Calibration functions from WebGazer's example page
    function calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY) {
        for (x = 0; x < 50; x++) {
          // Calculate distance between each prediction and staring point
          let xDiff = staringPointX - x50[x];
          let yDiff = staringPointY - y50[x];
          let distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
          // Calculate precision percentage
          let halfWindowHeight = windowHeight / 2;
          let precision = 0;
          if (distance <= halfWindowHeight && distance > -1) {
            precision = 100 - (distance / halfWindowHeight * 100);
          } else if (distance > halfWindowHeight) {
            precision = 0;
          } else if (distance > -1) {
            precision = 100;
          }
          // Store the precision
          precisionPercentages[x] = precision;
        }
    }
    function calculateAverage(precisionPercentages) {
        let precision = 0;
        for (x = 0; x < 50; x++) {
          precision += precisionPercentages[x];
        }
        precision = precision / 50;
        return precision;
    }
    function calculatePrecision(past50Array) {
        let windowHeight = $(window).height();
        let windowWidth = $(window).width();
        // Retrieve the last 50 gaze prediction points
        let x50 = past50Array[0];
        let y50 = past50Array[1];
        // Calculate the position of the point the user is staring at
        let staringPointX = windowWidth / 2;
        let staringPointY = windowHeight / 2;
        let precisionPercentages = new Array(50);
        calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY);
        let precision = calculateAverage(precisionPercentages);
        // Return the precision measurement as a rounded percentage
        return Math.round(precision);
    };


    // Shows a calibration screen
    function calibrate(resolve, element, threshold, remainingAttempts){
        // Start training the model
        window.webgazer.addMouseEventListeners();
        console.log("Starting calibration");
        past50Array = [[], []];                 // To keep track of 50 last looks
        let calibrationDiv = $("<div>").css({
            position: 'absolute', left: 0, top: 0, width: "100vw", height: "100vh",
            'background-color': 'white', 'text-align': 'center'
        });
        // Will print a button in the middle of the screen
        let startCalculation = ()=>{
            calibrationDiv.find('button').remove();
            calibrationDiv.append($("<button>+</button>").css({
                position: 'absolute', top: 'calc(50vh - 1.25vw)', bottom: '48.75vw', width: "2.5vw", height: "2.5vw"
            }).click(function(){
                // Launches calculation per se
                $(this).attr('disabled', true);
                storePoints = true;
                setTimeout(()=>{
                    let precision = calculatePrecision(past50Array);
                    console.log("Precision:",precision);
                    storePoints = false;
                    past50Array = [[],[]];
                    PennEngine.controllers.running.save(element.type, element.id, "calibration", precision, 
                                                        Date.now(), (remainingAttempts==1?"Last attempt":"NULL"));
                    if (threshold && Number(threshold)>0 && precision < threshold && remainingAttempts != 1){
                        calibrated = false;
                        $(this).remove();
                        showTracker(true);
                        calibrationDiv.append(
                            $("<div>").html("<p>It looks like we were not able to precisely calibrate the tracker:</p>"+
                                            "<p>You calibration score is "+precision+" and you need at least "+threshold+"</p>"+
                                            "<p>Here are a few tips to help you better self-calibrate:</p>"+
                                            "<p>- try adjusting your webcam based on the video in the top-left corner.</p>"+
                                            "<p>- if you use an external webcam, make sure it is fixed to the top of your screen.</p>"+
                                            "<p>- try raising your screen so as to align your webcam with your eyes</p>"+
                                            "<p><img style='display: inline-block; height: 75px;' src='http://files.lab.florianschwarz.net/ibexfiles/Pictures/lookdown.png'>"+
                                            "<img style='display: inline-block; height: 75px;' src='http://files.lab.florianschwarz.net/ibexfiles/Pictures/lookstraight.png'></p>"+
                                            "<p>- make sure no one is standing next to you.</p>"+
                                            "<p>- make sure you are not wearing eyeglasses reflecting ambiant light.</p>"+
                                            "<p>- make sure the algorithm detects your face (it should appear green).</p>"+
                                            "<p>- make sure there is enough ambient light for face-detection.</p>"+
                                            "<p>- make sure you follow your mouse pointer with your eyes.</p>"+
                                            "<p>- make sure you keep looking at the middle button until the end.</p>")
                                        .css({margin: 'auto', 'margin-top': '5em'})
                        ).append(
                            // Retry button
                            $("<button>Retry</button>").click(function(){
                                calibrationDiv.remove();
                                calibrate(resolve, element, threshold, remainingAttempts-1);
                            }).css('margin','auto')
                        );
                    }
                    // Threshold met: tracker is calibrated
                    else {
                        calibrated = true;
                        calibrationDiv.remove();
                        showTracker(false);
                        // Do not train the model on actual trials (too much on screen)
                        window.webgazer.removeMouseEventListeners();
                        resolve();
                    }
                }, 2000);   // 2s for calculation
            }));
        };
        // If not calibrated yet, print 'Start calibration'
        if (!calibrated){
            let remainingClicks = 8;
            let click = function(){
                $(this).attr("disabled",true);
                remainingClicks--;
                // Start calculation after all 8 buttons clicks
                if (remainingClicks<=0)
                    startCalculation();
            };
            calibrationDiv.append($("<button>Start calibration</button>").css({
                position: "absolute", top: "calc(50vh - 2.5vw)", left: "47.5vw", width: "5vw", height: "5vw"
            }).click(function(){
                // Add 8 buttons to the screen: click on each to calibrate
                $(this).remove();
                showTracker(false);
                window.webgazer.showPredictionPoints(true);
                calibrationDiv
                    .append($("<button>+</button>").css({
                        position: 'absolute', top: 0, left: 0, width: "2.5vw", height: "2.5vw"
                    }).click(click))
                    .append($("<button>+</button>").css({
                        position: 'absolute', top: 0, right: 0, width: "2.5vw", height: "2.5vw"
                    }).click(click))
                    .append($("<button>+</button>").css({
                        position: 'absolute', bottom: 0, left: 0, width: "2.5vw", height: "2.5vw"
                    }).click(click))
                    .append($("<button>+</button>").css({
                        position: 'absolute', bottom: 0, right: 0, width: "2.5vw", height: "2.5vw"
                    }).click(click))
                    .append($("<button>+</button>").css({
                        position: 'absolute', top: 'calc(50vh - 1.25vw)', left: 0, width: "2.5vw", height: "2.5vw"
                    }).click(click))
                    .append($("<button>+</button>").css({
                        position: 'absolute', top: 0, left: '48.75vw', width: "2.5vw", height: "2.5vw"
                    }).click(click))
                    .append($("<button>+</button>").css({
                        position: 'absolute', top: 'calc(50vh - 1.25vw)', right: 0, width: "2.5vw", height: "2.5vw"
                    }).click(click))
                    .append($("<button>+</button>").css({
                        position: 'absolute', bottom: 0, left: '48.75vw', width: "2.5vw", height: "2.5vw"
                    }).click(click));
            }));
            showTracker(true);
        }
        else
            startCalculation();
        // Make sure the video appears over our div
        $("#webgazerVideoFeed").before(calibrationDiv);
    }


    // ELEMENT
    //
    let initiate = function(){
        function generateUID() {
            var firstPart = (Math.random() * 46656) | 0;
            var secondPart = (Math.random() * 46656) | 0;
            firstPart = ("000" + firstPart.toString(36)).slice(-3);
            secondPart = ("000" + secondPart.toString(36)).slice(-3);
            return firstPart + secondPart;
        }
        sessionID = generateUID();
        initiated = true;
        let webgazer = document.createElement('script');
        webgazer.setAttribute('src','https://files.lab.florianschwarz.net/ibexfiles/webgazer/webgazer.js');
        document.head.appendChild(webgazer);
        let checkIfReady = () => {
            if (window.webgazer) {
                tracker = window.webgazer.setRegression('ridge')
                    .setTracker('clmtrackr')
                    .setGazeListener((data, clock) => {
                        if (storePoints){
                            past50Array[0].push(data.x);
                            past50Array[1].push(data.y);
                            if (past50Array[0].length>50)
                                past50Array[0].shift();
                            if (past50Array[1].length>50)
                                past50Array[1].shift();
                        }
                        if (currentTracker)
                            currentTracker.look(data,clock);
                    })
                    .begin()
                    .showPredictionPoints(true);
                showTracker(false);
            } else {
                setTimeout(checkIfReady, 100);
            }
        }
        if (tracker===undefined)
            checkIfReady();
    }

    this.immediate = function(id, span, proportion){
        if (!initiated)
            initiate();
        this.span = Number(span);
        this.proportion = proportion;
    };

    this.uponCreation = function(resolve){
        this.enabled = false;
        this.elements = [];
        this.counts = {times: []};
        this.log = false;
        let previousClock;
        // Called every few ms (varies w/ performance) when EyeTracker started
        this.look = function (data,clock) {
            if (!this.enabled || data==null || data.x===undefined || data.y===undefined)
                return;

            this.elements.map(el=>el.jQueryElement.removeClass("PennController-eyetracked"));
            // Check every element
            for (let e = 0; e < this.elements.length; e++){
                let element = this.elements[e].jQueryElement;
                let offset = element.offset(), w = element.width(), h= element.height();
                let within = offset.left <= data.x && offset.top <= data.y && offset.left+w >= data.x && offset.top+h>=data.y;
                // Keep track of looks
                if (within)
                    this.counts['_'+this.elements[e].id].push(1);
                else
                    this.counts['_'+this.elements[e].id].push(0);
                // Span-based triggering: check proportion of gazes over SPAN cycles
                if (!isNaN(this.span)){
                    // GAZES stores looks (true vs false) to each element over SPAN cycles
                    if (!this.hasOwnProperty('gazes') || this.elements.length != this.gazes.length)
                        this.gazes = this.elements.map(()=>[]);
                    if (within)
                        this.gazes[e].push(true);
                    else
                        this.gazes[e].push(false);
                    if (this.gazes[e].length>this.span)
                        this.gazes[e].shift()
                    let proportion = Number(this.proportion);
                    if (isNaN(proportion))
                        proportion = this.span/100;
                    if (proportion <= 0)
                        proportion = 0.01;
                    else if (proportion >= 1)
                        proportion = 0.99;                  
                    if (this.gazes[e].filter(e=>e).length/this.gazes[e].length>proportion)
                        element.addClass("PennController-eyetracked");    
                }
                // Else, each cycle counts
                else if (within)
                    element.addClass("PennController-eyetracked");
            }
            // Keep track of cycles' timestamps (relative for shorter encoding)
            if (previousClock === undefined)
                previousClock = clock;
            this.counts.times.push(Math.round(clock - previousClock));
            previousClock = clock;
        };
        resolve();
    };

    this.end = function(){
        showTracker(false);
        window.webgazer.removeMouseEventListeners();
        this.enabled = false;
        currentTracker = undefined;
        if (this.log && this.counts.times.length){
            let url = "https://files.lab.florianschwarz.net/ibexfiles/RecordingsFromIbex/trackerData.php";
            let expName = window.location.href.replace(/[^/]+$/,'')
                                              .replace(/[^\w\d]/g,'')
                                              .replace(/[\.]{2,}/g,'');
            console.log("expname", expName);
            let sendLine = (parameter, value) => {
                let data = {
                    'experiment': expName,
                    'id': sessionID,
                    'pcnumber': PennEngine.controllers.running.id,
                    'parameter': parameter,
                    'value': value
                 };
                 let fd = "json="+JSON.stringify(data);
                 var xhr = new XMLHttpRequest();     // XMLHttpRequest rather than jQuery's Ajax (mysterious CORS problems with jQuery 1.8)
                 xhr.open('POST', url, true);
                 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                 xhr.onreadystatechange = ()=>{
                     if (xhr.status != 200)
                        PennEngine.controllers.running.save(this.type, this.id, "Upload", "Error", Date.now(), parameter);
                 };
                 xhr.send(fd);
            }
            console.log("about to send times", this.counts);
            sendLine('times', lzw_encode(this.counts.times.join('.')));
            delete this.counts.times;
            let keys = Object.keys(this.counts);
            for (let k = 0; k < keys.length; k++)
                sendLine(keys[k], lzw_encode(this.counts[keys[k]].join('.')));
            PennEngine.controllers.running.save(this.type, this.id, "Filename", expName+'/'+sessionID, Date.now(), "NULL");
        }
        delete this.counts;
    };

    this.value = function(){
        return 'EyeTracker';
    };

    this.actions = {
        calibrate(resolve, threshold, attempts){
            if (!(Number(attempts)>0))
                attempts = -1;
            calibrate(resolve, this, threshold, attempts);
        },
        hideFeedback: function(resolve){
            showTracker(false);
            resolve();
        },
        start: function(resolve){
            this.enabled = true;
            currentTracker = this;
            resolve();
        },
        stop: function(resolve){
            this.enabled = false;
            currentTracker = undefined;
            resolve();
        },
        stopTraining: function(resolve){
            window.webgazer.removeMouseEventListeners();
            window.webgazer.showPredictionPoints(false);
            resolve();
        },
        showFeedback: function(resolve){
            showTracker();
            resolve();
        },
        train: function(resolve, showDot){
            window.webgazer.addMouseEventListeners();
            window.webgazer.showPredictionPoints(showDot);
            resolve();
        }
    }

    this.settings = {
        add: function(resolve, ...elements){
            for (let e = 0; e < elements.length; e++){
                let element = elements[e];
                if (element && element._element && this.elements.indexOf(element._element)<0){
                    this.elements.push(element._element);
                    this.counts['_'+element._element.id] = [];
                }
            }
            resolve();
        },
        log: function(resolve){
            this.log = true;
            resolve();
        }
    }

});