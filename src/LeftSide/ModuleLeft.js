import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../FontAwesome';
import '../style.css';

export default class ModuleLeft extends React.Component{

    myFunction(icon) {
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
        return icon;
    }

    render(){
        
        // const columnIndex = this.props.columnIndex;
        const moduleKey = this.props.moduleKey;
        const moduleIndex = this.props.moduleIndex;
        const modules = this.props.modules[moduleKey];
        const type = modules.type;
        const config = this.props.config.modules[type];
        const theClass = this.props.theClass;
        // const modules = this.props.modules;
        const imgsize = modules.imgsize;
        const title = config.lbl;
        var icon = this.myFunction(config.ico);
        const ratio = this.props.modules_img_sizes[imgsize].ratio;

        console.log(modules.imgsize)
        // console.log("RATIO =>", this.props.modules_img_sizes[imgsize].ratio);

        return(

            <Draggable draggableId={moduleKey} index={moduleIndex}>
                {(provided) => (
                    <div className={theClass}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="title-container" onClick={() => this.props.moveSelectedItems()}>

                            <div className="module-title">
                                <FontAwesomeIcon icon={icon}/>
                                {'\u00A0'}{'\u00A0'}{'\u00A0'}{title}
                            </div>
                            <div className="ratio-box-container">
                                <div className="ratio-box">
                                    {ratio}
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}