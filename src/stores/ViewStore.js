import {observable} from 'mobx';
import { ALL_TODOS } from '../constants';

export default class ViewStore {
	@observable todoBeingEdited = null;
    @observable todoBeingTagged = null;
	@observable todoFilter = ALL_TODOS;
    @observable tagPanelOpen = false;
}