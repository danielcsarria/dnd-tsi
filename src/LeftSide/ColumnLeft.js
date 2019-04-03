import React from 'react';
import ModuleLeft from './ModuleLeft';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../FontAwesome';
import '../style.css';

export default class ColumnLeft extends React.Component{
    render(){
        const columnIndex = this.props.columnIndex;
        const modules = this.props.modules;

        const droppableId = String(columnIndex)

        var title = columnIndex === 0 ? "Feature" : "Column " + columnIndex;
        // console.log("modules =>", modules);
        // console.log("title,", title )

        var background = "";
        var theClass = "";

        if (title === "Feature"){
            background = "column-feature ";
            theClass = "module-container " + background;
        } else if (title === "Column 1"){
            background = "column-one";
            theClass = "module-container " + background;
        } else if (title === "Column 2"){
            background = "column-two";
            theClass = "module-container " + background;
        } else if (title === "Column 3"){
            background = "column-three";
            theClass = "module-container " + background;
        } else if (title === "Column 4"){
            background = "column-four";
            theClass = "module-container " + background;
        }

        const columnClass = "column " + background;

        return(
            <Draggable draggableId={droppableId} index={columnIndex}>

                {(provided) => (
                    <div className={columnClass}
                        {...provided.draggableProps}
                        ref = {provided.innerRef}
                    >
                        <div className="column-container">
                            <div className="column-title"
                                {...provided.dragHandleProps}
                            >
                                {title}
                            </div>

                            <Droppable droppableId={droppableId}>
                                {(provided) => (
                                    <div className="container"
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
                                                    theClass={theClass}
                                                    config={this.props.config}                             
                                                />
                                            })
                                        }
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                )}

            </Draggable>
        )
    }
}
