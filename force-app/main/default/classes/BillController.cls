public with sharing class BillController {
    @AuraEnabled(cacheable=true)
    public static list<bill__c> getBills(){
        try {
            return [SELECT Id,Invoice_Number__c,Balance__c,Account__r.Name FROM Bill__c];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
    
