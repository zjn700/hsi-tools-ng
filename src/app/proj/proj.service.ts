import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs'

import { Domain } from '../domn/domn.model'
import { Project } from './proj.model';
import { SessionState } from '../state/state.model'
import { Answer } from '../card/ansr/ansr.model';

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
        // console.log('reset activeProject')
        this.activeProject = project
    }
    
    resetActiveProject(projectId) {
        // console.log(this.projects)
    }
    
    setStateByQnnId(qnnId): string {
        if (this.activeProject.states) {   // the state array is not empty
            for (var i=0; i < this.activeProject.states.length; i++) {
                if (qnnId == this.activeProject.states[i].qnnId) {
                    this.activeProject.state = this.activeProject.states[i];
                    return this.activeProject.state.url
                }
            }
            return null;
        }
        return null;
    }
    
    updateState(qnnId, state){
        if (this.activeProject.states) {   // if the state array is not empty
            var found = false
            for (var i=0; i < this.activeProject.states.length; i++) {
                if (qnnId == this.activeProject.states[i].qnnId) { 
                    this.activeProject.states[i] = state;   // update the state in the array
                    found = true
                    break;   // don't need to go any farther
                }
            }
            if (!found) {
                this.activeProject.states.push(state) // ...add to thr states array
            }
        } else {
            this.activeProject.states = [];        // initialize states...
            this.activeProject.states.push(state)  //...and add to the array
        }
        this.activeProject.state = state;   // no matter what, update the current state 

    }
    
    isStateUpdateRequired(answer: Answer) {
        if (this.activeProject) {
            if (answer.projectId != this.activeProject.id) {
                // console.log('state update required')
                return true
            }
            if (localStorage.getItem('qnnId') != this.activeProject.state.qnnId) {
                // console.log('state update required')
                return true
            }
            if (answer.domainId != this.activeProject.state.domainId) {
                // console.log('state update required')
                return true
            }
            if (answer.sequence != this.activeProject.state.questionNumber) {
                    // console.log('state update required')
                    return true
            }
        }
        // console.log("no state update req'd");
        return false
        
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
        // console.log(t_state)
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
                        result.obj.state,
                        result.obj.states);
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
           // console.log('update not Required')
            return this.http.get('/projects/dummy')  // returns nothing, but creates the required observable
                .map((response:Response)=> {
                    return this.projects  // pass back the current domain array
                })
        } else {
            return this.http.get('/projects') 
                .map((response: Response) => {
                    // console.log(response.status)
                    if (response.status == 204) {
                        return [];
                    }
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
                            project.state,
                            project.states,
                            project.archived))
                            // console.log('project.states')
                            // console.log(project.states)
                            // convert from iso date format -- for sorting
                            projects[i].state.dateModified = new Date(projects[i].state.dateModified)
                            i++
                    }
                    this.projects = transformedProjects;
                    // console.log('this.projects')
                    // console.log(this.projects)
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
        if (project) {
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
    }
    
    
    archiveProject(project: Project) {
        // console.log('archiveProject')

        if (project) {
            // console.log('project')
            // console.log(project)
            const headers = new Headers({'content-Type': 'application/json'})
            const body = JSON.stringify(project);
            const token = localStorage.getItem('token') 
                ? '?token=' + localStorage.getItem('token')
                : '';
            return this.http.patch('/projects/archive/' + project.id + token, body, {headers: headers})
                    .map((response: Response) => {
                        response.json();
                        this.projectIsUpdated.emit(true);
                        if (project.id == localStorage.getItem('pid')) {
                            localStorage.removeItem('qnnId')
                            localStorage.removeItem('pid')
                        }
            
                        //this.projects = this.sortProjectList();
                        
                    })
                    .catch((error: Response) => Observable.throw(error)); 
        }
    }    
    
    sortProjectList() {  // reverse alpabetical order
        // console.log('sorting...')
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