import { LightningElement, wire, track } from 'lwc';
import getBills from '@salesforce/apex/BillController.getBills';

export default class BillList extends LightningElement {
   bills;
   searchTerm = '';
   delayTimeout;
   @track filteredData ;
    
   connectedCallback() {
    this.filteredData = this.bills;
    console.log('the component loaded successfully');
  }
    @wire(getBills)
    showBill({ error, data }) {
        if (data) {
            this.bills  = data;
            console.log('Fetched the bills successfully');
            console.log(Json.stringify(data.toString()));
            this.filterData();
        } else if (error) {
            console.error('Error fetching data', error);
        }
    }
    
   handleSearchChange(event) {
        this.searchTerm = event.target.value.toLowerCase();
        this.debounceFilter();  // Debounce to delay filtering for better performance
        console.log('This is the searching word: ' + this.searchTerm);
    }

    debounceFilter() {
        clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            this.filterData();
        }, 300);
        console.log('Delay timer');
    }

    filterData() {
        console.log('Bills: ' + this.bills);
        console.log('Search term: ' + this.searchTerm);
        this.filteredData = this.bills.filter(bill =>
            (bill.Invoice_Number__c && bill.Invoice_Number__c.toLowerCase().includes(this.searchTerm)) ||
            (bill.balance__c && bill.balance__c.toString().includes(this.searchTerm)) ||
            (bill.Account__r && bill.Account__r.Name && bill.Account__r.Name.toLowerCase().includes(this.searchTerm))
        );
        console.log('The word searched successfully');
    }
}
