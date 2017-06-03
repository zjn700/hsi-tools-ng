import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs'

import { Domain } from '../domn/domn.model'
import { Project } from './proj.model';

@Injectable()
export class ProjectService {
    private projects: Project[] = [];
    projectIsInEditMode = new EventEmitter<Project>();
    projectIsUpdated = new EventEmitter<boolean>();
    public t_str:string = 'ok';
    public activeProject: Project;
    public lastActiveProject:string = null;
    public domains: Domain[] = [];
    
    constructor(private http: Http) { }
    
    getTestStr(){
        return this.t_str
    }
    
    getDomains(){
        return this.domains
    }
    
    getActiveProject(): Project {
        return this.activeProject
    }
    
    setActiveProject(project: Project){
        console.log('setActiveProject')
        console.log(project)
        this.activeProject = project
    }
    
    addProject(project: Project){
        const headers = new Headers({'content-Type': 'application/json'})
        const body = JSON.stringify(project)
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('/projects' + token, body, {headers: headers})
                .map((response: Response) => {
                    const result = response.json();
                    const project = new Project(
                            result.obj.title, 
                            result.obj.description,
                            result.obj._id,
                            result.obj.dateCreated,
                            result.obj.users);
                    this.projects.push(project);
                    this.projects = this.sortProjectList();
                    this.projectIsUpdated.emit(true)

                    return project;
                })
                .catch((error: Response) => Observable.throw(error));
    }
    
    getProjects(){
        return this.http.get('/projects')    //.publishLast().refCount()
            .map((response: Response) => {
                if (response.json().obj.length == 0) {
                    return this.projects = response.json().obj;
                } 
                const projects = response.json().obj;
                let transformedProjects: Project[] = [];
                for (let project of projects) {
                    transformedProjects.push(new Project(
                        project.title,
                        project.description,
                        project._id,
                        project.dateCreated,
                        project.users,
                        project.state))
                }
                this.projects = transformedProjects;
                return transformedProjects;
            })
            .catch((error: Response) => Observable.throw(error));
    }
    
    deleteProject(project: Project){
        this.projects.splice(this.projects.indexOf(project), 1);
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('/projects/' + project.id + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error)); 
    }
    
    editProject(project: Project){
        this.projectIsInEditMode.emit(project)
    }
    
    updateProject(project: Project) {
        const headers = new Headers({'content-Type': 'application/json'})
        const body = JSON.stringify(project);
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('/projects/' + project.id + token, body, {headers: headers})
                .map((response: Response) => {
                    response.json();
                    this.projectIsUpdated.emit(true)
                })
                .catch((error: Response) => Observable.throw(error)); 
    }
    
    sortProjectList() {  // reverse alpabetical order
       return  this.projects.sort(function(a, b){
                if ( a.title > b.title ) {
                    return -1;}
                if ( a.title < b.title ) {
                    return 1;}
                return 0;
              })
    }
    
    projectIsSelected(){
        return localStorage.getItem('pid') !== null;
    }

}