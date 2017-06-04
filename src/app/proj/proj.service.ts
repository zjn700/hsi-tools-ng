import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs'

import { Domain } from '../domn/domn.model'
import { Project } from './proj.model';
import { SessionState } from '../state/state.model'

@Injectable()
export class ProjectService {
    private projects: Project[] = [];
    projectIsInEditMode = new EventEmitter<Project>();
    projectIsUpdated = new EventEmitter<boolean>();
    private dbAccessed:boolean = false;
    public activeProject: Project;
    
    constructor(private http: Http) { }
    
    getActiveProject(): Project {
        return this.activeProject
    }
    
    setActiveProject(project: Project){
        this.activeProject = project
    }
    
    addState(project: Project):Project {
        var t_state = new SessionState(
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            new Date()
        ); 
        console.log(t_state)
        project.state = t_state;
        return project
    }
    
    addProject(project: Project){
        
        project = this.addState(project)
        
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
                        result.obj.users,
                        result.obj.state);
                        project.state.dateModified = new Date(project.state.dateModified)
                    this.projects.push(project);
                    this.projects = this.sortProjectList();
                    this.projectIsUpdated.emit(true)
                    localStorage.removeItem('qnnId')
                    return project;
                })
                .catch((error: Response) => Observable.throw(error));
    }
    
    getProjects(){
        if (this.dbAccessed) {
           console.log('update not Required')
            return this.http.get('/projects/dummy')  // returns nothing, but creates the required observable
                .map((response:Response)=> {
                    return this.projects  // pass back the current domain array
                })
        } else {
            return this.http.get('/projects') 
                .map((response: Response) => {
                    if (response.json().obj.length == 0) {
                        return this.projects = response.json().obj;
                    } 
                    const projects = response.json().obj;
                    let transformedProjects: Project[] = [];
                    let i = 0;
                    for (let project of projects) {
                        transformedProjects.push(new Project(
                            project.title,
                            project.description,
                            project._id,
                            project.dateCreated,
                            project.users,
                            project.state))
                            // convert from iso date format -- for sorting
                            projects[i].state.dateModified = new Date(projects[i].state.dateModified)
                            i++
                    }
                    this.projects = transformedProjects;
                    this.dbAccessed = true;
                    return transformedProjects;
                })
                .catch((error: Response) => Observable.throw(error));
        }
    }
    
    deleteProject(project: Project){
        this.projects.splice(this.projects.indexOf(project), 1);
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('/projects/' + project.id + token)
            .map((response: Response) => {
                response.json()
                if (project.id == localStorage.getItem('pid')) {
                    localStorage.removeItem('qnnId')
                    localStorage.removeItem('pid')
                }
            })
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
                    this.projectIsUpdated.emit(true);
                    //this.projects = this.sortProjectList();
                    
                })
                .catch((error: Response) => Observable.throw(error)); 
    }
    
    sortProjectList() {  // reverse alpabetical order
        console.log('sorting...')
       return  this.projects.sort(function(a, b){
                //if ( a.title > b.title ) {
                if ( a.state.dateModified > b.state.dateModified) {
                    return -1;}
                if ( a.state.dateModified < b.state.dateModified ) {
                    return 1;}
                return 0;
              })
    }
    
    projectIsSelected(){
        return localStorage.getItem('pid') !== null;
    }

}