import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {observable, expr} from 'mobx';
import * as Utils from '../utils';

const ENTER_KEY = 13;

@observer
export default class TodoTagPicker extends React.Component {
    render() {
        const {todoStore, viewStore, isOpen} = this.props;

        const styles = {
            dialog: {
                zIndex: '1000',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.15)'
            },
            closeButton: {
                position: 'absolute',
                top: '6px',
                right: '7px',
                cursor: 'pointer'
            },
            textInput: {
                width: '220px',
                marginTop: '10px',
                padding: '10px',
                fontSize: '1em'
            }
        }

        return(
            <dialog open={this.props.isOpen} style={styles.dialog}>
                <button style={styles.closeButton} className="close" onClick={this.handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="12" height="12"><path fill="none" stroke="#333" strokeWidth="4" strokeMiterlimit="10" d="M2 26L26 2M2 2l24 24"></path></svg>
                </button>
                <label>
                    <div>Add New Tag</div>
                    <input style={styles.textInput} placeholder="enter new tag" ref={(input) => { this.textInput = input; }} onKeyDown={this.handleKeyDown} />
                </label>
            </dialog>
        );
    }

    handleClick = () => {
        this.props.viewStore.tagPanelOpen = !this.props.viewStore.tagPanelOpen;
        this.props.viewStore.todoBeingTagged = null;

        this.textInput.value = '';
    }

    handleKeyDown = (e) => {
        if(e.keyCode === ENTER_KEY) {
            this.props.viewStore.todoBeingTagged.addTag(
                e.target.value.trim()
            );

            this.props.viewStore.tagPanelOpen = !this.props.viewStore.tagPanelOpen;

            e.target.value = '';
        }
    }
}