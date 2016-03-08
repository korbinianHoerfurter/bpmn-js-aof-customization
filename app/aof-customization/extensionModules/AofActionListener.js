'use strict';

var  forEach = require('lodash/collection/forEach');

function UserTaskCreationListener(eventBus,canvas,appManager) {


// you may hook into any of the following events
    var events = [
        'element.changed'
    ];

    events.forEach(function (event) {

        eventBus.on(event, function (e) {
            // e.element = the model element
            var a=appManager.list()
            // e.gfx = the graphical element
            if(e.element.businessObject.$type=="bpmn:UserTask"){
                if(!e.element.businessObject['$attrs']['aof:realizedBy']){
                    canvas.addMarker(e.element.id, 'no-app-assigned');
                    canvas.removeMarker(e.element.id, 'color-appensembleapp');
                }
                else{
                    canvas.removeMarker(e.element.id, 'no-app-assigned');
                    canvas.addMarker(e.element.id, 'color-appensembleapp');
                }
            }
            else if(e.element.businessObject.$type=="bpmn:Participant"){
                if(e.element.businessObject['aof:isAppEnsemble']){
                    canvas.addMarker(e.element.id, 'color-appensemble');
                }
                else{
                    canvas.removeMarker(e.element.id, 'color-appensemble');
                }
            }
        });
    });

}

UserTaskCreationListener.$inject = [ 'eventBus','canvas','appManager'];

module.exports = UserTaskCreationListener;