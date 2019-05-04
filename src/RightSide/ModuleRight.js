import React from 'react';
import Item from './Item';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../style.css';
import '../FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        const imgsize = modules[moduleKey].imgsize;
        const ratio = this.props.modules_img_sizes[imgsize].ratio;

        const className = "btn btn-apply btn-module btn-" + columnIndex;

        // console.log()

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
                        <div className="title-container" onClick={() => this.props.moveSelectedItems()}>

                            <div className="module-title"
                                {...provided.dragHandleProps}
                            >
                                <FontAwesomeIcon icon={icon}/>
                                {'\u00A0'}{'\u00A0'}{'\u00A0'}{title}    
                            </div>
                            <div className="ratio-box-container">
                                <div className="flex-box">
                                    <div className="ratio-box">
                                        {ratio}
                                    </div>
                                    <div className="module-button">
                                        <button className={className}><FontAwesomeIcon icon="share" />{'\u00A0'} Go to Module</button>
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                        <Droppable droppableId={droppableId}>
                            {(provided) => (
                                <div className="i-container"
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
                                                    onSelectItem={() => this.props.onSelectItem(itemIndex, moduleKey, columnIndex)}
                                                />
                                            )
                                        })
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        )
    }
}