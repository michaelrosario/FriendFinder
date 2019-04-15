var file = '';          // filename 
var fullname = '';      // fullname
var surveyAnswers = []; // container for use input
var currentSurvey = 0;  // keep track of current survey question

// survey question and choices        
var survey = [{
            question: "If you are a drink, what would you be?",
            answers: [
                'Water',
                'Chocolate Milk',
                'Iced Coffee',
                'Piña Colada',
                'Sex on the Beach'
            ]
        },{
            question: "Today is the day when there is nothing to do, would you...",
            answers: [
                'Cuddle up and read a book',
                'Play video games',
                'Watch a movie at the theatre',
                'Volunteer for a great cause',
                'Go out and hang out with friends'
            ]
        },{
            question: "What does your ideal vacation look like?",
            answers: [
                'A road trip.',
                'Hop-on-Hop-off tours',
                'Get lost and explore the town',
                'Food trip! Checking out the local cuisine',
                'Strict Itinerary and schedules'
            ]
        },{
            question: "What is the most important to have in common with a friend?",
            answers: [
                'Same religion and beliefs',
                'Same taste in food choices',
                'Same taste in fashion',
                'Same sense of humor',
                'Same gender and race'
            ]
        },{
            question: "If you win the lotto, what would be the first thing you will do?",
            answers: [
                'Pay off all my bills',
                'Buy a new house',
                'Splurge and invest some',
                'Hire a lawyer and financial planner',
                'Dissapear and change my identity'
            ]
        },{
            question: "What is your favorite fruit flavor?",
            answers: [
                'Mango',
                'Watermelon',
                'Strawberry',
                'Peach',
                'Apple'
            ]
        },{
            question: "What is the one thing you wish you could do if given the chance?",
            answers: [
                'Ability to teleport to any destination',
                'Travel to the future',
                'End World Hunger',
                'Live Forever',
                'Learn things in an instant'
            ]
        },{
            question: "If you were stuck on a desserted island and can have one item, what would you choose?",
            answers: [
                '54-piece swiss army knife',
                'Fishing net',
                'Box of matches',
                'A pre-made hut',
                'Hunting rifle w/ a box of bullets'
            ]
        },{
            question: "What color do you like the most from these choices?",
            answers: [
                'Red',
                'Blue',
                'Green',
                'Yellow',
                'Black'
            ]
        },{
            question: "What is your <u>least</u> favorite dessert",
            answers: [
                'carrot cake',
                'tiramisu',
                'flan',
                'red velvet chocolate cake',
                'banana split sundae'
            ]
        }];

    
    // iterate over the survey questions and anwers and generate HTML
    for(var i = 0; i < survey.length; i++){
        var currentCount = i+1;
        var currentQuestion = `<span>Question ${currentCount}</span>: ${survey[i].question}`;
        var choices = survey[i].answers;
        var choicesHtml = "";
        for(var j = 0; j < choices.length; j++){
            currentChoice = j + 1;
            choicesHtml += `<label class="input-group">
                    <span class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="radio" name="q${currentCount}" aria-label="${choices[j]}" value="${currentChoice}">
                        </div>
                    </span>
                    <span class="input-label">${choices[j]}</span>
                </label>`;
        }

        var surveyQuestion = `<div class="surveys card mb-4">
            <div class="card-header">
            <strong><i class="fas fa-poll-h"></i> &nbsp; ${currentQuestion}</strong>
            </div>
            <div class="card-body">
                ${choicesHtml}
            </div>
        </div>`;

        $("#survey").append(surveyQuestion);

        $("input[name=q"+currentCount+"]").bind("click",function(){

            var currentAnswerValue = $(this).val();
            console.log(`${$(this).attr('name')} answer is ${currentAnswerValue}`);
            surveyAnswers.push(currentAnswerValue);
            //console.log(surveyAnswers);
            currentSurvey++;
            showNextQuestion(currentSurvey);

        });

    }
    
        // First register any plugins
        $.fn.filepond.registerPlugin(FilePondPluginImagePreview);
        $.fn.filepond.registerPlugin(FilePondPluginFileEncode);
        $.fn.filepond.registerPlugin(FilePondPluginFileValidateSize);

        $.fn.filepond.setDefaults({
        maxFileSize: '3MB'
        });
    
        // Turn input element into a pond
        $('.filepond').filepond();

        $('.filepond').filepond('allowFileEncode',true);
    
        // Set allowMultiple property to true
        $('.filepond').filepond('allowMultiple', false);
    
        // Listen for addfile event
        $('.filepond').on('FilePond:addfile', function(e) {
            console.log('file added event', e);
            $('input').blur();
            //console.log(e.detail.file.getFileEncodeDataURL());
            file = e.detail.file.getFileEncodeDataURL();
            checkContinue();
            
        });
        /*
        // Manually add a file using the addfile method
        $('.filepond').first().filepond('addFile', 'index.html').then(function(file){
        console.log('file added', file);
        });
        */

        $(".fullName").on("change",function(){
        fullname = $(this).val();
        if(fullname.length > 2){
            $(this).removeClass("has-error");
            checkContinue();
        } else {
            $(this).addClass("has-error");
        }
        
        })

        function checkContinue(){
            
            if(file && fullname){
            $(".continueSurvey").removeClass("disabled").addClass("ready");
            } else {
            $(".continueSurvey").removeClass("ready").addClass("disabled");
            }
        }

        $(".continueSurvey").on("click",function(){
        if($(this).hasClass('ready')){
            $("#status").fadeIn();
            updateStatusBar(currentSurvey,$(".surveys").length);
            $(".surveys").eq(0).addClass("show");
            var ht =  $(".surveys:visible").height();
            $("#survey").css("height",ht+"px");
            $(".aboutMe").addClass("filled");
        }
        return false;
        });

        function updateStatusBar(current,total){
        var currentNum = parseInt(current);
        var totalNum = parseInt(total);
        if(totalNum == currentNum){
            $(".status-text").html(`Click 'Find a Match' below to get results!`);
            $("#survey").slideUp();
            $(".status-bar").fadeOut();
            $(".completeSurvey").removeClass("disabled").addClass("ready");
            

        } else {
            $(".status-text").html(`${currentNum+1} of ${totalNum}`);
        }
        
        var percent = (currentNum/totalNum).toFixed(2)*100+"%";
        $(".bar").css("width",percent);
        console.log(`setting bar to ${percent}`);
        }

        function showNextQuestion(number){
        updateStatusBar(currentSurvey,$(".surveys").length);
        $(".surveys:visible").eq(currentSurvey-1).removeClass("show").addClass("filled");
        $(".surveys").eq(currentSurvey).addClass("show");
        }

        var submitted = false;

        $(".completeSurvey").on("click",function(){
            var scores = surveyAnswers;
            var photo = file;
            var name = fullname;
            var userData = { name, photo, scores };

            if(submitted == false){
            // AJAX post the data to the friends API.
                $.post("/api/friends", userData, function(data) {

                    submitted = true;
                    console.log(data);
                    // Grab the result from the AJAX post so that the best match's name and photo are displayed.
                    $("#match-name").text(data.name);
                    $("#match-img").css({"background": "url("+data.photo+") center center no-repeat","background-size":"cover"});
                    $(".search").html(`<a class="button ready" target="_blank" href="https://www.google.com/search?tbm=isch&q=${data.name}">Google your new friend!</a>`)

                    // Show the modal with the best match
                    $("#results-modal").modal("toggle");

                });

            } else {

                $("#results-modal").modal("toggle");

            }

            return false;

        });