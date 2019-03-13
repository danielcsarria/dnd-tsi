import React from 'react';
import ReactDOM from 'react-dom';
import data from './data/data.json';
import ColumnLeft from './LeftSide/ColumnLeft';
import styled from 'styled-components';
import ColumnRight from './RightSide/ColumnRight';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const ColumnContainerLeft = styled.div`
    width: 50%;
    padding: 10px;
    background-color: white;
`;

const ColumnContainerRight = styled.div`
    width:50%;
    padding: 10px;
    background-color: white;
`;

const PageContainer = styled.div`
    display: flex;
    padding: 10px;
`


class LayOut extends React.Component {

    state = data;

    onDragEnd_L = result => {

        const { destination, source, draggableId } = result;

        console.log("DATA A => ", data);

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

        console.log("onDragEnd_A Left Side", source, destination, draggableId);

        var source_column = parseInt(source.droppableId, 10),
            target_column = parseInt(destination.droppableId, 10),
            source_module_index = source.index,
            target_module_index = destination.index,
            source_module_id = draggableId;
            // target_module_id = Object.keys(data.modules[target_column])[target_module_index];

        console.log("source column => ", source_column);
        console.log("target_column => ", target_column);
        console.log("source_module_index => ", source_module_index);
        console.log("target_module_index => ", target_module_index);
        console.log("source_module_id => ", source_module_id);

        const fillOutModules = function(keys) {
            // console.log("-> ", source_column, target_column);
            var modules = {};
            keys.forEach(key => {
                modules[key] = typeof data.modules[source_column][key] != "undefined" ? 
                                data.modules[source_column][key] : 
                                data.modules[target_column][key];
            });
            return modules;
        }

        //console.log("Modules", modules)

        //console.log("target_module_id", target_module_id);
        console.log("source modules", data.modules[source_column]);

        if (source_column === target_column) {
            var keys = Object.keys(data.modules[source_column]);

            if (target_module_index > source_module_index) {
                ++target_module_index;
            } else {
                ++source_module_index;
            }

            keys.splice(target_module_index, 0, source_module_id);
            keys.splice(source_module_index, 1)

            var modules = fillOutModules(keys);
            data.modules[source_column] = modules;

            // console.log("keys", keys);
            // console.log("modules", modules);

            // this.setState(data.modules[source_column]);

        } else {
            var source_keys = Object.keys(data.modules[source_column]),
                target_keys = Object.keys(data.modules[target_column]);

            target_keys.splice(target_module_index, 0, source_module_id);
            data.modules[target_column] = fillOutModules(target_keys);
            // this.setState(data.modules[target_column]);

            source_keys.splice(source_module_index, 1);
            data.modules[source_column] = fillOutModules(source_keys);
            // this.setState(data.modules[source_column]);

        }

        this.setState(data);
        
    }

    render(){

        return(

            <PageContainer>

                <DragDropContext
                    onDragEnd={this.onDragEnd_L}
                >
                    <Droppable droppableId="all-columns" type="column" direction="vertical">
                        {(provided) => (
                            <ColumnContainerLeft
                                {...provided.droppableProps}
                                ref = {provided.innerRef}
                            >
                                {
                                    this.state.modules.map((modules, columnIndex) => {
                                        return <ColumnLeft key={columnIndex} columnIndex={columnIndex} modules={modules}/>
                                    })
                                }
                                {provided.placeholder}
                            </ColumnContainerLeft>
                        )}
                    </Droppable>
                </DragDropContext>


                <ColumnContainerRight>
                
                    {
                        this.state.modules.map((modules, columnIndex) => {
                            return <ColumnRight key={columnIndex} columnIndex={columnIndex} modules={modules} data={data}/>
                        })
                    }

                </ColumnContainerRight>

            </PageContainer>

        )

    }

}

ReactDOM.render(<LayOut />, document.getElementById('root'));
