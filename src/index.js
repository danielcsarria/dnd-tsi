import React from 'react';
import ReactDOM from 'react-dom';

import initialData from './data/data.json';
import config from './data/config.json';
import modules_img_sizes from './data/modules_img_sizes';

import ColumnLeft from './LeftSide/ColumnLeft';
import ColumnRight from './RightSide/ColumnRight';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { onDragEnd_L, onDragEnd_R, onSelectItem, selectedItemsQty, setSelectedItems, moveSelectedItems } from './scripts';

import './style.css';

class LayOut extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: initialData};
        this.onDragEnd_L = onDragEnd_L.bind(this);
        this.onDragEnd_R = onDragEnd_R.bind(this);
        this.onSelectItem = onSelectItem.bind(this);
        this.selectedItemsQty = selectedItemsQty.bind(this);
        this.setSelectedItems = setSelectedItems.bind(this);
        this.moveSelectedItems = moveSelectedItems.bind(this);
    }
    
    render(){

        const selectedItemsQty = this.selectedItemsQty();

        return(

            <div id="page-layout-editor">

                <div className="top-bar">
                    <div className="tb-container">
                        <div className="tb-title">
                            Page Layout Editor
                        </div>
                        <div className="tb-buttons">
                            <button id="cancel-btn" className="btn btn-cancel">Cancel</button>
                            <button id="apply-btn" className="btn btn-apply">Apply</button>
                        </div>
                    </div>
                </div>

                <div id="page-container">
                    <DragDropContext
                        onDragEnd={this.onDragEnd_L}
                    >
                        <Droppable droppableId="all-columns" type="column" direction="vertical">
                            {(provided) => (
                                <div id="column-container-left"
                                    {...provided.droppableProps}
                                    ref = {provided.innerRef}
                                >
                                    {   
                                        this.state.data.modules.map((modules, columnIndex) => {
                                            return <ColumnLeft 
                                                key={columnIndex} 
                                                columnIndex={columnIndex} 
                                                modules={modules} 
                                                config={config}
                                                modules_img_sizes={modules_img_sizes}
                                                moveSelectedItems={this.moveSelectedItems}
                                            />
                                        })
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>


                    <div id="column-container-right">
                        {
                            this.state.data.modules.map((modules, columnIndex) => {
                                return <ColumnRight 
                                    key={columnIndex} 
                                    columnIndex={columnIndex} 
                                    modules={this.state.data.modules} 
                                    config={config}
                                    modules_img_sizes={modules_img_sizes}
                                    onDragEnd={this.onDragEnd_R}
                                    selectedItemsQty={selectedItemsQty}
                                    onSelectItem={this.onSelectItem}
                                    clearSelectedItems={this.setSelectedItems}
                                    moveSelectedItems={this.moveSelectedItems}
                                />
                            })
                        }
                    </div>
                </div>

            </div>

        )

    }

}

ReactDOM.render(<LayOut />, document.getElementById('root'));
