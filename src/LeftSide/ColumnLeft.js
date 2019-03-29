import React from 'react';
import styled from 'styled-components';
import ModuleLeft from './ModuleLeft';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {CollapsibleComponent, CollapsibleHead, CollapsibleContent} from 'react-collapsible-component';


const ColumnList = styled.div`
    border: 1px solid red;
    margin-bottom: 15px;
    background-color: white;
`;

const ColumnTitle = styled.h3`
    padding: 8px;
`;
const ModuleContainer = styled.div`
    padding: 8px;
    min-height: 200px;

`;


export default class ColumnLeft extends React.Component{
    render(){
        const columnIndex = this.props.columnIndex;
        const modules = this.props.modules;

        const droppableId = String(columnIndex)

        return(
            <CollapsibleComponent>
                <Draggable draggableId={droppableId} index={columnIndex}>

                    {(provided) => (
                        <ColumnList
                            {...provided.draggableProps}
                            ref = {provided.innerRef}
                        >

                            <CollapsibleHead >
                                <ColumnTitle
                                    {...provided.dragHandleProps}
                                >
                                    Column: {columnIndex}
                                </ColumnTitle>
                            </CollapsibleHead>

                            <CollapsibleContent isExpanded={true}>
                                <Droppable droppableId={droppableId}>
                                    {(provided) => (
                                        <ModuleContainer
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {
                                                Object.keys(modules).map((moduleKey, moduleIndex) => {
                                                    return <ModuleLeft 
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
                            </CollapsibleContent>

                        </ColumnList>
                    )}

                </Draggable>

            </CollapsibleComponent>
        )
    }
}
