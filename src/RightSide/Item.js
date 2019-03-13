import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    padding: 8px;
    border: 1px solid green;
    margin-bottom: 5px;
    background-color: white;
`;

const Title = styled.div`
    padding: 8px;
`;


export default class ModuleRight extends React.Component{
    render(){
        
        const item = this.props.item;
        const columnIndex = this.props.columnIndex;
        const moduleIndex = this.props.moduleIndex;
        const itemIndex= this.props.itemIndex
        const itemId = item.id

        return(
            <Draggable draggableId={itemId} index={itemIndex}>
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref = {provided.innerRef}
                    >
                        <Title>
                            {itemId}
                            <div>=> {columnIndex} {moduleIndex} {itemIndex} </div>
                        </Title>
                    </Container>
                )}
            </Draggable>
        )
    }
}