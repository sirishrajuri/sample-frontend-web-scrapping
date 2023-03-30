import { Component, NgModule, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService,AlertService } from '../_services';
import { User } from '../_models';

//import { AccountService, AlertService } from './_services';

@Component({ templateUrl: 'addTokenBalance.component.html', styleUrls: ['./addTokenBalance.component.css']})
export class AddTokenBalanceComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    user:User;
    tokenBal:number=500;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {
        // this.id = this.route.snapshot.params['id'];
        // this.isAddMode = !this.id;
        
        // // password not required in edit mode
        // const passwordValidators = [Validators.minLength(6)];
        // if (this.isAddMode) {
        //     passwordValidators.push(Validators.required);
        // }

        // this.form = this.formBuilder.group({
        //     firstName: ['', Validators.required],
        //     lastName: ['', Validators.required],
        //     username: ['', Validators.required],
        //     password: ['', passwordValidators],
        //     tokenBalance:[]
        // });

        // if (!this.isAddMode) {
        //     this.accountService.getById(this.id)
        //         .pipe(first())
        //         .subscribe(x => {
        //             this.f['firstName'].setValue(x.firstName);
        //             this.f['lastName'].setValue(x.lastName);
        //             this.f['username'].setValue(x.username);
        //             this.f['tokenBalance'].setValue(x.tokenBalance);
        //         });
        // }
    }

    UpdateBalance(){
        this.user.tokenBalance+=this.tokenBal;
        this.alertService.success('Token Balance added successfully');
        this.updateUser();
    }

    updateUser() {
        this.accountService.update(this.user.id, this.user)
            .pipe(first())
            .subscribe(
                data => {});
    }

    
}