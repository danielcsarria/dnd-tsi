import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    padding: 8px;
    border: 1px solid blue;
    margin-bottom: 10px;
    background-color: white;

`;

const Title = styled.h4`
    padding: 8px;
`;

export default class ModuleLeft extends React.Component{
    render(){
        const columnIndex = this.props.columnIndex;
        const moduleKey = this.props.moduleKey;
        const moduleIndex = this.props.moduleIndex;
        // const modules = this.props.modules;

        return(

            <Draggable draggableId={moduleKey} index={moduleIndex}>
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Title>
                            Module: {moduleKey} 
                            <div> => {columnIndex}, {moduleIndex}</div>
                        </Title>
                    </Container>
                )}
            </Draggable>
        )
    }
}