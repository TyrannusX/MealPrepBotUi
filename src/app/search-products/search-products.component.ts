import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {
  searchCriteria: string;
  isSubmitted: boolean = false;
  items: any;
  spinnerEnabled: boolean = false;
  showSuccess: boolean = false;
  successMessage: string = "";

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

  }

  search(): void{
    this.isSubmitted = false;
    this.spinnerEnabled = true;
    this.showSuccess = false;

    this.httpClient.get(`http://localhost:5000/Search/${this.searchCriteria}`).subscribe((response: any) =>{
      this.spinnerEnabled = false;
      this.isSubmitted = true;
      this.items = response.data;
    });
  }

  filterImage(image: any): boolean{
    return image.perspective === 'front';
  }

  filterImageSize(size: any): boolean{
    return size.size === 'medium';
  }

  addProductIdToDb(descriptionStr: string, upcStr: string){
    this.spinnerEnabled = true;
    this.showSuccess = false;

    this.httpClient.post('http://localhost:5000/AddProductToDb', {description: descriptionStr, upc: upcStr}).subscribe(response => {
      this.spinnerEnabled = false;
      this.successMessage = `Product ${descriptionStr} added successfully`;
      this.showSuccess = true;
    });
  }

}
