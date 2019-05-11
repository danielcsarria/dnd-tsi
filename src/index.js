import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './data/data.json';
import config from './data/config.json'
import ColumnLeft from './LeftSide/ColumnLeft';
import ColumnRight from './RightSide/ColumnRight';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './style.css';

class LayOut extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: initialData};
        this.onDragEnd_L = this.onDragEnd_L.bind(this);
        this.onDragEnd_R = this.onDragEnd_R.bind(this);
    }  

    onDragEnd_L(result) {

        const { destination, source, draggableId } = result;

        // console.log("DATA LEFT => ", data);

        if (!destination) {
            return;            
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            console.log("Nothing moved")
            return;
        }

        // console.log("onDragEnd_A Left Side", source, destination, draggableId);

        var source_column = parseInt(source.droppableId, 10),
            target_column = parseInt(destination.droppableId, 10),
            source_module_index = source.index,
            target_module_index = destination.index,
            source_module_id = draggableId;
        //     target_module_id = Object.keys(data.modules[target_column])[target_module_index];

        // console.log("source column => ", source_column);
        // console.log("target_column => ", target_column);
        // console.log("source_module_index => ", source_module_index);
        // console.log("target_module_index => ", target_module_index);
        // console.log("source_module_id => ", source_module_id);

        // console.log("Modules", modules)

        // console.log("target_module_id", target_module_id);
        // console.log("source modules Left => ", data.modules[source_column]);

        const fillOutModules = (keys) => {
            // console.log("-> ", source_column, target_column);
            var modules = {};
            keys.forEach(key => {
                modules[key] = typeof this.state.data.modules[source_column][key] != "undefined" ? 
                                this.state.data.modules[source_column][key] : 
                                this.state.data.modules[target_column][key];
            });
            return modules;
        }        
        

        if(isNaN(source_column)) {

            if (source_column !== target_column) {
                console.log("A")
                var columns = this.state.data.modules;
                console.log("columns =>", columns);

                var selected = columns.splice(source.index, 1);
                columns.splice(destination.index, 0, selected[0]);
                console.log("source index =>", source.index);
                console.log("destination index => ", destination.index);

                const newData = {
                    ...this.state.data,
                    modules: columns
                }
        
                this.setState({
                    data : newData
                });          
            }

        } else {
            const newData = this.state.data;
            const modules = newData.modules;

            if (source_column === target_column) {
                console.log("B")

                const keys = Object.keys(modules[source_column]);
    
                if (target_module_index > source_module_index) {
                    ++target_module_index;
                } else {
                    ++source_module_index;
                }
    
                keys.splice(target_module_index, 0, source_module_id);
                keys.splice(source_module_index, 1)
    
                newData.modules[source_column] = fillOutModules(keys);
    
                // console.log("keys", keys);
                // console.log("modules", modules);
                // console.log("newData", newData);
               
    
            } else {
                console.log("C")

                var source_keys = Object.keys(modules[source_column]),
                    target_keys = Object.keys(modules[target_column]);
    
                target_keys.splice(target_module_index, 0, source_module_id);
                newData.modules[target_column] = fillOutModules(target_keys);
                // this.setState(data.modules[target_column]);
    
                source_keys.splice(source_module_index, 1);
                newData.modules[source_column] = fillOutModules(source_keys);
            
            }

            this.setState({
                data : newData
            });    
        }
        
    }

    onDragEnd_R(result, columnIndex) {

        const { destination, source, draggableId } = result;

        if (!destination) {
            return;            
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // const columnIndex = this.props.columnIndex;
        console.log("A columnIndex => ", columnIndex);

        var source_module = parseInt(source.droppableId, 10),
            target_module = parseInt(destination.droppableId, 10),
            source_item_index = source.index,
            target_item_index = destination.index;

        console.log("source_module => ", source_module);
        console.log("target_module => ", target_module);
        console.log("source_item_index => ", source_item_index);
        console.log("target_item_index => ", target_item_index);      
        console.log("draggableId =>", draggableId);

        const newData = this.state.data;

        if(isNaN(source_module)) {

            console.log("R A")
            
            const fillOutModules = (keys, column) => {
                var modules = [];
                keys.forEach(key => {
                    modules[key] = column[key];
                });
                return modules;
            }            

            const modules = newData.modules;
            const keys = Object.keys(modules[columnIndex]);
            const source_module_id = draggableId;
    
            if (target_item_index > source_item_index) {
                ++target_item_index;
            } else {
                ++source_item_index;
            }

            keys.splice(target_item_index, 0, keys[source_module_id]);
            keys.splice(source_item_index, 1);

            // console.log("keys",keys);

            const newModules = fillOutModules(keys, this.state.data.modules[columnIndex]);
            // console.log("newModules",newModules);

            newData.modules[columnIndex] = newModules;

        } else {

            console.log("R B")
            
            const modules = newData.modules;   

            var modsKeys = Object.keys(modules[columnIndex]),
                source_module_key = modsKeys[source_module],
                target_module_key = modsKeys[target_module],
                source_items = modules[columnIndex][source_module_key].items,
                target_items = modules[columnIndex][target_module_key].items;

            if (source_module === target_module) {

                var selected = source_items.splice(source_item_index, 1);
                source_items.splice(target_item_index, 0, selected[0]);
                newData.modules[columnIndex][source_module_key].items = source_items;
    
            } else {
    
                var selectedB = source_items.splice(source_item_index, 1);
                target_items.splice(target_item_index, 0, selectedB[0]);
                newData.modules[columnIndex][target_module_key].items = target_items;
    
            }

        }

        // console.log("newData", newData)        
        
        this.setState({
            data : newData
        });            
    }   

    render(){

        return(

            <div id="page-layout-editor">

                <div className="top-bar">
                    <div className="tb-container">
                        <div className="tb-title">
                            Page Layout Editor
                        </div>
                        <div className="tb-buttons">
                            <button id="cancel-btn" className="btn btn-cancel">Cancel</button>
                            <button id="apply-btn" className="btn btn-apply">Apply</button>
                        </div>
                    </div>
                </div>

                <div id="page-container">
                    <DragDropContext
                        onDragEnd={this.onDragEnd_L}
                    >
                        <Droppable droppableId="all-columns" type="column" direction="vertical">
                            {(provided) => (
                                <div id="column-container-left"
                                    {...provided.droppableProps}
                                    ref = {provided.innerRef}
                                >
                                    {   
                                        this.state.data.modules.map((modules, columnIndex) => {
                                            return <ColumnLeft 
                                                key={columnIndex} 
                                                columnIndex={columnIndex} 
                                                modules={modules} 
                                                config={config} 
                                            />
                                        })
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>


                    <div id="column-container-right">
                        {
                            this.state.data.modules.map((modules, columnIndex) => {
                                return <ColumnRight 
                                    key={columnIndex} 
                                    columnIndex={columnIndex} 
                                    modules={this.state.data.modules} 
                                    config={config}
                                    onDragEnd={this.onDragEnd_R}
                                />
                            })
                        }
                    </div>
                </div>

            </div>

        )

    }

}

ReactDOM.render(<LayOut />, document.getElementById('root'));
