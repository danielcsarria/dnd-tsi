import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../style.css';
import '../FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ItemContainer = styled.div`
    padding: 10px;
    margin-right: 25px;
`;

export default class ModuleRight extends React.Component{
    render(){
        const columnIndex = this.props.columnIndex;
        const moduleKey = this.props.moduleKey;
        const moduleIndex = this.props.moduleIndex;
        const modules = this.props.modules;

        const droppableId = String(moduleIndex);
        const module = modules[moduleKey];
        const type = module.type
        const config = this.props.config.modules[type];
        const title = config.lbl;
        const items = module.items;

        const theClass = this.props.theClass;

        var icon = config.ico;

        if (icon === "newspaper-o"){
            icon = "newspaper";
        } else if (icon === "lightbulb-o") {
            icon ="lightbulb";
        } else if (icon === "square-o"){
            icon = "square";
        } else if (icon === "cutlery"){
            icon = "utensils";
        } else if (icon === "flag-o"){
            icon = "flag";
        }

        return(
            <Draggable draggableId={droppableId} index={moduleIndex}>
                {(provided) => (
                    <div className={theClass}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <div className="title-container">
                            <div className="module-title"
                                {...provided.dragHandleProps}
                            >
                                <small><FontAwesomeIcon icon={icon}/> {'\u00A0'}{title}</small>
                            </div>
                        </div>
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
                    </div>
                )}
            </Draggable>
        )
    }
}