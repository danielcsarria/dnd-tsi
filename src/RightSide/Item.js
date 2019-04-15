import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../style.css';
import CheckboxContainer from './CheckboxContainer';
import Checkbox from './Checkbox';

const options = {}

export default class ModuleRight extends React.Component{
    

    render(){

        
        const item = this.props.item;
        // const columnIndex = this.props.columnIndex;
        // const moduleIndex = this.props.moduleIndex;
        const itemIndex= this.props.itemIndex
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
                        <div className="item-img" style={bgImage} />
                        <div className="item-headline">
                            {headline}
                        </div>
                        <div className="checkbox-container">
                            {/* <input className="item=checkbox" type="checkbox" name={item.id} value={itemIndex} /> */}
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}