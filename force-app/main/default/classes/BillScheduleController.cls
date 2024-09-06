public with sharing class BillScheduleController {
    @AuraEnabled(cacheable = true)
    public static void BillSchedule(string cronExpression) {
        BillScheduler bS  = new BillScheduler();
        String jobId = system.schedule('My Scheduled Job',cronExpression,bS);

       
    }
}