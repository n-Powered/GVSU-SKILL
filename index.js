const Alexa = require('ask-sdk');
const allFuctions = require('./functions');
const AllWhQuestions = require('./areas/AllWHQuestions');
const IntentsWithMultipleSlots = require('./areas/IntentsWithMultipleSlots');
const Unhandled = require('./areas/unhandled');
const GVSUEmergency = require('./areas/GVSUEmergency');
const GVSUServices = require('./areas/GVSUServices');
const GVSUApplication = require('./areas/GVSUApplication');
const GVSUPayment = require('./areas/GVSUPayment');
const GVSUFindInfo = require('./areas/GVSUFindInfo');
const OpenCloseTime = require('./areas/OpenCloseTime');
const PaymentLocation = require('./areas/PaymentLocation');
const LostandFound = require('./areas/LostandFound');
const AllStaticIntents = require('./areas/AllStaticIntents');
const APP_ID = process.env.APP_ID;

const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        console.log("LaunchRequest Handler::",JSON.stringify(handlerInput));
        var obj = null;
        var welcomespeech = allFuctions.welcomeMessage;
        obj = {
            speechText: welcomespeech,
            displayText: welcomespeech,
            repromptSpeechText: allFuctions.listenspeech,
            needtoAccountLinking: false,
            sessionEnd: false
        }
        return allFuctions.formSpeech(handlerInput, obj);
    }
};

// AMAZON Help Intent
const HelpIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
			console.log('AMAZON.HelpIntent::', handlerInput);
			var helpspeech = allFuctions.helpspeech;
			var obj = {
			  speechText: helpspeech,
			  displayText: helpspeech,
			  sessionEnd: false
			}
			return allFuctions.formSpeech(handlerInput, obj);
    }
};

const PauseIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent';
    },
    handle(handlerInput) {
	  console.log('AMAZON.PAUSEIntent::', handlerInput);
      const pauseText = '';
 			var obj = {
			  speechText: pauseText,
			  displayText: pauseText,
			  sessionEnd: false
			}
			return allFuctions.formSpeech(handlerInput, obj);
    }
};

const YesIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
			console.log('AMAZON.YesIntent::', handlerInput);
			var yesSpeech = allFuctions.YesPrompt;
			var obj = {
			  speechText: yesSpeech,
			  displayText: yesSpeech,
			  sessionEnd: false
			}
			return allFuctions.formSpeech(handlerInput, obj);
    }
};

const OtherBuiltinHanders = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.MoreIntent' ||
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NegivagateHomeIntent' ||
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NextIntent' ||
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NegivagateSettingsIntent' ||
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PageUpIntent' ||
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PageDownIntent' ||
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PreviousIntent' ||
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ScrollRightIntent' ||
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ScrollDownIntent' ||
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ScrollLeftIntent' ||
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ScrollUpIntent');
    },
    handle(handlerInput) {
      console.log("OtherBuiltin Handers::", handlerInput);
      return handlerInput.responseBuilder
        .getResponse();
    },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent');
  },
  handle(handlerInput) {
    console.log("CancelAndStopIntent Handler::", handlerInput);
    var goodByeSpeech = allFuctions.prependReminders('Goodbye! ', allFuctions.remindersArray)
    var obj = {
      speechText: goodByeSpeech,
      displayText: goodByeSpeech,
      sessionEnd: true
    }
    return allFuctions.formSpeech(handlerInput, obj);
  }
};

// AMAZON Fallback Intent
const FallbackIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        &&  handlerInput.requestEnvelope.request.type === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
    console.log("FallbackIntent Handler", handlerInput);
		var fallbackSpeech = allFuctions.noValueReturned;
		var obj = {
		  speechText: fallbackSpeech,
		  displayText: fallbackSpeech,
		  sessionEnd: false
		}
		return allFuctions.formSpeech(handlerInput, obj);
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      console.log("SessionEndedRequestHandler::");
      return handlerInput.responseBuilder.getResponse();
    }
  };

const ErrorHandler = {
	canHandle() {
		return true;
	},
	handle(handlerInput, error) {
        console.log(`Error Handler:: ${error}`);
        var obj = {
            speechText: allFuctions.noValueReturned,
            displayText: allFuctions.noValueReturned,
            repromptSpeechText: allFuctions.listenspeech,
        }
        return allFuctions.formSpeech(handlerInput, obj);
	},
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler, 
    Unhandled,...AllStaticIntents,
    ...IntentsWithMultipleSlots,...GVSUEmergency,...GVSUServices,...GVSUApplication,
    ...GVSUFindInfo,...GVSUPayment,...OpenCloseTime,
    ...PaymentLocation,...LostandFound,...AllWhQuestions,
    HelpIntentHandler, PauseIntentHandler, YesIntentHandler, 
    OtherBuiltinHanders, FallbackIntentHandler, SessionEndedRequestHandler,CancelAndStopIntentHandler
      )
  .addErrorHandlers(ErrorHandler)
  .withSkillId(APP_ID)
  .lambda();