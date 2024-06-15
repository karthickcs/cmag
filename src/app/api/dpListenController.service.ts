/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable } from 'rxjs';

import { DpListenDTO } from '../model/dpListenDTO';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class DpListenControllerService {

    protected basePath = 'http://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }




    
    /**
     * cleanup
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public cleanupUsingGET(observe?: 'body', reportProgress?: boolean): Observable<string>;
    public cleanupUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public cleanupUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public cleanupUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<string>(`${this.basePath}/cleanup`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
    /**
     * deletedplisten
     * 
     * @param dplistenid dplistenid
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deletedplistenUsingDELETE(dplistenid: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deletedplistenUsingDELETE(dplistenid: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deletedplistenUsingDELETE(dplistenid: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deletedplistenUsingDELETE(dplistenid: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dplistenid === null || dplistenid === undefined) {
            throw new Error('Required parameter dplistenid was null or undefined when calling deletedplistenUsingDELETE.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/dplisten/${encodeURIComponent(String(dplistenid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getDptask
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDptaskUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<DpListenDTO>>;
    public getDptaskUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DpListenDTO>>>;
    public getDptaskUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DpListenDTO>>>;
    public getDptaskUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<DpListenDTO>>(`${this.basePath}/dptask`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getRunIds
     * 
     * @param taskid taskid
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getRunIdsUsingGET(taskid: number, observe?: 'body', reportProgress?: boolean): Observable<Array<DpListenDTO>>;
    public getRunIdsUsingGET(taskid: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DpListenDTO>>>;
    public getRunIdsUsingGET(taskid: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DpListenDTO>>>;
    public getRunIdsUsingGET(taskid: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (taskid === null || taskid === undefined) {
            throw new Error('Required parameter taskid was null or undefined when calling getRunIdsUsingGET.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<DpListenDTO>>(`${this.basePath}/dplisten/runids/${encodeURIComponent(String(taskid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getdplistens
     * 
     * @param dplistenid dplistenid
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getdplistensUsingGET(dplistenid: number, observe?: 'body', reportProgress?: boolean): Observable<DpListenDTO>;
    public getdplistensUsingGET(dplistenid: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DpListenDTO>>;
    public getdplistensUsingGET(dplistenid: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DpListenDTO>>;
    public getdplistensUsingGET(dplistenid: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dplistenid === null || dplistenid === undefined) {
            throw new Error('Required parameter dplistenid was null or undefined when calling getdplistensUsingGET.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<DpListenDTO>(`${this.basePath}/dplisten/${encodeURIComponent(String(dplistenid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * savedplisten
     * 
     * @param dpListenDTO dpListenDTO
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public savedplistenUsingPOST(dpListenDTO: DpListenDTO, observe?: 'body', reportProgress?: boolean): Observable<number>;
    public savedplistenUsingPOST(dpListenDTO: DpListenDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<number>>;
    public savedplistenUsingPOST(dpListenDTO: DpListenDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<number>>;
    public savedplistenUsingPOST(dpListenDTO: DpListenDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dpListenDTO === null || dpListenDTO === undefined) {
            throw new Error('Required parameter dpListenDTO was null or undefined when calling savedplistenUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<number>(`${this.basePath}/dplistens`,
            dpListenDTO,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * update
     * 
     * @param dpListenDTO dpListenDTO
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateUsingPUT1(dpListenDTO: DpListenDTO, observe?: 'body', reportProgress?: boolean): Observable<DpListenDTO>;
    public updateUsingPUT1(dpListenDTO: DpListenDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DpListenDTO>>;
    public updateUsingPUT1(dpListenDTO: DpListenDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DpListenDTO>>;
    public updateUsingPUT1(dpListenDTO: DpListenDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dpListenDTO === null || dpListenDTO === undefined) {
            throw new Error('Required parameter dpListenDTO was null or undefined when calling updateUsingPUT1.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<DpListenDTO>(`${this.basePath}/dplistens`,
            dpListenDTO,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
