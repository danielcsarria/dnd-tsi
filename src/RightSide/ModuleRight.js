import React from 'react';
import Item from './Item';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import '../style.css';
import '../FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const modules_img_sizes = { // USED ALSO AS DEFAULT IF NOT INCLUDED IN THE THEME CONFIGURATION FILE
    "portrait_2_3" : {"label":"Portrait (2:3)","ico":"tsi15-ratio2_3","ratio":"2:3","aspectRatio":2/3},
    "landscape_3_2" : {"label":"Landscape (3:2)","ico":"tsi15-ratio3_2","ratio":"3:2","aspectRatio":3/2},
    "portrait_3_4" : {"label":"Portrait (3:4)","ico":"tsi15-ratio3_4","ratio":"3:4","aspectRatio":3/4},
    "landscape_4_3" : {"label":"Landscape (4:3)","ico":"tsi15-ratio4_3","ratio":"4:3","aspectRatio":4/3},
    "square_1_1" : {"label":"Square (1:1)","ico":"tsi15-ratio1_1","ratio":"1:1","aspectRatio":1},
    "round_1_1" : {"label":"Round (1:1)","ico":"tsi15-ratio1_1r","ratio":"1:1","aspectRatio":1},
    "widescreen_16_9" : {"label":"Widescreen 1 (16:9)","ico":"tsi15-ratio16_9","ratio":"16:9","aspectRatio":16/9},
    "widescreen_2-4_1" : {"label":"Widescreen 2 (2.4:1)","ico":"tsi15-ratio24_1","ratio":"2.4:1","aspectRatio":2.41},
    "widescreen_3_1" : {"label":"Widescreen 3 (3:1)","ico":"tsi15-ratio3_1","ratio":"3:1","aspectRatio":3/1},
    "img-widescreen_2-4_1" : {"label":"Image Only Widescreen (2.4:1)","ico":"tsi15-ratio24_1","ratio":"2.4:1","aspectRatio":2.41},
    "img-widescreen_16_9" : {"label":"Image Only Widescreen (16:9)","ico":"tsi15-ratio16_9","ratio":"16:9","aspectRatio":16/9},
    "scaled_to_fit_3_2" : {"label":"Scaled To Fit (3:2)","ico":"tsi15-ratio3_2 scaled","ratio":"3:2","aspectRatio":3/2},
    "scaled_to_fit_2-4_1" : {"label":"Scaled To Fit (2.4:1)","ico":"tsi15-ratio24_1 scaled","ratio":"2.4:1","aspectRatio":2.41},
    "no_set_height" : {"label":"No Height","ico":"fa fa-arrows-v tsi15-ratioNo","ratio":"No Height","aspectRatio":NaN},
    "no_set_width_4_3" : {"label":"Custom Scaled To Fit (4:3)","ico":"tsi15-ratio4_3 scaled","ratio":"4:3","aspectRatio":4/3},
    "no_set_width_1_1" : {"label":"Custom Scaled To Fit (1:1)","ico":"tsi15-ratio1_1 scaled","ratio":"1:1","aspectRatio":1},
    "no_sizing" : {"label":"No Sizing","ico":"fa fa-arrows tsi15-ratioNo","ratio":"No Sizing","aspectRatio":NaN}
};

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
        const ratio = modules_img_sizes[imgsize].ratio;

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
                        <div className="title-container">

                            <div className="module-title"
                                {...provided.dragHandleProps}
                            >
                                <small>
                                    <FontAwesomeIcon icon={icon}/>
                                    {'\u00A0'}{'\u00A0'}{'\u00A0'}{title}
                                 </small>
                            </div>
                            <div className="ratio-box-container">
                                <div className="ratio-box">
                                    {ratio}
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