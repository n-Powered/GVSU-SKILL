const allFuctions = require('../functions');

const AllStaticIntents = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' 
        && 
            (
            handlerInput.requestEnvelope.request.intent.name === 'ForgetPassword'
            || handlerInput.requestEnvelope.request.intent.name === 'GVSUEmergency'
            || handlerInput.requestEnvelope.request.intent.name === 'GVSUPrinting'
            || handlerInput.requestEnvelope.request.intent.name === 'GVSUEmergencyAbroad'
            || handlerInput.requestEnvelope.request.intent.name === 'GVSUParking'
            || handlerInput.requestEnvelope.request.intent.name === 'ComputerIssues'
            || handlerInput.requestEnvelope.request.intent.name === 'FinancialAidApplicationDeadline'
            || handlerInput.requestEnvelope.request.intent.name === 'FinancialAidApplicationTime' 
            || handlerInput.requestEnvelope.request.intent.name === 'MicrosoftOffice'
            || handlerInput.requestEnvelope.request.intent.name === 'GVSUResume'
            || handlerInput.requestEnvelope.request.intent.name === 'GVSUResumeFeedback'
            || handlerInput.requestEnvelope.request.intent.name === 'GVSUResumeReject'
            || handlerInput.requestEnvelope.request.intent.name === 'GVSUGameRoom'
            || handlerInput.requestEnvelope.request.intent.name === 'LibraryOverdue'
            || handlerInput.requestEnvelope.request.intent.name === 'ClassRegistrationTime'            
            || handlerInput.requestEnvelope.request.intent.name === 'ClassRegistration'
            || handlerInput.requestEnvelope.request.intent.name === 'ClassSignUp'
            || handlerInput.requestEnvelope.request.intent.name === 'FinancialAidApplication'
            || handlerInput.requestEnvelope.request.intent.name === 'GVSUEBill'
            || handlerInput.requestEnvelope.request.intent.name === 'HowTrackService'
            || handlerInput.requestEnvelope.request.intent.name === 'WhereTrackService'
            || handlerInput.requestEnvelope.request.intent.name === 'ResetProxyPassword'
            || handlerInput.requestEnvelope.request.intent.name === 'StudenAccountRefund'
        );
    },
    handle(handlerInput) {
        console.log("AllStaticIntents handler::");
        return allFuctions.setDynamoParams(handlerInput);
    }
}

module.exports = [ AllStaticIntents ];