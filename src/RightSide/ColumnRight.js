import React from 'react';
import ModuleRight from './ModuleRight';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import '../style.css';

export default class ColumnRight extends React.Component{

    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onSelectItem = this.onSelectItem.bind(this);
        this.moveSelectedItems = this.moveSelectedItems.bind(this);
    }  

    onDragEnd(result) {
        this.props.onDragEnd(result, this.props.columnIndex);
    }

    onSelectItem(itemIndex, moduleKey, columnIndex) {
        // console.log(this.props.onSelectItem, itemIndex, moduleKey, columnIndex);
        this.props.onSelectItem(itemIndex, moduleKey, columnIndex);
    }

    moveSelectedItems(columnIndex, moduleKey) {
        this.props.moveSelectedItems(columnIndex, moduleKey);
    }

    render(){
        const columnIndex = this.props.columnIndex;
        const modules = this.props.modules[columnIndex];
        var title = columnIndex === 0 ? "Feature" : "Column " + columnIndex;

        var background = "column-" + columnIndex;
        var theClass = "module-container " + background;

        const columnClass = "column " + background;

        return(
            <div className={columnClass}>
                <div className="column-header">
                    <div className="column-title">
                        {title}
                    </div>
                    <div className="column-title move-selected-items">
                        {columnIndex!==0 || this.props.selectedItemsQty===0 ? <div /> : 
                            <button 
                                onClick={() => this.props.clearSelectedItems(false)}
                            >
                                {this.props.selectedItemsQty} item{this.props.selectedItemsQty!==1?"s":""} selected
                            </button>}
                    </div>                    
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="all-modules" type="modules" direction="vertical">
                        {(provided) => (
                            <div className="container"
                                {...provided.droppableProps}
                                ref = {provided.innerRef}
                            >
                                { 
                                    Object.keys(modules).map((moduleKey, moduleIndex) => {
                                        return <ModuleRight 
                                            key={moduleKey} 
                                            columnIndex={columnIndex}
                                            moduleKey={moduleKey}
                                            moduleIndex={moduleIndex} 
                                            modules={modules}
                                            theClass={theClass}
                                            config={this.props.config}
                                            onSelectItem={this.onSelectItem}      
                                            moveSelectedItems={() => this.moveSelectedItems(columnIndex, moduleKey)}
                                        />
                                    })
                                } 

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}
