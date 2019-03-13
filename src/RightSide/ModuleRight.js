import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    padding: 8px;
    border: 1px solid blue;
    margin-bottom: 10px;
    background-color: white;

`;

const Title = styled.h4`
    padding: 8px;
`;

const ItemContainer = styled.div`
    padding: 8px;
`;

export default class ModuleRight extends React.Component{
    render(){
        const columnIndex = this.props.columnIndex;
        const moduleKey = this.props.moduleKey;
        const moduleIndex = this.props.moduleIndex;
        const modules = this.props.modules;

        const droppableId = String(moduleIndex);

        const module = modules[moduleKey];
        // const type = module.type;
        const items = module.items;

        return(
            <Draggable draggableId={droppableId} index={moduleIndex}>
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <Title
                            {...provided.dragHandleProps}
                        >
                            Module: {moduleKey} 
                            <div> => {columnIndex}, {moduleIndex}</div>
                        </Title>
                        <Droppable droppableId={droppableId}>
                            {(provided) => (
                                <ItemContainer
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {
                                        items.map((item, itemIndex) => {
                                            return (
                                                <Item 
                                                    key={itemIndex} 
                                                    item={item} 
                                                    columnIndex={columnIndex} 
                                                    moduleIndex={moduleIndex} 
                                                    itemIndex={itemIndex}
                                                />
                                            )
                                        })
                                    }
                                    {provided.placeholder}
                                </ItemContainer>
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        )
    }
}