import React from 'react';
import ModuleRight from './ModuleRight';
import data from '../data/data.json';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import '../style.css';

export default class ColumnRight extends React.Component{

    state = data;    

    onDragEnd_R = result => {

        const columnIndex = this.props.columnIndex;

        const { destination, source } = result;

        if (!destination) {
            return;            
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        var source_module = parseInt(source.droppableId, 10),
            target_module = parseInt(destination.droppableId, 10),
            source_item_index = source.index,
            target_item_index = destination.index;

        // console.log("A columnIndex => ", columnIndex);
        // console.log("source_module => ", source_module);
        // console.log("target_module => ", target_module);
        // console.log("source_item_index => ", source_item_index);
        // console.log("target_item_index => ", target_item_index);      

        if(isNaN(source_module)) {
            
            const fillOutModules = function(keys, allModules) {
                // console.log("-> ", source_column, target_column);
                var newModules = {};
                keys.forEach(key => {
                    console.log("B columnIndex => ", columnIndex);
                    console.log(key)
                    newModules[key] = allModules[key];
                });
                // console.log("New Modules", newModules);
                return newModules;
            }            

            var modules = this.state.modules[columnIndex],
                keys = Object.keys(modules);
            
            // console.log("keys =>", keys);

            var modSelected = keys.splice(source_item_index, 1);
            keys.splice(target_item_index, 0, modSelected[0]);

            // const newModules = Array.from(keys);
            // const modSelected = newModules.splice(source.index, 1);
            // newModules.splice(destination.index, 0, modSelected[0]);


            // console.log("modSelected =>", modSelected)
            // console.log("keys =>", keys);

            modules = fillOutModules(keys, modules);

            // this.setState(newModules);

        } else {

            var modsKeys = Object.keys(this.state.modules[columnIndex]),
            source_module_key = modsKeys[source_module],
            target_module_key = modsKeys[target_module],
            source_items = this.state.modules[columnIndex][source_module_key].items,
            target_items = this.state.modules[columnIndex][target_module_key].items;

            if (source_module === target_module) {

                var selected = source_items.splice(source_item_index, 1);
                source_items.splice(target_item_index, 0, selected[0]);
    
            } else {
    
                var selectedB = source_items.splice(source_item_index, 1);
                target_items.splice(target_item_index, 0, selectedB[0]);
    
            }

            // source_items = [];
        }
        
        

        this.setState(data);
        
    }

    render(){
        const columnIndex = this.props.columnIndex;
        // const modules = this.props.modules;
        const modules = this.state.modules[columnIndex];
        var title = columnIndex === 0 ? "Feature" : "Column " + columnIndex;

        var background = "";
        var theClass = "";

        if (title === "Feature"){
            background = "column-feature ";
            theClass = "module-container " + background;
        } else if (title === "Column 1"){
            background = "column-one";
            theClass = "module-container " + background;
        } else if (title === "Column 2"){
            background = "column-two";
            theClass = "module-container " + background;
        } else if (title === "Column 3"){
            background = "column-three";
            theClass = "module-container " + background;
        } else if (title === "Column 4"){
            background = "column-four";
            theClass = "module-container " + background;
        }

        const columnClass = "column " + background;

        return(
            <div className={columnClass}>
                <div className="column-title">
                    {title}
                </div>
                <DragDropContext onDragEnd={this.onDragEnd_R}>
                    <Droppable droppableId="all-modules" type="modules" direction="vertical">
                        {(provided) => (
                            <div className="container"
                                {...provided.droppableProps}
                                ref = {provided.innerRef}
                            >
                                { 
                                    Object.keys(modules).map((moduleKey, moduleIndex) => {
                                        return <ModuleRight 
                                            key={moduleKey} 
                                            columnIndex={columnIndex}
                                            moduleKey={moduleKey}
                                            moduleIndex={moduleIndex} 
                                            modules={modules}
                                            theClass={theClass}
                                            config={this.props.config}                               
                                        />
                                    })
                                } 

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}
