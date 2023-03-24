import { HttpClient } from '@angular/common/http';
import { API_URL } from '../env';
import { User } from '../_models';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";  
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService,AlertService } from '../_services';
import { SafeUrl } from '@angular/platform-browser';

import { DomSanitizer} from '@angular/platform-browser';

@Component({ templateUrl: 'home.component.html',styleUrls: ['home.component.css']})
export class HomeComponent {
    @ViewChildren('audio') audioElms!: ElementRef;
    user: User;
    //searchText: any;
    resultKeywords: any[] = [];
    resultArticle:string;
    form: FormGroup;
    loading:boolean;
    loadingArticle:boolean;
    submitted = false;
    url = window.URL;
    returnUrl:any;
    audioUrl: SafeUrl;
    isPaused = false;
    smapleURL:string;
    articleAudioGenerated:boolean=false;
    speechSynthesis = window.speechSynthesis;
    audioSource = '';
    isLoadingArticle:boolean=false;
    

    constructor(private sanitizer: DomSanitizer,private formBuilder: FormBuilder,private accountService: AccountService,private httpClient: HttpClient,private SpinnerService: NgxSpinnerService,private alertService: AlertService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            keywords: ['', Validators.required],
            number: ['', Validators.required]
        });
    }

    onPlayClick(audio: HTMLAudioElement) {
        if (!this.isPaused) {
         audio.play();
         this.isPaused = true;
        } else {
         audio.pause();
         this.isPaused = false;
        }
    }
       
    onPause() {
        this.isPaused = false;
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.resultArticle='';
        this.resultKeywords=[];
        this.loading=true;
        this.articleAudioGenerated=false;
        var formData: any = new FormData();
        formData.append('keywords', this.form.value.keywords);
        formData.append('number', this.form.value.number);
        this.httpClient.post(`${API_URL}/related_articles`, formData)
              .subscribe((data:any) => {
                this.loading=false;
                this.resultKeywords=data;
            });
    }

    generateSimpleArticle(name:string) {
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

    generateLongArticle(name:string) {
        this.loadingArticle=true;
        var formData: any = new FormData();
        formData.append('query', name);
        this.httpClient.post(`${API_URL}/generate_article`, formData)
        .subscribe((data:any) => {
            this.loadingArticle=false;
            this.resultArticle=data;
            this.user.tokenBalance--;
            this.updateUser();
            this.alertService.success('Token Balance has been reduced by 1', { keepAfterRouteChange: true });
        });
    }

    generateAudio() {
        this.articleAudioGenerated=false;
        this.isLoadingArticle=true;
        var formDatas: any = new FormData();
        formDatas.append('text', this.resultArticle);
        this.httpClient.post(`${API_URL}/generate_video`, formDatas,{ responseType: 'blob' })
        .subscribe((data:any) => {
            this.audioSource=URL.createObjectURL(data);
            this.articleAudioGenerated=true;
            this.isLoadingArticle=false;
        });
    }

    updateUser() {
        this.accountService.update(this.user.id, this.user)
            .pipe(first())
            .subscribe(
                data => {});
    }

    generateVideo(){
        
    }

}