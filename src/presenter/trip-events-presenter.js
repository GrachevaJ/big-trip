import { render } from '../render.js';
import TripEventElementView from '../view/trip-events-element-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';


export default class ListEventsPresenter {
  listComponent = new TripEventsListView();

  init = (listContainer) => {
    this.listContainer = listContainer;

    render(this.listComponent, this.listContainer);

    for (let i = 0; i < 9; i++) {
      render(new TripEventElementView(), this.listComponent.getElement());
    }
  };
}

