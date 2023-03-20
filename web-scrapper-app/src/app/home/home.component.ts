import { HttpClient } from '@angular/common/http';
import { API_URL } from '../env';
import { User } from '../_models';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";  
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService,AlertService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    //searchText: any;
    resultKeywords: any[] = [];
    resultArticle:string;
    form: FormGroup;
    loading:boolean;
    loadingArticle:boolean;
    submitted = false;
    audioUrl:any;

    speechSynthesis = window.speechSynthesis;


    constructor(private formBuilder: FormBuilder,private accountService: AccountService,private httpClient: HttpClient,private SpinnerService: NgxSpinnerService,private alertService: AlertService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            keywords: ['', Validators.required],
            number: ['', Validators.required]
        });
    }

    // submitForm() {
    //     this.httpClient.get<string[]>(`${API_URL}/keywords/${this.searchText}`).subscribe((data: any[]) => {
    //         this.resultKeywords=data;
    //     })
    // }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        //this.SpinnerService.show(); 
        this.loading=true;
        var formData: any = new FormData();
        formData.append('keywords', this.form.value.keywords);
        formData.append('number', this.form.value.number);
        this.httpClient.post(`${API_URL}/related_articles`, formData)
              .subscribe((data:any) => {
                this.loading=false;
                this.resultKeywords=data;
              });
    }

    submitArticle(name:string) {
        this.loadingArticle=true;
        var formData: any = new FormData();
        formData.append('query', name);
        this.httpClient.post(`${API_URL}/generate_simple_article`, formData)
        .subscribe((data:any) => {
            this.loadingArticle=false;
            this.resultArticle=data;
            this.user.tokenBalance--;
            this.updateUser();
            this.alertService.success('Token Balance has been reduced by 1', { keepAfterRouteChange: true });
        });
    }

    generateAudio() {
        console.log('start');
        const utter=new SpeechSynthesisUtterance(this.resultArticle);
        this.speechSynthesis.speak(utter);
    }

    updateUser() {
        this.accountService.update(this.user.id, this.user)
            .pipe(first())
            .subscribe(
                data => {});
    }

    
}