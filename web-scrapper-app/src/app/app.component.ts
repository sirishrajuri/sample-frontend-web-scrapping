// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { API_URL } from './env';
// import { FormBuilder, FormGroup } from '@angular/forms';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'web-scrapper-app';
//   serverData: JSON | undefined;
//   res:string | undefined ;
//   myValue:Object  | undefined;
//   private router: Router | undefined;
//   keywordss: any[] = [];
//   form: FormGroup;
//   //httpClient: HttpClient;

//   constructor(public fb: FormBuilder, private httpClient: HttpClient) {
//     this.form = this.fb.group({
//       keywords:String,
//       number:Number,
//     });
//   }

//   Search(titles:string) {
//     // this.httpClient.get<string[]>(`${API_URL}/keywords/${titles}`).subscribe(data => {
//     //   this.keywords=data;
//     // })

//     //this.httpClient.post
//   }

//   ngOnInit() {
//     this.httpClient.get<string[]>(`${API_URL}/keywords/6`).subscribe(data => {
//       console.log(typeof data);
//       console.log(data);
//       this.keywordss=data;
//     })
//   }


//   uploadFile() {
//     // const file = (event.target as HTMLInputElement).files[0];
//     // this.form.patchValue({
//     //   avatar: file,
//     // });
//     // this.form.get('avatar').updateValueAndValidity();
//   }
//   submitForm() {
//     alert('s');
//     var formData: any = new FormData();
//     formData.append('keywords', 'is pubg paid');
//     formData.append('number', '5');
//     this.httpClient.post(`${API_URL}/related_articles`, formData)
//       .subscribe(data => {
//         console.log(data);
//         console.log(typeof data);
//       });
//   }

//   generate() {
//     alert('s');
//     var formData: any = new FormData();
//     formData.append('query', 'Which is the best course on Docker on udemy?');
//     this.httpClient.post(`${API_URL}/generate_simple_article`, formData)
//       .subscribe(data => {
//         console.log(data);
//       });
//   }

// }

import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User | undefined;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }
}





