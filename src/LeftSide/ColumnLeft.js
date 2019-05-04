import React from 'react';
import ModuleLeft from './ModuleLeft';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../FontAwesome';
import '../style.css';

export default class ColumnLeft extends React.Component{

    constructor(props) {
        super(props);
        this.moveSelectedItems = this.moveSelectedItems.bind(this);
    }  

    moveSelectedItems(columnIndex, moduleKey) {
        this.props.moveSelectedItems(columnIndex, moduleKey);
    }

    render(){
        const columnIndex = this.props.columnIndex;
        const modules = this.props.modules;
        const droppableId = String(columnIndex)

        var title = columnIndex === 0 ? "Feature" : "Column " + columnIndex;
        // console.log("modules =>", modules);
        // console.log("title,", title )

        var background = "column-" + columnIndex;
        var theClass = "module-container " + background;

        const columnClass = "column " + background;

        return(
            <Draggable draggableId={droppableId} index={columnIndex}>

                {(provided) => (
                    <div className={columnClass}
                        {...provided.draggableProps}
                        ref = {provided.innerRef}
                    >
                        <div className="column-container">
                            <div className="column-header column-title"
                                {...provided.dragHandleProps}
                            >
                                <div>
                                    <FontAwesomeIcon icon="bars" />{'\u00A0'}{'\u00A0'}
                                    {title}
                                </div>
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
                                                    modules_img_sizes={this.props.modules_img_sizes}
                                                    moveSelectedItems={() => this.moveSelectedItems(columnIndex, moduleKey)}
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
