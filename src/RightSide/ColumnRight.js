import React from 'react';
import styled from 'styled-components';
import ModuleRight from './ModuleRight';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const ColumnList = styled.div`
    border: 1px solid red;
    margin-bottom: 15px;
`;

const ColumnTitle = styled.h3`
    padding: 8px;
`;
const ModuleContainer = styled.div`
    padding: 8px;
`;


export default class ColumnRight extends React.Component{

    onDragEnd_R = result => {

        
    }

    render(){
        const columnIndex = this.props.columnIndex;
        const modules = this.props.modules;
        return(
            <ColumnList>
                <ColumnTitle>
                    Column: {columnIndex}
                </ColumnTitle>
                <DragDropContext onDragEnd={this.onDragEnd_R}>
                    <Droppable droppableId="all-modules" type="modules" direction="vertical">
                        {(provided) => (
                            <ModuleContainer
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
                                        />
                                    })
                                }
                                {provided.placeholder}
                            </ModuleContainer>
                        )}
                    </Droppable>
                </DragDropContext>
            </ColumnList>
        )
    }
}
