"use strict";

import { Injectable } from '@angular/core';

@Injectable()
export class TopMenuService {
    
    activateThisItem(url){
        let menuItemList = document.getElementsByClassName("topMenuItem"); 
        
        for (let i=0; i < menuItemList.length; i++) {
            menuItemList[i].classList.remove('active')
            if (menuItemList[i].getAttribute('href') == url) {
                menuItemList[i].classList.add('active')
            }    
        }
    }
    
    updateTopMenu(button) {
        
        if (typeof button == 'string') {
            console.log('is string')
        }
        
        let menuItems = document.getElementsByClassName("topMenuItem"); 
           for (let i=0; i < menuItems.length; i++) {
                menuItems[i].classList.remove('active')
                  if (menuItems[i].getAttribute('href') == button.getAttribute('ng-reflect-router-link')) {
                    menuItems[i].classList.add('active')
                  }
           }
    }
}

// http://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
