import {observable} from 'mobx';
import * as Utils from '../utils';

export default class TodoModel {
	store;
	id;
	@observable title;
	@observable completed;
	@observable tags;

	constructor(store, id, title, completed) {
		this.store = store;
		this.id = id;
		this.title = title;
		this.completed = completed;
		this.tags = [];
	}

	toggle() {
		this.completed = !this.completed;
	}

	destroy() {
		this.store.todos.remove(this);
	}

	setTitle(title) {
		this.title = title;
	}

	addTag(value) {
		const uuid = Utils.uuid();

		this.tags.push({
			id: uuid,
			value: value
		});
	}

	toJS() {
		return {
			id: this.id,
			title: this.title,
			completed: this.completed
		};
	}

	static fromJS(store, object) {
		return new TodoModel(store, object.id, object.title, object.completed);
	}
}
