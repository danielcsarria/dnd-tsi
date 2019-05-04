import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../FontAwesome';
import '../style.css';

export default class ModuleRight extends React.Component{

    render(){
        
        const item = this.props.item;
        // const columnIndex = this.props.columnIndex;
        // const moduleIndex = this.props.moduleIndex;
        const itemIndex = this.props.itemIndex
        const itemId = item.id
        const headline = item.headline;
        const ImgPre = "http://kendrabanks.townsquareinteractive.com"
        var ImgSrc = ImgPre + item.image;
        const bgImage = {
            color: "red",
            backgroundImage: "url('" + ImgSrc + "?w=300&h=200')",
        };

        return(
            <Draggable draggableId={itemId} index={itemIndex}>
                {(provided) => (
                    <div className="item-container"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref = {provided.innerRef}
                    >
                        <div className="item-img" style={bgImage} >
                            {/* <img src={ImgSrc} alt=""></img> */}
                        </div>
                        <div className="item-headline">
                            {headline}
                        </div>
                        <div className="item-actions">
                            <button type="button" className="btn btn-xs btn-default" title="Select Item" onClick={() => this.props.onSelectItem()}>
                                {<FontAwesomeIcon icon={item.selected ? 'check' : 'square'}/>}
                            </button>
                        </div>                        
                    </div>
                )}
            </Draggable>
        )
    }
}