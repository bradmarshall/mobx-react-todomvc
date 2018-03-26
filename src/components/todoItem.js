import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, expr} from 'mobx';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class TodoItem extends React.Component {
	@observable editText = "";

	render() {
		const {viewStore, todo} = this.props;

		const styles = {
			listItem: {
				backgroundColor: '#fff'
			},
			tagPanelLauncher: {
				color: '#af2f2f8a',
				marginLeft: '60px',
				marginRight: '10px',
				fontSize: '.5em',
				transform: 'translateY(-17px)',
				cursor: 'pointer'
			},
			tagList: {
				display: 'inline-block',
				transform: 'translateY(-16px)',
				margin: '0',
				padding: '0'
			},
			tagListItem: {
				display: 'inline',
				backgroundColor: '#e8e8e8',
				color: '#7b7b7b',
				fontSize: '.5em',
				fontWeight: '500',
				padding: '2px 5px',
				marginRight: '4px',
				borderRadius: '4px'
			}
        };

		return (
			<li className={[
				todo.completed ? "completed": "",
				expr(() => todo === viewStore.todoBeingEdited ? "editing" : "")
			].join(" ")} style={styles.listItem}>
				<div className="view" style={styles.listItem}>
					<input
						className="toggle"
						type="checkbox"
						checked={todo.completed}
						onChange={this.handleToggle}
					/>
					<label onDoubleClick={this.handleEdit}>
						{todo.title}
					</label>
					<button className="tagPanelLauncher" style={styles.tagPanelLauncher} onClick={this.handleAddTag}>Add Tag</button>
					<ul className="tagList" style={styles.tagList}>
						{this.getTags().map((tag) => <li key={tag.id} style={styles.tagListItem}>{tag.value}</li>)}
					</ul>
					<button className="destroy" onClick={this.handleDestroy} />
				</div>
				<input
					ref="editField"
					className="edit"
					value={this.editText}
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
			</li>
		);
	}

	handleSubmit = (event) => {
		const val = this.editText.trim();
		if (val) {
			this.props.todo.setTitle(val);
			this.editText = val;
		} else {
			this.handleDestroy();
		}
		this.props.viewStore.todoBeingEdited = null;
	};

	handleDestroy = () => {
		this.props.todo.destroy();
		this.props.viewStore.todoBeingEdited = null;
	};

	handleEdit = () => {
		const todo = this.props.todo;
		this.props.viewStore.todoBeingEdited = todo;
		this.editText = todo.title;
	};

	handleKeyDown = (event) => {
		if (event.which === ESCAPE_KEY) {
			this.editText = this.props.todo.title;
			this.props.viewStore.todoBeingEdited = null;
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	};

	handleChange = (event) => {
		this.editText = event.target.value;
	};

	handleToggle = () => {
		this.props.todo.toggle();
	};

	handleAddTag = () => {
		this.props.viewStore.todoBeingTagged = this.props.todo;
		this.props.viewStore.tagPanelOpen = !this.props.viewStore.tagPanelOpen;
	};

	getTags = () => {
		return this.props.todo.tags;
	};
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	viewStore: PropTypes.object.isRequired
};
