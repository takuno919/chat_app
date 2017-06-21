import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import Search from '../components/users/search'

export default class SearchRouter extends BaseRouter {
  register() {
    this.route('/users/search', this.decorateSearch)
  }

  decorateSearch(ctx, next) {
    (new ReactDecorator()).decorate('react-main', Search)
    next()
  }
}
