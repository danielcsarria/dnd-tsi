import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../style.css';

export default class ModuleLeft extends React.Component{
    render(){
        // const columnIndex = this.props.columnIndex;
        const moduleKey = this.props.moduleKey;
        const moduleIndex = this.props.moduleIndex;
        const modules = this.props.modules[moduleKey];
        const type = modules.type;
        const config = this.props.config.modules[type];
        const theClass = this.props.theClass;
        // const modules = this.props.modules;
        const title = config.lbl;
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

            <Draggable draggableId={moduleKey} index={moduleIndex}>
                {(provided) => (
                    <div className={theClass}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="title-container">
                            <div className="module-title">
                                <FontAwesomeIcon icon={icon}/> {title}
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}